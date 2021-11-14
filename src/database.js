const mongoose = require('mongoose')

const adminuser = 'admin';
const adminpassword = 'admin';
const dbname = 'dashboard-app';

const url = `mongodb+srv://${adminuser}:${adminpassword}@dashboard-app.bkckt.mongodb.net/${dbname}?retryWrites=true&w=majority`

const connectionParams = {
    useNewUrlParser: true,
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })