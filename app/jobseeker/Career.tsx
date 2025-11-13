import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  PanResponder,
  RefreshControl,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ---- Types ----
type Post = {
  id: number;
  name: string;
  position: string;
  time: string;
  text: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  shares: number;
  isLiked?: boolean;
  isSaved?: boolean;
  avatarUrl?: string;
};

type Comment = {
  id: number;
  author: string;
  text: string;
  time: string;
};

// ---- Mock Posts ----
const initialPosts: Post[] = [
  {
    id: 1,
    name: "Maria Santos",
    position: "Software Engineer at TechCorp",
    time: "2 hours ago",
    text:
      "Just landed my dream job as a Senior Software Engineer! 🎉 The journey wasn't easy - 3 years of continuous learning, multiple rejections, but persistence paid off.",
    tags: ["CareerGrowth", "SoftwareEngineering", "Success"],
    likes: 245,
    commentsCount: 38,
    shares: 12,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    position: "UX Designer",
    time: "5 hours ago",
    text: "Completed my UI/UX certification today! Ready to level up my career.",
    tags: ["UXDesign", "CareerChange", "Learning"],
    likes: 189,
    commentsCount: 24,
    shares: 8,
    isLiked: false,
    isSaved: false,
  },
];

// ---- Mock Comments ----
const initialComments: Record<number, Comment[]> = {
  1: [
    {
      id: 1,
      author: "HR Recruiter",
      text: "Huge congrats, Maria! Well deserved 👏",
      time: "1 hour ago",
    },
  ],
  2: [
    {
      id: 1,
      author: "Design Lead",
      text: "Proud of you! Your growth has been amazing.",
      time: "3 hours ago",
    },
  ],
};

// ---- Utilities ----
const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

// ---- DRAGGABLE SHEET (Fixed Version) ----
const DraggableSheet = ({
  visible,
  onClose,
  height = "full",
  children,
}: {
  visible: boolean;
  onClose: () => void;
  height?: "full" | "half";
  children: React.ReactNode;
}) => {
  const translateY = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 600,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      translateY.setValue(600);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 100 || g.vy > 0.7) closeSheet();
        else
          Animated.timing(translateY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={closeSheet}>
      {/* Tap outside to close */}
      <TouchableWithoutFeedback onPress={closeSheet}>
        <View className="flex-1 bg-black/40" />
      </TouchableWithoutFeedback>

      {/* Draggable sheet */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateY }] }}
        className={`bg-white rounded-t-3xl px-5 pt-3 ${
          height === "half" ? "h-1/2" : "h-[92%]"
        }`}
      >
        {/* Drag handle */}
        <View className="w-14 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        {children}
      </Animated.View>
    </Modal>
  );
};

// ====================================================
// MAIN SCREEN
// ====================================================

