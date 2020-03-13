import React, {useState} from 'react';

const CreateStudent = ({schools, students, setStudents}) => {

    const [schoolId, setSchoolId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(schoolId);
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
