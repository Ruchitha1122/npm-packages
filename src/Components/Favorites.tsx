
import React, { useState } from 'react';
import { useFavorites, Favorite } from '../context/FavoritesContext';
import { useNavigate, Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);
  const [editReason, setEditReason] = useState<string>('');
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);
  const [removePackageName, setRemovePackageName] = useState<string>('');

  const handleRemoveClick = (packageName: string) => {
    setRemovePackageName(packageName);
    setShowRemoveConfirmation(true);
  };

  const handleConfirmRemove = () => {
    if (removePackageName) {
      removeFromFavorites(removePackageName);
      setRemovePackageName('');
      setShowRemoveConfirmation(false);
    }
  };

  const handleCancelRemove = () => {
    setRemovePackageName('');
    setShowRemoveConfirmation(false);
  };

  const handleViewClick = (packageName: string) => {
    const favorite = favorites.find((fav) => fav.packageName === packageName);
    if (favorite) {
      setSelectedFavorite(favorite);
      setEditReason('');
    }
  };

  const handleEditClick = (packageName: string) => {
    const favorite = favorites.find((fav) => fav.packageName === packageName);
    if (favorite) {
      setSelectedFavorite(favorite);
      setEditReason(favorite.reason);
    }
  };

  const handleEditSubmit = () => {
    if (selectedFavorite) {
      
      selectedFavorite.reason = editReason;
     
      setEditReason('');
      setSelectedFavorite(null);
    }
  };

  const handleGoToSearch = () => {
    navigate('/search');
  };

  return (
    <div className="container mx-auto mt-8 p-4 text-center">
     
      <nav className="flex justify-between items-center mb-6 bg-gray-600 text-white p-4 rounded-md">
        <div>
          <Link to="/search">
            <button className="bg-white text-gray-600 p-3 rounded-md hover:bg-gray-700 transition duration-300">
              Home
            </button>
          </Link>
        </div>
        <div className="flex-grow">
          <h1 className="text-4xl font-extrabold">Welcome to Favorites</h1>
        </div>
      </nav>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((favorite, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-md shadow-md flex items-center justify-between"
            >
              <span className="text-lg">{favorite.packageName}</span>
              <div>
                <button
                  onClick={() => handleRemoveClick(favorite.packageName)}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleViewClick(favorite.packageName)}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditClick(favorite.packageName)}
                  className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

     
      {selectedFavorite && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-8 rounded-md">
            <span
              className="close text-2xl cursor-pointer absolute top-2 right-4"
              onClick={() => setSelectedFavorite(null)}
            >
              &times;
            </span>
            {editReason !== '' ? (
             
              <>
                <p className="text-lg">{`Edit the reason for ${selectedFavorite.packageName}`}</p>
                <textarea
                  className="w-full h-24 p-2 border-2 border-gray-300 rounded-md mt-2"
                  onChange={(e) => setEditReason(e.target.value)}
                  value={editReason}
                ></textarea>
                <button
                  className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
                  onClick={handleEditSubmit}
                >
                  Submit
                </button>
              </>
            ) : (
              
              <>
                <p className="text-lg">{`Reason for adding ${selectedFavorite.packageName} to favorites:`}</p>
                <div className="bg-gray-100 p-4 rounded-md mt-2">{selectedFavorite.reason}</div>
                <button
                  className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
                  onClick={() => setSelectedFavorite(null)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      
      {showRemoveConfirmation && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-8 rounded-md">
            <span
              className="close text-2xl cursor-pointer absolute top-2 right-4"
              onClick={handleCancelRemove}
            >
              &times;
            </span>
            <p className="text-lg">{`Are you sure you want to remove ${removePackageName}?`}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                onClick={handleConfirmRemove}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700"
                onClick={handleCancelRemove}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
