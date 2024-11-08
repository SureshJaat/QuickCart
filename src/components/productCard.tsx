import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { favoriteSelector, quantitySelector, setCartData, setFavoriteData } from '../redux/slice/cartSlice/cartSlice';
import { horizontalScale, moderateScale, verticalScale } from '../styles/responsive';
import { add, cart, heartEmpty, heartFill, subtract } from '../utils/images';
import { useAppDispatch } from '../redux/reduxHooks/hooks';
import { boldManjari, regularManjari, regularPoppins } from '../utils/typography';
import Image from 'react-native-fast-image';
import colors from '../styles/colors';


interface ProductCardProps {
    [x: string]: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, }) => {
    const quantity = useSelector((state: any) => quantitySelector(state, item?.id));
    const isFavourite = useSelector((state: any) => favoriteSelector(state, item?.id));
    const dispatch = useAppDispatch()
    const handleCart = (action: string) => dispatch(setCartData({ item, action }))
    const scale = useSharedValue(1);
    const triggerPulse = () => {
        scale.value = withSequence(
            withTiming(1.5, {
                duration: 300,
                easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1, {
                duration: 300,
                easing: Easing.inOut(Easing.ease),
            })
        );
        dispatch(setFavoriteData({ item }))

    };
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });
    return (
        <View style={styles.card}>
            <View style={{ borderTopLeftRadius: moderateScale(10), backgroundColor: '#FEE4E4', left: 0, position: 'absolute' }}>
                <Text style={styles.discount}>- {item?.discountPercentage.toFixed(0)} %</Text>
            </View>
            <TouchableOpacity style={{
                position: 'absolute',
                top: 10,
                right: 10,
            }} onPress={() => triggerPulse()}>
                <Animated.Image source={isFavourite ? heartFill : heartEmpty} resizeMode="contain" style={[styles.heartIcon, animatedStyle]} />
            </TouchableOpacity>
            <Image source={{
                uri: item?.thumbnail, priority: Image.priority.high,
            }} style={styles.image} />
            <Text style={[styles.price, styles.priceMargin]}>{`$${item?.price}`}</Text>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={[styles.price, styles.stockText]}>{`${item?.stock} available`}</Text>
            <View style={styles.actionContainer}>
                {!quantity ? (
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => {
                            if (quantity < item?.stock) {
                                handleCart('add');

                            }
                        }}
                        disabled={quantity >= item?.stock}
                    >
                        <>
                            <Image tintColor={colors.freshGreen} source={cart} resizeMode='contain' style={styles.cartIcon} />
                            <Text style={styles.cartText}>Add to cart</Text>
                        </>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => handleCart('remove')}>
                            <Image source={subtract} resizeMode='contain' style={styles.cartAction} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            disabled={quantity >= item?.stock}
                            onPress={() => {
                                if (quantity < item?.stock) {
                                    handleCart('add');
                                }
                            }}>
                            <Image source={add} resizeMode='contain' style={styles.cartAction} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: moderateScale(10),
        backgroundColor: 'rgba(255, 255, 255, 1)',
        overflow: 'hidden',
        margin: 10,
        width: '90%',
        alignItems: 'center',
        position: 'relative',
    },
    heartIcon: {
        height: moderateScale(20),
        width: moderateScale(20),

    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 120,
        marginTop: verticalScale(18),
    },
    title: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#000000',
        fontFamily: boldManjari,
        lineHeight: verticalScale(18),
        textAlign: 'center'
    },
    price: {
        fontSize: moderateScale(14),
        fontWeight: '400',
        color: '#6CC51D',
        fontFamily: regularManjari
    },
    priceMargin: {
        marginTop: verticalScale(5),
    },
    stockText: {
        color: '#868889',
        marginBottom: verticalScale(5),
    },

    actionContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(8),
        height: verticalScale(35),
        borderTopWidth: 1,
        borderColor: '#EBEBEB'
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: horizontalScale(12),
    },
    cartIcon: {
        height: moderateScale(18),
        width: moderateScale(18),
    },
    cartAction: {
        height: moderateScale(15),
        width: moderateScale(15),
        tintColor: '#6CC51D',
    },
    cartText: {
        fontSize: moderateScale(12),
        fontWeight: '700',
        color: '#010101',
        fontFamily: regularPoppins
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        marginHorizontal: horizontalScale(20)
    },
    quantityButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6CC51D',
        paddingHorizontal: horizontalScale(10),
    },
    quantityText: {
        fontSize: moderateScale(12),
        fontWeight: '500',
        color: '#000000',
        fontFamily: regularPoppins,
        marginHorizontal: horizontalScale(10),
    },
    discount: {
        fontSize: 10,
        fontWeight: '500',
        color: '#F56262',
        fontFamily: regularPoppins,
        paddingVertical: verticalScale(4),
        paddingHorizontal: horizontalScale(12),
        borderTopLeftRadius: moderateScale(10),
    }
});

export default ProductCard;
