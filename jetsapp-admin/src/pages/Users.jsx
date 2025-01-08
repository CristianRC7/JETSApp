import { useState, useEffect } from 'react';
import { getApiUrl, API_CONFIG } from '../config/Config';
import Pagination from '../components/Pagination';
import UserModal from '../components/UserModal';
import SearchBar from '../components/SearchBar';
import ParticipacionModal from '../components/ParticipacionModal';
import { Pencil, Trash2, Plus, Shield, Eye } from "lucide-react";
import Swal from 'sweetalert2';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isParticipacionModalOpen, setIsParticipacionModalOpen] = useState(false);
    const [selectedUserForParticipacion, setSelectedUserForParticipacion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async (page = 1) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${getApiUrl(API_CONFIG.ENDPOINTS.GET_USERS)}?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`
            );
            const data = await response.json();
            
            if (data.success) {
                setUsers(data.users || []);
                setTotalPages(data.pagination.totalPages);
                setCurrentPage(data.pagination.currentPage);
            } else {
                setError(data.message || 'Error al cargar los usuarios');
            }
        } catch (error) {
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCreate = async (formData) => {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CREATE_USER), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        fetchUsers();
    };

    const handleUpdate = async (formData) => {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPDATE_USER), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, id: selectedUser.id }),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        fetchUsers();
    };

    const handleDelete = async (user) => {
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
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_USER), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: user.id }),
                });
                const data = await response.json();
                if (data.success) {
                    Swal.fire(
                        'Eliminado!',
                        'El usuario ha sido eliminado.',
                        'success'
                    );
                    fetchUsers();
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'No se pudo eliminar el usuario.',
                    'error'
                );
            }
        }
    };

    const handleToggleAdmin = async (user) => {
        const action = user.is_admin ? 'remover' : 'hacer';
        const result = await Swal.fire({
            title: `¿Estás seguro de ${action} administrador a este usuario?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TOGGLE_ADMIN), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: user.id }),
                });
                const data = await response.json();
                if (data.success) {
                    Swal.fire(
                        'Éxito!',
                        `El usuario ha sido ${user.is_admin ? 'removido como' : 'hecho'} administrador.`,
                        'success'
                    );
                    fetchUsers();
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'No se pudo modificar el rol del usuario.',
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
                    <p className="mt-2 text-gray-600">Cargando usuarios...</p>
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
                            Gestión de Usuarios
                        </h1>
                        <button
                            onClick={() => {
                                setSelectedUser(null);
                                setIsModalOpen(true);
                            }}
                            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Crear Usuario
                        </button>
                    </div>

                    <div className="mb-6">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nombre Completo</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rol</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {users.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="py-4 text-center text-gray-500">
                                                        No hay usuarios disponibles
                                                    </td>
                                                </tr>
                                            ) : (
                                                users.map((user) => (
                                                    <tr key={user.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                                                            {user.usuario}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                            {user.nombre_completo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                            {user.is_admin ? 'Administrador' : 'Usuario'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUser(user);
                                                                        setIsModalOpen(true);
                                                                    }}
                                                                    className="p-1 text-blue-600 hover:text-blue-900"
                                                                >
                                                                    <Pencil className="h-5 w-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(user)}
                                                                    className="p-1 text-red-600 hover:text-red-900"
                                                                >
                                                                    <Trash2 className="h-5 w-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleToggleAdmin(user)}
                                                                    className={`p-1 ${user.is_admin ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                                                                >
                                                                    <Shield className="h-5 w-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUserForParticipacion(user);
                                                                        setIsParticipacionModalOpen(true);
                                                                    }}
                                                                    className="p-1 text-purple-600 hover:text-purple-900"
                                                                >
                                                                    <Eye className="h-5 w-5" />
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
            <UserModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                }}
                onSubmit={selectedUser ? handleUpdate : handleCreate}
                user={selectedUser}
            />
            <ParticipacionModal
                isOpen={isParticipacionModalOpen}
                onClose={() => {
                    setIsParticipacionModalOpen(false);
                    setSelectedUserForParticipacion(null);
                }}
                user={selectedUserForParticipacion}
            />
        </>
    );
}