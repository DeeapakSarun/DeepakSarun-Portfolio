import deepakSvg from '/deepak.svg'
import './styles/App.css'
import Navbar from './components/Navbar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { useRef, useEffect } from 'react';


function App() {

  return (
    <>
    <div className='content'>
      <nav className='nav'>
        <Navbar></Navbar>
      </nav>
      <section>
        <div className="section1">
          <h1>Section 1</h1>
        </div>
        <div className="section2">
          <h1>Section 2</h1>
        </div>
        <div className="section3">
          <h1>Section 3</h1>
        </div>
        <div className="section4">
          <h1>Section 4</h1>
        </div>
        <div className="section5">
          <h1>Section 5</h1>
        </div>
      </section>
    </div>


    </>
  )
}

export default App
