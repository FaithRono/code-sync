import React from 'react';
import Profile from '../components/Dashboard/Profile'; // Adjust the import path as needed
import styled from 'styled-components';
import Navbar from '../components/Layout/Navbar'; // Ensure you have a Navbar component
import Sidebar from '../components/Layout/Sidebar'; // Ensure you have a Sidebar component

const ProfilePage = () => {
    return (
        <ProfilePageContainer>
            <Sidebar />
            <MainContent>
                <Navbar />
                <ContentArea>
                    <Profile />
                </ContentArea>
            </MainContent>
        </ProfilePageContainer>
    );
};

const ProfilePageContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const ContentArea = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #f8f9fa;
`;

export default ProfilePage;
