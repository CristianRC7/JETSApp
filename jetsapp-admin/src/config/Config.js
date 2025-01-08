export const API_CONFIG = {
    BASE_URL: 'http://localhost/JetsApp/backend/src/ad',
    ENDPOINTS: {
      LOGIN: '/Login.php',
      GET_EVENTS: '/GetEvents.php',
    }
  };
  
  export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  };


