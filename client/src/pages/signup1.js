import React, { useState } from "react";
import {useHistory} from "react-router-dom";
// import FileUpload from 'FileUpoad';
import { connect } from 'react-redux';
import {selectedProfile,selectedName,selectedEmail,selectedMobile,selectedUser} from "../Reducer/reducer";
import validator from 'validator'
import axios from "axios";
import "../App.css";
function Signup(props){
   const [Profile,setProfile] = useState('');
//    const [name,setname] = useState('');
//    const [email,setemail] = useState('');
//    const [password,setpassword] = useState('');
//    const [mobile,setmobile] = useState('');
   const [admin,setadmin] = useState(false);
   const [avatarPreview,setAvatarPreview] = useState("/images/default_avatar.jpg");
    const [avatar,setAvatar] = useState("");
    const [user,setUser] = useState({
      username:"",
      email:"",
      password:"",
      mobile:"",
  })
  const [error,setError] = useState({
      username:"",
      email:"",
      password:"",
      mobile:"" 
  })
  const {username,email,password,mobile} = user;
   const History = useHistory();
   const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const signIn = ()=>{
    console.log("im in signin");
    var container = document.getElementById('container');
    container.classList.remove("right-panel-active");
  }
  const signUp = ()=>{
    var container = document.getElementById('container');
    container.classList.add("right-panel-active");
  }
  const handleLogin = async(e)=>{
    console.log("handlelogin called");
    e.preventDefault();
    var email = user.email;
    var password = user.password;
    console.log('email',email);
    console.log('password',password);
    if(email==="" || password===""){
      alert("enter email and password");
    }
    
   if(admin==true){
     var res = await axios.post("https://book-my-show-web-application.vercel.app/admin/validateAdmin",{
       email,password
     })
     console.log("res",res);
     if(res.data.error=="Invalid Password"){
       alert("Invalid Password");
     }else
     if(res.data.error=="admin doesnt exist"){
       alert("admin doesnt exist");
     }else
     if(res.data.authToken){
      props.selectedName(res.data.admin.name);
      props.selectedProfile(res.data.admin.image);
      props.selectedEmail(res.data.admin.email);
      props.selectedMobile(res.data.admin.mobile);
      props.selectedUser(res.data.admin)
      localStorage.setItem("token",res.data.authToken);
      History.push({pathname:"/adminpage"});
     }
   }else{
var res = await axios.post("https://book-my-show-web-application.vercel.app/users/validateUser",{
  email,password
})
console.log("res",res);
if(res.data.error=="Invalid Password"){
  alert("Invalid Password");
}else
if(res.data.error=="user doesnt exist"){
  alert("user doesnt exist");
}else
  if(res.data.authToken){
    props.selectedName(res.data.user.username);
    props.selectedProfile(res.data.user.image);
    props.selectedEmail(res.data.user.email);
    props.selectedMobile(res.data.user.mobile);
    props.selectedUser(res.data.user)
    localStorage.setItem("token",res.data.authToken);
    History.push("/homepage");
 }
}
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log("avatarPreview",avatarPreview)
      const formData = new FormData();
      formData.set("avatar",avatarPreview);
      formData.set("username",username);
      formData.set("email",email);
      formData.set("password",password);
      formData.set("mobile",mobile);
      // dispatch(register(formData))
   const data = {
    username,
    email,
    password,
    mobile,
    avatar:avatarPreview
   }
  
   const config={
    headers: { "Content-Type": "multipart/form-data" },
    }
   const res = await axios.post("https://book-my-show-web-application.vercel.app/users/register",formData,config)
  //  const url = "http://localhost:3001/users/register";
  //  const res = await axios.post(url,data,config);
   console.log("res",res);
   if(res.status==200){
     alert("user register successfully");
     var container = document.getElementById('container');
     container.classList.remove("right-panel-active");
   
   }else{
     alert("user already exist");
   }
 }
 const handleChange = async(e)=>{
    console.log("handlechange called");
    console.log("value",e.target.value);
    switch(e.target.name){
      case "username":{
        if(e.target.value.length==0){
          error.username = "name cant be empty";
        }else
        if(e.target.value.length<5){
          error.username = 'name should be atleast 5 charaters long';
        }else{
          error.username = "";
        }
        break;
      }
      case "email":{
        if(e.target.value.length==0){
          error.email = "email cant be empty";
        }else
        error.email =  validEmailRegex.test(e.target.value)
        ? ''
        : 'Email is not valid!';
        break;
      }
      case "mobile":{
        if(e.target.value.length==0){
          error.mobile = "Mobile Nunber cant be empty";
        }else
        error.mobile = '';
        break;
      }
      case "password":{
        if(e.target.value.length==0){
          error.password = "password cant be empty";
        }else
        error.password = validator.isStrongPassword(e.target.value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })?'':"password is weak";
        break;
      }
    }
    if(e.target.name === "avatar"){
      console.log("im in avatar");
      const reader = new FileReader();
      console.log("image",e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = ()=>{
          if(reader.readyState == 2){
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
          }
      }
    }else{
    setUser({...user,[e.target.name]:e.target.value});
    setError({error})
  }
}
   return(
     <div>
         <h2 style={{marginTop:"80px"}}>Movie Ticket Booking App</h2>
         <div class="container" id="container">
         <div class="form-container sign-up-container">
             <form onSubmit={handleSubmit} encType='multipart/form-data'>
             <div>
                
                 </div> 
                 <h1>Create Account</h1>
                 <div class="social-container">
                 
                 </div>
                 <span>or use your email for registration</span>  
                
                 {/* <input type="file" placeholder="Pick Image" onChange={(e) => setProfile(e.target.files[0])} /> */}
                 
                 <input type="text" placeholder="name" name="username" id="name"
                 value={username} onChange={handleChange}/>

                  <span style={{color:'red'}}>{error.username}</span>
                <input type="email" placeholder="email" name="email" id="email"
                value={email} onChange={handleChange}/> 
                 <span style={{color:'red'}}>{error.email}</span>
                <input type="password" placeholder="password" name="password" id="password"
               value={password} onChange={handleChange}/> 
                <span style={{color:'red'}}>{error.password}</span>
                 <input type="text" placeholder="mobile" name="mobile" id="mobile"
                
                  value={mobile} onChange={handleChange}/>
                  <span style={{color:'red'}}>{error.mobile}</span>
                  
                                <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept="image/*"
                                    onChange={handleChange}
                                    />
                                    
                                </div>
                      
                 <button type="submit">Sign Up</button>
               
             </form>
            
         </div>
         <div class="form-container sign-in-container">
              <form>
                  <h1>Sign in</h1>
                 
                  <span>or use your account</span>
                  <input type="email" name="email" placeholder="email" value={email} onChange={handleChange}></input>
                  <span style={{color:'red'}}>{error.email}</span>
                  <input type="password" name="password" placeholder="password" value={password} onChange={handleChange}></input>
                
                  <input type="checkbox" style={{ marginLeft: "-66%", width: "-webkit-fill-available" }} value={admin} onChange={(e) => setadmin(true)} /><a href="#" style={{ marginLeft: "-8%", marginTop: "-8%" }}>Pick If You Are Admin</a>
                  <button onClick={handleLogin}>Sign In</button>
              </form>
         </div>

          <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button class="ghost" id="signIn" onClick={signIn}>Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp" onClick={signUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
</div>
   )
}
export default connect(null,{selectedProfile,selectedName,selectedEmail,selectedMobile,selectedUser})(Signup);
