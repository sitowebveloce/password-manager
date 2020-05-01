import React from 'react'

export default function Flash(props) {
    // Deconstruct
    const{messages, setMessages} = props;
//
// ─── STATE ──────────────────────────────────────────────────────────────────────
const [visibility, setVisibility] = React.useState(false);
const [type, setType] = React.useState(''); 

//
// ─── DOM MESSAGES ───────────────────────────────────────────────────────────────────
 
  let msgs =  messages.map((m, indx)=> {
    return ( <span key={indx}> {m.msg} </span>)  
   });

 //
 // ─── ALLERT ─────────────────────────────────────────────────────────────────────
 const flashMessage =  (message) =>{
    setVisibility(true);
    // setType(type);
    setTimeout(()=>{
        setVisibility(false);
    },7000)
};
//
// ─── USEEFFECT ──────────────────────────────────────────────────────────────────
React.useEffect(() => {
   // console.log('Flash')
   flashMessage()
},[messages])

//
// ─── CLOSE ──────────────────────────────────────────────────────────────────────
React.useEffect(() => {
    if(document.querySelector('.close') !== null) {
        document.
        querySelector('.close').
        addEventListener('click', () => setVisibility(false));
    }
})

//
// ─── RETURN ─────────────────────────────────────────────────────────────────────

    return (
        <div className='msgsContent'>
               {visibility ? 
                <div className="messages">{msgs}</div>
                :
                null
            }
                
        </div>
    )
}
