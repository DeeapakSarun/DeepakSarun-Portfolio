import './styles/App.css'
import Waves from './components/Waves';
import Navbar from './components/Navbar'; // Import Navbar
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);



function App() {


  return (
    <>
    <nav id='nav'>
    <Navbar /> 
    </nav>
    <div className='content'>

      <section className='section'>
        <div className="section1">
          <div className='wavecontainer'>
            <Waves
              lineColor="rgb(0, 0, 0)"
              backgroundColor="rgba(255, 255, 255, 0)"
              waveSpeedX={0.06}
              waveSpeedY={0.02}
              waveAmpX={100}
              waveAmpY={120}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={5}
              yGap={3}
            />
          </div>
          <h1>Deepak Sarun</h1>
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
