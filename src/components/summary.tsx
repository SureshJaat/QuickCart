import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { boldManjari, regularManjari } from '../utils/typography';
import { moderateScale } from '../styles/responsive';

interface SummaryProps {
    subtotal: number;
    delivery: number;
    total: number;
}

const OrderSummary: React.FC<SummaryProps> = ({ subtotal, delivery, total }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.amount}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Delivery</Text>
                <Text style={styles.amount}>${delivery.toFixed(2)}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    label: {
        fontSize: moderateScale(14),
        color: '#000000',
        fontWeight: '700',
        fontFamily: boldManjari
    },
    amount: {
        fontSize: moderateScale(14),
        color: '#1E222B',
        fontWeight: '400',
        fontFamily: regularManjari
    },
    separator: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginVertical: 8,
    },
    totalLabel: {
        fontSize: moderateScale(14),
        color: '#000000',
        fontWeight: '700',
        fontFamily: boldManjari
    },
    totalAmount: {
        fontSize: moderateScale(14),
        color: '#1E222B',
        fontWeight: '700',
        fontFamily: boldManjari

    },
});

export default OrderSummary;
