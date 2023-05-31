import { db } from '../config/db';

export const queries = {

};

export default {
  transact: (query, data) => db.any(query, data),

  singleTransaction: (query, data) => db.oneOrNone(query, data),

  nestedTransaction: (data) => db.tx(t => {
    const sqlParam = [];
    data.forEach(item => {
      sqlParam.push(t.any(item.query, item.payload));
    });
    return t.batch(sqlParam);
  }),
};
