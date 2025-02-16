// CustomToast.js
import React from 'react';
import Toast, {BaseToast} from 'react-native-toast-message';
import {StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast

      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
    />
  ),
};

// Custom toast functions
export const showToast = {
  success: (message: string, title = 'Success') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
      topOffset: 40,
    });
  },
  error: (message: string, title = 'Error') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
      topOffset: 40,
    });
  },
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: Colors.theme,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginHorizontal: 16,
    height: 'auto',
    minHeight: 60,
    paddingVertical: 12,
    shadowColor: Colors.theme,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorToast: {
    borderLeftColor: '#ff4444',
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginHorizontal: 16,
    height: 'auto',
    minHeight: 60,
    paddingVertical: 12,
    shadowColor: '#ff4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.theme,
  },
  message: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '400',
  },
});
