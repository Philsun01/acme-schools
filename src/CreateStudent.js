import React, {useState} from 'react';
import axios from 'axios';

const CreateStudent = ({schools, students, setStudents}) => {

    const [schoolId, setSchoolId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            firstName,
            lastName,
            schoolId
        }
        console.log(payload);
        axios.post('./api/students',payload)
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
                <input type='text' value = {firstName} placeholder='First Name' onChange={ev=>setFirstName(ev.target.value)}></input>
                <input type='text' value = {lastName} placeholder='Last Name' onChange={ev=>setLastName(ev.target.value)}></input>
                <select onChange = {ev=> setSchoolId(ev.target.value)}>
                    <option value= '' > --Select a School-- </option>
                    <option value= '' > none </option>
                    {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                </select>
                <button disabled = {!firstName.length > 0 || !lastName.length > 0}>Create</button>
            </form>
        </div>
    );
}

export default CreateStudent;
