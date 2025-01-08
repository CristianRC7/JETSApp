import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Users } from 'lucide-react';

export default function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className={`${isOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300 ease-in-out`}>
                <div className="p-4 flex justify-between items-center">
                    {isOpen && <h2 className="text-xl font-bold">JetsApp</h2>}
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-700 rounded">
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
                <nav className="mt-6">
                    <Link
                        to="/events"
                        className={`flex items-center p-4 hover:bg-gray-700 ${
                            location.pathname === '/events' ? 'bg-gray-700' : ''
                        }`}
                    >
                        <Calendar size={20} />
                        {isOpen && <span className="ml-4">Eventos</span>}
                    </Link>
                    <Link
                        to="/users"
                        className={`flex items-center p-4 hover:bg-gray-700 ${
                            location.pathname === '/users' ? 'bg-gray-700' : ''
                        }`}
                    >
                        <Users size={20} />
                        {isOpen && <span className="ml-4">Usuarios</span>}
                    </Link>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}