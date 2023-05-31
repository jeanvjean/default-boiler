import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../../../../src/app';

chai.use(chaiHttp);

describe('Test Initializer', () => {
  describe('Init test suit', () => {
    it('should return successful response on test suit', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body.message).to.equal('Welcome');
          done();
        });
    });
  });
});
