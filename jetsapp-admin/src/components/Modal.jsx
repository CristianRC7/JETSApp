import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ isOpen, onClose, onSubmit, event }) {
    const [formData, setFormData] = useState({
        fecha: '',
        hora: '',
        lugar: '',
        expositor: '',
        descripcion: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (event) {
            const [day, month, year] = event.fecha.split('/');
            const formattedDate = `${year}-${month}-${day}`;
            
            setFormData({
                fecha: formattedDate,
                hora: event.hora,
                lugar: event.lugar,
                expositor: event.expositor,
                descripcion: event.descripcion
            });
        } else {
            setFormData({
                fecha: '',
                hora: '',
                lugar: '',
                expositor: '',
                descripcion: ''
            });
        }
    }, [event]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const [year, month, day] = formData.fecha.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            
            await onSubmit({
                ...formData,
                fecha: formattedDate
            });
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
                        {event ? 'Editar Evento' : 'Crear Nuevo Evento'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha
                            </label>
                            <input
                                type="date"
                                value={formData.fecha}
                                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hora
                            </label>
                            <input
                                type="time"
                                value={formData.hora}
                                onChange={(e) => setFormData({...formData, hora: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lugar
                            </label>
                            <input
                                type="text"
                                value={formData.lugar}
                                onChange={(e) => setFormData({...formData, lugar: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expositor
                            </label>
                            <input
                                type="text"
                                value={formData.expositor}
                                onChange={(e) => setFormData({...formData, expositor: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                value={formData.descripcion}
                                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
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
                                {loading ? 'Guardando...' : event ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    event: PropTypes.shape({
        fecha: PropTypes.string,
        hora: PropTypes.string,
        lugar: PropTypes.string,
        expositor: PropTypes.string,
        descripcion: PropTypes.string,
    }),
};