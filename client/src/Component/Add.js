import React from 'react'
import axios from 'axios';

function Add(props) {
    const {setAdd, username, fetchArchives, setMessages} = props;   
    //
    // ─── STATE ──────────────────────────────────────────────────────────────────────
    const [name, setName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [type, setType] = React.useState('password');
    
    //
    // ─── ADD FETCH ──────────────────────────────────────────────────────────────────
    const addPassword = async ()=>{
        try {
            let url = '/hashcred';
            // Obj
            let dataToAdd = {
                name: name,
                username: username,
                user: user,
                password: password
            }
            let addPass = await axios.post(url, dataToAdd);
            let res = addPass.data;
            // console.log(res);
            if(res.success === true){
                // Refresh archives
                    fetchArchives();
                    setMessages([{msg:'📌 Addeded'}])
            }

        } catch (error) {
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
    
    // Handle Submit
    const handleSubmit = (e)=>{
        e.preventDefault();

        // Add
        addPassword();
        // Reset and clear
        setName('');
        setUser('');
        setPassword('');
        // Close Add 
        setAdd(false);
    }

    // Handle Show
    const handleShow = ()=>{
        // console.log(type)
        if(type === 'password'){
       return setType('text')
        }
        setType('password');
    }
    
    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────
    return (
        <div>
            <div className="addFormDiv">
            <div className="addGridErrors"> </div>
            <h1>Add Password</h1>

            <form autoComplete='off' onSubmit={handleSubmit} className="form">
            <fieldset>
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                id='name'
                placeholder='Name'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                required
                />

                <label htmlFor="user">User</label>
                <input 
                type="text"
                placeholder='User'
                id='user'
                value={user}
                onChange={(e)=>setUser(e.target.value)}
                required
                />

                <label htmlFor="password">Password 
                <small className='eye' onClick={handleShow}> 
                <span role='img' aria-label='eye'>👁️</span>
                </small>
                </label>
                <input 
                type={type}
                placeholder='Password'
                id='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                <div></div>
                <div className="textCenter">
                    <button className="button-small">Submit</button>
                </div>
            </fieldset>
            </form>
            </div>
        </div>
    )
}


export default React.memo(Add);