import React, {useEffect, useState} from 'react';
import { Route, HashRouter } from "react-router-dom";
import axios from 'axios';
import SchoolList from './SchoolList';
import CreateSchool from './CreateSchool';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import UpdateSchool from './UpdateSchool';

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
                    <li>{students.length} Students ({students.filter(student=>student.schoolId).length}) enrolled</li>
                </ul>
                <div className = 'container'>
                    <CreateSchool schools = {schools} setSchools = {setSchools}/>
                    <CreateStudent schools = {schools} students = {students} setStudents = {setStudents} />
                </div>
                <SchoolList schools = {schools} students = {students} enroll = {enroll}/>
            </div>
        );
    }

    return(
        <div>
            <h1><a href='#/'> Acme Schools </a></h1>
            <HashRouter>
                <Route path = '/schools/:schoolId' render = {(props)=>{ 
                    const school = schools.find(school => school.id === props.match.params.schoolId);
                    return (
                        <div>
                            <UpdateSchool school = {school} schools = {schools} setSchools = {setSchools} students = {students} setStudents = {setStudents}/>
                        </div>
                    );
                }}/>
                <Route path = '/students/:studentId' render = {(props)=>{ 
                    const student = students.find(student => student.id === props.match.params.studentId);
                    return (
                        <div>
                            <UpdateStudent student = {student} schools = {schools} setStudents = {setStudents} students = {students}/>
                        </div>
                    );

                }}/>
                <Route path ='/' exact component={Home} />
            </HashRouter>
       </div>
    );
}

export default App;