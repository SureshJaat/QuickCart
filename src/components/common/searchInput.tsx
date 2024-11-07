import React from 'react';
import { TextInput, StyleSheet, View, Image } from 'react-native';
import colors from '../../styles/colors';
import { horizontalScale, moderateScale, verticalScale } from '../../styles/responsive';
import { searchIcon } from '../../utils/images';
interface SearchInputProps {
    // value: string;
    onChangeText: (text: string) => void;
    onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChangeText, onSearch }) => {
    return (
        <View style={styles.container}>
            <Image source={searchIcon} style={styles.searchIcon} resizeMode='contain' />
            <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor={colors.white}
                // value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSearch}
                returnKeyType="search"
                numberOfLines={1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: verticalScale(20),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.softGreen,
        borderRadius: moderateScale(28),
        backgroundColor: colors.softGreen,
        paddingHorizontal: horizontalScale(20),
    },
    input: {
        flex: 1,
        color: colors.white, // Input text color
        fontSize: moderateScale(16),
    },
    searchIcon: {
        width: moderateScale(18),
        height: moderateScale(18),
        tintColor: colors.white
    }
});

export default SearchInput;
