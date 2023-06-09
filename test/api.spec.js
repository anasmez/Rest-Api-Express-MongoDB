const supertest = require("supertest");
const assert = require("assert");
const app = require("../index");
const should=require('chai').should();
const {faker}=require('@faker-js/faker')

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
        .then((response)=>{
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
    it("Create user", (done)=>{
      supertest(app)
      .post('/api/user')
      .send({
        name: faker.name.fullName(),
        age: faker.random.numeric(2)
      })
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it("Create user", (done)=>{
    supertest(app)
    .post('/api/user')
    .expect(400, done)
  })
})