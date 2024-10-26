import { useState,useEffect, useRef } from 'react';
export default function EditParty() {
    const [party, setParty] = useState([]);
    const nameRef = useRef();

    const name2Ref = useRef();
    const locationRef = useRef();
    const dateRef = useRef();
    const budgetRef = useRef();
    const maxPeopleRef = useRef();
    const respRef = useRef();
    const descriptionRef = useRef();

    async function fetchParties() {
        const partyName = nameRef.current.value;

        
            try {
                const response = await fetch('http://localhost:3000/api/party/getparty', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: partyName })
                });
                const partyData = await response.json();
                setParty(partyData);
            } catch (error) {
                console.log('Nu a mers');
        }
        
    }

    async function editParty() {
        const name = name2Ref.current.value;
        const location = locationRef.current.value;
        const date = dateRef.current.value;
        const budget = budgetRef.current.value;
        const maxpeople = maxPeopleRef.current.value;
        const responsibilities = respRef.current.value;
        const description = descriptionRef.current.value;
        
        const newPartyData = { name, location, date, budget, maxpeople, responsibilities, description, _id:party._id };
       
        try {
            const response = await fetch('http://localhost:3000/api/party/editparty', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( newPartyData )
            })
        } catch (error) {
            console.log('nu a mers');
        }
    }
    
    return (
        <div className="row">
            <div className="col-md-5">
                
                
                {party.length === 0 ? <>
                    <label>Enter the party name you want to edit</label>
                    <input type="text" className="form-control" placeholder="name" ref={nameRef}></input>
                    <button onClick={fetchParties}>OK</button>
                </> : (<div>
                        <input type="text" className="form-control" ref={name2Ref} defaultValue={party ? party.name : ''}></input>
                        <input type="text" className="form-control" ref={locationRef} defaultValue={party ? party.location : ''}></input>
                        <input type="text" className="form-control" ref={dateRef} defaultValue={party ? party.date : ''}></input>
                        <input type="text" className="form-control" ref={budgetRef} defaultValue={party ? party.budget : ''}></input>
                        <input type="text" className="form-control" ref={maxPeopleRef} defaultValue={party ? party.maxpeople : ''}></input>
                        <input type="text" className="form-control" ref={respRef} defaultValue={party ? party.responsibilities : ''}></input>
                        <input type="text" className="form-control" ref={descriptionRef} defaultValue={party ? party.description : ''}></input>
               
                        <button onClick={editParty}>Edit party</button>
               </div> )}
                
            </div>
        </div>
    );
}