const Career = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [postModalVisible, setPostModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const [activePostForComments, setActivePostForComments] =
    useState<Post | null>(null);
  const [commentsByPost, setCommentsByPost] =
    useState<Record<number, Comment[]>>(initialComments);
  const [newCommentText, setNewCommentText] = useState("");

  const [sharePost, setSharePost] = useState<Post | null>(null);
  const [optionsPost, setOptionsPost] = useState<Post | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 600);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts([...posts]);
      setRefreshing(false);
    }, 700);
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const toggleSave = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  };

  const handleAttachImage = () => {
    setAttachedImage("placeholder-uri");
  };

  const createPost = () => {
    if (!newPostText.trim()) return;

    const tags =
      newPostTags
        .split("#")
        .map((t) => t.trim())
        .filter(Boolean) || [];

    const newPost: Post = {
      id: Date.now(),
      name: "You",
      position: "CareerPath Member",
      time: "Just now",
      text: newPostText,
      tags,
      likes: 0,
      commentsCount: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setNewPostTags("");
    setAttachedImage(null);
    setPostModalVisible(false);
  };

  const addComment = () => {
    if (!activePostForComments || !newCommentText.trim()) return;

    const postId = activePostForComments.id;

    const newComment: Comment = {
      id: Date.now(),
      author: "You",
      text: newCommentText,
      time: "Just now",
    };

    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])],
    }));

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, commentsCount: p.commentsCount + 1 }
          : p
      )
    );

    setNewCommentText("");
  };

  const openOptions = (post: Post) => setOptionsPost(post);

  const LikeButton = ({
    liked,
    onPress,
  }: {
    liked?: boolean;
    onPress: () => void;
  }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const trigger = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 110,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 110,
          useNativeDriver: true,
        }),
      ]).start();
      onPress();
    };

    return (
      <TouchableOpacity onPress={trigger} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={28}
            color={liked ? "#ef4444" : "#555"}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* FEED */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {/* SHARE BOX */}
        <View className="bg-white p-4 rounded-xl shadow-sm mb-4 flex-row items-center">
          <View className="w-14 h-14 rounded-full bg-blue-200 items-center justify-center mr-3">
            <Text className="text-blue-800 font-bold text-base">You</Text>
          </View>

          <TouchableOpacity
            onPress={() => setPostModalVisible(true)}
            className="flex-1 bg-gray-100 p-3 rounded-lg"
          >
            <Text className="text-gray-500 text-base">
              Share your career experience…
            </Text>
          </TouchableOpacity>
        </View>

        {/* NEW POST BUTTON */}
        <TouchableOpacity
          onPress={() => setPostModalVisible(true)}
          className="w-full bg-blue-600 py-3 rounded-lg flex-row justify-center items-center mb-6"
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text className="text-white font-semibold text-base ml-1">
            New Post
          </Text>
        </TouchableOpacity>

        {/* POSTS */}
        {!loading &&
          posts.map((post) => (
            <View
              key={post.id}
              className="bg-white p-5 rounded-xl mb-6 border border-gray-200"
            >
              {/* HEADER */}
              <View className="flex-row justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-14 h-14 bg-gray-200 rounded-full items-center justify-center mr-3">
                    <Text className="text-lg font-bold text-gray-800">
                      {post.avatarUrl ? "" : getInitials(post.name)}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900 text-base">
                      {post.name}
                    </Text>
                    <Text className="text-gray-500 text-base">
                      {post.position}
                    </Text>
                    <Text className="text-gray-400 text-sm">{post.time}</Text>
                  </View>
                </View>

                <TouchableOpacity onPress={() => openOptions(post)}>
                  <Ionicons name="ellipsis-vertical" size={22} color="#555" />
                </TouchableOpacity>
              </View>

              {/* BODY */}
              <Text className="text-gray-800 mt-4 mb-3 text-base">
                {post.text}
              </Text>

              {/* TAGS */}
              {!!post.tags.length && (
                <View className="flex-row flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, i) => (
                    <Text key={i} className="text-blue-600 text-base">
                      #{tag}
                    </Text>
                  ))}
                </View>
              )}

              {/* ACTIONS */}
              <View className="flex-row justify-between pt-3 border-t border-gray-200">
                {/* LIKE */}
                <View className="flex-row items-center gap-2 px-2 py-2">
                  <LikeButton
                    liked={post.isLiked}
                    onPress={() => toggleLike(post.id)}
                  />
                  <Text className="text-gray-800 text-base">{post.likes}</Text>
                </View>

                {/* COMMENT */}
                <TouchableOpacity
                  className="flex-row items-center gap-2 px-2 py-2"
                  onPress={() => setActivePostForComments(post)}
                >
                  <Ionicons name="chatbubble-outline" size={28} color="#555" />
                  <Text className="text-gray-800 text-base">
                    {post.commentsCount}
                  </Text>
                </TouchableOpacity>

                {/* SHARE */}
                <TouchableOpacity
                  className="flex-row items-center gap-2 px-2 py-2"
                  onPress={() => setSharePost(post)}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={28}
                    color="#555"
                  />
                  <Text className="text-gray-800 text-base">{post.shares}</Text>
                </TouchableOpacity>

                {/* SAVE */}
                <TouchableOpacity
                  className="flex-row items-center gap-2 px-2 py-2"
                  onPress={() => toggleSave(post.id)}
                >
                  <Ionicons
                    name={post.isSaved ? "bookmark" : "bookmark-outline"}
                    size={28}
                    color={post.isSaved ? "#2563eb" : "#555"}
                  />
                  <Text className="text-gray-800 text-base">
                    {post.isSaved ? 1 : 0}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>

      {/* CREATE POST (Option A) */}
      <Modal
        visible={postModalVisible}
        animationType="slide"
        onRequestClose={() => setPostModalVisible(false)}
      >
        <View className="flex-1 bg-white">
          <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
            <TouchableOpacity onPress={() => setPostModalVisible(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold ml-3 text-gray-900">
              Create Post
            </Text>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              multiline
              placeholder="Write something..."
              placeholderTextColor="#9CA3AF"
              className="border border-gray-300 rounded-xl px-4 py-3 text-base min-h-[120px]"
              value={newPostText}
              onChangeText={setNewPostText}
            />

            <TextInput
              placeholder="Add tags (#career #dev #advice)"
              placeholderTextColor="#9CA3AF"
              className="border border-gray-300 rounded-xl px-4 py-3 text-base mt-3"
              value={newPostTags}
              onChangeText={setNewPostTags}
            />

            <TouchableOpacity
              onPress={handleAttachImage}
              className="flex-row items-center mt-4"
            >
              <Ionicons name="image-outline" size={22} color="#2563eb" />
              <Text className="text-base text-blue-600 ml-2">
                {attachedImage ? "Change image" : "Add image (optional)"}
              </Text>
            </TouchableOpacity>

            {attachedImage && (
              <View className="w-full h-32 bg-gray-200 rounded-xl mt-3 items-center justify-center">
                <Text className="text-gray-600">Image attached (placeholder)</Text>
              </View>
            )}

            {/* POST BUTTON */}
            <TouchableOpacity
              onPress={createPost}
              disabled={!newPostText.trim()}
              className={`mt-6 py-3 rounded-xl items-center ${
                newPostText.trim() ? "bg-blue-600" : "bg-blue-300"
              }`}
            >
              <Text className="text-white font-semibold text-base">Post</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* COMMENTS SHEET */}
      <DraggableSheet
        visible={!!activePostForComments}
        onClose={() => setActivePostForComments(null)}
      >
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold text-gray-900">Comments</Text>
            <TouchableOpacity onPress={() => setActivePostForComments(null)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Post preview */}
          {activePostForComments && (
            <View className="mb-3">
              <Text className="font-semibold text-base text-gray-900">
                {activePostForComments.name}
              </Text>
              <Text className="text-base text-gray-700" numberOfLines={2}>
                {activePostForComments.text}
              </Text>
            </View>
          )}

          <View className="h-[1px] bg-gray-200 mb-3" />

          {/* Comments */}
          <ScrollView className="flex-1">
            {activePostForComments &&
            commentsByPost[activePostForComments.id]?.length ? (
              commentsByPost[activePostForComments.id].map((c) => (
                <View key={c.id} className="flex-row mb-4">
                  <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
                    <Text className="text-base font-bold">{getInitials(c.author)}</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="font-semibold text-base">{c.author}</Text>
                    <Text className="text-base">{c.text}</Text>
                    <Text className="text-sm text-gray-400">{c.time}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View className="items-center mt-8">
                <Ionicons name="chatbubbles-outline" size={32} color="#aaa" />
                <Text className="text-gray-500 text-base mt-2">
                  No comments yet.
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Add comment */}
          <View className="flex-row items-center mb-8">
            <TextInput
              placeholder="Write a comment..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-base mr-2"
              value={newCommentText}
              onChangeText={setNewCommentText}
            />
            <TouchableOpacity
              onPress={addComment}
              disabled={!newCommentText.trim()}
              className={`p-3 rounded-xl ${
                newCommentText.trim() ? "bg-blue-600" : "bg-blue-300"
              }`}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </DraggableSheet>

      {/* SHARE SHEET */}
      <DraggableSheet visible={!!sharePost} onClose={() => setSharePost(null)}>
        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Share Post
          </Text>

          <TouchableOpacity className="flex-row items-center mb-4">
            <Ionicons name="link-outline" size={26} color="#444" />
            <Text className="text-base ml-3 text-gray-900">Copy link</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mb-4">
            <Ionicons name="logo-linkedin" size={26} color="#0a66c2" />
            <Text className="text-base ml-3 text-gray-900">
              Share to LinkedIn
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mb-4">
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color="#444"
            />
            <Text className="text-base ml-3 text-gray-900">
              Share via Messages
            </Text>
          </TouchableOpacity>
        </View>
      </DraggableSheet>

      {/* OPTIONS SHEET (half-screen) */}
      <DraggableSheet
        visible={!!optionsPost}
        onClose={() => setOptionsPost(null)}
        height="half"
      >
        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Post Options
          </Text>

          <TouchableOpacity className="py-4 border-b border-gray-200">
            <Text className="text-base text-gray-900">Not interested</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-4 border-b border-gray-200">
            <Text className="text-base text-gray-900">Report</Text>
          </TouchableOpacity>

          {optionsPost && optionsPost.name !== "You" && (
            <>
              <TouchableOpacity className="py-4 border-b border-gray-200">
                <Text className="text-base text-gray-900">
                  Mute {optionsPost.name}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-4">
                <Text className="text-base text-red-600">
                  Block {optionsPost.name}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </DraggableSheet>
    </View>
  );
};

export default Career;