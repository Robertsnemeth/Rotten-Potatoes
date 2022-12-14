const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = parseInt(process.env.SERVER_PORT);
const ORIGIN = process.env.ORIGIN;
const cookieParser = require('cookie-parser');

app.use(express.json(), express.urlencoded({extensions: true}));
app.use(cookieParser());
app.use(cors({credentials: true}));

require("./routes/user.routes")(app);
require("./routes/movie_watchlist.routes")(app);
require("./config/mongoose.config");
require("./config/jwt.config");

app.listen(PORT, () => console.log(`ITS OVER ${PORT}!`));
