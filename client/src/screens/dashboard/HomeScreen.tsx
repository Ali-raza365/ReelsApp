import React, { FC, useRef, useState } from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalFeed from '../../components/feed/GlobalFeed';
import CustomGradient from '../../components/global/CustomGradient';
import CustomText from '../../components/global/CustomText';
import CustomView from '../../components/global/CustomView';
import { selectUser } from '../../redux/reducers/userSlice';
import { useAppSelector } from '../../redux/reduxHook';

import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import { navigate } from '../../utils/NavigationUtil';

const HomeScreen: FC = () => {
  const containerRef = useRef<CollapsibleRef>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const user = useAppSelector(selectUser) as User;
  const handleSetIndex = (newIndex: number) => {
    setFocusedIndex(newIndex);
    containerRef.current?.setIndex(newIndex);
  };

  const MyTabs = [
    {
      name: 'For You',
      component: <GlobalFeed user={user} type="forYou" />,
      icon: 'apps-sharp',
    },
    {
      name: 'Popular',
      component: <GlobalFeed user={user} type="popular" />,
      icon: 'heart',
    },
    {
      name: 'Following',
      component: <GlobalFeed user={user} type="following" />,
      icon: 'heart',
    },
  ];

  const RenderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.userImage }} style={styles.avatar} />
          <CustomText
            variant="h7"
            fontFamily={FONTS.Medium}
            style={styles.username}>
            {user?.username}
          </CustomText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.searchButton} onPress={() => { }}>
          <Ionicons name="notifications" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={() => { navigate('SearchReelsScreen') }}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <CustomView style={{ overflow: 'hidden' }}>
      <CustomGradient position="top" />
      <RenderHeader />
      <Tabs.Container
        lazy
        cancelLazyFadeIn={true}
        ref={containerRef}
        revealHeaderOnScroll={false}
        pagerProps={{
          onPageSelected: event => {
            setFocusedIndex(event.nativeEvent.position);
          },
          removeClippedSubviews: true,
        }}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            activeColor={Colors.white}
            inactiveColor={Colors.disabled}
            tabStyle={{
              backgroundColor: Colors.background,
            }}
            style={{
              backgroundColor: Colors.background,
              borderTopWidth: 1,
              borderColor: Colors.background,
            }}
            indicatorStyle={styles.indicatorStyle}
            TabItemComponent={({ index, name, ...rest }) => (
              <TouchableOpacity
                key={index}
                style={styles.tabBar}
                onPress={() => handleSetIndex(index)}>
                <CustomText
                  style={
                    focusedIndex === index
                      ? styles.activeText
                      : styles.inActiveText
                  }>
                  {name}
                </CustomText>
              </TouchableOpacity>
            )}
          />
        )}
        containerStyle={{
          backgroundColor: Colors.background,
          paddingVertical: 0,
          elevation: 0,
          shadowOffset: { height: 0, width: 0 },
          shadowColor: 'transparent',
          shadowOpacity: 0,

        }}
      // renderHeader={}
      >
        {MyTabs.map((item, index) => (
          <Tabs.Tab
            key={index} name={item.name}>
            {item.component}
          </Tabs.Tab>
        ))}
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
    paddingHorizontal: 14,
    marginTop: Platform.OS === 'ios'   ?80: 20,
    // height:40,
    // padding: 10,
    // paddingVertical: 7,
    // paddingBottom: 0,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
    // backgroundColor:Colors.fbColor,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.secondary,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
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
    overflow: 'hidden',
    backgroundColor: Colors.background
  },
  tabBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingTop: 0,
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
export default HomeScreen;
