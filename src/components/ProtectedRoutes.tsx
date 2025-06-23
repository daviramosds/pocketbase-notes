// components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Substitua pela URL do seu PocketBase

const ProtectedRoutes = () => {
  return pb.authStore.isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;