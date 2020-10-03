const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,     // 스페이스 없애주는 역할
        unique: 1
    },
    password: {
        type: String
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')){
        // 비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 123   암호화된 비밀번호 $2b$10$gvTB5gyN3MxoSiWHKJfpDOsyukMsojGpYbEZ99LVnEOqdIIncsWJa
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    // jsonwebToken을 이용해서 토큰을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}
