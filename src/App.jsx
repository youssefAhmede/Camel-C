import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav1 from './Nav1';
import Footer from './Footer';
import './App.css';
import './dark_mode.css';
import Home from './Home.jsx'
import { Navigate } from 'react-router-dom';
import ItemDetail from './ItemDetail.jsx';
import ArticleDetail from './ArticleDetail.jsx';


const App = () => {
  const [items, setItems] = useState([]);

  return (
    <Router>
      <div>
        <Nav1 />
        <NavContent items={items} />
      </div>
    </Router>
  );
};

const NavContent = ({ items }) => {
  return (
    <div>

      <div className="content-container">

        <div className="main-content-container">
          <main className="main-content">
            <Routes>
              
                  <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
              <Route path="/:type" element={<ItemDetail />} />
              {/* <Route path="/article/:id" element={<ArticleDetail />} /> */}
              <Route path="/:type/:id" element={<ArticleDetail />} /> 
              
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App ;