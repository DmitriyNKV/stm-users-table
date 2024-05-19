import { useState, useEffect } from 'react';
import { User } from './types';

interface UsersApiHook {
    users: User[];
    loading: boolean;
    error: Error | null;
}

function useUsersApi(): UsersApiHook {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // //загружаем данные пользователей при монтировании компонента
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=15')
            .then(response => response.json())
            .then(data => {
                setUsers(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err);
                setLoading(false);
            });
    }, []);

    return { users, loading, error };
}

export default useUsersApi;