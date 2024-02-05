
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchNpmPackages } from '../services/npmApi';
import { useFavorites } from '../context/FavoritesContext';
import { FaSearch, FaHeart, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { addToFavorites, favorites } = useFavorites();

  const isAlreadyInFavorites = (packageName: string) => {
    return favorites.some((fav) => fav.packageName === packageName);
  };

  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [reason, setReason] = useState<string>('');

  const handleSearch = async () => {
    try {
      const result = await searchNpmPackages(query);
      setSearchResults(result.results);
    } catch (error) {
      // Handle error appropriately
    }
  };

  const handleAddToFavorites = (pkg: any) => {
    const packageName = pkg.package.name;

    if (isAlreadyInFavorites(packageName)) {
      alert(`${packageName} is already in your favorites!`);
    } else {
      setSelectedPackage(pkg);
    }
  };

  const handleReasonSubmit = () => {
    if (selectedPackage && reason.trim() !== '') {
      addToFavorites(selectedPackage.package.name, reason);
      toast.success(`${selectedPackage.package.name} added to favorites!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setSelectedPackage(null);
      setReason('');
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-gray-200 rounded-md shadow-md">
      
      <nav className="flex justify-between items-center mb-6 bg-gray-600 text-white p-4 rounded-md">
        <div>
          <h1 className="text-4xl font-extrabold">NPM Packages</h1>
          <p className="text-lg">Discover and manage your favorite NPM packages</p>
        </div>
        <div>
          <Link to="/favorites">
            <button className="bg-white text-gray-600 p-3 rounded-md hover:bg-gray-700 transition duration-300">
              View Favorites <FaArrowRight />
            </button>
          </Link>
        </div>
      </nav>

      
      <div className="flex items-center mb-6">
        <input
          className="w-full lg:w-120 border-2 border-gray-300 p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for NPM packages"
        />
        <button
          className="bg-gray-600 text-white p-3 rounded-r-md hover:bg-gray-700 transition duration-300"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-600">Search Results:</h2>
        <ul>
          {searchResults.map((pkg: any) => (
            <li key={pkg.package.name} className="mb-6 bg-white p-6 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-600">{pkg.package.name}</span>
                <button
                  className="bg-green-500 text-white p-3 rounded-md hover:bg-green-700 transition duration-300"
                  onClick={() => handleAddToFavorites(pkg)}
                >
                  <FaHeart /> Add to Favorites
                </button>
              </div>
              <p className="text-gray-600 mt-2">{pkg.package.description}</p>
            </li>
          ))}
        </ul>
      </div>

      
      {selectedPackage && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-8 rounded-md">
            <span
              className="close text-2xl cursor-pointer absolute top-2 right-4"
              onClick={() => setSelectedPackage(null)}
            >
              &times;
            </span>
            <p className="text-lg">{`Why is ${selectedPackage.package.name} your favorite?`}</p>
            <textarea
              className="w-full h-24 p-2 border-2 border-gray-300 rounded-md mt-2"
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
              onClick={handleReasonSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
