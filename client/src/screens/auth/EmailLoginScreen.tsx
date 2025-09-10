import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  // CheckBox
} from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Lottie from 'lottie-react-native';
import Animation from '../../assets/animations/login.json';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../components/global/CustomInput';
import CustomButton from '../../components/global/CustomButton';
import { screenWidth } from '../../utils/Scaling';
import { loginWithEmail } from '../../redux/actions/userAction';
import { useAppDispatch } from '../../redux/reduxHook';
import { navigate } from '../../utils/NavigationUtil';
import { validateForm } from '../../utils/validations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EmailLoginScreen: FC = () => {
  const [email, setEmail] = useState('ali@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onLogin = async () => {
    let { isValid } = validateForm({ email, password });
    if (!isValid) return;

    setLoading(true);
    try {
      let loginData = {
        email: email.toLowerCase().trim(),
        password,
        provider: 'email',
        id_token: 'email',
      };
      await dispatch(loginWithEmail(loginData));
      setLoading(false);
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
          android: 40,
        })}>
        <View style={styles.lottieContainer}>
          <Lottie source={Animation} autoPlay loop style={styles.lottie} />
        </View>

        <View style={styles.titleContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', Colors.text, 'rgba(0,0,0,0)']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
          <CustomText variant="h2" fontFamily={FONTS.Reelz}>
            Login
          </CustomText>
          <LinearGradient
            colors={['rgba(0,0,0,0)', Colors.text, 'rgba(0,0,0,0)']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
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

        {/* Remember Me Checkbox and Forgot Password */}
        <View style={styles.rememberForgotContainer}>
          <TouchableOpacity onPress={() => navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Login"
          onPress={onLogin}
          disabled={(loading && !password) || !email}
          loading={loading}
          Buttonstyle={styles.button}
        />

        {/* Don't have an account? Sign Up */}
        <TouchableOpacity
          onPress={() => navigate('SignUpScreen')}
          style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </CustomSafeAreaView>
  );
};

export default EmailLoginScreen;

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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth * 0.9,
    marginVertical: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
    color: Colors.light_gray,
  },
  forgotPasswordText: {
    color: Colors.theme,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
    textDecorationLine: 'underline',
  },
});
