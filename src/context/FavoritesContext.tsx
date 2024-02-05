import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface Favorite {
  packageName: string;
  reason: string;
}

interface FavoritesContextProps {
  favorites: Favorite[];
  setFavorites: Dispatch<SetStateAction<Favorite[]>>; // Ensure the correct types are imported
  addToFavorites: (packageName: string, reason: string) => void;
  removeFromFavorites: (packageName: string) => void;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const addToFavorites = (packageName: string, reason: string) => {
    const newFavorite: Favorite = { packageName, reason };
    setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  };

  const removeFromFavorites = (packageName: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.packageName !== packageName);
    setFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};