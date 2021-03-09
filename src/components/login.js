import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as XMPP from 'stanza';
import { client, host, websocket, mucHost, ejApi } from '../App';
function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log(client);
    function connectUser(){
      dispatch({
        type:'CONNECTED',
        payload: 'connected'
      })  
    }

    function login() {
      console.log('chamou');
      client = XMPP.createClient({
        jid: `${user}@${host}`,
        password: password,
        transports:{
          websocket:websocket,
          bosh: false
        }
      });

      async function getContacts(){
        const contacts = await client.getRoster();
        dispatch({
          type: 'GET_CONTACTS',
          payload: contacts.items
        }) 
      }

      client.on('session:started', async () => {
        console.log('entrou');
        connectUser();
        getContacts();
        client.sendPresence('available');

        const chats = await ejApi.getOnlineRooms(mucHost);
        console.log(chats);
        dispatch({
          type: 'GET_CHATS',
          payload:chats
        })
        ejApi.connectedUsers();
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
        console.log('deu merda');
      })
      client.on('*',(e)=>{
        console.log('evento ' + e);
      });
      client.connect();
    }

    return(
      <div className="login">
        <div>
          <label htmlFor='login'>Login:</label>
          <input id='login' name='login' type='text' onChange={(event)=>setUser(event.target.value)}></input>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' onChange={(event)=>setPassword(event.target.value)}></input> 
        </div>
       <br />
        <button onClick={login}>Entrar</button>
      </div>
    )
}

export default Login;