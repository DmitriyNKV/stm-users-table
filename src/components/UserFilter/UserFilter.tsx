import React, { useRef } from 'react';
import './UserFilter.css';
import { debounce } from '../../utils/utils';

interface UserFilterProps {
    setFilter: (filter: string) => void;
}
//UserFilter предоставляет поле ввода для фильтрации юзеров
const UserFilter: React.FC<UserFilterProps> = ({ setFilter }) => {
    const searchInput = useRef<HTMLInputElement>(null);

    //Обработчик изменения ввода с использованием дебаунса.
    const handleChange = debounce(() => {
        if (searchInput.current) {
            setFilter(searchInput.current.value);
        }
    }, 300);

    return (
        <div className="user-filter-container">
            <input
                type="text"
                ref={searchInput}
                onChange={handleChange}
                placeholder="Search for users..."
                className="user-filter-input"
            />
        </div>
    );
};

export default UserFilter;
