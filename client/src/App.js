import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import Signup from './Component/Signup';
import axios from 'axios';
import video from './bg.mp4'
import arrow from './arrows.png';
import Manager from './Component/Manager';
import Nav from './Component/Nav';
import Footer from './Component/Footer';
import Flash from './Component/Flash';


function App() {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  const [login, setLogin] = React.useState(false);
  const [signup, setSignup] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [messages, setMessages] = React.useState([{msg:'Wellcome 😀'}]);

     // ─── WHO IS IN ──────────────────────────────────────────────────────────────────
     let whoisin = async ()=>{
      try{
          let url = '/user/whoisin';
          let whoisFetch = await axios(url);
          let res = await whoisFetch.data;
          // console.log(res)
          if(res.success === true){
          let userIn = res.data.username;
          setUsername(userIn);
          setMessages([{msg:`✋ Wellcome ${username}`}]);
          }
          
      }
      catch(error){

          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
            // console.log(error.response.data);
             if(error.response.data.success === false){
              setUsername('');
            }
              //console.log(error.response.status);
              // console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              // console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              // console.log('Error', error.message);
            }
            // console.log(error.config);
      }
  }

  //
// ─── FETCH POST ─────────────────────────────────────────────────────────────────
const loginPost = async (user)=>{
  try{
      let url = '/user/login';
      let login = await axios.post(url,user);
      let res = await login.data;
      // console.log(res);
      // Messages
      setMessages([{msg: `${res.msg}`}]);
      // SET WHO IS IN 
      if(res.success === true){
        whoisin();
      }
  }
  catch(error){
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
           console.log(error.response.data);
          const errRes = error.response.data.msg;
          setMessages([{msg:`💥 ${errRes}`}]);
         
          //console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
        }
        // console.log(error.config);
  }
  }


  // Handle login
  const handleLogin = ()=>{
    // Toggle login
    setLogin(!login)
  }
  
  // Handle Signup
  const handleSignup = ()=>{
    // Toggle signup
    setSignup(!signup)
  }
  
  // LOGOUT
  const handleLogOut = async ()=>{
    try{
      let url = '/user/logout';
      let logoutRequest = await axios(url);
      let res = await logoutRequest.data;
      // console.log(res);

      //  WHO IS IN
      if(res.success === true){
      whoisin();
      setMessages([{msg: `${res.msg}`}])
      }
    }
    catch(error){
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        //console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
      }
      // console.log(error.config);
    }
  }

  // USEEFFECT USERNAME
  React.useEffect(()=>{
    whoisin();
    if(username !== ''){
     // console.log('Use effect')
      setLogin(false);
      setSignup(false);
    }
  }, [username])
  
  //
  // ─── RETURN ─────────────────────────────────────────────────────────────────────
  
  return (
    <>
    <Nav 
    username={username} 
    handleLogOut={handleLogOut}
    handleLogin={handleLogin} 
    />
    <Flash messages={messages } setMessages={setMessages}/>
      {login ? 
      <Login 
      setLogin={setLogin}
      username={username}
      whoisin = {whoisin}
      messages={messages}
      setMessages={setMessages}
      loginPost={loginPost}
      /> 
      : signup ? 
      <Signup 
      setSignup={setSignup}
      whoisin = {whoisin}
      messages={messages}
      setMessages={setMessages}
      />: username !== '' ? 
      <Manager username={username} setMessages={setMessages} /> 
      :
      <div className="App">
        <video className='video' src={video} autoPlay muted loop type='mp4'></video>
        <img className='arrow' src={arrow} alt=""/>
      <h1 className='title'>Password Manager</h1>
      <h3>Who are you?</h3>
      <div className=''><button onClick={handleLogin} className="button-large button-outline">Login</button></div> 
      <div className='or'>or</div>
      <div> <button onClick={handleSignup} className="button-large button-outline">Sign Up</button></div>
      <Footer />
      </div>
      }
      
    </>
  );
}

export default App;
