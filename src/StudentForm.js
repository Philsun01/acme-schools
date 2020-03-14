import React from 'react';
const StudentForm = ()=>{

    return (
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
    );     
}

export default StudentForm;
