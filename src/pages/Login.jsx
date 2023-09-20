/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Container, Wave, FormCon, IconCon, Button, ImgContainer, InputCon, StyledLink } from '../component/styles/signup-loginStyles';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch} from 'react-redux';
import { loginUser } from '../slice/authTaskSlice';
import toast from "react-hot-toast"
import {MdLock} from 'react-icons/md'
import {BiSolidUser} from 'react-icons/bi';
import {getUserFromLocalStorage} from '../slice/authTaskSlice'

export default function Login() {
    const [isLoginUsernameFocused, setIsLoginUsernameFocused] = useState(false);
    const [isLoginPasswordFocused, setIsLoginPasswordFocused] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({ username: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();

        // Dispatch the loginUser action
        
        const { username } = loginData;
        
        const savedUserData = getUserFromLocalStorage(username);
        
        if (savedUserData) {
            const matchingData = savedUserData.username === loginData.username && savedUserData.password === loginData.password;

            if (matchingData) {
                
                dispatch(loginUser(loginData));
                toast.success('Login successful');
                localStorage.setItem('authUser', JSON.stringify(true));
                navigate('/dashboard');
            } else {
                toast.error('Login failed. Please check your username and password.');
            }
        } else {
            toast.error('User does not exist. Please sign up.');
        }
        setLoginData({ username: '', password: '' });
    };

// ...


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUsernameFocus = () => {
        setIsLoginUsernameFocused(true);
    };

    const handleUsernameBlur = (e) => {
        if (e.target.value === "") {
            setIsLoginUsernameFocused(false);
        }
    };

    const handlePasswordFocus = () => {
        setIsLoginPasswordFocused(true);
    };

    const handlePasswordBlur = (e) => {
        if (e.target.value === "") {
            setIsLoginPasswordFocused(false);
        }
    };

    return (
        <>
            <Wave src="/wave.png" />
            <Container>
                <ImgContainer>
                    <img src="/welcome.svg" />
                </ImgContainer>
                <FormCon>
                    <form onSubmit={handleLogin} method="POST">
                        <img src="/avatar.svg" />
                        <h2>Welcome</h2>
                        <InputCon className={isLoginUsernameFocused ? 'focus' : ''}>
                            <IconCon>
                            <BiSolidUser/>
                            </IconCon>
                            <div>
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleChange}
                                    onFocus={handleUsernameFocus}
                                    onBlur={handleUsernameBlur}
                                    required
                                />
                            </div>
                        </InputCon>
                        <InputCon className={isLoginPasswordFocused ? 'focus' : ''}>
                            <IconCon>
                                <MdLock/>
                            </IconCon>
                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    onFocus={handlePasswordFocus}
                                    onBlur={handlePasswordBlur}
                                    required
                                />
                            </div>
                        </InputCon>
                        <StyledLink>Do not have an account? <Link to='/'>Sign up</Link></StyledLink>
                        <Button>Login</Button>
                    </form>
                </FormCon>
            </Container>
        </>
    )
}
