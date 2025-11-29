import React, { useEffect, useState } from "react";
import { View, ScrollView, RefreshControl, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ShareBox from "@/components/features/jobseeker/career/ShareBox";
import PostCard from "@/components/features/jobseeker/career/PostCard";
import CreatePostModal from "@/components/features/jobseeker/career/CreatePostModal";
import CommentsSheet from "@/components/features/jobseeker/career/CommentsSheet";
import ShareSheet from "@/components/features/jobseeker/career/ShareSheet";
import OptionsSheet from "@/components/features/jobseeker/career/OptionsSheet";

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
};

type Comment = {
  id: number;
  author: string;
  text: string;
  time: string;
};

// ---- Mock Data ----
const initialPosts: Post[] = [
  {
    id: 1,
    name: "Maria Santos",
    position: "Software Engineer at TechCorp",
    time: "2 hours ago",
    text:
      "Just landed my dream job as a Senior Software Engineer! 🎉 Persistence pays off.",
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
    text: "Completed my UI/UX certification today!!",
    tags: ["UXDesign", "CareerChange", "Learning"],
    likes: 189,
    commentsCount: 24,
    shares: 8,
    isLiked: false,
    isSaved: false,
  },
];

const initialComments: Record<number, Comment[]> = {
  1: [
    { id: 1, author: "HR Recruiter", text: "Congrats Maria! 👏", time: "1 hour ago" },
  ],
  2: [
    { id: 1, author: "Design Lead", text: "Proud of you!", time: "3 hours ago" },
  ],
};

// =====================================================
//                 CAREER SCREEN
// =====================================================

const Career = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // NEW POST
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  // COMMENTS
  const [activePostForComments, setActivePostForComments] = useState<Post | null>(null);
  const [commentsByPost, setCommentsByPost] = useState(initialComments);
  const [newCommentText, setNewCommentText] = useState("");

  // SHARE
  const [sharePost, setSharePost] = useState<Post | null>(null);

  // OPTIONS
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
    }, 600);
  };

  // LIKE TOGGLE
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

  // SAVE TOGGLE
  const toggleSave = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  };

  // CREATE POST
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

  // ADD COMMENT
  const addComment = () => {
    if (!activePostForComments || !newCommentText.trim()) return;

    const postId = activePostForComments.id;

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      text: newCommentText,
      time: "Just now",
    };

    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [comment, ...(prev[postId] || [])],
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

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

        {/* SHARE BOX */}
        <ShareBox onPress={() => setPostModalVisible(true)} />

        {/* NEW POST BUTTON */}
        <TouchableOpacity
          onPress={() => setPostModalVisible(true)}
          className="w-full bg-brandBlue py-3 rounded-lg flex-row justify-center items-center mb-6"
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text className="text-white font-semibold text-base ml-1">New Post</Text>
        </TouchableOpacity>

        {/* POSTS */}
        {!loading &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOptions={() => setOptionsPost(post)}
              onLike={() => toggleLike(post.id)}
              onComment={() => setActivePostForComments(post)}
              onShare={() => setSharePost(post)}
              onSave={() => toggleSave(post.id)}
            />
          ))}
      </ScrollView>

      {/* CREATE POST MODAL */}
      <CreatePostModal
        visible={postModalVisible}
        onClose={() => setPostModalVisible(false)}
        newPostText={newPostText}
        newPostTags={newPostTags}
        setNewPostText={setNewPostText}
        setNewPostTags={setNewPostTags}
        attachedImage={attachedImage}
        onAttachImage={() => setAttachedImage("placeholder")}
        onSubmit={createPost}
      />

      {/* COMMENTS SHEET */}
      <CommentsSheet
        post={activePostForComments}
        comments={
          activePostForComments
            ? commentsByPost[activePostForComments.id]
            : []
        }
        visible={!!activePostForComments}
        onClose={() => setActivePostForComments(null)}
        newCommentText={newCommentText}
        setNewCommentText={setNewCommentText}
        onSubmit={addComment}
      />

      {/* SHARE SHEET */}
      <ShareSheet visible={!!sharePost} onClose={() => setSharePost(null)} />

      {/* OPTIONS SHEET */}
      <OptionsSheet
        post={optionsPost}
        visible={!!optionsPost}
        onClose={() => setOptionsPost(null)}
      />
    </View>
  );
};

export default Career;