  //create http(core module) step:1
const http = require("http"); 

//create port on which port server run  step:2
const port = 2005; 

// create port handler to serve something we create
// in port handler there are two argument request and respond 
const portHandler=(req,res)=>{
    res.write("<h1>Server Started on port:2005</h1>")
    res.end()
}

// create server with method .createServer()
const server= http.createServer(portHandler)

// server listen me on which port server run and if err comes then show err otherwise show that server started sccessfully
server.listen(port,(err)=>{
    // if(err)
    // {
    //     console.log(err);
    // }
    // else{
    //     console.log("Server Started on port:"+ port);
    // }
    err?console.log(err):console.log("Server Started on port:"+ port);
    
    

})