const app = require('./app');
const dotenv = require('dotenv');



dotenv.config({
    path: `${__dirname}/config.env`
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app running successfully on port ${port}`);
})