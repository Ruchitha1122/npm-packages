// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Favorites from './Components/Favorites';
import SearchComponent from './Components/SearchComponent';
import { FavoritesProvider } from './context/FavoritesContext';

const App: React.FC = () => {
  return (
    <Router>
      <FavoritesProvider>
        <div>
          <Routes>
            {/* Root route */}
            <Route path="/" element={<SearchComponent />} />

            {/* Other routes */}
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<SearchComponent />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
