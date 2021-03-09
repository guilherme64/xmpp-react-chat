import { client } from './App';

export default  function clEvents(){
  client.on('*',(e)=>{
      //console.log('event ' + e);
    });
  }
 
