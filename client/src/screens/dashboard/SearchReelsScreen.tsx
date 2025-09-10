import React, { FC, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalFeed from '../../components/feed/GlobalFeed';
import CustomGradient from '../../components/global/CustomGradient';
import CustomText from '../../components/global/CustomText';
import CustomView from '../../components/global/CustomView';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import { goBack } from '../../utils/NavigationUtil';
import { screenHeight } from '../../utils/Scaling';

const SearchReelsScreen: FC = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: Colors.background}}>
    <CustomView>
      <CustomGradient position="top" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon
            name="keyboard-backspace"
            color={Colors.text}
            size={RFValue(20)}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Icon name={'magnify'} size={RFValue(18)} color={Colors.lightText} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.lightText}
            value={search}
            onChangeText={text => setSearch(text)}
          />
          {search !== '' && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon
                name={'close-circle'}
                size={RFValue(14)}
                color={Colors.border}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => setSearch('')}>
          <CustomText
            variant="h6"
            fontFamily={FONTS.Medium}
            style={{color: !search ? Colors.lightText : Colors.text}}>
            Search
          </CustomText>
        </TouchableOpacity>
      </View>

      <Tabs.Container renderTabBar={() => <View></View>} tabBarHeight={0}>
        <Tabs.Tab name="Search" label=" ">
          <GlobalFeed type="Search" query={search} />
        </Tabs.Tab>
      </Tabs.Container>
    </CustomView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    height: screenHeight * 0.8,
  },
  header: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  indicator: {
    height: 4,
    width: 40,
    top: 4,
    backgroundColor: Colors.border,
  },
  inputContainer: {
    backgroundColor: '#1f1e1e',
    flexDirection: 'row',
    borderRadius: 10,
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 8,
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 2,
    marginHorizontal: 10,
    color: Colors.text,
  },
  loading: {
    marginTop: 20,
  },
  btn: {
    // backgroundColor: '#1c1b1b',
    // padding: 8,
    borderRadius: 10,
    // width: '48%',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchReelsScreen;
