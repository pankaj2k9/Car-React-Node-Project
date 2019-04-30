import client from 'axios';
import { omit, merge } from 'lodash';

merge(client.defaults.headers.common, {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

/* based on https://github.com/erikras/react-redux-universal-hot-example/ */
export default function promiseMiddleWare({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, responseTypes, type } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [SUCCESS, FAILURE] = responseTypes;
      const rest = omit(action, ['promise', 'type', 'responseTypes']);
      next(merge({type}, rest));

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => next(merge({result, type: SUCCESS}, rest)),
        (error) => next(merge({error, type: FAILURE}, rest))
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next(merge({error, type: FAILURE}, rest));
      });

      return actionPromise;
    };
  };
}
