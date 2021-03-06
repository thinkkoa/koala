const koala = require('../lib');
const request = require('supertest');

describe('Nested Query Strings', () => {
  describe('when options.qs = false', () => {
    test('should not support nested query strings', done => {
      const app = koala();
      app.use(function * (next) {
        this.response.body = this.request.query;
      });

      request(app.listen())
        .get('/')
        .query({
          something: {
            nested: true
          }
        })
        .expect(200)
        .expect({
          'something[nested]': 'true'
        }, done);
    });
  });

  describe('when options.qs = true', () => {
    test('should support nested query strings', done => {
      const app = koala({
        qs: true
      });
      app.use(function * (next) {
        this.response.body = this.request.query;
      });

      request(app.listen())
        .get('/')
        .query({
          something: {
            nested: true
          }
        })
        .expect(200)
        .expect({
          something: {
            nested: 'true'
          }
        }, done);
    });
  });
});
