import { useState, useEffect } from 'react';
import { getApiUrl, API_CONFIG } from '../config/Config';
import GestionModal from '../components/GestionModal';
import ImagePreviewModal from '../components/ImagePreviewModal';
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from 'sweetalert2';

export default function Certificates() {
    const [gestiones, setGestiones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGestion, setSelectedGestion] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const fetchGestiones = async () => {
        try {
            setLoading(true);
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_GESTIONES));
            const data = await response.json();
            
            if (data.success) {
                setGestiones(data.gestiones || []);
            } else {
                throw new Error(data.message || 'Error al cargar las gestiones');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al conectar con el servidor'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGestiones();
    }, []);

    const handleCreate = async (formData) => {
        try {
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CREATE_GESTION), {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Gestión creada correctamente'
            });
            fetchGestiones();
        } catch (error) {
            throw new Error(error.message || 'Error al crear la gestión');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            formData.append('id', selectedGestion.id_gestion);
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPDATE_GESTION), {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Gestión actualizada correctamente'
            });
            fetchGestiones();
        } catch (error) {
            throw new Error(error.message || 'Error al actualizar la gestión');
        }
    };

    const handleDelete = async (gestion) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará la gestión y su imagen asociada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_GESTION), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: gestion.id_gestion }),
                });
                const data = await response.json();
                if (data.success) {
                    Swal.fire(
                        'Eliminado!',
                        'La gestión ha sido eliminada.',
                        'success'
                    );
                    fetchGestiones();
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'No se pudo eliminar la gestión'
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#cf152d] border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Cargando gestiones...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Gestión de Certificados
                        </h1>
                        <button
                            onClick={() => {
                                setSelectedGestion(null);
                                setIsModalOpen(true);
                            }}
                            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Nueva Gestión
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {gestiones.map((gestion) => (
                            <div key={gestion.id_gestion} className="w-full max-w-[300px] mx-auto bg-white rounded-lg shadow-md">
                                <div className="relative w-full pb-[75%] cursor-pointer" 
                                    onClick={() => setPreviewImage(`http://localhost/JETSApp/backend/certificates/gestion_${gestion.gestion}.jpg`)}>
                                    <img
                                        src={`http://localhost/JETSApp/backend/certificates/gestion_${gestion.gestion}.jpg`}
                                        alt={`Certificado ${gestion.gestion}`}
                                        className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                                        onError={(e) => {
                                            e.target.src = 'placeholder.svg';
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            Gestión {gestion.gestion}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedGestion(gestion);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1.5 text-blue-600 hover:text-blue-900 rounded-md hover:bg-blue-50"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(gestion)}
                                                className="p-1.5 text-red-600 hover:text-red-900 rounded-md hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <GestionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedGestion(null);
                }}
                onSubmit={selectedGestion ? handleUpdate : handleCreate}
                gestion={selectedGestion}
            />
            <ImagePreviewModal
                isOpen={!!previewImage}
                onClose={() => setPreviewImage(null)}
                imageUrl={previewImage}
            />
        </>
    );
}