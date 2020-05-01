  
  import React from 'react'
  import axios from 'axios';

  function Whoisin(props) {
      const {setUsername} = props;

    // ─── WHO IS IN ──────────────────────────────────────────────────────────────────
    let whoisinFunction = async ()=>{
        try{
            let url = '/user/whoisin';
            let whoisFetch = await axios(url);
            let res = await whoisFetch.data;
            console.log(res)
            let userIn = res.data.username;
            setUsername(userIn);
        }
        catch(error){

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
               const errRes = error.response.data.data;
               
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
              return 'undefined'
        }
    }
  }
  
  export {Whoisin};