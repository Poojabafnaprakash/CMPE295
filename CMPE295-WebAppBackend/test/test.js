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

it('Check user Login', function(done) {
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

it('Register User', function(done) {
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

it('Get Homepage ', function(done) {
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

it('Log out user', function(done) {
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

it('Set route as Favorite', function(done) {
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

it('Get Route Congestion Rate', function(done) {
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


it('Get Route Congestion Details', function(done) {
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


it('Get congestion rate for dashboard ', function(done) {
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


it('Get Congestion Rate per street', function(done) {
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
