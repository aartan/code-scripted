"use client";

import React from "react";

interface PostClientWrapperProps {
  children: React.ReactNode;
  imageUrl: string;
}

// Simplified wrapper that just passes children through
const PostClientWrapper: React.FC<PostClientWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default PostClientWrapper;
