import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export default function GestionModal({ isOpen, onClose, onSubmit, gestion }) {
    const [formData, setFormData] = useState({
        gestion: '',
        imagen: null
    });
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (gestion) {
            setFormData({
                gestion: gestion.gestion,
                imagen: null
            });
            setPreviewUrl(`http://localhost/JETSApp/backend/certificates/gestion_${gestion.gestion}.jpg`);
        } else {
            setFormData({
                gestion: '',
                imagen: null
            });
            setPreviewUrl(null);
        }
    }, [gestion]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar que sea una imagen
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El archivo debe ser una imagen'
                });
                return;
            }
            setFormData(prev => ({ ...prev, imagen: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.imagen && !gestion) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar una imagen'
            });
            return;
        }
        
        setLoading(true);
        try {
            const data = new FormData();
            data.append('gestion', formData.gestion);
            if (formData.imagen) {
                data.append('imagen', formData.imagen);
            }
            
            await onSubmit(data);
            onClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Ha ocurrido un error'
            });
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
                        {gestion ? 'Editar Gestión' : 'Nueva Gestión'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gestión
                            </label>
                            <input
                                type="text"
                                value={formData.gestion}
                                onChange={(e) => setFormData({...formData, gestion: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Imagen del Certificado
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                                required={!gestion}
                            />
                        </div>
                        {previewUrl && (
                            <div className="mt-4">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </div>
                        )}
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
                                {loading ? 'Guardando...' : gestion ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

GestionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    gestion: PropTypes.shape({
        id_gestion: PropTypes.number,
        gestion: PropTypes.string,
    }),
};