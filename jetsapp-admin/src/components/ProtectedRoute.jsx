import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  
  console.log('Protected Route - Auth Status:', !!isAuthenticated);
  
  if (!isAuthenticated) {
    Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes iniciar sesion',
                timer: 1500,
                showConfirmButton: false
            })
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;