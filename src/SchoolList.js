import React from 'react';

const SchoolList = ({schools, students})=> {

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
                                {student.firstName}
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
                            {
                            students.filter(student=>student.schoolId===school.id)
                                .map(student=>{
                                    return (
                                        <div key={student.id}>
                                            {student.firstName}
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