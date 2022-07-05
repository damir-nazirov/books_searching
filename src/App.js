import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SearchForm from './features/searchForm/SearchForm';
import SingleBookPage from './features/pages/SingleBookPage';

import './App.css';
import MainPage from './features/pages/MainPage';

function App() {
  return (
    <Router>
      <div className="App">
          <SearchForm/>
                <Routes>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/:title" element={<SingleBookPage/>}/>
                </Routes>   
      </div>
    </Router>
  );
}

export default App;
