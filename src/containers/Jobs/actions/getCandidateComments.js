import createApiActions from '~helpers/createApiActions';
import { GET_CANDIDATE_COMMENTS } from './constants';

const getCandidateComments = (data, options = {}) =>
  createApiActions({
    type: GET_CANDIDATE_COMMENTS,
    url: '/company/post/comment/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getCandidateComments;
