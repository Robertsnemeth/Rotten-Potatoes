const mongoose = require("mongoose");
require('dotenv').config();
const DB = process.env.MONGODB;

mongoose.connect(`${DB}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Established connection to database"))
    .catch(() => console.log("Something went wrong when connecting to the database"));
