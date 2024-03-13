
// TESTING THE API ROUTES
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../app.js');
chai.should();

chai.use(chaiHttp);

// THE POST COMMANDS (see READ ME file)
// Needs to be a new token. Get token : GET /token
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDk2MzY5MzAsImV4cCI6MTcwOTY0MDUzMH0.iLZn_brYZxW-pGKmp_Ezfp5z3sDXMIGEdxO30c_vwKk";
describe('GET /token', () => {
    it('200 HAPPY PATH', (done) => {
        chai.request(server)
            .get("/token")
            .end((err, res) => {
                token = res.body.data.token;
                res.should.have.status(200);
                done();
            });
    });
});

// New user every time
    describe('POST /reports/add"', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/reports/add")
                .set('x-access-token', token)
                .send({title: 'test1', data1: 'test1'})
                .end((err, res) => {
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    // Duplicate, 400 block
    describe('POST /reports/add', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/reports/add")
                .set('x-access-token', token)
                .send({title: 'test1', data1: 'test1'})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    // Duplicate, 400 block
    describe('POST /reports/edit', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/reports/edit")
                .set('x-access-token', token)
                .send({title: 'test123x', data1: 'data2xNew'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    done();
                });
        });
    });
    
    // POST allUsers
    describe('POST /users/allUsers', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/allUsers")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /users/allLoggedOn', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/allLoggedOn")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /users/logout', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/logout")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    done();
                });
        });
    });

    // Set new user for status 200, register
    describe('POST /users/register', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/register")
                .send({email: 'testS1', password: 'testS1', name: 'testS1', birthday: 'testS1'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    done();
                });
        });
    });

    // Duplicate, status 400
    describe('POST /users/register', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/register")
                .send({email: 'testS1', password: 'testS1', name: 'testS1', birthday: 'testS1'})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    // Missing params, status 400
    describe('POST /users/register', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/register")
                .send({email: 'testS', name: 'testS', birthday: 'testS'})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('POST /users/login', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/login")
                .send({email: 'testS1', password: 'testS1'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    done();
                });
        });
    });

    // Same user - decline, user online
    describe('POST /users/login', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/login")
                .send({email: 'testS1', password: 'testS1'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    done();
                });
        });
    });

    // no email, status 400
    describe('POST /users/login', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/users/login")
                .send({password: 'testS'})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    // verify token 
    describe('POST /verifyToken', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/verifyToken")
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    // test error
    describe('POST /error', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/error")
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

