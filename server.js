var express = require("express");
var cors = require("cors");
// var SERVICE_ACCOUNT = JSON.parse(process.env.SERVICE_ACCOUNT);
var SERVICE_ACCOUNT = require("./js/firebase.json");
var BUCKET = process.env.BUCKET;
var BUCKET_URL = process.env.BUCKET_URL;
var server = express();
server.use(cors());



// Firebase bucket
////// For sending file to mongoose
const fs = require('fs')
const multer = require("multer");
const admin = require("firebase-admin");

const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})
var upload = multer({ storage: storage })
var serviceAccount = SERVICE_ACCOUNT;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: BUCKET_URL,
});
const bucket = admin.storage().bucket(BUCKET);



server.get("/getIp",(req,res)=>{
    res.status(200).send(req.connection.remoteAddress);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("ip is==> "+ip);
})

server.post("/upload", upload.any(), (req, res, next) => {  

 
    bucket.upload(
        req.files[0].path,
        function (err, file, apiResponse) {
            if (!err) {

                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) 

                        res.send({
                            url : urlData[0]
                
                        });
                         try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }
                    }
                })
            }else{
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})

var PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log("Server is running on port: "+PORT);
})