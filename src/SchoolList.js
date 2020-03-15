import React, {useState} from 'react';

const SchoolList = ({schools, students, enroll})=> {
    const {enrollStudent, setEnrollStudent} = useState({});

    return (
        <div>
            <h2>This is a school list</h2>
            <div key='unenrolled' className='card'>
                <h3>Unrolled Students</h3>
                {
                students.filter(student=>student.schoolId === null)
                    .map(student=>{
                        return (
                            <div key={student.id}>
                                <a href = {`#/students/${student.id}`}>{student.firstName}</a>
                            </div>
                        )}
                    )
                }
                <hr/>
            </div>
            
            {
                schools.map(school=>{
                    return (
                        
                        <div key={school.id} className='card'>
                            <h3>{school.name}</h3>
                            <select onChange = {(ev)=>{
                                enroll(students.find(student=>student.id===ev.target.value), school.id);
                                }}>
                                <option> -- Select Student -- </option>
                                {
                                students.filter(student => student.schoolId !== school.id)
                                    .map(student => {
                                        return (
                                            <option key={student.id} value={student.id} >{student.firstName} {student.lastName}</option>
                                        );
                                    })
                                }
                            </select>
                            {
                            students.filter(student=>student.schoolId===school.id)
                                .map(student=>{
                                    return (
                                        <div key={student.id}>
                                            <a href = {`#/students/${student.id}`}>{student.firstName}</a>
                                            <button onClick = {()=> enroll(student, '')}>Unenroll</button>
                                        </div>
                                    )}
                                )
                            }
                            <hr/>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default SchoolList;