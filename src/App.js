import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SchoolList from './SchoolList';
import CreateSchool from './CreateSchool';
import CreateStudent from './CreateStudent';


const App = () => {

    const [schools, setSchools] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect( ()=>{
        Promise.all([
          axios.get('./api/schools'),
          axios.get('./api/students')  
        ])
        .then( res => {
            setSchools(res[0].data);
            setStudents(res[1].data);
            })

    }, []);

    return(
        <div>
            <h1>Acme Schools</h1>
            <ul>
                <li>{schools.length} Schools</li>
                <li>{students.length} Students ({students.filter(s=>s.schoolId).length}) enrolled</li>
            </ul>
            <CreateSchool schools = {schools} setSchools = {setSchools}/>
            <CreateStudent schools = {schools} students = {students} setStudents = {setStudents} />
            <SchoolList schools = {schools} students = {students}/>
            
        </div>
    );
}

export default App;