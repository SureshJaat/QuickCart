import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { home, cart } from '../utils/images';
import { moderateScale } from '../styles/responsive';
import colors from '../styles/colors';

const BottomTabBar = ({ state, descriptors, navigation }: any) => {

  let focuseIndex: any = false

  return (
    <SafeAreaView style={{ height: moderateScale(62), backgroundColor: colors.white }}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          let iconName;

          let activeImag;
          if (route.name === 'Home') {
            iconName = home;
            activeImag = home
          } else if (route.name === 'CartTab') {
            iconName = cart;
            activeImag = cart
          }
          else {
            return
          }

          const isFocused = state.index === index;
          focuseIndex = state.index === 3 ? true : false

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.tabItemFocused]}
            >
              <Image
                tintColor={isFocused ? colors.white : '#868889'}
                source={isFocused ? activeImag : iconName}
                style={[styles.tabIcon]}
                resizeMode="contain"
              />

            </TouchableOpacity>
          );
        })}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: colors.white,
    height: moderateScale(60),
    // borderTopWidth: 1,
    // borderTopColor: colors.lightGray,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
  },
  tabItemFocused: {
    // borderBottomWidth: 2,
    // borderBottomColor: colors.orange,
    backgroundColor: colors.freshGreen,
    borderRadius: moderateScale(50),


  },
  tabIcon: {
    width: moderateScale(25),
    height: moderateScale(25),
  },

});

export default React.memo(BottomTabBar);
