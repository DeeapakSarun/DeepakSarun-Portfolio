import deepakSvg from '/deepak.svg'
import './styles/App.css'
import Navbar from './components/Navbar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { useEffect } from 'react';
import TextPressure from './components/TextPressure';

function App() {


  return (
    <>
    <div className='content'>
      <nav id='nav'>
        <Navbar></Navbar>
      </nav>
      <section className='section'>
        <div className="section1">

          <TextPressure
              text="Deepak   Sarun"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={50}
          />
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
          <div className="AvatarContainer">
          <img className="Avatar" src="public/deepak.png" alt="deepakLogo" />
          </div>
          <h1>Section 5</h1>
        </div>
      </section>
    </div>


    </>
  )
}

export default App
