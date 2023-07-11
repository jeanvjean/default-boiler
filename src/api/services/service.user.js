import * as Query from '../../lib/queries/lib.query.user';
import DB from '../../services/service.db';

export const getUsers = payload => DB.transact(Query.createUserAccount, [ ...payload ]);
