import React from 'react'

const Registration = () => {
  return (  
    <>
<div id="register-popup" className="popup-effect" style={{display:"grid",placeItems:"center",margin:"2em auto",padding:"3em 2em",zIndex:"999",backgroundColor:"white"}}>
  <div className="popup">
    <h5 className="modal-title text-uppercase">Register</h5>
    <div className="lregister-form">
      <form action="#" method="post" className="px-3 pt-3 pb-0">
        <div className="form-group">
          <label htmlFor="recipient-name" className="col-form-label">First Name</label>
          <input type="text" className="form-control" placeholder name="Name" id="recipient-name2" required />
        </div>
        <div className="form-group">
          <label htmlFor="recipient-name" className="col-form-label">Last Name</label>
          <input type="text" className="form-control" placeholder name="Name" id="recipient-name3" required />
        </div>
        <div className="form-group">
          <label htmlFor="recipient-name" className="col-form-label">Email id</label>
          <input type="email" className="form-control" placeholder name="Name" id="recipient-name4" required />
        </div>
        <div className="form-group">
          <label htmlFor="recipient-name" className="col-form-label">Mobile Number</label>
          <input type="text" className="form-control" placeholder name="Name" id="recipient-name5" required />
        </div>
        <div className="form-group">
          <label htmlFor="recipient-name1" className="col-form-label">Password</label>
          <input type="password" className="form-control" placeholder name="Name" id="recipient-name6" required />
        </div>
        <div className="right-w3l">
          <input type="submit" className="form-control" defaultValue="Get Started" />
        </div>
      </form>
    </div>
  </div>
</div>
</>
  )
}

export default Registration