// actions.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_FOUND_CLAIMED_DATA_SUCCESS = 'FETCH_FOUND_CLAIMED_DATA_SUCCESS';
export const FETCH_FOUND_CLAIMED_DATA_FAILURE = 'FETCH_FOUND_CLAIMED_DATA_FAILURE';
export const FETCH_ITEMS_DATA_SUCCESS = 'FETCH_ITEMS_DATA_SUCCESS';
export const FETCH_ITEMS_DATA_FAILURE = 'FETCH_ITEMS_DATA_FAILURE';
export const FETCH_LOCATION_DATA_SUCCESS = 'FETCH_LOCATION_DATA_SUCCESS';
export const FETCH_LOCATION_DATA_FAILURE = 'FETCH_LOCATION_DATA_FAILURE';
export const FETCH_CLAIMS_TARGET_DATA_SUCCESS = 'FETCH_CLAIMS_TARGET_DATA_SUCCESS';
export const FETCH_CLAIMS_TARGET_DATA_FAILURE = 'FETCH_CLAIMS_TARGET_DATA_FAILURE';
export const FETCH_COMMON_ITEMS_DATA_SUCCESS = 'FETCH_COMMON_ITEMS_DATA_SUCCESS';
export const FETCH_COMMON_ITEMS_DATA_FAILURE = 'FETCH_COMMON_ITEMS_DATA_FAILURE';
export const FETCH_VISITORS_DATA_SUCCESS = 'FETCH_VISITORS_DATA_SUCCESS';
export const FETCH_VISITORS_DATA_FAILURE = 'FETCH_VISITORS_DATA_FAILURE';
export const FETCH_VOLUME_SERVICE_DATA_SUCCESS = 'FETCH_VOLUME_SERVICE_DATA_SUCCESS';
export const FETCH_VOLUME_SERVICE_DATA_FAILURE = 'FETCH_VOLUME_SERVICE_DATA_FAILURE';

export const login = (email, password) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:4000/admin/adminlogin', {
      email,
      password
    });
    const { token } = response.data;
    await AsyncStorage.setItem('token', token);
    dispatch({ type: LOGIN_SUCCESS });
    return Promise.resolve();
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    dispatch({ type: LOGIN_FAILURE });
    return Promise.reject();
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

export const fetchPosts = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('http://localhost:4000/admin/allposts', {
      headers: { Authorization: `${token}` }
    });

    const posts = response.data.posts;
    const formattedPosts = posts.map(post => ({
      id: post._id,
      userId: post.user,
      type: post.type,
      name: post.name,
      category: post.category,
      brand: post.brand,
      color: post.color.trim(),
      datePosted: post.datePosted,
      dateOfItem: post.dateOfItem,
      location: post.location,
      description: post.description,
      images: post.images,
      questions: post.questions,
      options: post.options,
      expirationDate: post.expirationDate,
      isExpired: post.isExpired,
      isDeleted: post.isDeleted,
      isFavorite: post.isFavorite,
      comments: post.comments,
      claimedBy: post.claimedBy,
      locationDetails: post.locationDetails,
    }));

    dispatch({ type: FETCH_POSTS_SUCCESS, payload: formattedPosts });

    // Dispatch other actions based on formattedPosts
    dispatch(fetchFoundClaimedData(formattedPosts));
    dispatch(fetchItemsData(formattedPosts));
    dispatch(fetchLocationData(formattedPosts));
    dispatch(fetchClaimsTargetData(formattedPosts));
    dispatch(fetchCommonItemsData(formattedPosts));
    dispatch(fetchVisitorsData(formattedPosts));
    dispatch(fetchVolumeServiceData(formattedPosts));

  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.data : error.message);
    dispatch({ type: FETCH_POSTS_FAILURE });
  }
};

// Helper functions to process formattedPosts and dispatch relevant actions

export const fetchFoundClaimedData = (posts) => dispatch => {
  try {
    const foundClaimedData = posts.reduce((acc, post) => {
      const day = new Date(post.datePosted).toLocaleDateString('en-US', { weekday: 'short' });
      const foundIndex = acc.findIndex(data => data.day === day);
      if (foundIndex >= 0) {
        acc[foundIndex].found += 1;
        if (post.claimedBy) {
          acc[foundIndex].claimed += 1;
        }
      } else {
        acc.push({
          day,
          found: 1,
          claimed: post.claimedBy ? 1 : 0
        });
      }
      return acc;
    }, []);

    dispatch({ type: FETCH_FOUND_CLAIMED_DATA_SUCCESS, payload: foundClaimedData });
  } catch (error) {
    console.error('Error processing found and claimed data:', error);
    dispatch({ type: FETCH_FOUND_CLAIMED_DATA_FAILURE });
  }
};

