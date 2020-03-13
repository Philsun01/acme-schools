import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SchoolList from './SchoolList';
import StudentList from './StudentList';

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
            console.log(res[1].data);
            })

    }, []);

    return(
        <div>
            <h1> This is the App.js</h1>
            {schools[0] && <h2>Test School is {schools[0].name}</h2>}
            {students[0] && <h2>Test Student is {students[0].first_name}</h2>}
           
            <SchoolList />
            <StudentList />
        </div>
    );
}

export default App;