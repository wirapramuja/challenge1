'use client';

import React from 'react';
import Link from 'next/link';

import '../user/profile.css';
import { FiLogOut } from 'react-icons/fi';

interface UserProfileProps {
  user: { email: string } | null;
  handleLogout: () => void;
}

const UserProfile = ({ user, handleLogout }: UserProfileProps) => {
  return (
    <div className="user-profile">
      {user ? (
        <div className="flex items-center gap-2">
          {/* Display the user's email */}
          <img src="/profile_pic.png" className="profile-pic" alt="" />
          <span className="text-sm text-gray-700">{user.email}</span>

          <button
            onClick={handleLogout}
            className="ml-2 text-gray-700 hover:text-black"
            aria-label="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      ) : (
        <Link href="/login">
          <button>Login!</button>
        </Link>
      )}
    </div>
  );
};

export default UserProfile;
