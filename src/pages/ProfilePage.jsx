import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/auth';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <h1>Profile</h1>
          <p>Email: {profile.email}</p>
          <p>Name: {profile.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
