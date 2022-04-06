import React from 'react'

const Footer = () => {
  return (
  <footer>
    <div className="container py-5">
      <div className="row footer-gap">
        <div className="col-lg-4 col-sm-6">
          <h3 className="text-capitalize mb-3">Address</h3>
          <address className="mb-0">
            <p className><span className="fa fa-map-marker" /> 2466H 5th Street Parking, King <br />Block, New York City.</p>
            <p><span className="fa fa-clock-o" /> Timings : 10 a.m to 6 p.m</p>
            <p><span className="fa fa-phone" /> +12 8976 2334</p>
            <p><span className="fa fa-envelope-open" /> <a href="mailto:info@example.com">info@example.com</a></p>
          </address>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-sm-0 mt-4 p-md-0">
          <h3 className="text-capitalize mb-4">Meanwhile On Instagram</h3>
          <div className="images">
            <a className="pr-2" href="#"> <img src="images/insta1.jpg" alt className="img-fluid" /> </a>
            <a className="pr-2" href="#"> <img src="images/insta2.jpg" alt className="img-fluid" /> </a>
            <a className="pr-2" href="#"> <img src="images/insta3.jpg" alt className="img-fluid" /> </a>
            <a className="pr-2" href="#"> <img src="images/insta4.jpg" alt className="img-fluid" /> </a>
            <a className="pr-2" href="#"> <img src="images/insta5.jpg" alt className="img-fluid" /> </a>
            <a className="mt-2 pr-2" href="#"> <img src="images/insta6.jpg" alt className="img-fluid" /> </a>
            <a className="mt-2 pr-2" href="#"> <img src="images/insta7.jpg" alt className="img-fluid" /> </a>
            <a className="mt-2 pr-2" href="#"> <img src="images/insta8.jpg" alt className="img-fluid" /> </a>
            <a className="mt-2 pr-2" href="#"> <img src="images/insta9.jpg" alt className="img-fluid" /> </a>
            <a className="mt-2 pr-2" href="#"> <img src="images/insta1.jpg" alt className="img-fluid" /> </a>
          </div>	
        </div>
        <div className="col-lg-3 offset-lg-1 col-sm-6 mt-lg-0 mt-sm-5 mt-4">
          <h3 className="text-capitalize mb-3"> Follow us</h3>
          <p className="mb-4">Follow us on social media</p>
          <ul className="social mt-lg-0 mt-3">
            <li className="mr-1"><a href="#"><span className="fa fa-facebook" /></a></li>
            <li className="mr-1"><a href="#"><span className="fa fa-twitter" /></a></li>
            <li className="mr-1"><a href="#"><span className="fa fa-google-plus" /></a></li>
            <li className><a href="#"><span className="fa fa-linkedin" /></a></li>
            <li className="mr-1"><a href="#"><span className="fa fa-rss" /></a></li>
          </ul>
        </div>
      </div>
    </div>
    
  </footer>
  )
}

export default Footer