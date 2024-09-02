import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectDetails from './ProjectDetail'; // Ensure this matches your file name

const ProjectList = () => {
  const [projects, setProjects] = useState([
    // Initial projects with added attributes
  ]);

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('name');

  const handleSelectProject = (index) => {
    setSelectedProjectIndex(index === selectedProjectIndex ? null : index);
  };

  const handleCloseProjectDetails = () => {
    setSelectedProjectIndex(null);
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.name === updatedProject.name ? updatedProject : p
      )
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProjects = projects
    .filter((project) =>
      (statusFilter === 'all' || project.status === statusFilter) &&
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'lastModified') {
        return new Date(b.lastModified) - new Date(a.lastModified);
      } else {
        return 0;
      }
    });

  return (
    <ProjectListContainer>
      <Header>Projects</Header>
      <AddProjectForm onAddProject={handleAddProject} />
      <SearchAndFilterContainer>
        <SearchBar 
          type="text" 
          placeholder="Search Projects..." 
          value={searchTerm}
          onChange={handleSearch}
        />
        <SortOptions>
          <label>Sort By:</label>
          <select value={sortOption} onChange={handleSort}>
            <option value="name">Name</option>
            <option value="lastModified">Last Modified</option>
          </select>
        </SortOptions>
        <StatusFilter>
          <label>Status:</label>
          <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </StatusFilter>
      </SearchAndFilterContainer>
      <ProjectListUl>
        {filteredProjects.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectListLi
              onClick={() => handleSelectProject(index)}
              selected={selectedProjectIndex === index}
            >
              <div>{index + 1}. {project.name}</div>
              <DetailsButton onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from toggling the project selection
                handleSelectProject(index);
              }}>
                Project Details
              </DetailsButton>
              {/* Display real-time indicators */}
              {project.isEditing && <ActivityIndicator>Editing...</ActivityIndicator>}
            </ProjectListLi>
            {selectedProjectIndex === index && (
              <ProjectDetailsContainer>
                <CloseButton onClick={handleCloseProjectDetails}>Close</CloseButton>
                <ProjectDetails project={project} onUpdateProject={handleUpdateProject} />
              </ProjectDetailsContainer>
            )}
          </React.Fragment>
        ))}
      </ProjectListUl>
    </ProjectListContainer>
  );
};

const AddProjectForm = ({ onAddProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      onAddProject({ name, description, status: 'active', lastModified: new Date().toISOString(), collaborators: [], onlineUsers: [], isEditing: false });
      setName('');
      setDescription('');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add New Project</FormTitle>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          required
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          required
        />
        <AddButton type="submit">Add Project</AddButton>
      </form>
    </FormContainer>
  );
};

// Styled components
const ProjectListContainer = styled.div`
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Header = styled.h1`
  font-size: 2.2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ProjectListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProjectListLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 12px;
  background-color: ${(props) => (props.selected ? '#bdc3c7' : '#ffffff')};
  color: ${(props) => (props.selected ? '#34495e' : '#34495e')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #e0e0e0;
    color: #34495e;
    transform: translateY(-2px);
  }
`;

const DetailsButton = styled.button`
  padding: 5px 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #1e8449;
  }
`;

const ActivityIndicator = styled.span`
  background-color: #e67e22;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 10px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  padding: 8px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  width: 50%;
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #1e8449;
  }
`;

const ProjectDetailsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #c0392b;
  }
  position: absolute;
  top: 550px;
  right: 180px;
`;

export default ProjectList;
