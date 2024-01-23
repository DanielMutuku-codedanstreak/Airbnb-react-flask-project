import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    username: '',
    password: ''
  })
  //function to handle change of input data
  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    })
  }
  //function to handle form submit
  const handleSubmit = (e)=>{
    e.preventDefault()
    props.setIsLoggedIn(true)
    navigate('/admin')
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" name='username' onChange={handleChange} value={formData.username} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' onChange={handleChange} value={formData.password} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div>
          {/* nothing here */}
        </div>
      </div>
    </div>
  )
}
