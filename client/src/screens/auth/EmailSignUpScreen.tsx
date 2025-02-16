import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import React, {FC, useState} from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Lottie from 'lottie-react-native';
import Animation from '../../assets/animations/login.json';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/Colors';
import CustomText from '../../components/global/CustomText';
import {FONTS} from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../components/global/CustomInput';
import CustomButton from '../../components/global/CustomButton';
import {screenWidth} from '../../utils/Scaling';
import {useAppDispatch} from '../../redux/reduxHook';
import {navigate} from '../../utils/NavigationUtil';
import {loginWithEmail, rigisterWithEmail} from '../../redux/actions/userAction';
import {validateForm} from '../../utils/validations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EmailSignUpScreen: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSignUp = async () => {
    let {isValid} = validateForm({email, password, confirmPassword});
    if (!isValid) return;
    setLoading(true);
    try {
      let registerData = {
        email: email.toLowerCase().trim(),
        password,
      };
      await dispatch(rigisterWithEmail(registerData));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewContainer}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.select({
        ios: 120,
        android: 120,
      })}>
        <View style={styles.lottieContainer}>
          <Lottie source={Animation} autoPlay loop style={styles.lottie} />
        </View>

        <View style={styles.titleContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', Colors.text, 'rgba(0,0,0,0)']}
            style={styles.linearGradient}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
          />
          <CustomText variant="h2" fontFamily={FONTS.Reelz}>
            Sign Up
          </CustomText>
          <LinearGradient
            colors={['rgba(0,0,0,0)', Colors.text, 'rgba(0,0,0,0)']}
            style={styles.linearGradient}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
          />
        </View>

        <CustomInput
          left={
            <Icon
              name="mail"
              style={styles.leftIcon}
              size={20}
              color={Colors.light_gray}
            />
          }
          value={email}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          left={
            <Icon
              name="lock-closed"
              style={styles.leftIcon}
              size={20}
              color={Colors.light_gray}
            />
          }
          value={password}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <CustomInput
          left={
            <Icon
              name="lock-closed"
              style={styles.leftIcon}
              size={20}
              color={Colors.light_gray}
            />
          }
          value={confirmPassword}
          placeholder="Confirm Password"
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
        />

        <CustomButton
          title="SignUp"
          onPress={onSignUp}
          disabled={(loading && !password) || !email}
          loading={loading}
          Buttonstyle={styles.button}
        />
        {/* Don't have an account? Sign Up */}
        <TouchableOpacity
          onPress={() => navigate('EmailLoginScreen')}
          style={styles.signupContainer}>
          {/* <Text style={styles.signupText}>Don't have an account? </Text>
          <Text style={styles.signupLink}>Sign Up</Text> */}
          <CustomText style={styles.signupText}>
            {' '}
            Already have an account?{' '}
          </CustomText>
          <CustomText style={styles.signupLink}>Login</CustomText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerText}>
          <CustomText
            variant="h9"
            fontFamily={FONTS.Medium}
            style={{textAlign: 'center'}}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </CustomText>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </CustomSafeAreaView>
  );
};

export default EmailSignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 120,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    width: RFValue(150),
    height: RFValue(150),
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  linearGradient: {
    flex: 1,
    height: 1,
  },
  leftIcon: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: screenWidth * 0.9,
    marginTop: 20,
  },
  tagline: {
    textAlign: 'center',
    marginVertical: 30,
  },
  footerText: {
    opacity: 0.6,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  signupText: {
    textAlign: 'center',
    color: Colors.light_gray,
  },
  signupLink: {
    color: Colors.theme,
    fontWeight: 'bold',
    bottom: 2,
    textDecorationLine: 'underline',
  },
});
