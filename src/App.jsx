import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPage from './pages/AdminPage.jsx';

export default function App() {
  

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
                    <Route path="/login" element={<LoginPage></LoginPage>}></Route>
                    <Route path="/home" element={<HomePage></HomePage>}></Route>
                    <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
                </Routes>
            </BrowserRouter>
    </div>
  )
}

