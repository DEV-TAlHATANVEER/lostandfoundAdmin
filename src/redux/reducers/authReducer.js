import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_FOUND_CLAIMED_DATA_SUCCESS,
  FETCH_FOUND_CLAIMED_DATA_FAILURE,
  FETCH_ITEMS_DATA_SUCCESS,
  FETCH_ITEMS_DATA_FAILURE,
  FETCH_LOCATION_DATA_SUCCESS,
  FETCH_LOCATION_DATA_FAILURE,
  FETCH_CLAIMS_TARGET_DATA_SUCCESS,
  FETCH_CLAIMS_TARGET_DATA_FAILURE,
  FETCH_COMMON_ITEMS_DATA_SUCCESS,
  FETCH_COMMON_ITEMS_DATA_FAILURE,
  FETCH_VISITORS_DATA_SUCCESS,
  FETCH_VISITORS_DATA_FAILURE,
  FETCH_VOLUME_SERVICE_DATA_SUCCESS,
  FETCH_VOLUME_SERVICE_DATA_FAILURE
} from '../actions/authActions';

const initialState = {
  authenticated: false,
  posts: [], // To store the fetched posts
  foundClaimedData: [], // To store Found vs. Claimed data
  itemsData: [], // To store Items Data
  locationData: [], // To store Location Data
  claimsTargetData: [], // To store Claims vs. Targets data
  commonItemsData: [], // To store Common Items Data
  visitorsData: [], // To store Visitors Data
  volumeServiceData: [], // To store Volume Service Data
  error: null, // To store any errors
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        posts: [], // Clear posts on logout
        foundClaimedData: [],
        itemsData: [],
        locationData: [],
        claimsTargetData: [],
        commonItemsData: [],
        visitorsData: [],
        volumeServiceData: [],
        error: null, // Clear errors on logout
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload, // Update state with fetched posts
        error: null, // Clear any previous errors
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: [], // Clear posts if there's an error
        error: 'Failed to fetch posts', // Set an error message
      };
    case FETCH_FOUND_CLAIMED_DATA_SUCCESS:
      return {
        ...state,
        foundClaimedData: action.payload, // Update state with Found vs. Claimed data
        error: null, // Clear any previous errors
      };
    case FETCH_FOUND_CLAIMED_DATA_FAILURE:
      return {
        ...state,
        foundClaimedData: [],
        error: 'Failed to fetch found and claimed data', // Set an error message
      };
    case FETCH_ITEMS_DATA_SUCCESS:
      return {
        ...state,
        itemsData: action.payload, // Update state with Items Data
        error: null, // Clear any previous errors
      };
    case FETCH_ITEMS_DATA_FAILURE:
      return {
        ...state,
        itemsData: [],
        error: 'Failed to fetch items data', // Set an error message
      };
    case FETCH_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        locationData: action.payload, // Update state with Location Data
        error: null, // Clear any previous errors
      };
    case FETCH_LOCATION_DATA_FAILURE:
      return {
        ...state,
        locationData: [],
        error: 'Failed to fetch location data', // Set an error message
      };
    case FETCH_CLAIMS_TARGET_DATA_SUCCESS:
      return {
        ...state,
        claimsTargetData: action.payload, // Update state with Claims vs. Targets data
        error: null, // Clear any previous errors
      };
    case FETCH_CLAIMS_TARGET_DATA_FAILURE:
      return {
        ...state,
        claimsTargetData: [],
        error: 'Failed to fetch claims vs. targets data', // Set an error message
      };
    case FETCH_COMMON_ITEMS_DATA_SUCCESS:
      return {
        ...state,
        commonItemsData: action.payload, // Update state with Common Items Data
        error: null, // Clear any previous errors
      };
    case FETCH_COMMON_ITEMS_DATA_FAILURE:
      return {
        ...state,
        commonItemsData: [],
        error: 'Failed to fetch common items data', // Set an error message
      };
    case FETCH_VISITORS_DATA_SUCCESS:
      return {
        ...state,
        visitorsData: action.payload, // Update state with Visitors Data
        error: null, // Clear any previous errors
      };
    case FETCH_VISITORS_DATA_FAILURE:
      return {
        ...state,
        visitorsData: [],
        error: 'Failed to fetch visitors data', // Set an error message
      };
    case FETCH_VOLUME_SERVICE_DATA_SUCCESS:
      return {
        ...state,
        volumeServiceData: action.payload, // Update state with Volume Service Data
        error: null, // Clear any previous errors
      };
    case FETCH_VOLUME_SERVICE_DATA_FAILURE:
      return {
        ...state,
        volumeServiceData: [],
        error: 'Failed to fetch volume service data', // Set an error message
      };
    default:
      return state;
  }
};

export default authReducer;
