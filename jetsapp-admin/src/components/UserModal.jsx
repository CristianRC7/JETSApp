import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function UserModal({ isOpen, onClose, onSubmit, user }) {
    const [formData, setFormData] = useState({
        usuario: '',
        contrasena: '',
        nombre_completo: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                usuario: user.usuario,
                contrasena: '',
                nombre_completo: user.nombre_completo
            });
        } else {
            setFormData({
                usuario: '',
                contrasena: '',
                nombre_completo: ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Usuario
                            </label>
                            <input
                                type="text"
                                value={formData.usuario}
                                onChange={(e) => setFormData({...formData, usuario: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña {user && '(dejar en blanco para mantener la actual)'}
                            </label>
                            <input
                                type="password"
                                value={formData.contrasena}
                                onChange={(e) => setFormData({...formData, contrasena: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...(!user && { required: true })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                value={formData.nombre_completo}
                                onChange={(e) => setFormData({...formData, nombre_completo: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Guardando...' : user ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

UserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        usuario: PropTypes.string,
        nombre_completo: PropTypes.string,
    }),
};