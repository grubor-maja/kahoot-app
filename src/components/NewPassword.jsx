import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [new_password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Pozovi API rutu za resetovanje lozinke
        try {
            const response = await fetch('http://127.0.0.1:8000/api/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code, new_password })
            });
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }
            
            // Ako je uspešno, preusmeri korisnika na početnu stranicu
            navigate('/');
        } catch (error) {
            console.error('Error resetting password:', error.message);
        }
    };
  
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="code">Kod:</label>
                <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="new_password">Nova lozinka:</label>
                <input
                    type="password"
                    id="new_password"
                    value={new_password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Pošalji</button>
        </form>
    );
}

export default NewPassword;
