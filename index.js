const express = require('express')
const path = require('path')
const dbConnection = require('./src/config/db')
const userRouter = require('./src/routes/user.routes')
const cors = require('cors')
const productRouter = require('./src/routes/product.routes')
const app = express()
require('dotenv').config()

let port = process.env.PORT || 4000

//for production
const allowedOrigins = ['https://infiny-school.netlify.app/','https://frontend-git-main-suraj-yadavs-projects.vercel.app/', 'http://localhost:3000/', ];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// local use
// app.use(cors());

// for ejs
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// for tailwind css
app.use(express.static(path.join(__dirname,'public')));

//middleware
app.use(express.json())
//home route
app.get('/',(req,res)=>{
  return res.render("index",{name:"Home"})
})

// all routes
app.use('/user',userRouter)
app.use('/products',productRouter)

app.listen(port,async()=>{
  try {
    dbConnection()
    console.log(`server is running on port ${port}`)
  } catch (error) {
    console.log("error in listen port")
  }

})