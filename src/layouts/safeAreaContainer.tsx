import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import React, { Fragment, ReactNode } from 'react';
import colors from '../styles/colors';


interface SafeAreaContainerProps {
  background?: '1' | '2';
  Header?: React.FC;
  Footer?: React.FC;
  children?: ReactNode;
}
const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({ children }) => {
  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeArea} />
      <StatusBar backgroundColor={colors.freshGreen} />
      <SafeAreaView style={styles.bottomSafeArea}>{children}</SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: 'white',
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default React.memo(SafeAreaContainer);
