import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UserContext = createContext()

export default function UserProvider({children}) {

   const navigate = useNavigate()

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
               title: error,
               text: "Something went wrong!",
            });
            
         });
     }
   }
   
   

    const contextData = {
   registerUser,

   }
  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  )
}
