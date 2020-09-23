// 백엔드 시작점
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sne12345:skdms0427!@boiler-plate.bpa9s.mongodb.net/NAEUN?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~~~~~!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})