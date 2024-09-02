import React from 'react';
import styled from 'styled-components';
import Notification from '../components/Notification'; // Adjust the import path as needed
import Navbar from '../components/Layout/Navbar'; // Ensure you have a Navbar component
import Sidebar from '../components/Layout/Sidebar'; // Ensure you have a Sidebar component

const NotificationPage = () => {
    return (
        <PageContainer>
            <SidebarSection>
                <Sidebar />
            </SidebarSection>
            <MainContent>
                <Navbar />
                <ContentArea>
                    <Notification />
                </ContentArea>
            </MainContent>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const SidebarSection = styled.div`
    width: 250px;
    background-color: #f0f0f0;
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

export default NotificationPage;
