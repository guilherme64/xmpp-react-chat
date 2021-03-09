import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { client, mucHost, host, ejApi } from '../App';
function Contact(props){
    const dispatch = useDispatch();
    function selectUser(){
        dispatch({
            type:'SET_ACTIVE_CONTACT',
            payload: {contact: props.contact, host: host}
        })
    }
    return(
        <div onClick={selectUser} className="contacts__contact">
            <span >{props.contact}</span>
        </div>
    )
}

function Room(props){
    const dispatch = useDispatch();
    function selectRoom(){
        dispatch({
            type:'SET_ACTIVE_CONTACT',
            payload: {contact: props.chat, host:mucHost}
        })
        client.joinRoom(`${props.chat}@${mucHost}`,client.config.jid);
        client.subscribe(`${props.chat}@${mucHost}`);
    }
    
    async function deleteRoom(){
        await ejApi.deleteRoom(props.chat,mucHost);
        dispatch({
            type:'GET_CHATS',
            payload: await ejApi.getOnlineRooms(mucHost)
        })

    }
    return(
        <div onClick={selectRoom} className="user">
            <span>{props.chat}</span>
            <button onClick={deleteRoom}>Delete Room</button>
        </div>
    )
}

function User(props){
    const dispatch = useDispatch();

    function selectUser(){
        dispatch({
            type:'SET_ACTIVE_CONTACT',
            payload: {contact: props.user, host: host}
        })
    }
    async function deleteUser(){
        await ejApi.deleteUser(props.user,host);
        dispatch({
            type:'GET_REGISTERED_USERS',
            payload: await ejApi.getRegisteredUsers(host)
        })
    }

    return(<div className="user" onClick={selectUser}>
            <span>{props.user}</span>
            <button onClick={deleteUser}>Delete User</button>
        </div>)
}

function UsersAvailable(){
    const usersAvailable = useSelector(state => state.registeredUsers);
    return(
        usersAvailable.map((user, index) => <User key={index} user={user} />)
    )

}

function CreateRoom(){
    const [roomName, setRoomName] =  useState();
    const dispatch = useDispatch();

    async function createRoom(){
        await ejApi.createRoom(roomName, mucHost, host);
        dispatch({
            type:'GET_CHATS',
            payload: await ejApi.getOnlineRooms(mucHost)
        })

    }
    return(
        <div>
            <label htmlFor='room-name'>Create Room:</label>
            <input id="room-name" name='room-name' type="text" onChange={(event => setRoomName(event.target.value))}></input>
            <button onClick={createRoom}>Create room</button>
        </div>
    )
}
function Contacts(){
    const contacts = useSelector(state => state.contacts);
    const chats = useSelector(state => state.chats);

    return(
        <div className="contacts">
            <div >
                <h2>Contacts</h2>
                {contacts.filter(contact => !contact.jid.includes('conference'))
                    .map((contact, index) => <Contact key={index} contact={contact.jid}/>)}
            </div>
            <div>
                <h2>Chats</h2>
                {chats.map((chat, index) => <Room key={index} chat={chat.slice(0,chat.indexOf('@'))} />)}
                <CreateRoom />
            </div>
            <div>
                <h2>Registered Users</h2>
                <UsersAvailable />
            </div>
        </div>)
}

export default Contacts;