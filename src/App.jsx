import './styles/App.css'
import Navbar from './components/Navbar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { useEffect } from 'react';


function App() {


  return (
    <>
    <div className='content'>
      <nav id='nav'>
        <Navbar></Navbar>
      </nav>
      <section className='section'>
        <div className="section1">

        </div>
        <div className="section2"></div>
        <div className="section3"></div>
        <div className="section4"></div>
        <div className="section5"></div>
      </section>
    </div>


    </>
  )
}

export default App
