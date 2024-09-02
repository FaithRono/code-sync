import React, { useState } from 'react';
import ProjectList from '../components/Project/ProjectList';
import KanbanBoard from '../components/Project/KanbanBoard';
import ProjectDetail from '../components/Project/ProjectDetail';
import styled from 'styled-components';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Project List');
  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <DashboardContainer>
      <Navbar>
        <Logo onClick={() => setActiveSection('Project List')}>
          {/* Replace with your actual logo */}
          <img src="/path-to-logo.png" alt="codesync" />
        </Logo>
        <MenuToggleButton onClick={toggleMenu}>
          {menuVisible ? 'Hide Menu' : 'Show Menu'}
        </MenuToggleButton>
        {menuVisible && (
          <Nav>
            <NavItem
              onClick={() => setActiveSection('Project List')}
              active={activeSection === 'Project List'}
            >
              Project List
            </NavItem>
            <NavItem
              onClick={() => setActiveSection('Kanban Board')}
              active={activeSection === 'Kanban Board'}
            >
              Kanban Board
            </NavItem>
            <NavItem
              onClick={() => setActiveSection('Project Details')}
              active={activeSection === 'Project Details'}
            >
              Project Details
            </NavItem>
          </Nav>
        )}
      </Navbar>
      <MainContent>
        <Section>
          {activeSection === 'Project List' && (
            <>
              <h2>Project List</h2>
              <ProjectList />
            </>
          )}
          {activeSection === 'Kanban Board' && (
            <>
              <h2>Kanban Board</h2>
              <KanbanBoard />
            </>
          )}
          {activeSection === 'Project Details' && (
            <>
              <h2>Project Details</h2>
              <ProjectDetail />
            </>
          )}
        </Section>
      </MainContent>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  position: sticky;
  top: 0; /* Makes the navbar sticky to the top */
  z-index: 1000; /* Ensure it stays above other content */
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    max-width: 100px; /* Adjust size as needed */
  }
`;

const MenuToggleButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  font-size: 12px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px; /* Space between menu items */
`;

const NavItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#495057' : '#343a40')};
  color: ${(props) => (props.active ? '#ffffff' : '#ced4da')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #495057;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Section = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default Dashboard;
