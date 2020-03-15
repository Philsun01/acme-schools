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
                const update = students.map(_student=>{
                    if(_student.id === student.id){
                        return res.data;
                    }
                    return _student;
                });
                setStudents(update);
                setSchoolId('');
                setFirstName('');
                setLastName('');
                window.location.hash = '#/';
            });
    };

    useEffect(()=>{
        if(student){
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setSchoolId(student.schoolId);
        }
    },[student])

    const destroyStudent = (studentId) => {
        console.log(studentId);
        axios.delete(`./api/students/${studentId}`)
            .then( (res) => { 
                console.log(students);
                const update = students.filter( _student => {
                    if(_student.id !== studentId){
                        return _student;
                    }; 
                });
                console.log(update);
                setStudents(update);
                window.location.hash = '#/';
            })
            .catch(ex => console.log(ex));
    };

    return (
        <div>
            Update Student Form
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