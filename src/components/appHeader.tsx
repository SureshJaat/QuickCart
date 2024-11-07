import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';
import SearchInput from './common/searchInput';
import { horizontalScale, moderateScale, verticalScale } from '../styles/responsive';
import { boldManjari } from '../utils/typography';
import { backArrow, profileImage } from '../utils/images';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

interface AppHeaderProps {
    title: string;
    onLeftButtonPress?: () => void;
    onRightButtonPress?: () => void;
    searchPlaceholder?: string;
    onSearchInputChange?: (text: string) => void;
    onSearchSubmit?: () => void;
    type?: string
    animatedStyle?: any
    onLayout?: (event: any) => void
}

const AppHeader: React.FC<AppHeaderProps> = ({
    title,
    onLeftButtonPress,
    onRightButtonPress,
    searchPlaceholder = 'Search Products or store',
    onSearchInputChange,
    onSearchSubmit,
    type,
    animatedStyle = {},
    onLayout
}) => {

    const navigation = useNavigation();
    return (
        <Animated.View onLayout={onLayout} style={[styles.header, animatedStyle]}>
            {type === 'home' ? (<>
                <View style={[styles.topRow]}>
                    <Text style={styles.greetingText}>Hey,{title}</Text>
                    <TouchableOpacity onPress={onRightButtonPress}>
                        <Image source={profileImage} style={styles.profileImage} />
                    </TouchableOpacity>
                </View>
                <SearchInput
                    // value={searchPlaceholder}
                    onChangeText={onSearchInputChange || (() => { })} // Default no-op function if not provided
                    onSearch={onSearchSubmit || (() => { })}
                />

            </>) : (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { navigation.canGoBack() && navigation.goBack() }}>
                    <Image style={{ height: 20, width: 20 }} source={backArrow} resizeMode='contain' />
                </TouchableOpacity>

                <Text style={[styles.greetingText, { alignSelf: 'center' }]}>{title}</Text>
                <View style={{ height: 20, width: 20 }} />
            </View>)}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: horizontalScale(20),
        width: '100%',
        paddingVertical: verticalScale(20),
        backgroundColor: colors.freshGreen,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },
    greetingText: {
        fontSize: moderateScale(22),
        color: colors.almostWhite,
        fontFamily: boldManjari,
    },
    profileImage: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(15),
    },
});

export default AppHeader;
