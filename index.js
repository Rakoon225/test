import express from 'express'
import router from './router.js'

const port = 5000;
const app = express();

app.use(express.json())
app.use('/api', router)

async function startApp(){
    try {
        app.listen(port, () => {console.log('Сервер запущен на порте ' + port)})
    } catch (err) {
        res.status(500).json(err)
    }
}

startApp()
