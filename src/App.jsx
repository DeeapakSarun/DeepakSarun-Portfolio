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

      </section>
    </div>


    </>
  )
}

export default App
