import React from 'react';

const SchoolList = ({schools, students})=> {

    return (
        <div>
            <h2>This is a school list</h2>
            {
                schools.map(school=>{
                    return (
                        <div key={school.id} className='card'>
                            {school.name}
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