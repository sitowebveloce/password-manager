import React from 'react'
import Table from './Table';
import Add from './Add';
import axios from 'axios';
import Search from './Search';


function Manager(props) {
    const {username, setMessages} = props;
    const [add, setAdd] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [searchres, setSearchres] = React.useState([]);
    //
    // ─── FETCH DATA ─────────────────────────────────────────────────────────────────
    const [archives, setArchives] = React.useState([]);

    //
    // ─── FETCH DATA ─────────────────────────────────────────────────────────────────
    const fetchArchives = async ()=>{
        try {
            let url = `/archives/${username}`;
            let fetchData = await axios(url);
            let res = await fetchData.data;
            // console.log(res);
            // console.log('Fetch');
            if(res.success === true){
              setArchives(res.data)  
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
               // console.log(error.response.status);
                if(error.response.status === 400){
                    setArchives([])  
                  }
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
    // ─── FETCH SEARCH ─────────────────────────────────────────────────────────────────
    const fetchSearch = async (search)=>{
        try {
            let url = `/searchpass`;
            let fetchData = await axios.post(url, {search: search});
            let res = await fetchData.data;
            // console.log(res);
            if(res.success === true){
               setSearchres(res.data)
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
   // ─── USE EFFECT ─────────────────────────────────────────────────────────────────
    React.useEffect(()=>{
        fetchArchives();
    },[]);
    
    // Handle Add
    const handleAdd = ()=>{
        setAdd(true);
    }

    // Handle Add close
    const handleAddClose = ()=>{
        setAdd(false)
    }

    //
    // ─── SHOW ARCHIVES ──────────────────────────────────────────────────────────────
    
    let showData =  ()=>{
        return  archives.map(a =>{
               return (
                    <Table 
                    key={a._id}
                    username={username}
                    name ={a.name}
                    user={a.user}
                    password={a.password}
                    date={a.createdAt}
                    idDb={a._id}
                    fetchArchives={fetchArchives}
                    setMessages={setMessages}
                     />
               )
           })
       }

    // SHOW SEARCH RESULT
    let showSearch = ()=>{
        return searchres.map(a=>{
           return ( <Table 
                    key={a._id}
                    username={username}
                    name ={a.name}
                    user={a.user}
                    password={a.password}
                    date={a.createdAt}
                    idDb={a._id}
                    fetchArchives={fetchArchives}
                    setMessages={setMessages}
                     />
           )
        });
    }
    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────
    
    return (
        <div className='manager-grid'>
        <div className='manager-add'>
        {add ?
            <span className='add-close' onClick={handleAddClose} role='img' aria-label='add'> ❌ </span>
                :
            <span className='add-open' onClick={handleAdd} role='img' aria-label='add'> ➕ </span>
        }
        </div>
        {add ? 
        <Add 
        setAdd={setAdd} 
        username={username}
        fetchArchives={fetchArchives}
        setMessages={setMessages}
        
        />
        :
        <div className='manager'>
        <Search 
        search={search} 
        setSearch={setSearch}
        fetchSearch={fetchSearch}
        searchres={searchres}
        setSearchres={setSearchres}
        />
        <div className="row">
            <div className="column">
            <table>
             <thead>
                 <tr>
                 <th>Name</th>
                 <th>User</th>
                 <th>Password</th>
                 <th className='tableDate'>Date</th>
                 <th>Actions</th>
                 </tr>
             </thead>
             {searchres.length > 0 ? 
             showSearch()
             :
             showData()
            }
            
             </table>
            </div>
            </div>
            </div>
                  
        }
        </div>
    )
}


export default React.memo(Manager);