import { configureStore } from '@reduxjs/toolkit';
import authTaskReducer from '../slice/authTaskSlice';

const store = configureStore({
    reducer: {authTasks: authTaskReducer},
});

export default store;
