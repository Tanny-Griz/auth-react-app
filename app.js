const express = require('express') // глоб ф-я
const config = require('config')
const mongoose = require('mongoose') // подключ к mongodb, нужен метод connect для подк к БД, этот метод возвр промис, нужен асинк

const app = express() // рез раб будущ сервер

//middleware 
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        } ) // url по котор добав БД, 2 пар-р опции
        app.listen(PORT, () => console.log(`app started on PORT ${PORT}...`)) // запуск серв на порте. раб с конфигом     
    } catch (e) {
        console.log('Server error', e.message)
         process.exit(1) // выйти из процесса node js, с пом обьекта process и его метода
    }

}

start()

