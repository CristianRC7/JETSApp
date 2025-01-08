import { useState, useEffect } from 'react';
import { getApiUrl, API_CONFIG } from '../config/Config';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                console.log('Fetching events from:', getApiUrl(API_CONFIG.ENDPOINTS.GET_EVENTS));
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_EVENTS));
                const data = await response.json();
                console.log('Response data:', data);
                
                if (data.success) {
                    setEvents(data.events || []);
                    console.log('Events set:', data.events);
                } else {
                    setError(data.message || 'Error al cargar los eventos');
                    console.error('Error from server:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error al conectar con el servidor');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Panel de Administración de Eventos
                    </h1>
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
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {events.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="py-4 text-center text-gray-500">
                                                    No hay eventos disponibles
                                                </td>
                                            </tr>
                                        ) : (
                                            events.map((event) => (
                                                <tr key={event.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{new Date(event.fecha).toLocaleDateString()}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{event.hora}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{event.lugar}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{event.expositor}</td>
                                                    <td className="px-3 py-4 text-sm text-gray-900">{event.descripcion}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}