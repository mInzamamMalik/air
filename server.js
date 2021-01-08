var express = require("express");
var cors = require("cors");
var server = express();
var PORT = process.env.PORT || 5000;

server.use(cors());


server.get("/getIp",(req,res)=>{
        res.send(req.connection.remoteAddress);
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log("ip is==> "+ip);
    })

server.listen(PORT,()=>{
    console.log("Server is running on port: "+PORT);
})