import React from 'react'

const Login = () => {
  return (
    <div className='demos'> 
    <div id="login-popup" className="popup-effect" style={{display:"grid",placeItems:"center",margin:"2em auto",padding:"3em 2em",zIndex:"999",backgroundColor:"white"}}>
      <div className="popup">
        <h5 className="modal-title text-uppercase">Login</h5>
        <div className="login-form">
          <form action="#" method="post" className="px-3 pt-3 pb-0">
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">User Name</label>
              <input type="email" className="form-control" placeholder name="Name" id="recipient-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name1" className="col-form-label">Password</label>
              <input type="password" className="form-control" placeholder name="Name" id="recipient-name1" required />
            </div>
            <div className="right-w3l">
              <input type="submit" className="form-control" defaultValue="Login" />
            </div>
          </form>
        </div>
        <a className="close" href="#"></a>
      </div>
    </div> 
    </div>   
     )
}

export default Login