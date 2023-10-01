import React from "react";

interface HeaderProps {
  email: string | undefined;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ email, onLogout }) => {
  return (
    <header className="bg-primary-900 p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center">
        <span className="text-white text-lg font-semibold">
          Book Management System
        </span>
      </div>
      <div className="flex flex-col md:flex-row  items-center">
        <span className="text-white mr-4 text-sm">{email}</span>
        <button
          className="bg-white text-sm font-semibold text-primary-900 px-4 py-2 rounded-lg hover:bg-primary-500 hover:text-white transition duration-300"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
