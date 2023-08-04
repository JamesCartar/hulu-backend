const mongoose = require("mongoose");

const connectDB = (url) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Database Connected Successfully'); 
    })
    .catch(e => {
      console.log(e)
    })
};

module.exports = connectDB;

