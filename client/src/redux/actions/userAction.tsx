import { token_storage } from '../storage';
import { appAxios } from '../apiConfig';
import { setUser } from '../reducers/userSlice';
import { persistor } from '../store';
import { navigate, resetAndNavigate } from '../../utils/NavigationUtil';
import { CHECK_USERNAME, EMAIL_REGISTER, LOGIN, REGISTER } from '../API';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { addFollowing } from '../reducers/followingSlice';
import { showErrorToast } from '../../utils/validations';
import { handleServerError } from '../../utils/ErrorHandler';

interface registerData {
  id_token: string;
  provider: string;
  name: string;
  email: string;
  username: string;
  userImage: string;
  bio: string;
}
interface loginData {
  id_token: string;
  provider: string;
  email: string;
  password: string;
}

export const checkUsernameAvailability =
  (username: string) => async (dispatch: any) => {
    try {
      const res = await axios.post(CHECK_USERNAME, {
        username,
      });
      return res.data.available;
    } catch (error: any) {
      console.log('CHECK USERNAME ERROR ->', error);
      return ;
    }
  };

export const register = (data: registerData) => async (dispatch: any) => {
  try {
    const res = await axios.post(REGISTER, data);
    console.log({res})
    token_storage.set('access_token', res.data.tokens.access_token);
    token_storage.set('refresh_token', res.data.tokens.refresh_token);
    await dispatch(setUser(res.data.user));
    resetAndNavigate('BottomTab');
  } catch (error: any) {
     handleServerError(error);
    console.log('REGISTER ERROR ->', {...error});
  }
};

export const registerWithEmail = (data: registerData) => async (dispatch: any) => {
  try {
    const res = await axios.post(REGISTER, data);
    token_storage.set('access_token', res.data.tokens.access_token);
    token_storage.set('refresh_token', res.data.tokens.refresh_token);
    await dispatch(setUser(res.data.user));
    resetAndNavigate('BottomTab');
  } catch (error: any) {
    handleServerError(error);
    console.log('REGISTER ERROR ->', error);
  }
};

export const loginWithEmail = (data: loginData) => async (dispatch: any) => {
  try {
    const res = await axios.post(LOGIN, data);
    console.log( 'LOGIN DATA ->', data);
    console.log(res.data)
    token_storage.set('access_token', res.data.tokens.access_token);
    token_storage.set('refresh_token', res.data.tokens.refresh_token);
    if (!res?.data?.user?.IsProfileCompleted) {
      navigate('RegisterScreen', {
        ...data,
      });
      return;
    }
    await dispatch(setUser(res.data.user));
    resetAndNavigate('BottomTab');
  } catch (error: any) {
    handleServerError(error);
    console.log('EMAIL LOGIN ERROR ->', error);
  }
};

export const rigisterWithEmail = (data: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(EMAIL_REGISTER, data);
    token_storage.set('access_token', res.data.tokens.access_token);
    token_storage.set('refresh_token', res.data.tokens.refresh_token);
    if (!res?.data?.user?.IsProfileCompleted) {
      navigate('RegisterScreen', {
        ...data,
      });
      return;
    }
    await dispatch(setUser(res.data.user));
    resetAndNavigate('BottomTab');
  } catch (error: any) {
    handleServerError(error);
    console.log('EMAIL REGISTER WITH EMAIL ERROR ->', error);
  }
};

export const refetchUser = () => async (dispatch: any) => {
  try {
    const res = await appAxios.get('/user/profile');
    await dispatch(setUser(res.data.user));
    console.log(res?.data?.user)
    if (!res?.data?.user?.IsProfileCompleted) {
      navigate('RegisterScreen', {
        ...res.data?.user,
      });
      return;
    }
  } catch (error: any) {
    handleServerError(error);
    console.log('PROFILE ->', error);
  }
};

export const fetchUserByUsername =
  (username: string) => async (dispatch: any) => {
    try {
      const res = await appAxios.get(`/user/profile/${username}`);
      return res.data.user;
    } catch (error: any) {
      console.log('FETCH BY USERNAME ->', error);
      return null;
    }
  };

export const toggleFollow = (userId: string) => async (dispatch: any) => {
  try {
    const res = await appAxios.put(`/user/follow/${userId}`);
    const data = {
      id: userId,
      isFollowing: res.data.msg == 'Unfollowed' ? false : true,
    };
    dispatch(addFollowing(data));
    dispatch(refetchUser());
  } catch (error: any) {
    console.log('TOGGLE FOLLOW ERRO ->', error);
  }
};

export const refetchUserLogin = () => async (dispatch: any) => {
  try {
    const res = await appAxios.get('/user/profile');
    await dispatch(setUser(res.data.user));
    resetAndNavigate('BottomTab');
  } catch (error: any) {
    console.log('PROFILE ->', error);
  }
};

export const Logout = () => async (dispatch: any) => {
  await token_storage.clearAll();
  await persistor.purge();
  resetAndNavigate('LoginScreen');
};

export const getSearchUsers = (text: string) => async (dispatch: any) => {
  try {
    const res = await appAxios.get(`/user/search?text=${text}`);
    return res.data.users;
  } catch (error: any) {
    console.log('SEARCH USER ->', error);
    return [];
  }
};

export const getFollowOrFollowingUsers =
  (data: any, search: string, offset: number) => async (dispatch: any) => {
    try {
      const res = await appAxios.get(
        `/user/${data?.type.toLowerCase()}/${data?.userId
        }?searchText=${search}&limit=5&offset=${offset}`,
      );

      return res.data;
    } catch (error: any) {
      console.log('Followers / Following USER ->', error);
      return [];
    }
  };
