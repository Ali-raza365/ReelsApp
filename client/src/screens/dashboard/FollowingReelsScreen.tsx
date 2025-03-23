import React, { FC, useRef, useState } from 'react';
import {
  CollapsibleRef,
  Tabs
} from 'react-native-collapsible-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalFeed from '../../components/feed/GlobalFeed';
import CustomGradient from '../../components/global/CustomGradient';
import CustomText from '../../components/global/CustomText';
import CustomView from '../../components/global/CustomView';
import { selectUser } from '../../redux/reducers/userSlice';
import { useAppSelector } from '../../redux/reduxHook';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import { navigate } from '../../utils/NavigationUtil';

const FollowingReelsScreen: FC = () => {
  const containerRef = useRef<CollapsibleRef>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const user = useAppSelector(selectUser) as User;
  const handleSetIndex = (newIndex: number) => {
    setFocusedIndex(newIndex);
    containerRef.current?.setIndex(newIndex);
  };

  const RenderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{uri: user.userImage}} style={styles.avatar} />
          <CustomText
            variant="h7"
            fontFamily={FONTS.Medium}
            style={styles.username}>
            {user?.username}
          </CustomText>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            navigate('SearchReelsScreen');
          }}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <CustomView>
      <CustomGradient position="top" />
      <RenderHeader />
      <Tabs.Container renderTabBar={() => <View></View>} tabBarHeight={0}>
        <Tabs.Tab name="following" label=" ">
          <GlobalFeed user={user} type="following" />
        </Tabs.Tab>
      </Tabs.Container>
      <CustomGradient position="bottom" />
    </CustomView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 7,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  searchButton: {
    padding: 8,
  },
  indicatorStyle: {
    backgroundColor: Colors.secondary,
    // height: 0.8,
  },
  noOpacity: {
    shadowOpacity: 0,
    elevation: 0,

    borderWidth: 0,
  },
  tabBar: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  activeText: {
    color: Colors.text,
    fontSize: 18,
    fontFamily: FONTS.SemiBold,
  },
  inActiveText: {
    color: Colors.inactive_tint,
    fontSize: 16,
    fontFamily: FONTS.Medium,
  },
});
export default FollowingReelsScreen;
