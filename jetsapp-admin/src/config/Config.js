export const API_CONFIG = {
    BASE_URL: 'http://localhost/JetsApp/backend/src/ad',
    ENDPOINTS: {
      LOGIN: '/Login.php',
    }
  };
  
  export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  };




// export const API_CONFIG = {
//     BASE_URL: 'http://10.40.0.11/JetsApp/backend/src',
//     ENDPOINTS: {
//       LOGIN: '/Login.php',
//       GET_EVENTS: '/get_events.php',
//       GET_FORMS: '/get_forms.php',
//       GET_CERTIFICATES: '/get_certificates.php',
//       DOWNLOAD_CERTIFICATE: '/download_certificates.php',
//       SUBMIT_SURVEY: '/submit_survey.php',
//       GET_ENABLED_EVENTS: '/get_enabled_events.php',
//       ADD_INSCRIPTION: '/add_inscription.php',
//     }
//   };
  
//   export const getApiUrl = (endpoint) => {
//     return `${API_CONFIG.BASE_URL}${endpoint}`;
//   };