const express = require("express")
const app = express()
const pool = require('./config/database');
require('dotenv').config({path:   `${process.cwd()}/.env`})
// const config = require('./config').env()
// importing rouute
const authRouter = require('./route/authRoute')
const catchAsync = require('./utiles/catchAsync')
const appError = require("./utiles/appError")
const gobalErrorHandler = require("./controller/errorController")
const getUserDetail = require("./route/userRoute")
const organisations = require("./route/organisationRoute")
const PORT = process.env.port || 4000;
const isAuth = require("./middleware/authenticate")
app.use(express.json());



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', isAuth,getUserDetail)
app.use('/api/v1/organisations', isAuth,organisations)



app.use('*', catchAsync(async(req,res, next) => {
    throw new appError(`Can't find ${req.originalUrl} on this server`, 404)
}))

app.use(gobalErrorHandler)

pool.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


