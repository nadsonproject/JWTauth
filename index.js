const env = require('dotenv');
env.config();

const express = require('express');
const app = express();

const { check } = require('./models/model')
const { router } = require('./routers/router')

app.use(express.json())
app.use('/user', router)

const PORT = process.env.PORT || 3002;


const start = async () => {
    try {
        await check()
        app.listen(PORT, () => console.log(`Server start`));
    } catch (error) {
        console.log(error)
    }
}

start()