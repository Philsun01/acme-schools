import React, {useEffect, useState} from 'react';
import { Route, HashRouter, Link } from "react-router-dom";
import axios from 'axios';
import SchoolList from './SchoolList';
import CreateSchool from './CreateSchool';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';


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

    const enroll = (student, schoolId) => {
        axios.put('./api/students',{...student, schoolId} )
            .then(res => {
                const update = students.map(_student=>{
                    if(_student.id === student.id){
                        return res.data;
                    }
                    return _student;
                });
                setStudents(update);
            })
            .catch(ex=> console.log(ex))
    }

    const Home = () => {
        return ( 
            <div>
                <ul>
                    <li>{schools.length} Schools</li>
                    <li>{students.length} Students ({students.filter(s=>s.schoolId).length}) enrolled</li>
                </ul>
                <CreateSchool schools = {schools} setSchools = {setSchools}/>
                <CreateStudent schools = {schools} students = {students} setStudents = {setStudents} />
                <SchoolList schools = {schools} students = {students} enroll = {enroll}/>
            </div>
        );
    }

    

    return(
        <div>
            <h1><a href='#/'> Acme Schools </a></h1>
            <HashRouter>
                <Link to ='/'>Home</Link>
                <Link to ='/test'>test</Link>
            
                <Route path ='/test' exact render={()=><h2>This is a test path</h2>} />
                
                <Route path = '/students/:studentId' render = {(props)=>{ 
                    const studentId = props.match.params.studentId;
                    return (
                        <div>
                            <UpdateStudent student = {students.find(student => student.id === studentId)} schools = {schools} setStudents = {setStudents} students = {students}/>
                            This is the current studentId: {studentId}
                        </div>
                    );

                }}/>
                <Route path ='/' exact component={Home} />
            </HashRouter>
            
            
            
        </div>
    );
}

export default App;