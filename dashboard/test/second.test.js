let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe("Testing Rest Api",()=>{
    it('should return status as 200 for users',(done) => {
        chai.request(`http://localhost:9700`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })

    it('should return status as 404 for user',(done) => {
        chai.request(`http://localhost:9700`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404)
            done()
        })
        .catch((err) => {
            throw err
        })
    })

    it('test adding user',(done) => {
        chai.request(`http://localhost:9700`)
        .post('/addUser')
        .send({"name":"testuser","city":"test","phone":"test","role":"test"})
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
})