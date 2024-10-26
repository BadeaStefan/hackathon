/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
export default function PartyCard({ party }) {
    const [show, setShow] = useState(false);
    const roleRef = useRef();
    const token = localStorage.getItem('userInfo');
    const userInfo = jwtDecode(token);
    console.log(userInfo.email);
    function handleShow() {
        setShow(true);
    }
    function handleClose() {
        setShow(false);
    }

    async function joinParty() {
        const role = roleRef.current.value;
        
        handleClose();
        try {
            const response = await fetch("http://localhost:3000/api/party/newpartyperson", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userInfo.email, name: party.name })
            })
            
        } catch (error) {
            console.log('nu a mers');
        }

        
    }
    
    return (
        <li className="party-item">
            <article>
                <div>
                    <h3>Name: {party.name}</h3>
                    <p>Location: {party.location}</p>
                    <p>Date: {party.date}</p>
                    <p>Budget: {party.budget}</p>
                    <p>Max People: {party.maxpeople}</p>
                    <p>Already going: {party.goingpeople.length}</p>
                    <button onClick={handleShow}>Join party</button>

          
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Please enter a responsibilitie wich you want to take</p>
                            <p>responsibilities available</p>
                            {party.responsibilities.map((res, index) => (<p key={index}>{res.responsibilities}</p>))}
                            <input type="text" placeholder="Enter your role" ref={roleRef}></input>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={joinParty}>
                               Join
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </article>
        </li>
    );
}