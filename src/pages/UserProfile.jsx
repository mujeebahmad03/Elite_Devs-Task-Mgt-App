import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfileForm from '../component/EditProfile';
import { updateProfile } from '../slice/authTaskSlice';

function UserProfile() {
  const dispatch = useDispatch();
  
  // Assuming you have a Redux slice named 'auth' that stores user information
  const user = useSelector((state) => state.authTasks.user);

  // State for managing user profile data
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '', // Use optional chaining and provide a default value
    lastName: user?.lastName || '',
    email: user?.email || '',
    // Add other user profile fields here
  });

  // State for controlling edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle profile updates
  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // Dispatch an action to update the user's profile in Redux state
    dispatch(updateProfile(profileData));

    // Close the edit profile form or perform any other necessary actions
    setIsEditing(false);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    // Update profileData when user changes, but only if not in edit mode
    if (!isEditing) {
      setProfileData({
        firstName: user?.firstName || '', // Use optional chaining and provide a default value
        lastName: user?.lastName || '',
        email: user?.email || '',
        // Update with other user profile fields if needed
      });
    }
  }, [user, isEditing]);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      {isEditing ? (
        // Render an edit profile form when in edit mode
        <EditProfileForm
          profileData={profileData}
          setProfileData={setProfileData}
          onSave={handleProfileUpdate}
          onCancel={toggleEditMode}
        />
      ) : (
        // Display user information when not in edit mode
        <div>
          <p>
            <strong>First Name:</strong> {profileData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {profileData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          {/* Display other user profile information */}
        </div>
      )}

      <button onClick={toggleEditMode}>
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>

      {isEditing && (
        <button onClick={handleProfileUpdate}>Save Changes</button>
      )}
    </div>
  );
}

export default UserProfile;
