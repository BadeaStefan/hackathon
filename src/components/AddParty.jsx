import { useRef } from 'react';

export default function AddParty() {
    const nameRef = useRef();
    const locationRef = useRef();
    const dateRef = useRef();
    const budgetRef = useRef();
    const maxPeopleRef = useRef();
    const respRef = useRef();
    const descriptionRef = useRef();

    async function addParty() {
        const name = nameRef.current.value;
        const location = locationRef.current.value;
        const date = dateRef.current.value;
        const budget = budgetRef.current.value;
        const maxpeople = maxPeopleRef.current.value;
        const responsibilities = respRef.current.value;
        const description = descriptionRef.current.value;

        const newParty = { name, location, date, budget, maxpeople, responsibilities, description };

        try {
            const response = await fetch('http://localhost:3000/api/party/addparty', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newParty)
            });
        } catch (error) {
            console.log('eroare la adaugare');
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="name" ref={nameRef}></input>
                <input type="text" className="form-control" placeholder="location" ref={locationRef}></input>
                <input type="text" className="form-control" placeholder="date" ref={dateRef}></input>
                <input type="number" className="form-control" placeholder="budget" ref={budgetRef}></input>
                <input type="number" className="form-control" placeholder="max people" ref={maxPeopleRef}></input>
                <input type="" className="form-control" placeholder="responsabilities, please enter items separated by comma" ref={respRef}></input>
                <input type="text" className="form-control" placeholder="descripiton" ref={descriptionRef}></input>
                <button onClick={addParty}>Add party</button>
            </div>
        </div>
    );
}