import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/useAuth'

const PrivateRoute: React.FC<any> = ({children}) => {
    const {user} = useContext(AuthContext);

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute
