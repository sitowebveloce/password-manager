import React from 'react';
import axios from 'axios';

function Table(props) {
    const { name, user, password,date, idDb, fetchArchives, setMessages} = props;
    
    //
    // ─── STATE ──────────────────────────────────────────────────────────────────────
    const [type, setType] = React.useState('password');
    const [passDecry, setPassDecry] = React.useState('...');
    const [id, setIdDb] = React.useState(idDb);
    const [enableit, setEnableit ] = React.useState(true);
    const [del, setDel] = React.useState(false);
    
     //
    // ─── FETCH PASS ─────────────────────────────────────────────────────────────────
    const fetchPass = async (token)=>{
        try {
            let url = `/decryptval`;
            let fetchData = await axios.post(url,{id: `${token}`});
            let res = await fetchData.data;
             // console.log(res);
            if(res.success === true){
              setPassDecry(res.data.password);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
            
                // console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                 console.log('Error', error.message);
              }
              console.log(error.config);
        }
    }

    //
    // ─── DELETE DATA ────────────────────────────────────────────────────────────────
    const deleteArchive = async (id)=>{
        //console.log(id);
        try {
            let url = `/delarchive/${id}`;
            let fetchData = await axios(url);
            let res = await fetchData.data;
            // console.log(res);
            if(res.success === true){
              fetchArchives();
              setMessages([{msg:'🗑️ deleted.'}])
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                console.log(error.response.status);
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
              // console.log(JSON.parse(error.config.data));
        }
    }

    //
    // ─── DELETE DATA ────────────────────────────────────────────────────────────────
    const submitEdit = async (id)=>{
      //console.log(id);
      try {
          let url = `/editpass`;
          let fetchData = await axios.post(url, {id:id, password: `${passDecry}`});
          let res = await fetchData.data;
          // console.log(res);
          if(res.success === true){
            fetchArchives()
          }
      } catch (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // console.log(error.response.data);
              console.log(error.response.status);
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
            // console.log(JSON.parse(error.config.data));
      }
  }

     //
    // ─── CHANGE INPUT TYPE ──────────────────────────────────────────────────────────
    const handleShow = ()=>{
        fetchPass(`${password}`);
        if(type === 'password'){
          setMessages([{msg:'🔓 unlock.'}]);
        return setType('text');
        }

        setMessages([{msg:'🔐 Lock.'}])
        setType('password');
    }

     // Handle Confirm
     function handleConfirm(){
      setDel(true);
      setMessages([{msg:'❌ Confirm deletion.'}])
    }
    //
    // ─── HANDLE DELETE ──────────────────────────────────────────────────────────────
  function handleDel(){
        // console.log(id)
        deleteArchive(id);
        // Set Delete false
        setDel(false);
    }

    //
    // ─── HANDLE EDIT ─────────────────────────────────────────────────
    function handleEdit(){
     // console.log(id)
     setEnableit(!enableit);
     if(!enableit){
       // Submit new data
       submitEdit(id);
      return setMessages([{msg:'🗄️ Archivied.'}])
     }
     return setMessages([{msg:'🗃️  Archive open.'}])
    }
    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────

    return (
            <>
                <tbody>
                    <tr>
                    <td>{name}</td>
                    <td>{user}</td>
                    <td> <input 
                    className='noboders' 
                    disabled={enableit} 
                    type={type} 
                    value={passDecry}
                    onChange={e=> setPassDecry(e.target.value)}
                    /></td>
                    <td className='tableDate'>{
                   new Date(date).toLocaleDateString('it-IT', {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric"
                    // ,hour: "numeric",
                    // minute: "numeric"
                   })
                    }</td>
                    <td>
                    <small className='eyeTable'> 
                    <span className='emojis' onClick={handleShow} role='img' aria-label='view'>👁️</span>
                    {!enableit ? 
                    <span className='emojis' onClick={handleEdit} role='img' aria-label='edit'>🔫</span>
                      :
                    <span className='emojis' onClick={handleEdit} role='img' aria-label='edit'>🖊️</span>
                    
                    } 
                    {
                      del ?  
                    <span className='emojis' onClick={handleDel} role='img' aria-label='edit'>❌</span> 
                      :
                      <span className='emojis' onClick={handleConfirm} role='img' aria-label='edit'>❎</span>
                    }
                    </small>
                    </td>
                    </tr>
                </tbody>
        </>
    )
}

// Export with memo
export default React.memo(Table);