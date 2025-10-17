import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser?.fullName || '');
  const [bio, setBio] = useState(authUser?.bio || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If no new image is selected
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio });
        toast.success('Profile updated successfully!');
        navigate('/');
        return;
      }

      // Read the selected image as Base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        const base64Image = reader.result;
        await updateProfile({ profilePic: base64Image, fullName: name, bio });
        toast.success('Profile updated successfully!');
        navigate('/');
      };
      reader.onerror = () => {
        toast.error('Failed to read image file');
      };
    } catch (error) {
      toast.error('Something went wrong while updating profile');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg font-semibold text-white">Profile Details</h3>

          {/* Avatar Upload */}
          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpeg, .jpg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.avatar_icon
              }
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border border-gray-500"
            />
            <span className="text-sm text-gray-400 hover:text-white transition">
              Upload profile image
            </span>
          </label>

          {/* Name */}
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent text-white"
          />

          {/* Bio */}
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent text-white"
            rows={4}
          ></textarea>

          {/* Save Button */}
          <button
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer hover:opacity-90 transition"
            type="submit"
          >
            Save
          </button>
        </form>

        {/* Profile Preview */}
        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover border-2 border-gray-500"
          src={
            selectedImg
              ? URL.createObjectURL(selectedImg)
              : authUser?.profilePic || assets.logo_icon
          }
          alt="profile"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
