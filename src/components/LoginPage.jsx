import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function LoginPage({ onUsernameSubmit, onAdminLogin }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSuccessfulLogin = (token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', formData.name);
        console.log('Sacuvao sam ti token');
    };

    const handleClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                console.log(formData.name);
                const data = await response.json();
                // Proverite da li je onUsernameSubmit funkcija definisana pre poziva
                if (typeof onUsernameSubmit === 'function') {
                    onUsernameSubmit(data.user.name);
                }
                handleSuccessfulLogin(data.access_token);
                console.log('logovanje uspešno:', data);
                if (data.user.role === 'admin') {
                    // Proverite da li je onAdminLogin funkcija definisana pre poziva
                    if (typeof onAdminLogin === 'function') {
                        onAdminLogin(data.access_token);
                    }
                    navigate('/admin/startgame');
                } else {
                    navigate('/startgame');
                }

            } else {
                const errorData = await response.json();
                console.error('logovanje nije uspelo:', errorData);
            }
        } catch (error) {
            console.error('Greška pri logovanju:', error);
        }
    };

    const handleClick3 = () => {
        navigate('/forgotpassword');
    }
    return (
        <>
            <div className="joinGameContainer">
                <h2 className="usernameLabel">Login details:</h2>
                <br />
                <input type="email" name="email" className="textField" value={formData.email} onChange={handleChange} placeholder="Email" />
                <br />
                <input type="password" name="password" className="textField" value={formData.password} onChange={handleChange} placeholder="Password" />
                <br />
                <Button onClick={handleClick} title={'Login'} />
                <Button onClick={handleClick3} title={'Forgot password'} />
            </div>
        </>
    );
}

export default LoginPage;
