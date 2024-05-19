import React, { useState } from 'react';
import './UserTable.css';

interface User {
    name: { first: string, last: string };
    picture: { thumbnail: string, medium: string, large: string };
    location: { state: string, city: string };
    email: string;
    phone: string;
    registered: { date: string };
}

interface UserTableProps {
    users: User[];
}
//UserTable отображает таблицу пользователей cо всеми данными
const UserTable: React.FC<UserTableProps> = ({ users }) => {
    const [tooltip, setTooltip] = useState<{
        image: string;
        isVisible: boolean;
        x: number;
        y: number;
        key: string | null;
    }>({ image: '', isVisible: false, x: 0, y: 0, key: null });

    //обработчик добавления тултипа при наведении курсора
    const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>, largePicture: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            image: largePicture,
            isVisible: true,
            x: rect.left + window.scrollX,
            y: rect.top + rect.height + window.scrollY,
            key: e.currentTarget.title
        });
    };

    //обработчик удаления тултипа при убирании курсора
    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, isVisible: false });
    };

    return (
        <div>
            {tooltip.isVisible && (
                <div
                    className={`tooltip ${tooltip.isVisible ? 'tooltip-visible' : ''}`}
                    style={{
                        top: tooltip.y,
                        left: tooltip.x
                    }}
                >
                    <img src={tooltip.image} alt="large" className="tooltip-image" key={tooltip.key || ''} />
                </div>
            )}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Picture</th>
                    <th>Location</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Registered Date</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <tr key={index}>
                            <td>{`${user.name.first} ${user.name.last}`}</td>
                            <td>
                                <img
                                    src={user.picture.thumbnail}
                                    alt="thumbnail"
                                    title={`${user.name.first} ${user.name.last}`}
                                    onMouseEnter={(e) => handleMouseEnter(e, user.picture.large)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            </td>
                            <td>{`${user.location.state}, ${user.location.city}`}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{new Date(user.registered.date).toLocaleDateString('ru-RU')}</td>
                        </tr>
                    ))
                ) : (
                    <tr />
                )}
                </tbody>
            </table>
            {users.length === 0 && <div className="no-users-found">No users found</div>}
        </div>
    );
};

export default UserTable;