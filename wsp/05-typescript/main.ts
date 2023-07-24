import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import jsonfile from "jsonfile";
import formidable from "formidable";
import fs from "fs";

const app = express();
app.use(cookieParser())
let counter = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
    expressSession({
        secret: "any secret,something,anything",
        resave: true,
        saveUninitialized: true,
    })
);

// declare module "express-session" {
//     interface SessionData {
//         counter?: number;
//         username?: string;
//     }
// }


app.use(function (req, res, next) {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, { expires: new Date(Date.now() + 300000) });
        console.log('cookie created success')
    } else {
        console.log('cookie exists', cookie);
    }
    next();

})


app.use((req: Request, res: Response, next: NextFunction) => {
    counter += 1;
    req.session["counter"] = counter;
    console.log("Session Counter: ", req.session["counter"]);
    console.log("request from: ", req.ip);
    console.log("sessionID: ", req.sessionID);
    console.log(`[${new Date().toISOString()}]:${req.path}`)
    next();
});

app.get("/testing", (req: Request, res: Response) => {
    console.log(`usesr's session counter: ${req.session["counter"]}`);
    res.status(200).json({ message: "Ok" });
});

app.use(express.static(path.join(__dirname, "public")));
app.use((req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "404.html"));
});


app.get("username/:username", function (req: Request, res: Response) {
    const name = req.query.name;
    res.end(`Name is ${name}`);
});


app.post("/memos", function (req, res) {
    const content = req.body.content;

    const memo = { content: content }




})


//----------------formidable-----------//

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: (1024 ** 2) * 200, // the default limit is 1KB * 200
    filter: (part) => part.mimetype?.startsWith("image/") || false,
});


app.post("/contact", (req, res) => {
    form.parse(req, (err, fields, files) => {
      console.log({ err, fields, files });
      res.redirect("/");

    });
});




const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);

});







