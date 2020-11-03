import {
  CREATE_JOB,
  GET_JOB_TYPES,
  CREATE_QUIZZ_OPTIONS,
  UPDATE_QUIZZ_OPTIONS,
  REMOVE_QUIZZ_OPTIONS,
  GET_JOB_LIST,
  SET_JOB_DATA,
  CLEAR_JOB_DATA,
  GET_COMPANY_ADDRESS,
  GET_UNIVERSITY_LIST,
  GET_NATIONALITY_LIST,
  GET_GOVERNORATE_LIST,
  GET_JOB_CANDIDATE,
  SET_JOB_DETAIL_DATA,
  CLEAR_JOB_DETAIL_DATA,
  GET_CANDIDATE_DETAIL,
  GET_CANDIDATE_COMMENTS,
  ADD_COMMENT,
  CREATE_CUSTOM_CATEGORY,
  GET_CUSTOM_CATEGORIES,
  GET_JOB_CATEGORY
} from "../actions/constants";

const initialState = {
  addJobData: {
    features: []
  },
  jobDetailData: {},
  isLoadingCustomCategory: 0,
  isLoadingCandidateDetail: 0,
  jobsListLoading: 0,
  jobsList: [],
  jobsCount: 0,
  jobTypesLoading: 0,
  jobTypesList: [],
  createJobLoading: 0,
  companyAddressLoading: 0,
  companyAddressList: [],
  universityListLoading: 0,
  universityList: [],
  nationalityListLoading: 0,
  nationalityList: [],
  governorateListLoading: 0,
  governorateList: [],
  degreeListLoading: 0,
  degreeList: [],
  isLoadingJobCandidate: 0,
  jobCandidate: [],
  isLoadingCustomCategories: 0,
  customCategories: [],
  isLoadingjobCategories: 0,
  jobCategories: [],

  quizzOptions: {
    location: [],
    choose: [],
    multiple: [],
    evaluation: [],
    "video-recording": [],
    basicFilter: []
  }
};

const jobsReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_JOB_DATA:
      return {
        ...state,
        addJobData: { ...state.addJobData, ...payload }
      };
    case CLEAR_JOB_DATA:
      return { ...state, addJobData: {}, quizzOptions: [] };

    case SET_JOB_DETAIL_DATA:
      return {
        ...state,
        jobDetailData: { ...state.jobDetailData, ...payload }
      };
    case CLEAR_JOB_DETAIL_DATA:
      return { ...state, jobDetailData: {} };

    // job types list
    case GET_JOB_TYPES:
      return { ...state, jobTypesLoading: 1 };
    case `${GET_JOB_TYPES}_SUCCESS`:
      return {
        ...state,
        jobTypesLoading: 0,
        jobTypesList: payload
      };
    case `${GET_JOB_TYPES}_FAIL`:
      return { ...state, jobTypesLoading: 0 };

    // get job category
    case GET_JOB_CATEGORY:
      return { ...state, isLoadingjobCategories: 1 };
    case `${GET_JOB_CATEGORY}_SUCCESS`:
      return {
        ...state,
        isLoadingjobCategories: 0,
        jobCategories: payload
      };
    case `${GET_JOB_CATEGORY}_FAIL`:
      return { ...state, isLoadingjobCategories: 0 };

    // job candidate detail
    case GET_CANDIDATE_DETAIL:
      return { ...state, isLoadingCandidateDetail: 1 };
    case `${GET_CANDIDATE_DETAIL}_SUCCESS`:
      return {
        ...state,
        isLoadingCandidateDetail: 0,
        jobDetailData: { ...state.jobDetailData, selectedUser: payload }
      };
    case `${GET_CANDIDATE_DETAIL}_FAIL`:
      return { ...state, isLoadingCandidateDetail: 0 };

    // job candidate comment
    // case GET_CANDIDATE_DETAIL:
      // return { ...state, isLoadingCandidateDetail: 1 };
      case `${GET_CANDIDATE_COMMENTS}_SUCCESS`:
        return {
          ...state,
          isLoadingCandidateComments: 0,
          jobDetailData: { ...state.jobDetailData, comments: payload }
        };
      case `${GET_CANDIDATE_COMMENTS}_FAIL`:
        return { ...state, isLoadingCandidateComments: 0 };

    // job add candidate comment
    // case GET_CANDIDATE_DETAIL:
      // return { ...state, isLoadingCandidateDetail: 1 };
      case `${ADD_COMMENT}_SUCCESS`:
        return {
          ...state,
          isLoadingCandidateComments: 0,
          jobDetailData: { ...state.jobDetailData, comments: [...state.jobDetailData.comments,payload] }
        };
      case `${ADD_COMMENT}_FAIL`:
        return { ...state, isLoadingCandidateComments: 0 };
    
    // job candidate detail
    case GET_CUSTOM_CATEGORIES:
      return { ...state, isLoadingCustomCategories: 1 };
    case `${GET_CUSTOM_CATEGORIES}_SUCCESS`:
      return {
        ...state,
        isLoadingCustomCategories: 0,
        customCategories: payload
      };
    case `${GET_CUSTOM_CATEGORIES}_FAIL`:
      return { ...state, isLoadingCustomCategories: 0 };

    // create custom category
    case CREATE_CUSTOM_CATEGORY:
      return { ...state, isLoadingCustomCategory: 1 };
    case `${CREATE_CUSTOM_CATEGORY}_SUCCESS`:
      return {
        ...state,
        isLoadingCustomCategory: 0
      };
    case `${CREATE_CUSTOM_CATEGORY}_FAIL`:
      return { ...state, isLoadingCustomCategory: 0 };

    // job types list
    case GET_JOB_CANDIDATE:
      return { ...state, isLoadingJobCandidate: 1 };
    case `${GET_JOB_CANDIDATE}_SUCCESS`:
      return {
        ...state,
        isLoadingJobCandidate: 0,
        jobCandidate: payload
      };
    case `${GET_JOB_CANDIDATE}_FAIL`:
      return { ...state, isLoadingJobCandidate: 0 };

    // get company adress
    case GET_COMPANY_ADDRESS:
      return { ...state, companyAddressLoading: 1 };
    case `${GET_COMPANY_ADDRESS}_SUCCESS`:
      return {
        ...state,
        companyAddressLoading: 0,
        companyAddressList: payload
      };
    case `${GET_COMPANY_ADDRESS}_FAIL`:
      return { ...state, companyAddressLoading: 0 };

    // get universities
    case GET_UNIVERSITY_LIST:
      return { ...state, universityListLoading: 1 };
    case `${GET_UNIVERSITY_LIST}_SUCCESS`:
      return {
        ...state,
        universityListLoading: 0,
        universityList: payload.universities,
        degreeList: payload.degrees
      };
    case `${GET_UNIVERSITY_LIST}_FAIL`:
      return { ...state, universityListLoading: 0 };

    // get nationality
    case GET_NATIONALITY_LIST:
      return { ...state, nationalityListLoading: 1 };
    case `${GET_NATIONALITY_LIST}_SUCCESS`:
      return {
        ...state,
        nationalityListLoading: 0,
        nationalityList: payload
      };
    case `${GET_NATIONALITY_LIST}_FAIL`:
      return { ...state, nationalityListLoading: 0 };

    // get governrate
    case GET_GOVERNORATE_LIST:
      return { ...state, governorateListLoading: 1 };
    case `${GET_GOVERNORATE_LIST}_SUCCESS`:
      return {
        ...state,
        governorateListLoading: 0,
        governorateList: payload
      };
    case `${GET_GOVERNORATE_LIST}_FAIL`:
      return { ...state, governorateListLoading: 0 };

    // jobs list
    case GET_JOB_LIST:
      return { ...state, jobsListLoading: 1 };
    case `${GET_JOB_LIST}_SUCCESS`:
      return {
        ...state,
        jobsListLoading: 0,
        jobsList: payload.jobsList,
        jobsCount: payload.jobsCount
      };
    case `${GET_JOB_LIST}_FAIL`:
      return { ...state, jobsListLoading: 0 };

    // create job
    case CREATE_JOB:
      return { ...state, createJobLoading: 1 };
    case `${CREATE_JOB}_SUCCESS`:
      return {
        ...state,
        createJobLoading: 0
      };
    case `${CREATE_JOB}_FAIL`:
      return { ...state, createJobLoading: 0 };

    case CREATE_QUIZZ_OPTIONS:
      return { ...state, quizzOptions: { ...state.quizzOptions, ...payload } };
    case REMOVE_QUIZZ_OPTIONS:
    case UPDATE_QUIZZ_OPTIONS:
      return { ...state, quizzOptions: { ...payload } };

    default:
      return state;
  }
};

export default jobsReducer;
