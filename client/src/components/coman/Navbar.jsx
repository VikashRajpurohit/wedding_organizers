import React from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Navbar = () => {
  return (
    <div class="gradient-text" style={{backgroundImage: "linear-gradient(45deg, #CA4246 16.666%,  #E16541 16.666%,  #E16541 33.333%, #F18F43 33.333%, #F18F43 50%, #8B9862 50%, #8B9862 66.666%, #476098 66.666%, #476098 83.333%, #A7489B 83.333%)"}} >
     
  <div className="container">
    <section className="row top_header pt-3">
      <div className="col-lg-6 buttons ml-auto">
        <p><span className="fa fa-phone" /> +12 8976 2334</p>
        <Link className="btn btn-info btn-lg-block w3ls-btn px-sm-4 px-3 text-capitalize mr-sm-2" to="/login">Login</Link>
        <Link className="btn btn-info1 btn-lg-block w3ls-btn1 px-sm-4 px-3 text-capitalize" to="/register">Register</Link>
      </div>
    </section>
    <nav className="py-3">
      <div id="logo">
        <h1>
          <Link className="navbar-brand" to="/"> <span className="fa fa-empire" />Wedding <span><span className="line" />Organizer</span>
          </Link>
        </h1>
      </div>
      <label htmlFor="drop" className="toggle"><span className="fa fa-bars" /></label>
      <input type="checkbox" id="drop" />
      <ul className="menu mt-2">
        <li className="mr-lg-3 mr-2 active"><Link to="/">Home</Link></li>
        <li className="mr-lg-3 mr-2"><Link to="/about">About Us</Link></li>
        <li className="mr-lg-3 mr-2"><Link to="/Services">Services</Link></li>
        <li className="mr-lg-3 mr-2"><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  </div>


</div>
  )
}

export default Navbar