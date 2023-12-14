require("dotenv").config();
const httpServer = require("http").createServer();

const io = require("socket.io")(7000, {
    cors:{
        origin: process.env.FrontendUrl,
    }
})

var users = []
io.on("connect", (socket)=>{
    console.log(`User ${socket.id} Connected`)
    io.emit("welcome", socket.id)

    try{
        
    }
    catch(err){

    }

    socket.on("addUser", userID =>{
        const exist = users.some(user=>(user[0]==userID))
        !exist && users.push([userID, socket.id])
        if (exist){
          const filtered =  users.filter((user)=>(user[0]!=userID))
          users = [...filtered]
          users.push([userID, socket.id])
        }
        
    })
    socket.on("sentMessage", ({reciever, sender, conversation})=>{
        io.emit("newMessage", conversation)
    })

    socket.on("disconnect", ()=>{
        io.emit("bye", "socket")
        
    })
    
})
