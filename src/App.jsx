import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Likes from './pages/Likes';
import Message from './pages/Message';
import StopForAGame from './pages/StopForAGame';
import FAQ from './pages/FAQ';
import Resume from './pages/Resume';
import CopyRight from './pages/CopyRight';
import Landing from './pages/Landing';


import Header from './components/Header';
import Navbar from './components/Navbar'; 

import './styles/App.css'

const App = () => {
    return (
      <>
        <div className='container'>
          <Landing/>
          <Router>
            <Header/>
            <Navbar />
            <main>
              <Routes>
                  <Route path="/" element={<Profile />} />
                  <Route path="/Feed" element={<Feed />} />
                  <Route path="/Likes" element={<Likes />} />
                  <Route path="/Message" element={<Message />} />
                  <Route path="/StopForAGame" element={<StopForAGame />} />
                  <Route path="/FAQ" element={<FAQ />} />
                  <Route path="/Resume" element={<Resume />} />
                  <Route path="/CopyRight" element={<CopyRight />} />
              </Routes>
            </main>

          </Router>
        </div>
      </>

    );
};

export default App;
