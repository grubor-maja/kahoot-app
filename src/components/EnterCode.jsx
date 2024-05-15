import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnterCode({ roomName }) {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/rooms')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/sobe2/${pin}/quiz`);
            const data = await response.json();

            if (!response.ok) {
                alert('Uneseni PIN nije ispravan. Molimo unesite ponovo.');
                return;
            }

            const { soba } = data;
            
            navigate('/questions2', { state: { room: soba } });
        } catch (error) {
            console.error('Error fetching quiz:', error.message);
        }
    };

    return (
        <div>
            <button onClick={handleBack} className='backButton'>Back</button>
            <form onSubmit={handleSubmit}>
                <label>
                    Unesite PIN kviza:
                    <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
                </label>
                <button type="submit">Potvrdi</button>
            </form>
        </div>
    );
}

export default EnterCode;
