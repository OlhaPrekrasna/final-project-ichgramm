import React from 'react';
import Menu from '../../ui/menu/Menu.jsx';
import PostItem from '../../ui/postsHomePage/PostItem.jsx';
import styles from './PostHomePage.module.css';

const PostHomePage = ({ posts = [] }) => {
  // Если posts не передан, по умолчанию это будет пустой массив []

  return (
    <div className={styles.pageWrapper}>
      <aside className={styles.sidebar}>
        <Menu />
      </aside>

      <main className={styles.feed}>
        <ul className={styles.postsList}>
          {posts.length > 0 ? (
            posts.map((item) => (
              <PostItem
                key={item._id || item.id} // добавил fallback на случай, если нет _id
                item={item}
                likesCount={item.likes || 0}
              />
            ))
          ) : (
            <li className={styles.emptyState}>Нет постов для отображения</li>
          )}
        </ul>
      </main>
    </div>
  );
};

export default PostHomePage;








// import React from 'react';

// import { $api } from '../../../api/Api.jsx';
// import PostHomePageModal from './PostHomePageModal';
// import styles from './PostHomePageModal.module.css';
// import PostItem from './PostItem';

// class PostHomePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: [], // список постов
//       loading: true, // индикатор загрузки
//       error: null, // текст ошибки (если есть)
//       likesCounts: {}, // объект для хранения лайков { postId: count }
//       followingList: null, // список подписок текущего пользователя
//       selectedPost: null, // пост для модалки
//     };
//   }

//   componentDidMount() {
//     this.getAllPosts();
//   }

//   getAllPosts = async () => {
//     try {
//       const userId = localStorage.getItem('userId'); // id текущего пользователя
//       const response = await $api.get('/posts');
//       const allPosts = response.data;

//       const filteredPosts = allPosts.filter((post) => post.user_id !== userId);

//       const shuffledPosts = filteredPosts.sort(() => Math.random() - 0.5);

//       const postsWithLastComment = await Promise.all(
//         shuffledPosts.map(async (post) => {
//           try {
//             const commentsResponse = await $api.get(`/comments/${post._id}`);
//             const comments = commentsResponse.data || [];
//             post.last_comment =
//               comments.length > 0
//                 ? comments[comments.length - 1].comment_text
//                 : '';
//           } catch {
//             post.last_comment = 'No comments yet';
//           }
//           return post;
//         })
//       );

//       const initialLikesCounts = postsWithLastComment.reduce((acc, post) => {
//         acc[post._id] = post.likes_count || 0;
//         return acc;
//       }, {});

//       this.setState({
//         posts: postsWithLastComment,
//         likesCounts: initialLikesCounts,
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({ error: 'Ошибка при загрузке постов', loading: false });
//     }
//   };

//   handleLikesCountChange = (postId, newCount) => {
//     this.setState((prevState) => ({
//       likesCounts: {
//         ...prevState.likesCounts,
//         [postId]: newCount,
//       },
//     }));
//   };

//   openModal = (post) => {
//     this.setState({ selectedPost: post });
//   };

//   closeModal = () => {
//     this.setState({ selectedPost: null });
//   };

//   handleCheckMyFollowing = async () => {
//     const user = JSON.parse(localStorage.getItem('user') || null);

//     if (user === null) {
//       return;
//     }

//     try {
//       const response = await $api.get(`/follow/${user._id}/following`);
//       const data = response.data.map((followItem) => followItem.user_id);
//       this.setState({
//         followingList: [...data],
//       });
//     } catch (error) {
//       console.error('Ошибка при проверке подписки:', error);
//     }
//   };

//   handleRemoveSomeFollow = (userId) => {
//     if (this.state.followingList) {
//       const newList = this.state.followingList.filter(
//         (candidate) => candidate !== userId
//       );
//       this.setState({ followingList: newList });
//     }
//   };

//   handleAddSomeFollow = (userId) => {
//     if (this.state.followingList) {
//       this.setState({
//         followingList: [...this.state.followingList, userId],
//       });
//     }
//   };

//   render() {
//     const { posts, loading, error, likesCounts, selectedPost, followingList } =
//       this.state;

//     if (followingList === null) {
//       this.handleCheckMyFollowing();
//     }

//     if (loading) return <p>loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//       <div>
//         {!posts ? (
//           <div>Oops, no posts were found!</div>
//         ) : (
//           <ul className={styles.postsContainer}>
//             {posts.map((post) => (
//               <PostItem
//                 key={post._id}
//                 item={post}
//                 likesCount={likesCounts[post._id] || 0}
//                 setLikesCount={this.handleLikesCountChange}
//                 listFollowing={followingList}
//                 handleRemoveSomeFollow={this.handleRemoveSomeFollow}
//                 handleAddSomeFollow={this.handleAddSomeFollow}
//                 onClick={() => this.openModal(post)}
//               />
//             ))}
//           </ul>
//         )}

//         {selectedPost && (
//           <PostHomePageModal post={selectedPost} onClose={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }

// export default PostHomePage;
