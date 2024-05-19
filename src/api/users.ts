// api/users.js
import { useState, useEffect } from 'react';

function useUsersApi() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


//загружаем данные пользователей при монтировании компонента
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
