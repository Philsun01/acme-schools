import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateStudent = ({student, schools, setStudents, students}) => {
    
    const [schoolId, setSchoolId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            firstName,
            lastName,
            schoolId,
            id: student.id
        }

        axios.put('./api/students', payload)
            .then(res=>{
                const updatedStudents = students.map( _student => {
                    if( _student.id === student.id){
                        return res.data;
                    }
                    return _student;
                });
                setStudents(updatedStudents);
                setSchoolId('');
                setFirstName('');
                setLastName('');
                setError('');
                window.location.hash = '#/';
            })
            .catch(ex => setError(ex.response.data.message));
    };

    useEffect(()=>{
        if(student){
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setSchoolId(student.schoolId);
        }
    },[student])

    const destroyStudent = (studentId) => {

        axios.delete(`./api/students/${studentId}`)
            .then( () => { 
                setStudents(students.filter( _student => _student.id !== studentId));
                setError('');
                window.location.hash = '#/';
            })
            .catch(ex => setError(ex.response.data.message));
    };

    return (
        <div>
            <h2> Update Student Form </h2>
            { error.length > 0 && <div className = 'error'> {error} </div> }
            <form onSubmit = {onSubmit}>
                <input type='text' value = {firstName} placeholder='First Name' onChange={ev=>setFirstName(ev.target.value)}></input>
                <input type='text' value = {lastName} placeholder='Last Name' onChange={ev=>setLastName(ev.target.value)}></input>
                <select onChange = {ev=> setSchoolId(ev.target.value)}>
                    <option value= '' > --Select a School-- </option>
                    <option value= '' > none </option>
                    {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                </select>
                <button disabled = {!firstName.length > 0 || !lastName.length > 0}>Update</button>
            </form>
                <button onClick = {() => destroyStudent(student.id)}> Delete Student </button>
        </div>
    );
};

export default UpdateStudent;