import { useSelector } from 'react-redux';

function Status(){
    const status = useSelector(state => state.status);
    const user = useSelector(state => state.user)
    console.log(user);
    return(<span>{user} is {status}</span>)
}

export default Status;
  