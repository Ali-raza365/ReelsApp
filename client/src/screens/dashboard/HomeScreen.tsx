import React, {FC, useRef, useState} from 'react';
import CustomView from '../../components/global/CustomView';
import CustomGradient from '../../components/global/CustomGradient';
import GlobalFeed from '../../components/feed/GlobalFeed';
import CustomText from '../../components/global/CustomText';
import {useAppSelector} from '../../redux/reduxHook';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import {selectUser} from '../../redux/reducers/userSlice';
import ReelListTab from '../../components/profile/ReelListTab';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';

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
      component: <GlobalFeed user={user} type="post" />,
      icon: 'apps-sharp',
    },
    {
      name: 'Popular',
      component: <GlobalFeed user={user} type="liked" />,
      icon: 'heart',
    },
  ];

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
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <CustomView>
      <CustomGradient position="top" />
      {/* <GlobalFeed/> */}
      <Tabs.Container
        lazy
        cancelLazyFadeIn
        ref={containerRef}
        revealHeaderOnScroll={true}
        renderHeader={() => <RenderHeader />}
        headerContainerStyle={styles.noOpacity}
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
            TabItemComponent={({index, name, ...rest}) => (
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
          shadowOffset: {height: 0, width: 0},
          shadowColor: 'transparent',
          shadowOpacity: 0,
        }}>
        {MyTabs.map((item, index) => (
          <Tabs.Tab key={index} name={item.name}>
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
export default HomeScreen;
