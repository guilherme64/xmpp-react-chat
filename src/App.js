import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XMPP from 'stanza';

import SignUp from './components/signUp';
import Contacts from './components/contacts';
import Status from './components/status';
import Messages from './components/message';
import ejabberdApi from './ejFunctions';
import clEvents from './clientEvents';
const ejApi = new ejabberdApi();
let client;
const host = 'beta.sip2sip.net';
const mucHost = 'conference.beta.sip2sip.net';
const websocket = 'wss://xmpp.beta.sip2sip.net:443/ws';
export { client, mucHost, ejApi, websocket, host };


 function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    function connectUser(){
      dispatch({
        type:'CONNECTED',
        payload: 'connected'
      })  
    }

    function login() {
      client = XMPP.createClient({
        jid: `${user}@${host}`,
        password: password,
        transports:{
          websocket:websocket,
          bosh: false
        }
      });
      //clEvents();
      async function getContacts(){
        const contacts = await client.getRoster();
        dispatch({
          type: 'GET_CONTACTS',
          payload: contacts.items
        }) 
      }

      client.on('session:started', async () => {
        connectUser();
        getContacts();
        client.sendPresence('available');
        dispatch({
          type: 'GET_CHATS',
          payload: await ejApi.getOnlineRooms(mucHost)
        })
        dispatch({
          type:'GET_REGISTERED_USERS',
          payload: await ejApi.getRegisteredUsers(host)
        })
        dispatch({
          type: 'LOGIN',
          payload: user
        })
      }); 

      client.on('message',(msg)=>{
        dispatch({
          type:'RECEIVE_MESSAGE',
          payload: msg
        })
      })
      client.on('message:error',(msg)=>{
        if(msg) console.log(msg);
        console.log(msg);
      })
      client.connect();
    }

    return(
      <div className="login">
        <h1>CHAT</h1>
        <div>
          <label htmlFor='login'>Login:</label>
          <input id='login' name='login' type='text' onChange={(event)=>setUser(event.target.value)}></input>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' onChange={(event)=>setPassword(event.target.value)}></input> 
        </div>
       <br />
        <button onClick={login}>Enter</button>
      </div>
    )
}


function InputText() {
  const dispatch = useDispatch(); 
  const [msg, setMsg] = useState('teste');
  const to = useSelector(state => state.activeConversation);
  async function sendMessage(message) {
    const msg = {
      from: client.config.jid,
      to: `${to.contact}@${to.host}`,
      body: message,
      type:to.host === mucHost ? 'groupchat' : 'normal',
      host:'beta.sip2sip.net'
    };
    await client.sendMessage(msg);   
    dispatch({
      type: 'SEND_MESSAGE',
      payload: msg
    });
  }

  function handleClick(msg) {
    sendMessage(msg);
  }

  return(
    <div className="input">
      <input className="input__text" type='text'  onChange={event => setMsg(event.target.value)} disabled={to.contact === ''}></input>
      <button onClick={() => handleClick(msg)}>Enviar</button>
    </div>
  )

}

function App() {
  const status = useSelector((state) => state.status);
  
  return (
    <div className="App">
      {status === 'offline' ?
       <div>
          <Login />
          <SignUp />
       </div>
      :
      <div className="mainScreen">
        <header className="topbar">
          <span>Chat</span>  
          <Status />
        </header>  
        <div className="main">
          <Contacts />
          <Messages />  
          <InputText />  
        </div>
      </div>}
    </div>
  );
}

export default App;
