import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import ProfileReelCard from '../feed/ProfileReelCard';
import {Tabs} from 'react-native-collapsible-tab-view';
import {useAppDispatch} from '../../redux/reduxHook';
import {
  fetchFeedReel,
  fetchPopularReel,
  fetchReel,
  fetchSearchReel,
} from '../../redux/actions/reelAction';
import CustomText from '../global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {navigate} from '../../utils/NavigationUtil';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import GlobalFeedCard from './GlobalFeedCard';
import {getReelHeight} from '../../utils/staticData';

const GlobalFeed: React.FC<{
  user?: ProfileUser | undefined | User;
  query?: string | undefined | null;
  type?: 'forYou' | 'popular' | 'following' | 'Search';
}> = ({user, type, query}) => {
  const [loading, setLoading] = useState(true);
  const [offsetLoading, setOffsetLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <GlobalFeedCard
        onPressReel={() => {
          navigate('ReelScrollScreen', {
            data: data,
            index: index,
          });
        }}
        style={{
          height: getReelHeight(item?.height),
        }}
        item={item}
        loading={loading}
      />
    );
  };

  const dispatch = useAppDispatch();

  const removeDuplicates = (data: any) => {
    const uniqueDataMap = new Map();
    data.forEach((item: any) => {
      if (!uniqueDataMap.has(item._id)) {
        uniqueDataMap.set(item._id, item);
      }
    });
    return Array.from(uniqueDataMap.values());
  };

  const fetchReels = async (scrollOffset: number, isRefresh: boolean) => {
    if (scrollOffset == 0) {
      setLoading(true);
    } else {
      setOffsetLoading(true);
    }

    const reelData = {
      userId: user?.id,
      offset: scrollOffset,
    };
    let newData: any[] = [];
    if (type == 'forYou') {
      newData = await dispatch(fetchFeedReel(offset, 5, type));
    } else if (type == 'popular') {
      newData = await dispatch(fetchPopularReel(offset, 5));
    } else if (type == 'following') {
      newData = await dispatch(fetchFeedReel(offset, 5, type));
    } else if (type === 'Search' && query) {
      newData = await dispatch(fetchSearchReel(offset, 5, query));
    }
    console.log(newData)
    // return 
    if (isRefresh) {
      setData([...newData]);
      setOffset(0);
    } else {
      setData(prevData => removeDuplicates([...prevData, ...newData]));
      setOffset(offset + 5);
    }
    if (newData.length < 5) {
      setHasMore(false);
    }
    setLoading(false);
    setOffsetLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchReels(0, false);
  }, []);

  // useEffect(() => {
  //   fetchReels(0, false);
  //   console.log("first")
  // }, [query]);

  return (
    <View style={{width: screenWidth, height: screenHeight}}>
      <Tabs.MasonryFlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={() => {
          console.log({hasMore});
          if (hasMore) {
            fetchReels(offset, false);
          }
        }}
        estimatedItemSize={200}
        contentContainerStyle={styles.flatlistContainer}
        removeClippedSubviews
        // initialNumToRender={2}
        // onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setData([]);
              setOffset(0);
              setHasMore(true);
              fetchReels(0, true);
            }}
          />
        }
        ListFooterComponent={() => {
          if (!offsetLoading && !loading) {
            return null;
          }
          return (
            <View
              style={{
                width: screenWidth,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
              }}>
              <ActivityIndicator color={Colors.white} size="small" />
            </View>
          );
        }}
        ListEmptyComponent={() => {
          if (loading) {
            return null;
          }
          return (
            <View style={styles.emptyContainer}>
              <Icon
                name="play-circle-outline"
                size={RFValue(35)}
                color={Colors.white}
              />
              <CustomText fontFamily={FONTS.Medium} variant="h6">
                No Reels here!
              </CustomText>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingVertical: 20,
    // alignItems: 'flex-start',
    paddingBottom: 180,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
  },
});

export default GlobalFeed;
