import React from 'react'
import './ListClients.css'
import axios from 'axios';
import base64 from 'base-64'




const  ListClients = ()=>{
    let username = 'admin';
    let password = 'Admin123';
    let url = `http://10.1.1.22:8080/openmrs/ws/rest/v1/patient/3d2473ce-5dab-11eb-8b75-1cc1de1a8bbc/${username}/${password}`
    let url1 = "http://10.1.1.22:8080/openmrs/ws/rest/v1/patient/3d2473ce-5dab-11eb-8b75-1cc1de1a8bbc/"
    let authString = `${username}:${password}`

   // let headers = new Headers();
   
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'true'; // for all requests
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
axios.defaults.headers.common['Access-Control-Max-Age'] = '4567';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

let headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": 'true',
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS",
    "Authorization": "Basic " + base64.encode(username + ":" +  password)
};
const callAPI = async() => {
    try {
        await axios.get(url1,{headers: headers}).then(res => {
            console.log(res)
          })
        
    } catch (error) {
        console.log("error ", error)
    }
}

const getAll = async () => {
   

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    headers.append('Origin','*');
    console.log("The headers ::", headers)
    try {
      const response = await fetch(
        url1,
        {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
            headers: headers

        }
      );
      data = await response.json();
 
      console.log("some data ", data)
 
      return data;
    } catch (error) {
      console.error(error);
    } finally {
        console.log('some final code')
    }
  };

  return (
    <div className='clientList'>
        <button onClick={callAPI}>Call API</button>
    </div>
  )
}

export default ListClients