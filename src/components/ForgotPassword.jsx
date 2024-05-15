import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch('http://127.0.0.1:8000/api/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to send reset email');
            }

            console.log('Reset email sent successfully');
            navigate('/newpassword');

        } catch (error) {
            console.error('Error sending reset email:', error.message);
        }
    };

    return (
        <div  className="homePageContainer">
            <form onSubmit={handleSubmit}>
            <h2 className="usernameLabel">Email:</h2>
                <br />
                <input className="textField"  style={{ width: '100%' }}
                    type="email"
                    placeholder="Unesite vašu email adresu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <br />
                <button className='buttonNext' type="submit">Pošalji</button>
            </form>
        </div>

    );
}

export default ForgotPassword;
