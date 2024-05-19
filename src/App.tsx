import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable/UserTable';
import UserFilter from './components/UserFilter/UserFilter';
import Loader from './components/Loader/Loader';
import useUsersApi from './api/users';
import { User } from './api/types';

const App: React.FC = () => {
    const { users, loading, error } = useUsersApi();
    const [filter, setFilter] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);


    //обновляем отфильтрованный список пользователей при изменении фильтра или списка юзеров
    useEffect(() => {
        setFilteredUsers(users.filter(user =>
            user.name.first.toLowerCase().includes(filter.toLowerCase()) ||
            user.name.last.toLowerCase().includes(filter.toLowerCase())
        ));
    }, [filter, users]);

    if (loading) return <Loader />;
    if (error) return <div>Error loading users: {error.message}</div>;

    return (
        <div className="app-container">
            <UserFilter setFilter={setFilter} />
            <UserTable users={filteredUsers} />
        </div>
    );
};

export default App;