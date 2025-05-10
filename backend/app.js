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
    origin: ['https://growthcuration-frontend5.onrender.com', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static('public'));



app.use("/contactform",ContactForm)
app.use("/Review",Reviews)



app.get('/', (req, res) => {
  res.send('Backend is up and running');
});


// Catch 404 errors
app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});



export {app}