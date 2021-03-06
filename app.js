const express = require("express");
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/data', require('./routes/data.routes'));
app.use('/api/songs', require('./routes/songs.routes'));

const PORT = config.get("port") || 5050;

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log('server started on port: ', PORT));
    }
    catch (e) { 
        console.log(e.message);
        process.exit(1);
    }
}
start();

