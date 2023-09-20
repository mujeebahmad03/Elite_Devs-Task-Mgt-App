
import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid';

const getUserData = (username, state) =>{
  const userData = getUserFromLocalStorage(username)
  state.user = {
    id: userData.id,
    username: userData.username,
    email: userData.email,
  };
  state.tasks = getTasksForUserFromLocalStorage(userData.id);
}
// Storing user data
export const saveUserToLocalStorage = (user) => {
  // Retrieve existing users from local storage
  const existingUsersJSON = localStorage.getItem('users');
  const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
  // Add the new user to the array of existing users
  existingUsers.push(user);
  // Save the updated array of users back to local storage
  localStorage.setItem('users', JSON.stringify(existingUsers));
};

// Storing user-specific tasks
export const saveTasksForUserToLocalStorage = (userId, tasks) => {
  localStorage.setItem(`userTasks_${userId}`, JSON.stringify(tasks));
};

// Retrieving user data
export const getUserFromLocalStorage = (username) => {
  // Retrieve existing users from local storage
  const existingUsersJSON = localStorage.getItem('users');
  const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

  // Find the user with the matching username
  const user = existingUsers.find((u) => u.username === username);

  return user || null; // Return the found user or null if not found
};


// Retrieving user-specific tasks
export const getTasksForUserFromLocalStorage = (userId) => {
  const userTasksJSON = localStorage.getItem(`userTasks_${userId}`);
  if (userTasksJSON) {
    return JSON.parse(userTasksJSON);
  } else {
    // If no tasks are found in local storage, set an empty string as the value
    // instead of an empty array
    localStorage.setItem(`userTasks_${userId}`, '[]');
    return [];
  }
};

const initialState = {
  user: null,
  error: null,
  filterStatus: 'all',
  tasks: [],
  isAuthenticated: JSON.parse(localStorage.getItem('authUser')) || false, 
};

const authTasksSlice = createSlice({
  name: 'authTasks',
  initialState,
  reducers: {
    // Action to set the user in state
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Action to update the filter status
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    // Action to clear the user and tasks on logout
    logoutUser: (state) => {
      if (state.user) {
        state.user = null;
        state.tasks = [];
        state.isAuthenticated = false;
      }
    },    
    
    addTask: (state, action) => {
      if (state.user) {
        state.tasks.push(action.payload);
        saveTasksForUserToLocalStorage(state.user.id, state.tasks);
      } else {
        state.error = "User is not authenticated";
      }
    },    
    
    // Action to update the status of a task
    updateTask: (state, action) => {
      const taskId = action.payload.id;
      const newStatus = action.payload.status;
      const newTitle = action.payload.title;

      // Find the task index by ID
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        // Create a new copy of the tasks array with the updated task
        const updatedTasks = [...state.tasks];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          status: newStatus,
          title: newTitle,
        };
        
        // Update state with the new tasks array
        state.tasks = updatedTasks;

        // Save the updated tasks to localStorage
        saveTasksForUserToLocalStorage(state.user.id, updatedTasks);
      }
    },

    
    // Action to delete a task
    deleteTask: (state, action) => {
      const taskIdToDelete = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
      saveTasksForUserToLocalStorage(state.user.id, state.tasks);
    },
    
    // Action for user login
    loginUser: (state, action) => {
      const { username, password } = action.payload;

      // Retrieve user data from localStorage based on email
      const userData = getUserFromLocalStorage(username)
      
      // Check if the user exists and the provided password matches
      if (userData && userData.password === password) {
        // Set the user data in your Redux store
        
        localStorage.setItem('loggedInUser', userData.username);
        // You can also set an authentication flag or token if applicable.
        state.isAuthenticated = true;

        getUserData(username, state)
        // Now, you can initialize or update any other relevant user-related data in the store.
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
      // Action for user signup
    signUpUser: (state, action) => {
      const { username, email, password } = action.payload;
      
      // Generate a unique ID 
      const userId = uuid();
      saveTasksForUserToLocalStorage(userId, []); // Save an empty array initially

      // Save the user data to localStorage
      const newUser = { id: userId, username, email, password };
      saveUserToLocalStorage(newUser);

      // Set the user data in your Redux store
      state.user = newUser;

      // You can also set an authentication flag or token if applicable.
      state.isAuthenticated = true;

    },

    fetchUserTasks: (state) =>{
      const username = localStorage.getItem('loggedInUser')

      getUserData(username, state)

    },

    updateProfile: (state, action) => {
      const { firstName, lastName} = action.payload;

      // Check if the user is authenticated
      if (state.isAuthenticated) {
        // Update user profile fields
        state.user.firstName = firstName;
        state.user.lastName = lastName;
        
        // Save the updated user data to localStorage
        saveUserToLocalStorage(state.user);
      }
    },
  },
});

export const {
  logoutUser,
  setUser,
  updateFilterStatus,
  addTask,
  updateTask,
  deleteTask,
  loginUser,
  signUpUser,
  fetchUserTasks,
  updateProfile
} = authTasksSlice.actions;

export default authTasksSlice.reducer;
