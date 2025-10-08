// исправленный вариант для создания поста

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ImageForm.module.css';
import { $api } from '../../../api/Api.jsx';
import noPhoto from '../../../assets/noPhoto.png';
import placeCreate from '../../../assets/place-create.svg';

const ImageForm = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const currentUser = useSelector((state) => state.auth.user);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePath(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadStatus('Please select an image first');
      return;
    }

    if (!currentUser) {
      setUploadStatus('User not authenticated');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Creating post...');

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('caption', caption);
      formData.append('user_id', currentUser._id);
      formData.append('user_name', currentUser.username);

      const response = await $api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setUploadStatus('Post created successfully!');
        setTimeout(() => {
          closeModal();
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setUploadStatus('Failed to create post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  return (
    <div className={styles.modalContainer}>
      {/* Header */}
      <div className={styles.modalHeader}>
        <button 
          type="button" 
          className={styles.backButton}
          onClick={closeModal}
        >
          ←
        </button>
        <h2 className={styles.modalTitle}>Create new post</h2>
        <button
          type="submit"
          form="postForm"
          className={styles.shareButton}
          disabled={isUploading || !file}
        >
          {isUploading ? 'Sharing...' : 'Share'}
        </button>
      </div>

      {/* Content */}
      <div className={styles.modalContent}>
        {!file ? (
          // Upload area - shown when no image is selected
          <div 
            className={styles.uploadArea}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.uploadContent}>
              <img 
                src={placeCreate} 
                alt="Upload" 
                className={styles.uploadIcon}
              />
              <p className={styles.uploadText}>Drag photos and videos here</p>
              <label htmlFor="fileInput" className={styles.fileInputLabel}>
                Select from computer
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
            </div>
          </div>
        ) : (
          // Edit area - shown when image is selected
          <div className={styles.editArea}>
            <div className={styles.imagePreview}>
              <img 
                src={filePath} 
                alt="Preview" 
                className={styles.previewImage}
              />
            </div>
            
            <div className={styles.captionSection}>
              <div className={styles.userInfo}>
                <img
                  src={currentUser?.profile_image || noPhoto}
                  alt={currentUser?.username}
                  className={styles.userAvatar}
                />
                <span className={styles.username}>{currentUser?.username}</span>
              </div>
              
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={styles.captionInput}
                rows="4"
                maxLength="2200"
              />
              
              <div className={styles.captionInfo}>
                <span className={styles.charCount}>{caption.length}/2,200</span>
              </div>
            </div>
          </div>
        )}

        {/* Status message */}
        {uploadStatus && (
          <div className={`${styles.statusMessage} ${
            uploadStatus.includes('successfully') ? styles.success : styles.error
          }`}>
            {uploadStatus}
          </div>
        )}
      </div>

      {/* Hidden form for submission */}
      <form id="postForm" onSubmit={handleSubmit} className={styles.hiddenForm} />
    </div>
  );
};

export default ImageForm;




// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import styles from './ImageForm.module.css';
// import { $api } from '../../../api/Api.jsx';
// import noPhoto from '../../../assets/noPhoto.png';
// import placeCreate from '../../../assets/place-create.svg';

// const ImageForm = ({ closeModal }) => {
//   const [file, setFile] = useState(null);
//   const [filePath, setFilePath] = useState('');
//   const [caption, setCaption] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState('');

//   const currentUser = useSelector((state) => state.auth.user);

//   const handleFileChange = (e) => {
//     if (e.target.files?.[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       setFilePath(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!file) {
//       setUploadStatus('Please select an image first');
//       return;
//     }

//     if (!currentUser) {
//       setUploadStatus('User not authenticated');
//       return;
//     }

//     setIsUploading(true);
//     setUploadStatus('Creating post...');

//     try {
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('caption', caption);
//       formData.append('user_id', currentUser._id);
//       formData.append('user_name', currentUser.username);

//       const response = await $api.post('/posts', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 201) {
//         setUploadStatus('Post created successfully!');
//         setTimeout(() => {
//           closeModal();
//         }, 1500);
//       }
//     } catch (error) {
//       console.error('Error creating post:', error);
//       setUploadStatus('Failed to create post. Please try again.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFileChange({ target: { files } });
//     }
//   };

//   return (
//     <div className={styles.modalContainer}>
//       {/* Header */}
//       <div className={styles.modalHeader}>
//         <button 
//           type="button" 
//           className={styles.backButton}
//           onClick={closeModal}
//         >
//           ←
//         </button>
//         <h2 className={styles.modalTitle}>Create new post</h2>
//         <button
//           type="submit"
//           form="postForm"
//           className={styles.shareButton}
//           disabled={isUploading || !file}
//         >
//           {isUploading ? 'Sharing...' : 'Share'}
//         </button>
//       </div>

//       {/* Content */}
//       <div className={styles.modalContent}>
//         {!file ? (
//           // Upload area - shown when no image is selected
//           <div 
//             className={styles.uploadArea}
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//           >
//             <div className={styles.uploadContent}>
//               <img 
//                 src={placeCreate} 
//                 alt="Upload" 
//                 className={styles.uploadIcon}
//               />
//               <p className={styles.uploadText}>Drag photos and videos here</p>
//               <label htmlFor="fileInput" className={styles.fileInputLabel}>
//                 Select from computer
//               </label>
//               <input
//                 id="fileInput"
//                 type="file"
//                 accept="image/*"
//                 className={styles.fileInput}
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//         ) : (
//           // Edit area - shown when image is selected
//           <div className={styles.editArea}>
//             <div className={styles.imagePreview}>
//               <img 
//                 src={filePath} 
//                 alt="Preview" 
//                 className={styles.previewImage}
//               />
//             </div>
            
//             <div className={styles.captionSection}>
//               <div className={styles.userInfo}>
//                 <img
//                   src={currentUser?.profile_image || noPhoto}
//                   alt={currentUser?.username}
//                   className={styles.userAvatar}
//                 />
//                 <span className={styles.username}>{currentUser?.username}</span>
//               </div>
              
//               <textarea
//                 placeholder="Write a caption..."
//                 value={caption}
//                 onChange={(e) => setCaption(e.target.value)}
//                 className={styles.captionInput}
//                 rows="4"
//                 maxLength="2200"
//               />
              
//               <div className={styles.captionInfo}>
//                 <span className={styles.charCount}>{caption.length}/2,200</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Status message */}
//         {uploadStatus && (
//           <div className={`${styles.statusMessage} ${
//             uploadStatus.includes('successfully') ? styles.success : styles.error
//           }`}>
//             {uploadStatus}
//           </div>
//         )}
//       </div>

//       {/* Hidden form for submission */}
//       <form id="postForm" onSubmit={handleSubmit} className={styles.hiddenForm} />
//     </div>
//   );
// };

// export default ImageForm;

