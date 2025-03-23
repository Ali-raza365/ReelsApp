const express = require("express");
const {
  getLikedVideos,
  getAllHistoryReels,
  markReelsWatched,
  getHomeFeed,
  getReelPosts,
  getReelsBySearch,
  getPopularFeed,
  getFollowingFeed
} = require("../controllers/feed/feed");
const auth = require("../middleware/authentication");

const router = express.Router();

router.get("/watchedreel/:userId",auth ,getAllHistoryReels);
router.get("/likedreel/:userId", getLikedVideos);
router.get("/reel/:userId", getReelPosts);
router.post("/markwatched", markReelsWatched);
router.get("/home", getHomeFeed);
router.get("/search", getReelsBySearch);
router.get("/popular", getPopularFeed);

module.exports = router;
