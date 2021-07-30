const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
const path = require('path');

const app = express();
//const bodyParser = require('body-parser');

connectDB();

//Set Cors
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

//app.use(bodyParser.json())

//app.get("/", (req, res) => res.send("Eteam Appplication works!! ") );

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/employer', require('./routes/api/employer'));
app.use('/api/empprofile', require('./routes/api/empprofile'));
app.use('/api/job', require('./routes/api/job'));

//Server static assests in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))

    })
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))