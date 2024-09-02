import React, { useState } from 'react';
import styled from 'styled-components';

// Notification Component
const Notification = ({ type, message, onClose }) => {
    return (
        <NotificationContainer type={type}>
            <Message>{message}</Message>
            <CloseButton onClick={onClose}>×</CloseButton>
        </NotificationContainer>
    );
};

// Notifications List Component
const NotificationsList = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (type, message) => {
        setNotifications((prev) => [...pre v, { type, message }]);
        setTimeout(() => {
            setNotifications((prev) => prev.slice(1)); // Remove the oldest notification after 5 seconds
        }, 5000);
    };

    const handleClose = (index) => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <NotificationsContainer>
            {notifications.map((notification, index) => (
                <Notification
                    key={index}
                    type={notification.type}
                    message={notification.message}
                    onClose={() => handleClose(index)}
                />
            ))}
        </NotificationsContainer>
    );
};

// Styled Components
const NotificationsContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    width: 300px;
`;

const NotificationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    color: #fff;
    background-color: ${({ type }) => {
        switch (type) {
            case 'success':
                return '#28a745';
            case 'error':
                return '#dc3545';
            case 'info':
                return '#17a2b8';
            default:
                return '#6c757d';
        }
    }};
`;

const Message = styled.span`
    flex: 1;
    font-size: 14px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        color: #ccc;
    }
`;

export default Notification;
