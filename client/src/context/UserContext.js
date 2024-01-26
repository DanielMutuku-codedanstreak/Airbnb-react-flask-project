import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2'

export const UserContext = createContext()

export default function UserProvider({children}) {

   const navigate = useNavigate()
   const [onchange, setOnchange] = useState(false)
   const [authToken, setAuthToken] = useState(()=> sessionStorage.getItem("authToken")? sessionStorage.getItem("authToken"): null )
   const [currentUser, setCurrentUser] = useState(null)

   const [loggedIn, setLoggedIn] = useState(false)
   const [userType, setUserType] = useState()
   
   
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
         
     }
   }
   
   // Login
   function login(email, password)
    {
        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({email,password })

        }
        )
        .then(res => res.json())
        .then(response => {
            
            if (response.access_token)
            {
                sessionStorage.setItem("authToken", response.access_token);
                setAuthToken(response.access_token)
                setLoggedIn(true)

                navigate("/")
                Swal.fire({
                position: "center",
                icon: "success",
                title: "Login success",
                showConfirmButton: false,
                timer: 1500
                });

                setOnchange(!onchange)
            }
            else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response.error,
                    showConfirmButton: false,
                    timer: 1500
                    });
            }


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
        //  .catch(error => {
        //     Swal.fire({
        //        position: "top",
        //        icon: "error",
        //        title: "failed",
        //        text: response.error,
        //     });
            
        //  });
     }
   }



   //logout
   function logout(){
      fetch('/logout',{
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${authToken && authToken}`
        }

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
         navigate('/')
         setLoggedIn(false)
         
     })
     
     setLoggedIn(false)
     navigate('/')
   }
    // Get Authenticated user
    useEffect(()=>{
        if(authToken)
        {
            fetch("/authenticated_user",{
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`
            }
            })
            .then(res => res.json())
            .then(response => {
                if(response.email || response.username){
                    setCurrentUser(response)
                    setUserType(response.user_type)
                    setCurrentUser(response)
                    // console.log(response)

                    setLoggedIn(true)
                }
                else{
                    setCurrentUser(null)
                    setLoggedIn(false)
                    navigate('/')
                }
            })
        }
    

    }, [authToken, onchange])
    // console.log(currentUser)
    
   // update current user details
   function updateCurrentuserDetails(updatedName, updatedEmail, updatedPhone){
    fetch('/user',{
        method :'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body:JSON.stringify({
            name:updatedName,
            email:updatedEmail,
            phone:updatedPhone
        })

    })
    .then( res => res.json())
    .then((response) => {
        if(response.error){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.error,
                showConfirmButton: false,
                timer: 1500
              });
           
          }else{
            
            setOnchange(!onchange)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: response.success,
              showConfirmButton: false,
              timer: 1500
            });
          }

    })
   }
    
   //change password

   function changePassword( newPassword,currentPassword ){
    fetch('/change_password',{
        method :'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body:JSON.stringify({
            new_password:newPassword,
            current_password:currentPassword
        })

    })
    .then( res => res.json())
    .then((response) => {
        if(response.error){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.error,
                showConfirmButton: false,
                timer: 1500
              });
           
          }else{
            
            // setOnchange(!onchange)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: response.success,
              showConfirmButton: false,
              timer: 1500
            });
          }

    })
   }


   // delete account
   function deleteAccount(){
    fetch('/user',{
        method :'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        
    })
    .then(res => res.json())
    .then((response) => {
        console.log(response)
        if(response.error){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.error,
                showConfirmButton: false,
                timer: 1500
              });
           
          }else{
            
            navigate('/')
            setLoggedIn(false)
            setCurrentUser(null)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: response.success,
              showConfirmButton: false,
              timer: 1500
            });
          }

    })
   }

   



    const contextData = {
        currentUser,
   registerUser,
   login,
   resetPassword,
   loggedIn,setLoggedIn,
   logout,
   userType,
   updateCurrentuserDetails,
   changePassword,
   deleteAccount,

   }
  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  )
}
