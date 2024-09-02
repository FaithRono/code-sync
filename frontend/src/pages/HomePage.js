// src/pages/HomePage.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to right, #00c6ff, #0072ff);
    color: white;
    text-align: center;
    font-family: 'Arial', sans-serif;
`;

const Heading = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const SubText = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
`;

const Button = styled(Link)`
    display: inline-block;
    padding: 0.8rem 2rem;
    margin: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #ff4b2b;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: #ff6f6b;
        transform: scale(1.05);
    }
    
    &:active {
        background-color: #ff3b2b;
    }
`;

const HomePage = () => {
    return (
        <Container>
            <Heading>Welcome to Code-Sync Collaborative Editor</Heading>
            <SubText>Enhance your coding experience with real-time collaboration.</SubText>
            <div>
                <Button to="/login">Login</Button>
                <Button to="/register">Register</Button>
            </div>
        </Container>
    );
};

export default HomePage;
