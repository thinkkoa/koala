const koala = require('../lib');
const request = require('supertest');

describe('Conditional-Get', () => {
  describe('when a body is set', () => {
    let etag;

    const app = koala();
    app.use(function * (next) {
      this.body = 'hello';
    });

    const server = app.listen();

    test('should set an etag', done => {
      request(server)
        .get('/')
        .expect(200, (err, res) => {
          if (err) return done(err);

          etag = res.headers.etag.slice(1, -1);
          done();
        });
    });

    test('should response 304 w/ if-none-match header', done => {
      request(server)
        .get('/')
        .set('If-None-Match', '"' + etag + '"')
        .expect(304, done);
    });
  });
});
