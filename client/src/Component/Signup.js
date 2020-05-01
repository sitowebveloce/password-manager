import React from 'react'
import axios from 'axios';

function Signup(props) {
    const {setSignup, whoisin, setMessages} = props;
    //
    // ─── STATE ──────────────────────────────────────────────────────────────────────
    const [emailTemp, setEmailTemp] = React.useState('');
    const [passTemp, setPassTemp] = React.useState('');
    const [confirmTemp, setConfTemp] = React.useState('');
    const [secret, setSecret] = React.useState('');
    //
    // ─── FETCH ──────────────────────────────────────────────────────────────────────
    const fetchPost = async (user)=>{
        let url = '/user/signup';
        await axios
        .post(url, user)
        .then(response =>{
            // Flash message
            // console.log(response.data);
            setMessages([{msg: response.data.msg}])
            // Set who is in 
            if(response.data.success === true){
                whoisin();
            }
        })
        .catch(error =>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
               //  console.log(error.response.data);
               const errRes = error.response.data.data;
               setMessages([errRes]);
               
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
        })
    }
    
    //
    // ─── HANDLE CLOSE ───────────────────────────────────────────────────────────────
            
    const handleClose = ()=>{
        setSignup(false);
    }

    //
    // ─── SET ALERT MESSAGES ─────────────────────────────────────────────────────────
    let handleMessages = (err)=>{
        //
        setMessages(err)

    }
     //
    // ─── HANDLE SUBMIT ──────────────────────────────────────────────────────────────
               
     const handleSubmit = (e)=>{
        // Prevent page reload
        e.preventDefault();
        // Validation
        let err = [];

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailTemp)){
            let msg = {msg: '⚠️ Email invalid.'};
            err.push(msg)
        }
        if(passTemp.length <= 8){
            let msg = {msg: '⚠️ Password min 8.'};
            err.push(msg);
        }
        if(!(/[A-Z]/).test(passTemp)){
            let msg = {msg: '⚠️ Password uppercase.'}
            err.push(msg);
        }
        if(!(/\W/).test(passTemp)){
            let msg = {msg: '⚠️ Password alphas.'}
            err.push(msg);
        }
        if(!(/\d/).test(passTemp)){
            let msg = {msg: '⚠️ Password numeric.'}
            err.push(msg);
        }
        if(passTemp !== confirmTemp){
            let msg = {msg: '⚠️ Password must be =.'}
            err.push(msg);
        }
        if(secret !== process.env.REACT_APP_SIGNUP_SECRET){
            let msg = {msg: '⚠️ Insert a valid secret key 🗝️.'} 
            err.push(msg);
        }
        // Return message
        if(err.length > 0){
            // Set Messages
          return handleMessages(err)
        }        
        
        // Clear/empty error array and field
        err.length = 0;
        handleMessages([]);
        setEmailTemp('');
        setPassTemp('');
        setConfTemp('');
        setSecret('');

        // Prepare user object
        let user = {
            email: emailTemp,
            password: passTemp
        }
        // Fetch post data
        fetchPost(user)
    }
  
    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────
    
    return (
        <div>
            <div className="signupFormDiv">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='form'>
            <div className="close" onClick={handleClose}><span role='img' aria-label='close'>❌</span></div>
                <fieldset>
                    <label htmlFor="emailField">Email</label>
                    <input 
                    type="email"
                    placeholder='Email'
                    id='emailField'
                    value={emailTemp}
                    onChange={e=> setEmailTemp(e.target.value)}
                    required
                    />
                    <label htmlFor="passwordField">Password</label>
                    <input 
                    type="password"
                    placeholder='Password'
                    id='passwordField'
                    value={passTemp}
                    onChange={e => setPassTemp(e.target.value)}
                    required
                    />
                    <label htmlFor="confirmField">Confirm</label>
                    <input 
                    type="password"
                    placeholder='Confirm'
                    id='confirmField'
                    value={confirmTemp}
                    onChange={e => setConfTemp(e.target.value)}
                    required
                    />
                    <label htmlFor="secret">Secret</label>
                    <input 
                    type="password"
                    placeholder='secret'
                    id='secret'
                    value={secret}
                    onChange={e=> setSecret(e.target.value)}
                    required
                    />
                   <div className='textCenter'>
                       <button className="button-small">Submit</button>
                       </div> 
                </fieldset>
            </form>
            </div>
        </div>
    )
}

// Export with memo
export default React.memo(Signup);