import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SafeAreaContainer from '../../layouts/safeAreaContainer';
import AppHeader from '../../components/appHeader';
import CartItem from '../../components/cartItem';
import { useAppSelector } from '../../redux/reduxHooks/hooks';
import { selectCartList } from '../../redux/slice/cartSlice/cartSlice';
import OrderSummary from '../../components/summary';
import CustomButton from '../../components/common/customButton';

const deliveryFee: number = 2.00

const CartTab: React.FC = () => {
  const cartData = useAppSelector(selectCartList);

  const subtotal = useMemo(() => {
    return cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartData]);


  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);
  console.log(subtotal, "subtotal", total, "total")


  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <AppHeader title="Shopping Cart" type="cart" />
        {cartData.length > 0 ? (
          <>
            <FlatList
              data={cartData}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
            <View style={styles.summaryContainer}>
              <OrderSummary subtotal={subtotal} delivery={deliveryFee} total={total} />
              <View style={styles.buttonContainer}>
                <CustomButton title="Proceed to Checkout" onPress={() => { }} />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        )}
      </View>
    </SafeAreaContainer>
  );
};

export default CartTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBF2',
  },
  flatListContent: {
    padding: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#868889',
  },
  summaryContainer: {
    paddingVertical: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
