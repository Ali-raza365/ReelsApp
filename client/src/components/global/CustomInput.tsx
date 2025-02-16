// import {Colors, Fonts} from '@utils/Constants';
import React, {FC} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';

interface InputProps extends TextInputProps {
  left?: React.ReactNode;
  rightIcon?: boolean;
  onClear?: () => void;
}

const CustomInput: FC<InputProps> = ({left, rightIcon, onClear, ...props}) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        style={styles.inputContainer}
        placeholderTextColor="#ccc"
        {...props}
      />
      <View style={styles.icon}>
        {props.value?.length !== 0 && rightIcon && (
          <TouchableOpacity onPress={onClear}>
            <Icon name="close-circle-sharp" size={RFValue(16)} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.background,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
  inputContainer: {
    flex: 1,
    fontFamily: FONTS.SemiBold,
    fontSize: RFValue(12), // Use your RFValue if needed
    paddingVertical: 14,
    paddingBottom: 15,
    color: Colors.text,
    height: '100%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default CustomInput;
