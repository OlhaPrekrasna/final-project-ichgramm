import React, { useRef } from 'react';
import s from './EditProfileForm.module.css';
import noPhoto from '../../../assets/noPhoto.png';

const EditProfileForm = ({
  user,
  onChange,
  onSubmit,
  isSubmitting,
  onPhotoChange,
}) => {
  const { username, bio_website, bio } = user;
  const fileInputRef = useRef(null);

  const handleBioChange = (e) => {
    if (e.target.value.length <= 150) {
      onChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onPhotoChange(file);
    }
    e.target.value = '';
  };

  return (
    <form className={s.editProfileForm} onSubmit={handleSubmit}>
      <h1 className={s.title}>Edit profile</h1>

      {/* Profile Image Section */}
      <div className={s.imageSection}>
        <img
          src={user.profile_photo || noPhoto}
          alt="Profile"
          className={s.profileImage}
        />
        <div className={s.userInfo}>
          <div className={s.username}>{user.username}</div>
          <div className={s.userBio}>{user.bio}</div>
          <button
            type="button"
            className={s.uploadButton}
            onClick={handleUploadClick}
          >
            New photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className={s.fileInput}
          />
        </div>
      </div>

      <div className={s.separator}></div>

      {/* Username Field */}
      <div className={s.formSection}>
        <label className={s.label}>
          <span className={s.labelTitle}>Username</span>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            className={s.inputField}
          />
        </label>
      </div>

      <div className={s.separator}></div>

      {/* Website Field */}
      <div className={s.formSection}>
        <label className={s.label}>
          <span className={s.labelTitle}>Website</span>
          <input
            type="text"
            name="bio_website"
            value={bio_website}
            onChange={onChange}
            className={s.inputField}
          />
        </label>
      </div>

      <div className={s.separator}></div>

      {/* Bio Field */}
      <div className={s.formSection}>
        <label className={s.label}>
          <span className={s.labelTitle}>About</span>
          <textarea
            name="bio"
            value={bio}
            onChange={handleBioChange}
            className={s.textareaField}
            maxLength={150}
          />
          <div className={s.charCount}>{bio.length} / 150</div>
        </label>
      </div>

      <div className={s.separator}></div>

      {/* Save Button */}
      <button type="submit" className={s.saveButton} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default EditProfileForm;
