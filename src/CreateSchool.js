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
        .catch( ex => setError(ex.response.data.message))
    };

    return (
        <div className = 'create-form'>
            <h2> Create School Form </h2>
            { error.length > 0 && <div className = 'error'> {error} </div> }
            <form onSubmit = {onSubmit}>
                <input type='text' value={name} placeholder = 'School Name Here' onChange={ev=>setName(ev.target.value)}></input>
                {error}
                <button disabled = {!name}>Create</button>
            </form>
        </div>
    );
};

export default CreateSchool;