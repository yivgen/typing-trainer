import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import TypeAQuote from './components/TypeAQuote';
import Missing from './components/Missing';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import Profile from './components/Profile';

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />

            <Route element={<PersistLogin />}>
                <Route path='/' element={<Layout />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<TypeAQuote />} />
                    </Route>

                    <Route element={<RequireAuth />}>
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<Missing />} />
        </Routes>
    );
}

export default App;
