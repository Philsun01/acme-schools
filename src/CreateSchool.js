import React, {useState} from 'react';
import axios from 'axios';

const CreateSchool = ({schools, setSchools})=>{

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();

        axios.post('./api/schools',{name})
        .then(res => {
            setSchools([res.data, ...schools]);
            setName('');
        })
        .catch( ex => { console.log(ex) })
    };

    return (
        <div>
            <h2> Create School</h2>
            <form onSubmit = {onSubmit}>
                <input type='text' value={name} placeholder = 'School Name Here' onChange={ev=>setName(ev.target.value)}></input>
                {error}
                <button disabled = {!name}>Create</button>
            </form>
        </div>
    );
};

export default CreateSchool;