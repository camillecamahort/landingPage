const server = require ("http").Server();
const port = 10001;

var io = require("socket.io")(server);

var names = [];
var msgs = [];

io.on("connection", function(socket){
    console.log("user has connected");
    
    socket.on("uname", function(data){
        console.log("sent = " +data);
        names.push(data);
        
        //io is the whole server; it is EVERYONE
        io.emit("names", names);
    });
    
    socket.on("sendmsg", function(data){
        console.log("the msg = "+data);
        msgs.push(data);
        
        io.emit("msgs", msgs);
    })
    
    //disconnect -> leaving the page.
    socket.on("disconnect", function(){
        console.log("user has disconnected");
        
    });
});


server.listen(port, (err)=>{
    if(err){
        console.log("error: " + err);
        return false;
    }
    
    console.log("socket port is running");
})