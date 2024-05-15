import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function CreateQuiz({adminToken}) {
    const navigate = useNavigate ();
    const [formData, setFormData] = useState({
        kod_sobe: '',
        naziv_sobe: '',
        pitanja: Array.from({ length: 10 }, () => ({
            pitanje: '',
            odgovori: ['', '', '', ''],
            tacan_odgovor: 0
        })),
        tezina: 'easy',
        maksimalan_broj_igraca: 10,
        status: 'javna',
        trenutnoPitanje: 0
    });
    

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newPitanja = [...formData.pitanja];
        newPitanja[index][name.split('.')[1]] = value; 
        setFormData({ ...formData, pitanja: newPitanja });
    };
    
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    const handleOdgovorChange = (e, indexPitanja, indexOdgovora) => {
        const { value } = e.target;
        const newPitanja = [...formData.pitanja];
        newPitanja[indexPitanja].odgovori[indexOdgovora] = value;
        setFormData({ ...formData, pitanja: newPitanja });
    };

    const handlePrevious = () => {
        setFormData({ ...formData, trenutnoPitanje: Math.max(formData.trenutnoPitanje - 1, 0) });
    };

    const handleNext = () => {
        setFormData({ ...formData, trenutnoPitanje: Math.min(formData.trenutnoPitanje + 1, formData.pitanja.length - 1) });
    };

    const token = localStorage.getItem('token');

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/sobe', 
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            navigate('/admin/startgame'); 
        } catch (error) {
            console.error('Error creating quiz:', error);
            
        }
    };
     
    // const handleSubmit2= async (e) => {
    //     e.preventDefault();
    
       
    //     const fixedQuestion = "Koji je glavni grad Francuske?";
    
    //     try {
    //         const response = await axios.post(
    //             'http://127.0.0.1:8000/api/pitanja', 
    //             { tekst_pitanja: fixedQuestion }, 
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${adminToken}`
    //                 }
    //             }
    //         );
    //         console.log(response.data); 
    //         navigate('/admin/startgame'); 
    //     } catch (error) {
    //         console.error('Error creating question:', error);
          
    //     }
    // };
    

    function Probica({ adminToken }) {
        console.log('Maja');
        console.log({ adminToken });
    
       
    }

    const { trenutnoPitanje } = formData;
    const trenutnoPitanjeData = formData.pitanja[trenutnoPitanje];

    return (
        <form onSubmit={handleSubmit} className='createForm'>
            <div>
            <Probica adminToken={adminToken} />
                <label>{`Pitanje ${trenutnoPitanje + 1}:`}</label>
                <input 
            type="text" 
            name={`pitanja[${trenutnoPitanje}].pitanje`} 
            value={trenutnoPitanjeData.pitanje} 
            onChange={(e) => handleChange(e, trenutnoPitanje)} 
            
        />

                <br />
                {trenutnoPitanjeData.odgovori.map((odgovor, indexOdgovora) => (
                    <div key={indexOdgovora}>
                        <label>{`Odgovor ${indexOdgovora + 1}:`}</label>
                        <input type="text" value={odgovor} onChange={(e) => handleOdgovorChange(e, trenutnoPitanje, indexOdgovora)} />
                        <br />
                    </div>
                ))}
                <label>Tačan odgovor:</label>
                <select name={`pitanja[${trenutnoPitanje}].tacan_odgovor`} value={trenutnoPitanjeData.tacan_odgovor} onChange={(e) => handleChange(e, trenutnoPitanje)}>
                    {[0, 1, 2, 3].map((indexOdgovora) => (
                        <option key={indexOdgovora} value={indexOdgovora}>{`Odgovor ${indexOdgovora + 1}`}</option>
                    ))}
                </select>
                <br />
            </div>
            <button type="button" onClick={handlePrevious} disabled={trenutnoPitanje === 0}>Previous</button>
            <button type="button" onClick={handleNext} disabled={trenutnoPitanje === formData.pitanja.length - 1}>Next</button>
            <br />
            <label>Kod sobe:</label>
            <input type="text" name="kod_sobe" value={formData.kod_sobe} onChange={handleChange2} />
            <br />
            <label>Naziv sobe:</label>
            <input type="text" name="naziv_sobe" value={formData.naziv_sobe} onChange={handleChange2} />
            <br />
            <label>Težina kviza:</label>
            <select name="tezina" value={formData.tezina} onChange={handleChange2}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <br />
            <label>Maksimalan broj igrača:</label>
            <input type="number" name="maksimalan_broj_igraca" value={formData.maksimalan_broj_igraca} onChange={handleChange2} />
            <br />
            <label>Status sobe:</label>
            <select name="status" value={formData.status} onChange={handleChange2}>
                <option value="javna">Javna</option>
                <option value="privatna">Privatna</option>
            </select>
            <br />
            <button type="submit">Kreiraj sobu</button>
        </form>
    );
}

export default CreateQuiz;
