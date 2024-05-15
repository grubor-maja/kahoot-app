import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function LoginPage({onUsernameSubmit}) {
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
                onUsernameSubmit(data.user.name);
                console.log('logovanje uspešno:', data);
                navigate('/startgame');
            } else {
                const errorData = await response.json();
                console.error('logovanje nije uspelo:', errorData);
                // Dodaj logiku za prikazivanje poruke o grešci
            }
        } catch (error) {
            console.error('Greška pri logovanju:', error);
        }
    };

    return (
        <>
            <div className="joinGameContainer">
                <h2 className="usernameLabel">Login details:</h2>
                <br />
                <input type="email" name="email" className="textField" value={formData.email} onChange={handleChange} placeholder="Email" />
                <br />
                <input type="password" name="password" className="textField" value={formData.password} onChange={handleChange} placeholder="Password" />
                <br />
                <Button onClick={handleClick} title={'Login'}></Button>
            </div>
        </>
    );
}

export default LoginPage;
