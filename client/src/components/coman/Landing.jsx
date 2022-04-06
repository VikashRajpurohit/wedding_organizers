import React from 'react'

const Landing = () => {
  return (
<section className="banner layer" id="home" >
  <div className="container">
    <div className="banner-text">
      <div className="slider-info mb-4">
        <div className="banner-heading">
          <h3>
            Your wedding adventure starts here
          </h3>
        </div>
        <a href="contact.html"> Plan Your Wedding</a>
      </div>
      {/* To bottom button*/}
      <div className="thim-click-to-bottom">
        <div className="rotate">
          <a href="#welcome" className="scroll">
            <span className="fa fa-angle-double-down" />
          </a>
        </div>
      </div>
      {/* //To bottom button*/}
    </div>
  </div>
</section>
  )
}

export default Landing