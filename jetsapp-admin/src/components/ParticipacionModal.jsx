import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getApiUrl, API_CONFIG } from '../config/Config';
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from 'sweetalert2';

export default function ParticipacionModal({ isOpen, onClose, user }) {
    const [participaciones, setParticipaciones] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id_gestion: '',
        nro_certificado: ''
    });

    const fetchParticipaciones = async () => {
        try {
            const response = await fetch(`${getApiUrl(API_CONFIG.ENDPOINTS.GET_PARTICIPACIONES)}?id_usuario=${user.id}`);
            const data = await response.json();
            if (data.success) {
                setParticipaciones(data.participaciones || []);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchGestiones = async () => {
        try {
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_GESTIONES));
            const data = await response.json();
            if (data.success) {
                setGestiones(data.gestiones || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchParticipaciones();
            fetchGestiones();
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CREATE_PARTICIPACION), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id_usuario: user.id
                }),
            });
            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Éxito', 'Participación agregada correctamente', 'success');
                fetchParticipaciones();
                setFormData({ id_gestion: '', nro_certificado: '' });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            Swal.fire('Error', error.message || 'Error al agregar la participación', 'error');
        }
    };

    const handleDelete = async (participacionId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_PARTICIPACION), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: participacionId }),
                });
                const data = await response.json();
                
                if (data.success) {
                    Swal.fire('Eliminado', 'La participación ha sido eliminada', 'success');
                    fetchParticipaciones();
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                Swal.fire('Error', error.message || 'Error al eliminar la participación', 'error');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Participaciones de {user.nombre_completo}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-4">Agregar Nueva Participación</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gestión
                                </label>
                                <select
                                    value={formData.id_gestion}
                                    onChange={(e) => setFormData({...formData, id_gestion: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Seleccione una gestión</option>
                                    {gestiones.map((gestion) => (
                                        <option key={gestion.id_gestion} value={gestion.id_gestion}>
                                            Gestión {gestion.gestion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Número de Certificado
                                </label>
                                <input
                                    type="text"
                                    value={formData.nro_certificado}
                                    onChange={(e) => setFormData({...formData, nro_certificado: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Agregar Participación
                            </button>
                        </div>
                    </form>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gestión
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nro. Certificado
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {participaciones.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                            No hay participaciones registradas
                                        </td>
                                    </tr>
                                ) : (
                                    participaciones.map((participacion) => (
                                        <tr key={participacion.id_participacion}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                Gestión {participacion.gestion}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {participacion.nro_certificado}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <button
                                                    onClick={() => handleDelete(participacion.id_participacion)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ParticipacionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        nombre_completo: PropTypes.string,
    }),
};