import React from 'react';

import { $api } from '../../api/Api.jsx';
import PostHomePageModal from './PostHomePageModal';
import styles from './PostHomePageModal.module.css';
import PostItem from './PostItem';

class PostHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [], // список постов
      loading: true, // индикатор загрузки
      error: null, // текст ошибки (если есть)
      likesCounts: {}, // объект для хранения лайков { postId: count }
      followingList: null, // список подписок текущего пользователя
      selectedPost: null, // пост для модалки
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = async () => {
    try {
      const userId = localStorage.getItem('userId'); // id текущего пользователя
      const response = await $api.get('/post/all/public');
      const allPosts = response.data;

      const filteredPosts = allPosts.filter((post) => post.user_id !== userId);

      const shuffledPosts = filteredPosts.sort(() => Math.random() - 0.5);

      const postsWithLastComment = await Promise.all(
        shuffledPosts.map(async (post) => {
          try {
            const commentsResponse = await $api.get(`/comments/${post._id}`);
            const comments = commentsResponse.data || [];
            post.last_comment =
              comments.length > 0
                ? comments[comments.length - 1].comment_text
                : '';
          } catch {
            post.last_comment = 'No comments yet';
          }
          return post;
        })
      );

      const initialLikesCounts = postsWithLastComment.reduce((acc, post) => {
        acc[post._id] = post.likes_count || 0;
        return acc;
      }, {});

      this.setState({
        posts: postsWithLastComment,
        likesCounts: initialLikesCounts,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: 'Ошибка при загрузке постов', loading: false });
    }
  };

  handleLikesCountChange = (postId, newCount) => {
    this.setState((prevState) => ({
      likesCounts: {
        ...prevState.likesCounts,
        [postId]: newCount,
      },
    }));
  };

  openModal = (post) => {
    this.setState({ selectedPost: post });
  };

  closeModal = () => {
    this.setState({ selectedPost: null });
  };

  handleCheckMyFollowing = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const response = await $api.get(`/follow/${user._id}/following`);
      const data = response.data.map((followItem) => followItem.user_id);
      this.setState({
        followingList: [...data],
      });
    } catch (error) {
      console.error('Ошибка при проверке подписки:', error);
    }
  };

  handleRemoveSomeFollow = (userId) => {
    if (this.state.followingList) {
      const newList = this.state.followingList.filter(
        (candidate) => candidate !== userId
      );
      this.setState({ followingList: newList });
    }
  };

  handleAddSomeFollow = (userId) => {
    if (this.state.followingList) {
      this.setState({
        followingList: [...this.state.followingList, userId],
      });
    }
  };

  render() {
    const { posts, loading, error, likesCounts, selectedPost, followingList } =
      this.state;

    if (followingList === null) {
      this.handleCheckMyFollowing();
    }

    if (loading) return <p>loading...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div>
        <ul className={styles.postsContainer}>
          {posts.map((post) => (
            <PostItem
              key={post._id}
              item={post}
              likesCount={likesCounts[post._id] || 0}
              setLikesCount={this.handleLikesCountChange}
              listFollowing={followingList}
              handleRemoveSomeFollow={this.handleRemoveSomeFollow}
              handleAddSomeFollow={this.handleAddSomeFollow}
              onClick={() => this.openModal(post)}
            />
          ))}
        </ul>

        {selectedPost && (
          <PostHomePageModal post={selectedPost} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default PostHomePageModal;
