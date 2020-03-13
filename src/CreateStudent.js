import React, {useState} from 'react';
import axios from 'axios';

const CreateStudent = ({schools, students, setStudents}) => {

    const [schoolId, setSchoolId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errore, setError] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(schoolId);
        axios.post('./api/students',{firstName,lastName,schoolId})
            .then(res=>{
                console.log(res.data);
                setStudents([res.data, ...students]);
                setSchoolId('');
                setFirstName('');
                setLastName('');
            });
    };

    return (
        <div>
            Create Student Form
            <form onSubmit = {onSubmit}>
                <input type='text' placeholder='First Name' onChange={ev=>setFirstName(ev.target.value)}></input>
                <input type='text' placeholder='Last Name' onChange={ev=>setLastName(ev.target.value)}></input>
                <select onChange = {ev=> setSchoolId(ev.target.value)}>
                    <option value={ null }> --Select a School-- </option>
                    <option value={ null }> none </option>
                    {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                </select>
                <button>Create</button>
            </form>
        </div>
    );
}

export default CreateStudent;
