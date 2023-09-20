/* eslint-disable react/prop-types */

function EditProfileForm({ profileData, setProfileData, onSave, toggleEditMode }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-profile-form">
      <h3>Edit Profile</h3>
      <form onSubmit={onSave}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more profile fields here */}
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={toggleEditMode}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
