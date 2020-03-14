import React, {useEffect, useState} from 'react';
import { Route, HashRouter, Link } from "react-router-dom";
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

    const Home = () => {
        return ( 
            <div>
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

    return(
        <div>
            <HashRouter>
            <Link to ="/">Acme Schools</Link>
            <Link to ="/test">test</Link>
            
                <Route path='/test' exact render={()=><h2>This is a test path</h2>} />
                <Route path='/' exact component={Home} />
            </HashRouter>
            
            
            
        </div>
    );
}

export default App;