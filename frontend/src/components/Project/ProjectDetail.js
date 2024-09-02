import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectDetails = ({ project, onUpdateProject }) => {
  const [newMember, setNewMember] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [technologies, setTechnologies] = useState(project?.technologies || []);
  const [editing, setEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(project?.description || '');

  const handleAddMember = () => {
    if (newMember.trim() === '') return;
    onUpdateProject({
      ...project,
      members: [...(project.members || []), newMember]
    });
    setNewMember('');
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    onUpdateProject({
      ...project,
      tasks: [...(project.tasks || []), newTask]
    });
    setNewTask('');
  };

  const handleEditTask = (index) => {
    setEditTaskIndex(index);
    setEditedTask(project.tasks[index]);
  };

  const handleSaveTask = () => {
    if (editedTask.trim() === '') return;
    const updatedTasks = [...project.tasks];
    updatedTasks[editTaskIndex] = editedTask;
    onUpdateProject({
      ...project,
      tasks: updatedTasks
    });
    setEditTaskIndex(null);
    setEditedTask('');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = project.tasks.filter((_, i) => i !== index);
    onUpdateProject({
      ...project,
      tasks: updatedTasks
    });
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() === '') return;
    setTechnologies([...technologies, newTechnology]);
    setNewTechnology('');
  };

  const handleEditDescription = () => {
    onUpdateProject({
      ...project,
      description: editDescription
    });
    setEditing(false);
  };

  if (!project) {
    return <NoProject>No project selected</NoProject>;
  }

  return (
    <ProjectDetailsContainer>
      <h1>{project.name}</h1>
      {editing ? (
        <EditDescriptionContainer>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="4"
            placeholder="Edit project description"
          />
          <button onClick={handleEditDescription}>Save Description</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </EditDescriptionContainer>
      ) : (
        <DescriptionContainer>
          <p>{project.description}</p>
          <button onClick={() => setEditing(true)}>Edit Description</button>
        </DescriptionContainer>
      )}
      <Section>
        <h2>Team Members</h2>
        <MemberList>
          {(project.members || []).map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </MemberList>
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Add new team member"
        />
        <button onClick={handleAddMember}>Add Member</button>
      </Section>

      <Section>
        <h2>Tasks</h2>
        <TaskList>
          {(project.tasks || []).map((task, index) => (
            <TaskItem key={index}>
              {editTaskIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={handleSaveTask}>Save</button>
                  <button onClick={() => setEditTaskIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {index + 1}. {task}
                  <button onClick={() => handleEditTask(index)}>Edit</button>
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </>
              )}
            </TaskItem>
          ))}
        </TaskList>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </Section>

      <Section>
        <h2>Technologies</h2>
        <TechnologyCard>
          <ul>
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newTechnology}
            onChange={(e) => setNewTechnology(e.target.value)}
            placeholder="Add new technology"
          />
          <button onClick={handleAddTechnology}>Add Technology</button>
        </TechnologyCard>
      </Section>
    </ProjectDetailsContainer>
  );
};

const ProjectDetailsContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const DescriptionContainer = styled.div`
  margin-top: 10px;
  
  button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const EditDescriptionContainer = styled.div`
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: vertical;
  }

  button {
    margin-right: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const MemberList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;

  li {
    margin-bottom: 5px;
  }
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  button {
    margin-left: 10px;
    padding: 4px 8px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const TechnologyCard = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  input {
    width: calc(100% - 92px);
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    padding: 8px 12px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const NoProject = styled.div`
  padding: 20px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  text-align: center;
`;

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
    tasks: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string)
  }),
  onUpdateProject: PropTypes.func.isRequired
};

export default ProjectDetails;
