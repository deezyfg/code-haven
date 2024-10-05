import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const JUDGE0_API_URL = process.env.REACT_APP_RAPID_API_URL;
const JUDGE0_API_HOST = process.env.REACT_APP_RAPID_API_HOST;
const JUDGE0_API_KEY = process.env.REACT_APP_RAPID_API_SECRET;

// Room management functions
export const joinRoom = async (roomId, username) => {
  try {
    if (!validateRoomId(roomId) || !validateUsername(username)) {
      throw new Error('Invalid room ID or username');
    }
    const response = await axios.post(`${API_BASE_URL}/rooms/join`, { roomId, username });
    return response.data;
  } catch (error) {
    console.error('Error joining room:', error.response?.data || error.message);
    throw error;
  }
};

export const leaveRoom = async (roomId, username) => {
  try {
    if (!validateRoomId(roomId) || !validateUsername(username)) {
      throw new Error('Invalid room ID or username');
    }
    await axios.post(`${API_BASE_URL}/rooms/leave`, { roomId, username });
  } catch (error) {
    console.error('Error leaving room:', error.response?.data || error.message);
    throw error;
  }
};

export const saveCode = async (roomId, code, language) => {
  try {
    if (!validateRoomId(roomId)) {
      throw new Error('Invalid room ID');
    }
    await axios.post(`${API_BASE_URL}/code/save`, { roomId, code, language });
  } catch (error) {
    console.error('Error saving code:', error.response?.data || error.message);
    throw error;
  }
};

export const getRoomDetails = async (roomId) => {
  try {
    if (!validateRoomId(roomId)) {
      throw new Error('Invalid room ID');
    }
    const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room details:', error.response?.data || error.message);
    throw error;
  }
};

// Code execution functions
export const executeCode = async (code, languageId, stdin = '', timeout = 10000) => {
  try {
    const response = await axios.post(
      JUDGE0_API_URL,
      { source_code: code, language_id: languageId, stdin },
      {
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': JUDGE0_API_HOST,
          'x-rapidapi-key': JUDGE0_API_KEY,
        },
        timeout: timeout,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error executing code:', error.response?.data || error.message);
    throw error;
  }
};

// Language handling functions
const CACHE_KEY = 'cachedLanguages';
const CACHE_EXPIRATION_KEY = 'languagesCacheExpiration';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getLanguages = async (forceRefresh = false) => {
  const now = Date.now();
  const cachedLanguages = localStorage.getItem(CACHE_KEY);
  const cacheExpiration = localStorage.getItem(CACHE_EXPIRATION_KEY);

  if (
    cachedLanguages &&
    cacheExpiration &&
    !forceRefresh &&
    now < parseInt(cacheExpiration)
  ) {
    return JSON.parse(cachedLanguages);
  }

  try {
    const response = await axios.get(
      `${JUDGE0_API_URL}/languages`,
      {
        headers: {
          'x-rapidapi-host': JUDGE0_API_HOST,
          'x-rapidapi-key': JUDGE0_API_KEY,
        },
      }
    );
    localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
    localStorage.setItem(CACHE_EXPIRATION_KEY, now + CACHE_EXPIRATION_TIME);
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error.response?.data || error.message);
    throw error;
  }
};

export const clearLanguageCache = () => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_EXPIRATION_KEY);
};

export const refreshLanguageCache = async () => {
  return getLanguages(true);
};

export const getLanguageDetails = async (languageId) => {
  const languages = await getLanguages();
  return languages.find(lang => lang.id === languageId);
};

// Utility functions
const validateRoomId = (roomId) => {
  return typeof roomId === 'string' && roomId.trim().length > 0 && roomId.length <= 50;
};

const validateUsername = (username) => {
  return typeof username === 'string' && username.trim().length > 0 && username.length <= 30;
};
