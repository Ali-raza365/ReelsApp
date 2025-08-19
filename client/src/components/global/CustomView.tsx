import {FC, ReactNode} from 'react';
import {StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import {Colors} from '../../constants/Colors';

interface CustomViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomView: FC<CustomViewProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={Colors.background}
    />
    {children}
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default CustomView;
