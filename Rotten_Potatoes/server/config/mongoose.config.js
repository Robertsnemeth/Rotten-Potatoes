const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/rotten_potatoes",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Established connection to database"))
    .catch(() => console.log("Something went wrong when connecting to the database"));
