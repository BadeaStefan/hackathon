import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import PartyCard from "../../src/components/PartyCard.jsx";


export default function HomePage() {
    const [parties, setParties] = useState([]);

    const token = localStorage.getItem('userInfo');
    const navigate = useNavigate();
    console.log(token);

    useEffect(() => {
        if (token === null) {
            navigate('/login');
        }
    }, [token,navigate]);

    useEffect(() => {
        async function fetchParties() {
            try {
                const response = await fetch('http://localhost:3000/api/party/getparties');
                const partyData = await response.json();
                setParties(partyData);
            } catch (error) {
                console.log('Nu a mers');
            }
        }
        fetchParties();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <ul id="parties">
                {parties.map(party => (
                    <PartyCard key={party._id} party={party}></PartyCard>
                ))}
            </ul>
            
        </div>
    );
}