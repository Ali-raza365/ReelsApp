import {FC} from 'react';
import Home from '../assets/icons/home.png';
import HomeFocused from '../assets/icons/homeFocused.png';
import Profile from '../assets/icons/profile.png';
import ProfileFocused from '../assets/icons/profileFocused.png';
import Followers from '../assets/icons/followers.png';
import FollowersFocused from '../assets/icons/followersFocused.png';
import {Image} from 'react-native';
import {bottomBarStyles} from '../styles/NavigationBarStyles';
import {Colors} from '../constants/Colors';

interface TabProps {
  name: string;
}

interface IconProp {
  focused: boolean;
}

const TabIcon: FC<TabProps> = ({name}) => {
  return (
    <Image
      source={name === 'Home' ? Home :  name == 'followers'
        ? Followers :Profile}
      style={[bottomBarStyles.tabIcon, {tintColor: Colors.disabled}]}
    />
  );
};

const TabIconFocused: FC<TabProps> = ({name}) => {
  return (
    <Image
      source={
        name === 'Home'
          ? HomeFocused
          : name == 'followers'
          ? FollowersFocused
          : ProfileFocused
      }
      style={[bottomBarStyles.tabIcon, {tintColor: Colors.white}]}
    />
  );
};

export const HomeTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? <TabIconFocused name="Home" /> : <TabIcon name="Home" />;
};

export const ProfileTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Profile" />
  ) : (
    <TabIcon name="Profile" />
  );
};

export const FollowerTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="followers" />
  ) : (
    <TabIcon name="followers" />
  );
};