export const fetchItemsData = (posts) => dispatch => {
  try {
    const monthlyData = posts.reduce((acc, post) => {
      const month = new Date(post.datePosted).toLocaleDateString('en-US', { month: 'short' });
      const monthData = acc.find(data => data.month === month);
      
      if (monthData) {
        monthData.lost += 1;
        if (post.found) monthData.found += 1;
      } else {
        acc.push({
          month,
          lost: 0,
          found: post.found ? 0 : 1
        });
      }
      return acc;
    }, []);

    dispatch({ type: FETCH_ITEMS_DATA_SUCCESS, payload: monthlyData });
  } catch (error) {
    console.error('Error processing items data:', error);
    dispatch({ type: FETCH_ITEMS_DATA_FAILURE });
  }
};
const countryIdMapping = {
  'Pakistan': "586",
  'India': 2,
  // Add other countries and their IDs as needed
};

export const fetchLocationData = (posts) => dispatch => {
  try {
    const locationData = posts.reduce((acc, post) => {
      const location = post.location;
      if (location) {
        // Extract the country from the location string
        const country = location.split(',').pop().trim();
        // Get the corresponding countryId from the mapping
        const countryId = countryIdMapping[country] || null;

        // Check if the country already exists in the array
        const existing = acc.find(data => data.countryName === country);
        if (!existing) {
          acc.push({
            countryId: countryId, // Add the countryId to the data
            countryName: country,
            fillColor: 'red' // Use appropriate logic to determine fillColor
          });
        }
      }
      return acc;
    }, []);

    dispatch({ type: FETCH_LOCATION_DATA_SUCCESS, payload: locationData });
  } catch (error) {
    console.error('Error processing location data:', error);
    dispatch({ type: FETCH_LOCATION_DATA_FAILURE });
  }
};

export const fetchClaimsTargetData = (posts) => dispatch => {
  try {
    const claimsTargetData = posts.reduce((acc, post) => {
      const month = new Date(post.datePosted).toLocaleDateString('en-US', { month: 'short' });
      const monthData = acc.find(data => data.month === month);
      if (monthData) {
        monthData.reality += post.claimedBy ? 1 : 0;
        monthData.target += 1;
      } else {
        acc.push({
          month,
          reality: post.claimedBy ? 1 : 0,
          target: 1
        });
      }
      return acc;
    }, []);

    dispatch({ type: FETCH_CLAIMS_TARGET_DATA_SUCCESS, payload: claimsTargetData });
  } catch (error) {
    console.error('Error processing claims vs. targets data:', error);
    dispatch({ type: FETCH_CLAIMS_TARGET_DATA_FAILURE });
  }
};

export const fetchCommonItemsData = (posts) => dispatch => {
  try {
    const itemFrequency = posts.reduce((acc, post) => {
      const itemName = post.name;
      if (itemName) {
        const existing = acc.find(item => item.name === itemName);
        if (existing) {
          existing.popularityPercent += 1;
          if (post.found) existing.foundPercent += 1;
        } else {
          acc.push({
            id: acc.length + 1,
            name: itemName,
            popularityPercent: 1,
            foundPercent: post.found ? 1 : 0
          });
        }
      }
      return acc;
    }, []);

    dispatch({ type: FETCH_COMMON_ITEMS_DATA_SUCCESS, payload: itemFrequency });
  } catch (error) {
    console.error('Error processing common items data:', error);
    dispatch({ type: FETCH_COMMON_ITEMS_DATA_FAILURE });
  }
};

export const fetchVisitorsData = (posts) => dispatch => {
  try {
    const visitorsData = posts.reduce((acc, post) => {
      const month = new Date(post.datePosted).toLocaleDateString('en-US', { month: 'short' });
      const monthData = acc.find(data => data.month === month);
      if (monthData) {
        monthData.new_users += post.user ? 1 : 0;
        monthData.total_users += 1;
      } else {
        acc.push({
          month,
          new_users: post.user ? 1 : 0,
          returning_users: 0, // Adjust if needed
          total_users: 1
        });
      }
      return acc;
    }, []);

    dispatch({ type: FETCH_VISITORS_DATA_SUCCESS, payload: visitorsData });
  } catch (error) {
    console.error('Error processing visitors data:', error);
    dispatch({ type: FETCH_VISITORS_DATA_FAILURE });
  }
};

export const fetchVolumeServiceData = (posts) => dispatch => {
  try {
    const volumeServiceData = [
      { name: "Lost Items", volume: 0, services: 0 },
      { name: "Found Items", volume: 0, services: 0 },
      { name: "Returned Items", volume: 0, services: 0 },
      { name: "Notifications Sent", volume: 0, services: 0 },
      { name: "Claims Processed", volume: 0, services: 0 },
      { name: "Inquiries", volume: 0, services: 0 },
      { name: "Resolved Cases", volume: 0, services: 0 }
    ];

    posts.forEach(post => {
      const serviceType = post.serviceType; // Adjust based on your data
      if (serviceType) {
        const data = volumeServiceData.find(item => item.name === serviceType);
        if (data) {
          data.volume += 1;
          data.services += post.services || 0;
        }
      }
    });

    dispatch({ type: FETCH_VOLUME_SERVICE_DATA_SUCCESS, payload: volumeServiceData });
  } catch (error) {
    console.error('Error processing volume service data:', error);
    dispatch({ type: FETCH_VOLUME_SERVICE_DATA_FAILURE });
  }
};
// selectors.js (or wherever you store your selectors)


