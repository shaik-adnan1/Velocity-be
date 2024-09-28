const { default: mongoose } = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

// .env config
dotenv.config({
  path: `${__dirname}/config.env`,
});

// Need to connect to a DB
// MONGODB
console.log(
  "process.env.DATABASE",
  process.env.DATABASE,
  process.env.DB_PASSWORD
);
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

// connecting to DB using mongoose
mongoose
  .connect(DB)
  .then((res) => {
    console.log(res.body);
    console.log("DB connected Successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("error connecting to DB");
  });

const port = process.env.PORT;

// Server running here
app.listen(port, () => {
  console.log(`app running successfully on port ${port}`);
});
