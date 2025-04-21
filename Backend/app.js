import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import session from "express-session"
import ContactForm from "./routes/contactform.router.js"
import Reviews from "./routes/review.router.js"

dotenv.config({
    path:'./.env'
})

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'None',
      maxAge: 3600000 
    }
  }));
  
app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],       
    credentials: true  
  }));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))



app.use("/contactform",ContactForm)
app.use("/Review",Reviews)




export {app}