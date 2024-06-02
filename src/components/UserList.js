import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import fetchUsers from '../hooks/fetchUsers';
import SearchBar from './SearchBar';

const PAGE_SIZE = 10;

const UserList = () => {
        const { users: fetchedUsers, loading, error } = fetchUsers();
        const [selectedUser, setSelectedUser] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');
        const [filteredUsers, setFilteredUsers] = useState([]);
        const [sortOrder, setSortOrder] = useState('asc');
        const [currentPage, setCurrentPage] = useState(1);

        useEffect(() => {
            setFilteredUsers(fetchedUsers);
        }, [fetchedUsers]);

        const handleSearch = (searchTerm) => {
            setSearchTerm(searchTerm);
            const filtered = fetchedUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        };

        const handleSort = () => {
            const sortedUsers = [...filteredUsers].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
            setFilteredUsers(sortedUsers);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        };

        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        };

        if (loading) return <p > Loading... < /p>;
        if (error) return <p > Error fetching users: { error.message } < /p>;

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const displayedUsers = filteredUsers.slice(startIndex, endIndex);

        return ( <
            div className = "user-list-container" >
            <
            div className = "user-list-header" >
            <
            h2 > User List < /h2> <
            SearchBar onSearch = { handleSearch }
            /> <
            div >
            <
            button className = 'sortbutton'
            onClick = { handleSort } > Sort by Name({ sortOrder === 'asc' ? 'Asc' : 'Desc' }) < /button> <
            /div> <
            /div> <
            div className = "table-responsive" >
            <
            table >
            <
            thead >
            <
            tr >
            <
            th > ID < /th> <
            th > Name < /th> <
            th > Username < /th> <
            th > Email < /th> <
            th > City < /th> <
            /tr> <
            /thead> <
            tbody > {
                displayedUsers.map(user => ( <
                    tr key = { user.id }
                    onClick = {
                        () => setSelectedUser(user) } >
                    <
                    td > { user.id } < /td> <
                    td > { user.name } < /td> <
                    td > { user.username } < /td> <
                    td > { user.email } < /td> <
                    td > { user.address.city } < /td> <
                    /tr>
                ))
            } <
            /tbody> <
            /table> <
            /div> {
                selectedUser && < UserDetails user = { selectedUser }
                onClose = {
                    () => setSelectedUser(null) }
                />} <
                div className = "pagination" >
                    <
                    button onClick = {
                        () => handlePageChange(currentPage - 1) }
                disabled = { currentPage === 1 } > Previous < /button> <
                    span > { currentPage } < /span> <
                    button onClick = {
                        () => handlePageChange(currentPage + 1) }
                disabled = { displayedUsers.length < PAGE_SIZE || endIndex >= filteredUsers.length } > Next < /button> <
                    /div> <
                    /div>
            );
        };

        export default UserList;