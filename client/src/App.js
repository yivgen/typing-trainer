import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import TypeAQuote from './components/TypeAQuote';
import Missing from './components/Missing';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="login" element={<Login />} />

                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<TypeAQuote />} />
                    </Route>
                </Route>
                
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
