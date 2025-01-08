export const API_CONFIG = {
  BASE_URL: 'http://localhost/JetsApp/backend/src/ad',
  ENDPOINTS: {
    LOGIN: '/Login.php',
    //EVENTOS
    GET_EVENTS: '/GetEvents.php',
    CREATE_EVENT: '/CreateEvent.php',
    UPDATE_EVENT: '/UpdateEvent.php',
    DELETE_EVENT: '/DeleteEvent.php',
  }
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

