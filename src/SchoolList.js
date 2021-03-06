import React, {useState} from 'react';

const SchoolList = ({schools, students, enroll})=> {
    
    return (
        <div className = 'container-cards'>
            <div key='unenrolled' className='card'>
                <h3>Unrolled Students</h3>
                {
                students.filter(student=>student.schoolId === null)
                    .map(student=>{
                        return (
                            <div key={student.id}>
                                <a href = {`#/students/${student.id}`}>{student.firstName} {student.lastName}</a>
                            </div>
                        )}
                    )
                }
            </div>
            
            {
                schools.map(school=>{
                    return (
                        
                        <div key={school.id} className='card'>
                            <h3><a href = {`#/schools/${school.id}`}>{school.name}</a></h3>
                            <select onChange = {(ev)=>{
                                const student = students.find(student => student.id === ev.target.value);
                                enroll(student, school.id);
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
                                            <a href = {`#/students/${student.id}`}>{student.firstName} {student.lastName}</a>
                                            <button onClick = {()=> enroll(student, '')}>Unenroll</button>
                                        </div>
                                    )}
                                )
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default SchoolList;