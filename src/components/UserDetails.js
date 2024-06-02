// src/components/UserDetails.js
import React from 'react';

const UserDetails = ({ user, onClose }) => {
    return ( <
        div className = 'modal' >
        <
        div className = 'modal-content' >
        <
        span className = 'close'
        onClick = { onClose } > Close < /span> <
        h2 > { user.name } < /h2> <
        p > < strong > ID: < /strong> {user.id}</p >
        <
        p > < strong > Username: < /strong> {user.username}</p >
        <
        p > < strong > Email: < /strong> {user.email}</p >
        <
        p > < strong > Address: < /strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p >
        <
        p > < strong > Phone: < /strong> {user.phone}</p >
        <
        p > < strong > Website: < /strong> {user.website}</p >
        <
        /div> <
        /div>
    );
};

export default UserDetails;