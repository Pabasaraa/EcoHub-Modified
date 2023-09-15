import React from 'react';
// import style from "./styles/contact.form.module.css";
import image from "./styles/img/con1.jpg"

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
  }
  return (
    <div className="container">
  <div className="top" style={{ height: "800px", width: "100%", backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "contain" }}>
  </div>
  <hr></hr>
  <h1 className="mb-3" style={{ color: "#f3613e", fontFamily: "Lucida Console", textAlign: "center", textSizeAdjust: "auto" }}>Get In Touch With Us</h1>
  <h2 className="mb-3" style={{ color: "#78706f", fontFamily: "Arial", textAlign: "center", textSizeAdjust: "auto" }}>Whether it’s a small idea you’ve had in your mind for a while, or a large project for your company, we really need to talk. </h2>
  <br></br>
  <br></br>
  <hr></hr>
  <br></br>
  <div className='bottom' style={{ height: "50%", width: "100%", margin: "auto" }}>
    <div className="contact-info" style={{display: "flex",flexDirection: "column",alignItems: "center",marginBottom: "40px"}}>
      <div className="contact-item"  style={{fontSize:"35px",display: "flex",alignItems: "center",marginBottom: "20px"}}>
        <i className="fa fa-envelope"></i>
        <span>Email:  </span>echohub@gmail.com
      </div>
      <br></br>
      <div className="contact-item"  style={{fontSize:"35px",display: "flex",alignItems: "center",marginBottom: "20px"}}>
        <i className="fa fa-phone"></i>
        <span>Phone:  </span>0705665554
      </div>
      <br></br>
      <div className="contact-item"  style={{fontSize:"35px",display: "flex",alignItems: "center",marginBottom: "20px"}}>
        <i className="fa fa-map-marker"></i>
        <span>Address: </span>No.9, 6/1 Station Rd,Colombo 4.
      </div>
    </div>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input className="form-control" type="text" id="name" required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input className="form-control" type="email" id="email" required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea className="form-control" id="message" required />
      </div>
      <button className="btn btn-danger" type="submit">
        {formStatus}
      </button>
    </form>
  </div>
</div>

  )
}
export default ContactForm