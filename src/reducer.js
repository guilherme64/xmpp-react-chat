const initialState = {
    messages: [],
    contacts:[],
    registeredUsers:[],
    chats:[],
    user:'',
    status:'offline',
    activeConversation:{contact:'', host:''},
}

const reducer = (state = initialState, action) =>{
    
    switch(action.type){
        //USER RELATED ACTIONS  
        case 'LOGIN':{
            return {
                ...state,
                user: action.payload
            }
        }
        case 'CONNECTED':{
            return {
                ...state,
                status: action.payload
            }
        }
        //CHAT RELATED ACTIONS
        case 'GET_CHATS':{
            return{
                ...state,
                chats: action.payload
            }
        }
        case 'ENTER_CHAT':{
            return{
                ...state,
                chat: action.payload
            }
        }
        //CONTACT RELATED ACTIONS
        case 'SET_ACTIVE_CONTACT':{
            return{
                ...state,
                activeConversation: action.payload
            }
        }
        case 'GET_CONTACTS':{
            return{
                ...state,
                contacts: action.payload
            }
        }

        case 'GET_REGISTERED_USERS':{
            return {
                ...state,
                registeredUsers: action.payload
            }
        }
        //MESSAGE RELATED ACTIONS
        case 'SEND_MESSAGE':{
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        }
        case 'RECEIVE_MESSAGE':{
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        }
        default:
            return state;
    }
}

export default reducer;