import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import ReelCardLoader from '../loader/ReelCardLoader';
import FastImage from 'react-native-fast-image';
import CustomText from '../global/CustomText';
import { FONTS } from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface GlobalFeedCard {
  style: any;
  loading: boolean;
  item: any;
  onPressReel: () => void;
}

const GlobalFeedCard: FC<GlobalFeedCard> = ({
  style,
  onPressReel,
  item,
  loading,
}) => {

  return (
    <View style={[styles.card]}>
      {loading ? (
        <View></View>
      ) : (
        // <ReelCardLoader style={styles.skeletonLoader} />
        <TouchableOpacity style={styles.gridItem} onPress={onPressReel}>
          <FastImage
            source={{
              uri: item?.thumbUri,
              priority: FastImage.priority.high,
            }}
            style={[styles.postImage, style]}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.postInfo}>
            <Text style={styles.postName}>{item.caption}</Text>
            <View style={styles.likesContainer}>
              <Ionicons
                name="heart"
                size={20}
                color={item?.isLiked ? 'red' : '#fff'}
              />
              <CustomText
                variant="h8"
                fontFamily={FONTS.SemiBold}
                style={styles.likesCount}>
                {item?.likesCount}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  views: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.02)',
    bottom: 3,
    right: 3,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: (screenWidth - 5) / 2,
    height: '100%',
    // // backgroundColor:Colors.secondary,
    // backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {},
  skeletonLoader: {
    width: '100%',
    height: '100%',
  },
  gridItem: {
    width: '100%',
    height: '100%',
    marginTop: 3,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(228, 219, 219, 0.8)',
    // backgroundColor:Colors.fbColor,
  },
  postImage: {
    width: '100%',
    height: 180,
  },
  postInfo: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    bottom: 0,
    left: 2,
    padding: 8,
  },
  postName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 16,
  },
});

export default GlobalFeedCard;
