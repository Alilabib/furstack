import createApiActions from '~helpers/createApiActions';
import { ADD_COMMENT } from './constants';

const getCandidateComments = (data, options = {}) =>
  createApiActions({
    type: ADD_COMMENT,
    url: '/company/post/comment',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getCandidateComments;
