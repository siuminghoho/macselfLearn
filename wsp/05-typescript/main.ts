import express from "express";
//import { Request, Response } from "express";

const app = express();

// app.get("/",function(req:Request,res:Response){
//     res.end("Hello World!")
// });


app.use(express.static("public"));
app.use("/images",express.static("uploads"))


const PORT =8080;

// app.listen(PORT,()=>{
// console.log(`Listening at http://localhost:${PORT}/`);


app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}/`);

});









