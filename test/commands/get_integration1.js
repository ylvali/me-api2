
// TESTING THE API ROUTES
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../app.js');
chai.should();

chai.use(chaiHttp);

// THE GET COMMANDS 
describe('Gets', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('GET /hello', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/hello")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /hello/test', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/hello/test")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /token', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/token")
                .end((err, res) => {
                   // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('GET /reports/week/3', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/3")
                .end((err, res) => {
                   // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('GET /reports/all', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/3")
                .end((err, res) => {
                   // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    // Test the error path
    describe('GET /error', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/error")
                .end((err, res) => {
                   // console.log(res);
                    res.should.have.status(404);
                    done();
                });
        });
    });
});