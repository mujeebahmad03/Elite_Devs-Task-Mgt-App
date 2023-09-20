import { useDispatch} from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Dashboard from './pages/Dashboard'
import SignUp from './pages/Signup';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import TaskDetails from './pages/TaskDetails';
import Header from './component/Header';
import { logoutUser } from './slice/authTaskSlice'; 
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import GlobalStyles from './component/styles/GlobalStyle';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const theme = {
  primary: '#38d39f',
  black1: '#646681',
  black2: '#585858',
  bg1: '#f8f8ff',
  bg2: '#ecedf6',
  bg3: '#cccdde',
  gray1: '#eee',
  gray2: '#dedfe1',
  black: 'black',
  white: 'white',
};


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const isAuthenticated = useSelector(state => state.authTasks.isAuthenticated);

  const authUser = JSON.parse(localStorage.getItem('authUser'));

  const isAuthenticated = authUser === true; // Use the retrieved value


  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  useEffect(() => {
    // Convert isAuthenticated to a string before storing it
    localStorage.setItem('authUser', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {authUser && <Header onLogout={handleLogout}/>}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {authUser ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
          </>
          ) : (
            // Redirect to login page when trying to access protected routes
            <>
              <Route path="/dashboard" element={<Navigate to="/login" />} />
              <Route path="/profile" element={<Navigate to="/login" />} />
              <Route path="/task/:taskId" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </>
    </ThemeProvider>
  );
}

export default App
