
import React,{FC} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading: boolean;
  Buttonstyle?:any
}

const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled,
  loading,
  Buttonstyle
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.theme,
        },
        Buttonstyle
      ]}>
        {loading ?
        <ActivityIndicator color={"white"} size={"small"} />
        :
        <CustomText 
        variant='h6'
        style={styles.text}
        fontFamily={FONTS.SemiBold}
        >
            {title}
        </CustomText>    
    }
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 15,
    marginVertical: 15,
    width:"100%"
  },
  text:{
    color:"#fff"
  },
});

export default CustomButton;
