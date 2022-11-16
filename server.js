const path =require('path')
const express=require('express')
const app=express();
const http =require('http')
const socketio=require('socket.io');

const formatMessage=require('./tools/message')
const {userJoin,getCurentuser}=require('./tools/users')


const server=http.createServer(app)

const io=socketio(server)



const port =3000 || process.env.port;

app.use(express.static(path.join(__dirname,'_html_css')))


//run clien connection
const Admin='Admin'
io.on('connection',socket=>{
    socket.on('joinRoom',({username ,room})=>{
        const user=userJoin(socket.id,username,room)
        
        // welcom current user
        socket.emit('message',formatMessage(Admin,'welcome to chat record'))

        // broadcast if a user connect
        socket.broadcast.to(user.room).emit('message',formatMessage(Admin,`${user.username} join a chat`));
    
    })
    //listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        const user=getCurentuser(socket.id);
        io.emit('message',formatMessage(user,msg));
    });

    // runs when client disconnect
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(Admin,'A user has disconnect'))
    })

})



server.listen(port,()=>{console.log("app listen in 3000");})