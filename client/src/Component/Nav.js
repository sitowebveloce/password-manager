import React from 'react'

export default function Nav(props) {
    const {username, handleLogOut, handleLogin} = props;


    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────
    return (
        <>
     <nav>
      <span className="logo" role='img' aria-label='key'>🗝️</span>
     {username !== '' ? 
      <>
      <span className='user' role='img' aria-label='alien'>👶 {username}</span>
      <span onClick={handleLogOut} className='exit' role='img' aria-label='logout'>🚪</span>
     </>
       :
       <span onClick={handleLogin} className='enter' role='img' aria-label='logout'>🔞</span>

    }
    </nav>  
        </>
    )
}
