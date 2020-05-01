import React from 'react'
import axios from 'axios';

function Login(props) {
    const {setLogin, loginPost} = props;
    //
    // ─── STATE ──────────────────────────────────────────────────────────────────────
    const [emailTemp, setEmailTemp] = React.useState('');
    const [passTemp, setPassTemp] = React.useState('');

    // Handle Close
    const handleClose = ()=>{
        setLogin(false)
    }

    // Handle Submit
    const handleSubmit = (e)=>{
        // Prevent page reload
        e.preventDefault();
        
        // Create user obj
        let usr = {email: emailTemp, password:passTemp}
        // Login
        loginPost(usr);
    }

    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────
    
    return (
        <div>
            
            <div className="loginFormDiv">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='form'>
            <div className="close" onClick={handleClose}><span role='img' aria-label='close'>❌</span></div>
                <fieldset>
                    <label htmlFor="emailField">Email</label>
                    <input 
                    type="text"
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
export default React.memo(Login);