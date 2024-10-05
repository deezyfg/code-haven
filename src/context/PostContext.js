import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [joinedUsers, setJoinedUsers] = useState([]);

  const value = {
    joinedUsers,
    setJoinedUsers,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
