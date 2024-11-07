import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { add, subtract } from '../utils/images';
import { useAppDispatch } from '../redux/reduxHooks/hooks';
import { quantitySelector, setCartData } from '../redux/slice/cartSlice/cartSlice';
import { useSelector } from 'react-redux';
import { horizontalScale, moderateScale, verticalScale } from '../styles/responsive';
import { regularPoppins } from '../utils/typography';
import Image from 'react-native-fast-image';

const CartItem = ({ item }: any) => {
    const dispatch = useAppDispatch()
    const quantity = useSelector((state: any) => quantitySelector(state, item?.id));
    const handleCart = (action: string) => dispatch(setCartData({ item, action }))
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}>
                <Image source={{ uri: item?.thumbnail, priority: Image.priority.high, }} style={styles.image} resizeMode='cover' />
                <View style={styles.infoContainer}>
                    <Text style={styles.priceText}>${item?.price} x {quantity}</Text>
                    <Text style={styles.titleText}>{item?.title}</Text>
                    <Text style={styles.stockText}>Stock: {item?.stock}</Text>
                </View>
            </View>
            <View style={styles.extraContainer}>
                <TouchableOpacity onPress={() => {
                    if (quantity < item?.stock) {
                        handleCart('add');
                    }
                }}
                    disabled={quantity >= item?.stock}>
                    <Image source={add} style={{ height: verticalScale(15), width: horizontalScale(15) }} resizeMode='contain' />
                </TouchableOpacity>
                <Text style={{ paddingVertical: 15, alignSelf: 'center' }}>{quantity}</Text>
                <TouchableOpacity onPress={() => handleCart('remove')}>
                    <Image source={subtract} style={{ height: verticalScale(15), width: horizontalScale(15) }} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'flex-start'
    },
    image: {
        height: moderateScale(65),
        width: moderateScale(65),
        borderRadius: 40,
        marginRight: 10,
        borderWidth: 0
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    priceText: {
        fontSize: moderateScale(12),
        fontWeight: '500',
        fontFamily: regularPoppins,
        color: '#6CC51D', // Green for price
    },
    titleText: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        fontFamily: regularPoppins,
        color: '#000000', // Dark color for title
        marginVertical: 2,
    },
    stockText: {
        fontSize: 12,
        fontFamily: regularPoppins,
        color: '#868889', // Gray for stock information
    },
    extraContainer: {
        alignItems: 'flex-end',
        paddingVertical: 5,

    },
});
