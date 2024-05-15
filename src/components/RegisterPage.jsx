import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function RegisterPage({onUsernameSubmit}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                
                console.log(formData.name);
                const data = await response.json();
                onUsernameSubmit(formData.name);
                console.log('Registracija uspešna:', data);
                             
                navigate('/startgame');
            } else {
                const errorData = await response.json();
                console.error('Registracija nije uspela:', errorData);
                
            }
        } catch (error) {
            console.error('Greška pri registraciji:', error);
        }
    };

    return (
        <>
            <div className="joinGameContainer">
                <h2 className="usernameLabel">Registration details:</h2>
                <input type="text" name="name" className="textField" value={formData.name} onChange={handleChange} placeholder="Name" />
                <br />
                <input type="email" name="email" className="textField" value={formData.email} onChange={handleChange} placeholder="Email" />
                <br />
                <input type="password" name="password" className="textField" value={formData.password} onChange={handleChange} placeholder="Password" />
                <br />
                <Button onClick={handleClick} title={'Register'}></Button>
            </div>
        </>
    );
}

export default RegisterPage;
