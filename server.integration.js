const request = require('supertest-as-promised');
const db = require('./server/db');
const app = require('express')();

describe('Server', () => {
  before(db.connect);
  after(() => db.connection.close());

  let server;
  beforeEach(() => {
    app.set('env', 'test');
    server = app.listen(3001, '0.0.0.0');
  });
  afterEach(done => server.close(done));

  describe('sanity check', () => {
    it('should 404 to /', () => request(server)
      .get('/')
      .expect(404));

    it('should 404 to /some/random/path', () => request(server)
      .get('/some/random/path')
      .expect(404));
  });
});
