import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AllRooms({ handleRoomName }) {
    const [publicRooms, setPublicRooms] = useState([]);
    const [privateRooms, setPrivateRooms] = useState([]);
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleClick = (room) => {
        handleRoomName(room.naziv_sobe);
        
            if (room.Status === 'javna') {
                navigate('/questions2', { state: { room } });
            } else {
                navigate('/entercode', { state: { room } });
            }

        
    };

    const handleBack = () => {
        navigate('/');
    }

    const fetchRooms = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/sobe', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }
            const data = await response.json();
            const roomsData = data[0];
            const publicRoomsData = roomsData.filter(room => room.Status === 'javna');
            const privateRoomsData = roomsData.filter(room => room.Status === 'privatna');
            setPublicRooms(publicRoomsData);
            setPrivateRooms(privateRoomsData);
        } catch (error) {
            console.error('Error fetching rooms:', error.message);
        }
    };

    return (
        <>
            <div>
                <button onClick={handleBack} className='backButton'>Back</button>
                <h2>Public Rooms</h2>
                <div style={{ marginTop: '20px' }}>
                    {publicRooms.length > 0 && publicRooms.map(room => (
                        <button onClick={() => handleClick(room)} key={room.ID} className='room publicRoom'>{room.naziv_sobe}</button>
                    ))}
                </div>
                <h2>Private Rooms</h2>
                <div style={{ marginTop: '20px' }}>
                    {privateRooms.length > 0 && privateRooms.map(room => (
                        <button onClick={() => handleClick(room)} key={room.ID} className='room privateRoom'>{room.naziv_sobe}</button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllRooms;
