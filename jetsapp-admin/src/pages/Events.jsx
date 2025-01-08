import { useState, useEffect } from 'react';
import { getApiUrl, API_CONFIG } from '../config/Config';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from 'sweetalert2';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEvents = async (page = 1) => {
        try {
            setLoading(true);
            const response = await fetch(`${getApiUrl(API_CONFIG.ENDPOINTS.GET_EVENTS)}?page=${page}`);
            const data = await response.json();
            
            if (data.success) {
                setEvents(data.events || []);
                setTotalPages(data.pagination.totalPages);
                setCurrentPage(data.pagination.currentPage);
            } else {
                setError(data.message || 'Error al cargar los eventos');
            }
        } catch (error) {
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    
    const handleCreate = async (formData) => {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CREATE_EVENT), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        fetchEvents();
    };

    const handleUpdate = async (formData) => {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPDATE_EVENT), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, id: selectedEvent.id }),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        fetchEvents();
    };

    const handleDelete = async (event) => {
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
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_EVENT), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: event.id }),
                });
                const data = await response.json();
                if (data.success) {
                    Swal.fire(
                        'Eliminado!',
                        'El evento ha sido eliminado.',
                        'success'
                    );
                    fetchEvents();
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'No se pudo eliminar el evento.',
                    'error'
                );
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#cf152d] border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Cargando eventos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-600">
                    <p className="text-xl font-semibold">{error}</p>
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
                            Panel de Administración de Eventos
                        </h1>
                        <button
                            onClick={() => {
                                setSelectedEvent(null);
                                setIsModalOpen(true);
                            }}
                            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Crear Evento
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Hora</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Lugar</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expositor</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Descripción</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {events.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="py-4 text-center text-gray-500">
                                                        No hay eventos disponibles
                                                    </td>
                                                </tr>
                                            ) : (
                                                events.map((event) => (
                                                    <tr key={event.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                                                            {event.fecha}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{event.hora}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{event.lugar}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{event.expositor}</td>
                                                        <td className="px-3 py-4 text-sm text-gray-900">{event.descripcion}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedEvent(event);
                                                                        setIsModalOpen(true);
                                                                    }}
                                                                    className="p-1 text-blue-600 hover:text-blue-900"
                                                                >
                                                                    <Pencil className="h-5 w-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(event)}
                                                                    className="p-1 text-red-600 hover:text-red-900"
                                                                >
                                                                    <Trash2 className="h-5 w-5" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedEvent(null);
                }}
                onSubmit={selectedEvent ? handleUpdate : handleCreate}
                event={selectedEvent}
            />
        </>
    );
}