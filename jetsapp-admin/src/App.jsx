import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Events from './pages/Events';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/events"
                    element={
                        <ProtectedRoute>
                            <Sidebar>
                                <Events />
                            </Sidebar>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Sidebar>
                                <Users />
                            </Sidebar>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;