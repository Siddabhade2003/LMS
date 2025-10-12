// UserProfile.js
import React from 'react';

function UserProfile({ user }) {
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserProfile;
