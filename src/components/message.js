import { useSelector } from 'react-redux';
import{ host, mucHost } from '../App';
function Message(props){
    return(<div className="message">
            <span className="message_actors">From: {props.message.from.slice(0,props.message.from.indexOf('@beta'))}</span>
            <br />
            <span className="message_actors">To: {props.message.to.slice(0,props.message.to.indexOf('@beta'))}</span>
            <br />
            <span className="message__body">{props.message.body}</span>
        </div>)
}

function Messages() {
    const messages = useSelector(state => state.messages)
    const user= useSelector(state => state.user);
    console.log(user);
    const activeConversation = useSelector(state => state.activeConversation);
    console.log(messages);
    return(
      <div className="messages" >
        <h2>{activeConversation.contact}</h2>
        {messages.filter(message => (message.to.slice(0, message.to.indexOf('@')) === activeConversation.contact || message.from.slice(0,message.from.indexOf('@')) === activeConversation.contact ) && message.from !== `${activeConversation.contact}@${activeConversation.host}/${user}@${host}` && message.body )
            .map((message,index) => <Message key={index} message={message} />)}
      </div>
    )
  }
export default Messages;