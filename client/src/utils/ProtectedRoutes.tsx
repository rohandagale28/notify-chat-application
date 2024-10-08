import { useAccount } from '@/context/AccountProvider';
import { getUser } from '@/services/userApi';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: { children: any }) => {
    const { setAccount } = useAccount();
    const navigate = useNavigate();

    const getUserData = useCallback(async () => {
        try {
            const response = await getUser();
            if (response.status === 200) {
                setAccount(response.data);
            }
        } catch (error) {
            console.log('Error fetching user:', error);
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        getUserData();
    }, []);

    return children;
};

export default ProtectedRoutes;
