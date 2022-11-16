const socket=io(); 
const formChat =document.getElementById('chat-form')
const chatMessage=document.querySelector('.chat-messages')

// Get username and room from url
const {username ,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})


// join chatroom

socket.emit('joinRoom',{username ,room})
//message from server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    //scroll down
    chatMessage.scrollTop=chatMessage.scrollHeight;
})


formChat.addEventListener('submit',(e)=>{
    e.preventDefault();

    //Get message Text
    const msg=e.target.elements.msg.value;

    //Emit messsage
    socket.emit('chatMessage',msg)

    e.target.elements.msg.value ='';
    e.target.elements.msg.focus();
})

//output message to DOM
 function outputMessage(message){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`<p class="meta">${message.userName}<span>  ${ message.time}</span></p>
    <p class="text">
        ${message.textMessage}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
 }