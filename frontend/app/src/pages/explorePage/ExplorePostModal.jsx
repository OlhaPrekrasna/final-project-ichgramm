import React from 'react';
import PostHomePageModal from '../../components/ui/postsHomePage/PostHomePageModal.jsx';

const ExplorePostModal = ({ post, isOpen, onClose }) => {
  if (!isOpen) return null;

  return <PostHomePageModal post={post} onClose={onClose} />;
};

export default ExplorePostModal;
