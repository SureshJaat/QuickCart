import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { AnimatedFlashList } from "@shopify/flash-list";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AppHeader from '../../components/appHeader';
import ProductCard from '../../components/productCard';
import SafeAreaContainer from '../../layouts/safeAreaContainer';
import { useAppDispatch } from '../../redux/reduxHooks/hooks';
import { getDashBoardDataBySearch, getPrdouctListData } from '../../redux/slice/dashBoard/dashAction';
import colors from '../../styles/colors';
import { rightArrow } from '../../utils/images';
import useSearch, { UseSearchResult } from '../../hooks/useSearchWithPagination';
import { boldManjari } from '../../utils/typography';
import { horizontalScale, moderateScale } from '../../styles/responsive';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl: string;
    isInCart: boolean;
    quantity: number;
}
const AnimatedFlashListCustom = Animated.createAnimatedComponent(AnimatedFlashList);

const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const [headerHeiht, setHeaderHeight] = useState(0);
    const [productsList, setProductsList] = useState<{ products: Product[]; skip: number; total: number }>({ products: [], skip: 0, total: 0 });
    const [productsListBySearch, setProductsListBySearch] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [serachKeybaord, setSerachKeybaord] = useState<string>('');
    const scrollY = useSharedValue(0);

    // Filter data based on search query  frontend
    const { filteredData, handleSearchChange } = useSearch(productsList.products);

    const getList = async (pageNum: number): Promise<void> => {
        if (pageNum > 0 && isFetchingMore) return;
        setIsFetchingMore(true);
        setLoading(pageNum === 0);
        try {
            const data = await dispatch(getPrdouctListData(pageNum)).unwrap();
            const updatedData = data?.products || [];
            console.log(data.total, "data.total")
            setProductsList((prev) => ({
                products: pageNum === 0 ? updatedData : [...prev.products, ...updatedData],
                skip: data.skip,
                total: data.total,
            }));
        } catch (error) {
            console.error('Error fetching product list', error);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    };

    const getListBySearch = useCallback(async (keyboard: string): Promise<void> => {
        setLoading(true);
        try {
            const data = await dispatch(getDashBoardDataBySearch(keyboard)).unwrap();
            setProductsListBySearch(data?.products || []);
        } catch (error) {
            console.error('Error fetching search results', error);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const handleSearch = (keyboard: string): void => {
        // Filter data based on search query  frontend
        // handleSearchChange(keyboard);

        setSerachKeybaord(keyboard);
        if (searchTimeout) clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => getListBySearch(keyboard), 700));
    };

    const handleQuantityChange = useCallback((index: number, type: string): void => {
        const updatedProducts = [...productsList.products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            quantity: updatedProducts[index].quantity + (type === 'add' ? 1 : -1),
        };
        setProductsList((prev) => ({
            ...prev,
            products: updatedProducts,
        }));
    }, [productsList.products]);


    const onScrollData = useAnimatedScrollHandler(
        (event) => {
            scrollY.value = event.contentOffset.y;
        },);


    const animatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [60, 0],
            [0, 60],
            Extrapolation.CLAMP
        );
        return {
            transform: [{ translateY: translateY }],
            position: 'absolute',
            zIndex: 1,
            top: -60
        };
    });

    useEffect(() => {
        getList(page);
    }, [page]);


    return (
        <SafeAreaContainer>
            <View style={{ flex: 1, backgroundColor: 'rgba(174, 220, 129, 0.1)' }}>
                <AppHeader onLayout={(e: any) => setHeaderHeight(e.nativeEvent.layout.height)} animatedStyle={animatedStyle} title="Home" type="home" onSearchInputChange={handleSearch} />
                {loading ? (
                    <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <ActivityIndicator size="large" color={colors.freshGreen} />
                    </View>
                ) :

                    (
                        <AnimatedFlashListCustom
                            numColumns={2}
                            data={
                                productsListBySearch?.length > 0 || serachKeybaord?.length > 0
                                    ? productsListBySearch
                                    : productsList.products
                            }
                            onEndReached={() => {
                                // console.log(productsList.products.length, productsList.total, "productsList.products.length, productsList.total");
                                if (!isFetchingMore && !serachKeybaord && productsList.products.length < productsList.total) {
                                    setPage((prevPage) => prevPage + 1);
                                } else {
                                    console.log(page, "page Not Update");
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            estimatedItemSize={200}
                            onMomentumScrollBegin={() => setIsFetchingMore(false)}
                            ListHeaderComponent={
                                <View style={[styles.header, { paddingTop: headerHeiht }]}>
                                    <Text style={styles.headerText}>Featured Products</Text>
                                    <Image source={rightArrow} resizeMode="contain" style={styles.headerIcon} />
                                </View>
                            }
                            ListFooterComponent={
                                isFetchingMore ? <ActivityIndicator size="small" color={colors.freshGreen} /> : null
                            }
                            renderItem={({ item, index }) => (
                                <ProductCard
                                    item={item}
                                    handleQuantityChange={(type: string) => handleQuantityChange(index, type)}
                                />
                            )}
                            keyExtractor={(item, index) => index?.toString()}
                            contentContainerStyle={{
                                paddingHorizontal: horizontalScale(10),
                                paddingBottom: 20,
                            }}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>No products found</Text>
                                </View>
                            }
                            onScroll={onScrollData}
                        />
                    )}
            </View>
        </SafeAreaContainer>
    );
};

const styles = StyleSheet.create({
    flatListContent: {
        flexGrow: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    headerText: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: '#000',
        fontFamily: boldManjari
    },
    headerIcon: {
        height: 15,
        width: 15,
    },
});

export default HomeScreen;
