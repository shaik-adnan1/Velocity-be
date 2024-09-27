const app = require("./app");
const dotenv = require("dotenv");



// .env config
dotenv.config({
  path: `${__dirname}/config.env`,
});

// Need to connect to a DB
// MONGODB

const port = process.env.PORT;

// Server running here
app.listen(port, () => {
  console.log(`app running successfully on port ${port}`);
});
