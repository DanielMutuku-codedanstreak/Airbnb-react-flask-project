import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'

export const UserContext = createContext()

export default function UserProvider({children}) {

   const navigate = useNavigate()
   const [loggedIn, setLoggedIn] = useState(false)
   
   //Registration

   function registerUser(name, email, phone, password, userType) {
      {
         fetch("/register",{
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                  name:name,
                  email:email,
                  phone:phone,
                  password:password,
                  user_type:userType })
 
         }
         )
         .then(res => res.json())
         .then(response => {
             
             Swal.fire({
             position: "top-end",
             icon: "success",
             title: response.success,
             showConfirmButton: false,
             timer: 1500
             });
             navigate('/login')
            
         })
         .catch(error => {
            Swal.fire({
               icon: "error",
               title: response.error,
               text: "Something went wrong!",
            });
            
         });
     }
   }
   
   // Login
   function login(email, password)
    {
        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password })

        }
        )
        .then(res => res.json())
        .then(response => {
            
            if (response.access_token)
            {
                navigate("/")
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login success",
                showConfirmButton: false,
                timer: 1500
                });
                setLoggedIn(true)
                
            }
            else{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.error,
                    showConfirmButton: false,
                    timer: 1500
                    });
                    
            }

            console.log(response)


        })
    }


    //Reset password
    function resetPassword(name, email,  password) {
      {
         fetch("/reset_password",{
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                  name:name,
                  email:email,
                  password:password })
 
         }
         )
         .then(res => res.json())
         .then(response => {
             
             Swal.fire({
             position: "top-end",
             icon: "success",
             title: response.success,
             showConfirmButton: false,
             timer: 1500
             });
             navigate('/login')
            
         })
         .catch(error => {
            Swal.fire({
               position: "top",
               icon: "error",
               title: response.error,
               text: "Something went wrong!",
            });
            
         });
     }
   }



   //logout
   function logout(){
      fetch('/logout',{
         method: 'POST',

     })
     .then(res => res.json())
     .then(response => {
      Swal.fire({
         position: "top-end",
         icon: "success",
         title: response.success,
         showConfirmButton: false,
         timer: 1500
         });
         navigate('/login')
         setLoggedIn(false)
         
     })
     
     setLoggedIn(false)
     navigate('/')
   }

    const contextData = {
   registerUser,
   login,
   resetPassword,
   loggedIn,setLoggedIn,
   logout

   }
  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  )
}
