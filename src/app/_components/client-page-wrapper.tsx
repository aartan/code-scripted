"use client";

import React from "react";

interface ClientPageWrapperProps {
  children: React.ReactNode;
  imageUrls: string[];
}

// Simplified wrapper that just passes children through
const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default ClientPageWrapper;
