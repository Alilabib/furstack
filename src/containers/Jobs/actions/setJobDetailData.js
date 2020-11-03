import { SET_JOB_DETAIL_DATA, CLEAR_JOB_DETAIL_DATA } from './constants';

const setJobDetailData = (data) => (disptach) => {
  if (data === null) {
    disptach({ type: CLEAR_JOB_DETAIL_DATA });
  } else {
    disptach({ type: SET_JOB_DETAIL_DATA, payload: data });
  }
};

export default setJobDetailData;
