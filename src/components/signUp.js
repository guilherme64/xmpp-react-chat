import { useState } from 'react';
import { host } from '../App';
import ejabberdApi from '../ejFunctions';

const ejApi = new ejabberdApi();
function SignUp(){
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [statusMsg, setStatusMsg] = useState('');

    async function saveNewUser(){
        const msg = await ejApi.createUser(user, password, host);
        setStatusMsg(msg.message);
    }

    return(
        <div className="signup">
            <h2>Sign up if you don't have an account</h2>
            <div>
                <label htmlFor='user'>User:</label>
                <input id='user' name='user' type='text' onChange={(event)=>setUser(event.target.value)}></input>
            </div>
            <div>
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password' onChange={(event)=>setPassword(event.target.value)}></input> 
            </div>
        <br />
            <button onClick={saveNewUser}>Enter</button>
            <span>{statusMsg}</span>
        </div>
    )

}

export default SignUp;