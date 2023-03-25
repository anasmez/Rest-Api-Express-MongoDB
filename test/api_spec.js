const supertest = require("supertest");
const assert = require("assert");
const app = require("../index");
const should=require('chai').should();

describe("GET /", function () {
  it("it should has status code 200", function (done) {
    supertest(app).get("/").expect(404, done);
  });
});

describe("User paths", function() {
    it("Get all users", ()=>{
        return supertest(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response, done)=>{
            const users=response.body
            users.should.be.an('array')
            users.forEach(user => {
                user.should.have.property('__v', 0)
                user.should.have.property('_id').be.a('string')
                user.should.have.property('name').be.a('string')
                user.should.have.property('age').be.a('number')
            });
        })
    })
})