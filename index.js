// 백엔드 시작점
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require("./User")
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json 파일을 가져옴
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~~~~~! 추석 잘 보내세요~~')
})


app.post('/register',(req, res) => {

  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
    console.log(err)
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login',(req, res) => {

  // 요청된 이메일은 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(err)
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    // 요청된 이메일이 데이버테이스에 있다면, 비밀번호가 맞는 비번인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log(err)
      if(!isMatch) 
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        console.log(err)
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에?  쿠키, 로컬스토리지
        res.cookie("x_auth", user.token)  
        .status(200)
        .json({ loginSuccess: true, userId: user._id})

      })
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})