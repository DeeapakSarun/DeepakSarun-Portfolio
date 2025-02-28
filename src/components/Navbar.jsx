import '../styles/Navbar.css'
function Navbar() {

    return (
      <>
        <div className="navcontainer">
            <div className="linksection">
                <p className='navlink'>Home</p>
                <p className='navlink'>About</p>
            </div>
            <div className="navlogocontainer">
                <img className= "navlogo" src="public/deepak.svg" alt="deepakLogo"/>
            </div>
            <div className="linksection">
                <p className='navlink'>Projects</p>
                <p className='navlink'>Contact</p>
            </div>

        </div>
      </>
    )
  }
  
  export default Navbar