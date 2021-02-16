const request = require('supertest')
const app = require('../server/index')

describe('GET /', () => {
    it('정상적인 요청, 200', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err,res) => {
                if (err)
                    throw err
                done()
            })
    })
})