let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var assert = require('assert');

it('Get latitude longitude', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/latlng')
    .send({
      source: 'San Jose state university',
      destination: '1302, The alameda, san jose, ca 95126'
    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Cron Job', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/cronJob')
    .send({
      source: 'San Jose state university',
      destination: '1302, The alameda, san jose, ca 95126'
    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Check user Login', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/checklogin')
    .send({
      email: 'test@gmail.com',
      password: '56789'
    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Register User', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/register')
    .send({
      email: 'test@gmail.com',
      password: '56789',
      firstName: 'name',
      lastName: 'last',
      phone: '8888888888'

    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Get Homepage ', function(done) {
  chai
    .request('http://localhost:3000')
    .get('/api/homepage')
    .send({
      'session.email': 'test@gmail.com',
      'session.name' : 'test'
    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Log out user', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/logout')
    .send({
      'session.id': 1
    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Set route as Favorite', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/setFavorite')
    .send({
      'session.email': 'test@gmail.com'
    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Update user profile', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/latlng')
    .send({
      source: 'San Jose state university',
      destination: '1302, The alameda, san jose, ca 95126'
    })
    .end(function(err, res) {
      assert.equal(res.statusCode, 200);
      done();
    });
});

it('Get Route Travel Time', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/routeTavelTime')
    .send({
      street: 'Casa verde street',
      direction: 'south'
    })
    .end(function(err, res) {
      done();
    });
});

it('Get Route Congestion Rate', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/routeCongestionRate')
    .send({
      source: 'San Jose state university',
      destination: '1302, The alameda, san jose, ca 95126',
      dayOfWeek: 'wednesday',
      timeOfDay: '07:00:00'
    })
    .end(function(err, res) {
      done();
    });
});


it('Get Route Congestion Details', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/routeCongestionDetails')
    .send({
      source: 'San Jose state university',
      destination: '1302, The alameda, san jose, ca 95126',
      dayOfWeek: 'Wednesday',
      timeOfDay: '07:00:00'
    })
    .end(function(err, res) {
      done();
    });
});


it('Get congestion rate for dashboard ', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/userInput')
    .send({
      source: 'San Jose state university',
      destination: '1302, The alameda, san jose, ca 95126'
    })
    .end(function(err, res) {
      done();
    });
});


it('Get Congestion Rate per street', function(done) {
  chai
    .request('http://localhost:3000')
    .post('/api/congestionPerStreet')
    .send({
      source: 'San Jose state university',
      destination: '1302, The alameda, san jose, ca 95126',
      dayOfWeek: 'Wednesday',
      timeOfDay: '07:00:00'
    })
    .end(function(err, res) {
      done();
    });
});
