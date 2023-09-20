/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Container, Wave, FormCon, IconCon, Button, ImgContainer, InputCon, StyledLink, Error} from '../component/styles/signup-loginStyles'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../slice/authTaskSlice';
import toast from "react-hot-toast";
import {MdEmail, MdLock} from 'react-icons/md';
import {BiSolidUser} from 'react-icons/bi';
import {getUserFromLocalStorage} from '../slice/authTaskSlice';

export default function SignUp() {

    const [isSignUpUsernameFocused, setIsSignUpUsernameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isSignUpPasswordFocused, setIsSignUpPasswordFocused] = useState(false);
    const [isConfirmPwdFocused, setIsConfirmPwdFocused] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPwd: ''
    })


    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPwd: '',
    });

    const isEmailValid = (email) => {
        // Use a regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isPasswordValid = (password) => {
        // Password should be at least 8 characters long and contain at least one special character
        return password.length >= 8 && /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password);
    };

    const validateForm = () => {

        let isValid = true;

        const { email, password, confirmPwd} = signUpData;
        if (!isEmailValid(email)) {
            setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Please enter a valid email address.',
            }));
            isValid = false; // Mark the form as invalid if email is not valid
        } else {
        // Clear the error message if the email input is valid
            setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: '',
            }));
        }

        if (!isPasswordValid(password)) {
            setFormErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password should be at least 8 characters long and contain special characters.',
            }));
            isValid = false; // Mark the form as invalid if password is not valid
        } else {
        // Clear the error message if the password input is valid
            setFormErrors((prevErrors) => ({
            ...prevErrors,
            password: '',
            }));
        }

        if (confirmPwd !== password ) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                confirmPwd: 'Password does not match',
                }));
                isValid = false;
        } else {
            // Clear the error message if the password input is valid
                setFormErrors((prevErrors) => ({
                ...prevErrors,
                confirmPwd: '',
                }));
            }
        return isValid
    };
    

    const handleSignUp = (e) => {
        e.preventDefault();

        // Validate both email and password
        const isFormValid = validateForm();

        // If all validations pass, submit the form
        if (isFormValid) {
            
            const { username, email } = signUpData;

            // Check if the user already exists in local storage
            const existingUser = getUserFromLocalStorage(username)
            const userExists = existingUser?.email === email && existingUser?.username === username;

            if (userExists) {
            toast.success("User already exists.");
            // Redirect to the dashboard or the desired page after login
            navigate('/login');
            } else {
                // If the user does not exist, proceed with registration
            // Dispatch the signUpUser action
            dispatch(signUpUser(signUpData));
            localStorage.setItem('authUser', JSON.stringify(true));
            toast.success("Signed Up Successfully!");
            
            // Redirect to the dashboard page
            navigate('/dashboard');
            }

            setSignUpData({
            username: '',
            email: '',
            password: '',
            confirmPwd: ''
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    


    const handleUsernameFocus = () => {
        setIsSignUpUsernameFocused(true);
    };

    const handleUsernameBlur = (e) => {
        if (e.target.value === "") {
            setIsSignUpUsernameFocused(false);
        }
    };
    const handleEmailFocus = () => {
        setIsEmailFocused(true);
    };

    const handleEmailBlur = (e) => {
        if (e.target.value === "") {
            setIsEmailFocused(false);
        }
    };

    const handlePasswordFocus = () => {
        setIsSignUpPasswordFocused(true);
    };

    const handlePasswordBlur = (e) => {
        if (e.target.value === "") {
            setIsSignUpPasswordFocused(false);
        }
    };
    const handleConfirmPwdFocus = () => {
        setIsConfirmPwdFocused(true);
    };

    const handleConfirmPwdBlur = (e) => {
        if (e.target.value === "") {
            setIsConfirmPwdFocused(false);
        }
    };

    return (
        <>
            <Wave src="/wave.png" />
            <Container>
                <ImgContainer>
                    <img src="/signup.svg" />
                </ImgContainer>
                <FormCon>
                    <form onSubmit={handleSignUp} method='POST'>
                        <img src="/avatar.svg" />
                        <h2>Sign Up</h2>
                        <InputCon className={isSignUpUsernameFocused ? 'focus' : ''}>
                            <IconCon>
                                <BiSolidUser/>
                            </IconCon>
                            <div>
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={signUpData.username}
                                    onFocus={handleUsernameFocus}
                                    onBlur={handleUsernameBlur}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </InputCon>
                        <InputCon className={isEmailFocused ? 'focus' : ''}>
                            <IconCon>
                            <MdEmail/>
                            </IconCon>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={signUpData.email}
                                    name="email"
                                    onFocus={handleEmailFocus}
                                    onBlur={handleEmailBlur}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </InputCon>
                            {formErrors.email && <Error>{formErrors.email}</Error>}
                        <InputCon className={isSignUpPasswordFocused ? 'focus' : ''}>
                            <IconCon>
                            <MdLock/>
                            </IconCon>
                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={signUpData.password}
                                    onFocus={handlePasswordFocus}
                                    onBlur={handlePasswordBlur}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </InputCon>
                            {formErrors.password && <Error>{formErrors.password}</Error>}
                        <InputCon className={isConfirmPwdFocused ? 'focus' : ''}>
                            <IconCon>
                            <MdLock/>
                            </IconCon>
                            <div>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={signUpData.confirmPwd}
                                    name="confirmPwd"
                                    onFocus={handleConfirmPwdFocus}
                                    onBlur={handleConfirmPwdBlur}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </InputCon>
                            {formErrors.confirmPwd && <Error>{formErrors.confirmPwd}</Error>}
                        <StyledLink>Already have an account? <Link to='/login'>Login</Link></StyledLink>
                        <Button>Register</Button>
                    </form>
                </FormCon>
            </Container>
        </>
    )
}