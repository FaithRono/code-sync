import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [taskText, setTaskText] = useState('');
  const [currentColumn, setCurrentColumn] = useState('todo'); // Track the column being edited
  const [editingTask, setEditingTask] = useState(null); // Track task being edited

  const addTask = () => {
    if (taskText.trim()) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [currentColumn]: [
          ...prevTasks[currentColumn],
          { text: taskText, id: Date.now() },
        ],
      }));
      setTaskText(''); // Clear input field after adding
    }
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    setTasks((prevTasks) => {
      const taskToMove = prevTasks[fromColumn].find((task) => task.id === taskId);
      const updatedFrom = prevTasks[fromColumn].filter((task) => task.id !== taskId);
      const updatedTo = [...prevTasks[toColumn], taskToMove];
      return {
        ...prevTasks,
        [fromColumn]: updatedFrom,
        [toColumn]: updatedTo,
      };
    });
  };

  const deleteTask = (taskId, column) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].filter((task) => task.id !== taskId),
    }));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setTaskText(task.text);
  };

  const saveTask = (column) => {
    if (editingTask && taskText.trim()) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [column]: prevTasks[column].map((task) =>
          task.id === editingTask.id ? { ...task, text: taskText } : task
        ),
      }));
      setEditingTask(null);
      setTaskText('');
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setTaskText('');
  };

  return (
    <KanbanBoardContainer>
      {Object.keys(tasks).map((column) => (
        <KanbanColumn key={column}>
          <ColumnHeader>
            {column.charAt(0).toUpperCase() + column.slice(1)}
            <TaskCount>{tasks[column].length}</TaskCount>
          </ColumnHeader>
          <ul>
            {tasks[column].map((task) => (
              <KanbanTask key={task.id}>
                {editingTask && editingTask.id === task.id ? (
                  <>
                    <TaskInput
                      type="text"
                      value={taskText}
                      onChange={(e) => setTaskText(e.target.value)}
                    />
                    <TaskButton onClick={() => saveTask(column)}>Save</TaskButton>
                    <TaskButton onClick={cancelEdit}>Cancel</TaskButton>
                  </>
                ) : (
                  <>
                    <TaskText>{task.text}</TaskText>
                    <ButtonGroup>
                      <TaskButton onClick={() => startEditing(task)}>Edit</TaskButton>
                      <TaskButton onClick={() => deleteTask(task.id, column)}>
                        Delete
                      </TaskButton>
                      <TaskButton
                        onClick={() =>
                          moveTask(
                            task.id,
                            column,
                            column === 'todo'
                              ? 'inProgress'
                              : column === 'inProgress'
                              ? 'done'
                              : 'todo'
                          )
                        }
                      >
                        Move
                      </TaskButton>
                    </ButtonGroup>
                  </>
                )}
              </KanbanTask>
            ))}
          </ul>
          <TaskInput
            type="text"
            value={taskText}
            placeholder={`Add new task to ${column}`}
            onChange={(e) => {
              setTaskText(e.target.value);
              setCurrentColumn(column); // Update current column for new tasks
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
          />
        </KanbanColumn>
      ))}
    </KanbanBoardContainer>
  );
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const KanbanBoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  background: linear-gradient(120deg, #f0f4f8, #d9e2ec);
  min-height: 100vh;
`;

const KanbanColumn = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  animation: ${fadeIn} 0.5s ease-in-out;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const ColumnHeader = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #e7eef7;
  border-radius: 8px;
`;

const TaskCount = styled.span`
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 50%;
`;

const KanbanTask = styled.li`
  padding: 15px;
  margin-bottom: 15px;
  background-color: #e7eef7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${fadeIn} 0.3s ease-in-out;

  &:hover {
    background-color: #d4e5f3;
  }
`;

const TaskText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const TaskButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:nth-of-type(2) {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }

  &:nth-of-type(3) {
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }
  }
`;

const TaskInput = styled.input`
  width: calc(100% - 20px);
  padding: 12px;
  margin-top: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export default KanbanBoard;
