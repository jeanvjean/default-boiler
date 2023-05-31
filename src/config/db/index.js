import 'dotenv/config';
import pgp from 'pg-promise';
import promise from 'bluebird';
import detectPort from 'detect-port';
import config from '../setup';
import { logger } from '../logger';

const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg(config.DATABASE_URL);

const connection = (app, port) => new Promise(resolve => {
  port = port || (detectPort());
  const server = app.listen(port, () => {
    logger.log(`Listening on port ${server.address().port}`, 'src.config.db::index.js');
    const originalClose = server.close.bind(server);
    server.close = () => new Promise(resolveClose => {
      originalClose(resolveClose);
    });
    db
      .connect()
      .then(conn => {
        logger.log(
          `connected to ${conn.client.database} database`,
          'src.config.db::index.js',
        );
      })
      .catch(err => {
        logger.log(err, 'src.config.db::index.js');
      });
  });
  resolve(server);
});

export { db, connection };
