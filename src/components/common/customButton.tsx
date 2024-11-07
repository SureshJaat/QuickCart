import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '../../styles/colors';
import { moderateScale } from '../../styles/responsive';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.freshGreen,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: moderateScale(20),
        alignItems: 'center',
    },
    buttonText: {
        color: colors.almostWhite,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;
