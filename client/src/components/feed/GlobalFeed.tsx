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
import {fetchReel} from '../../redux/actions/reelAction';
import CustomText from '../global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {navigate} from '../../utils/NavigationUtil';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import GlobalFeedCard from './GlobalFeedCard';

const ReelListTab: React.FC<{
  user?: ProfileUser | undefined | User;
  type?: 'post' | 'liked' | 'watched';
}> = ({user, type}) => {
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
          height: item?.height/3,
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
    if (type == 'post') {
      newData = await dispatch(fetchReel(reelData, 'reel'));
    } else if (type == 'liked') {
      newData = await dispatch(fetchReel(reelData, 'likedreel'));
    } else {
      newData = await dispatch(fetchReel(reelData, 'reel'));
    }
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

  return (
    <View style={{width: screenWidth, height: screenHeight}}>
      <Tabs.MasonryFlashList
        data={[...data]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={() => {
          if (hasMore) {
            fetchReels(offset, false);
          }
        }}
        estimatedItemSize={200}
        removeClippedSubviews
        // initialNumToRender={2}
        onEndReachedThreshold={0.1}
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
                No {type} Reels here!
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
    // paddingBottom: 80,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
  },
});

export default ReelListTab;
