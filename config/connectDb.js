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

/* 
not working with createConnection because
Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.
That’s because mongoose buffers model function calls internally. This buffering is convenient, but also a common source of confusion.
Mongoose will not throw any errors by default if you use a model without connecting.
*/

// const connectDB = (url) => {
//   const dbString = url;
//     const dbOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     }

//     const connection = mongoose.createConnection(dbString, dbOptions);
//     connection.on('connected', () => {
//         console.log('connected successfully');
//     });
// };

