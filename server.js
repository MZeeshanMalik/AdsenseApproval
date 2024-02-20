const mongoose = require("mongoose");
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

const DB = process.env.DATABASE_LOCAL;
console.log(process.env.NODE_ENV)
mongoose.connect(DB , {
    useNewUrlParser: true
}).then((conn)=>{
    console.log("connection to database established");
});

// server setup 
const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });