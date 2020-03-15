import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateSchool = ({school, schools, setSchools, students, setStudents}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name,
            id: school.id
        }

        axios.put('./api/schools', payload)
            .then( res =>{
                const updatedSchools = schools.map(_school => {
                    if( _school.id === school.id){
                        return res.data;
                    }
                    return _school;
                });
                setSchools(updatedSchools);
                setName('');
                window.location.hash = '#/';
            })
            .catch(ex => setError(ex.response.data.message));
    };

    useEffect(()=>{
        if(school){
            setName(school.name);
        }
    },[school]);

    const destroySchool = (schoolId) => {

        axios.delete(`./api/schools/${schoolId}`)
            .then( () => { 

                setSchools(schools.filter(_school => _school.id !== school.id));
                setStudents( students.map( student => {
                    if(student.schoolId === schoolId){
                        student.schoolId = null;
                    }
                    return student;
                }))
                window.location.hash = '#/';
            })
            .catch(ex => setError(ex.response.data.message));
    };

    return (
        <div className = 'card card-big'>
            <h2> Update School Form </h2>
            { error.length > 0 && <div className = 'error'> {error} </div> }
            <form onSubmit = {onSubmit}>
                <input type='text' value = {name} placeholder='New School Name' onChange={ev=>setName(ev.target.value)}></input>
                <button disabled = {!name.length > 0}>Update School Name</button>
            </form>
                <button onClick = {() => destroySchool(school.id)}> Delete School </button>
            
        </div>
    );

};

export default UpdateSchool;