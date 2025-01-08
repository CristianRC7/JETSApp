export const API_CONFIG = {
  BASE_URL: 'http://localhost/JetsApp/backend/src/ad',
  ENDPOINTS: {
      LOGIN: '/Login.php',
      // EVENTOS
      GET_EVENTS: '/GetEvents.php',
      CREATE_EVENT: '/CreateEvent.php',
      UPDATE_EVENT: '/UpdateEvent.php',
      DELETE_EVENT: '/DeleteEvent.php',
      // USUARIOS
      GET_USERS: '/GetUsers.php',
      CREATE_USER: '/CreateUser.php',
      UPDATE_USER: '/UpdateUser.php',
      DELETE_USER: '/DeleteUser.php',
      TOGGLE_ADMIN: '/ToggleAdmin.php',
      // HABILITACIÓN CALIFICACIONES
      GET_CALIFICACION: '/GetCalificacionHabilitada.php',
      CREATE_CALIFICACION: '/CreateCalificacionHabilitada.php',
      UPDATE_CALIFICACION: '/UpdateCalificacionHabilitada.php',
      DELETE_CALIFICACION: '/DeleteCalificacionHabilitada.php',
      // GESTIONES
      GET_GESTIONES: '/GetGestiones.php',
      CREATE_GESTION: '/CreateGestion.php',
      UPDATE_GESTION: '/UpdateGestion.php',
      DELETE_GESTION: '/DeleteGestion.php',
      // Participaciones
      GET_PARTICIPACIONES: '/GetParticipaciones.php',
      CREATE_PARTICIPACION: '/CreateParticipacion.php',
      UPDATE_PARTICIPACION: '/UpdateParticipacion.php',
      DELETE_PARTICIPACION: '/DeleteParticipacion.php',
    
  
  }
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};