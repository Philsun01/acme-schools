const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools');

client.connect();

const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS schools;

        CREATE TABLE schools(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(100) NOT NULL UNIQUE,
            CHECK (char_length(name) > 0)
        );

        CREATE TABLE students(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR(255) NOT NULL,
            CHECK (char_length(first_name) > 0),
            last_name VARCHAR(255) NOT NULL,
            CHECK (char_length(last_name) > 0),
            school_id UUID REFERENCES schools(id)
        );
    `;

    client.query(SQL);

    const seedSchools = [{name: 'UCLA'}, {name: 'USC'}, {name: 'UCSD'}, {name: 'Berkeley'}, {name: 'Cal State Fullerton'}];
    const [UCLA, USC, UCSD, BERKELEY, CSUF] = await Promise.all(seedSchools.map(school=> createSchool(school)));
    console.log(UCLA);
    const seedStudents = [
        { firstName: 'Mike', lastName: 'Jordan', schoolId: USC.id },
        { firstName: 'Jim', lastName: 'Smith', schoolId: UCSD.id },
        { firstName: 'Daniel', lastName: 'Lee', schoolId: BERKELEY.id },
        { firstName: 'Jennifer', lastName: 'Ran', schoolId: CSUF.id },
        { firstName: 'Lisa', lastName: 'Kim', schoolId: UCLA.id },
        { firstName: 'Natalie', lastName: 'Flemming', schoolId: BERKELEY.id },
        { firstName: 'Stanley', lastName: 'Marsh', schoolId: UCLA.id },
        { firstName: 'Bart', lastName: 'Simpson', schoolId: UCLA.id }
    ];
    const [Mike, Jim, Daniel, Jennifer, Lisa, Natalie, Stanley, Bart] = await Promise.all(seedStudents.map(student=>createStudent(student)));

};

const createSchool = async(school) => {
    return (await client.query('INSERT INTO schools(name) VALUES($1) RETURNING *', [school.name])).rows[0];
};

const createStudent = async(student) => {
    const SQL = 'INSERT INTO students(first_name, last_name, school_id) VALUES( $1, $2, $3) RETURNING *';
    return (await client.query(SQL, [student.firstName, student.lastName, student.schoolId])).rows[0];
};

const readSchools = async() => {
    return (await client.query('SELECT * FROM schools')).rows;
};

const readStudents = async() => {
    return (await client.query('SELECT * FROM students')).rows;
};

const updateSchool = async(school) => {
    const SQL = 'UPDATE schools SET name = $1 WHERE id = $2 RETURNING *';
    return (await client.query(SQL, [school.name, school.id])).rows[0];
};

const updateStudent = async(student) => {
    const SQL = 'UPDATE students SET first_name = $1, last_name = $2, school_id = $3 WHERE id = $4 RETURNING *'; 
    return (await client.query(SQL, [student.firstName, student.lastName, student.schoolId, student.id])).rows[0];
};

const deleteStudent = async(studentId) => {
    return await client.query('DELETE FROM students WHERE id = $1', [studentId]);
};

const deleteSchool = async(schoolId) => {
    await client.query('UPDATE students SET school_id = NULL WHERE school_id = $1', [schoolId]);
    return await client.query('DELETE FROM schools WHERE id = $1', [schoolId]);
};

module.exports = {
    sync,
    createSchool,
    createStudent,
    readSchools,
    readStudents,
    updateSchool,
    updateStudent,
    deleteStudent,
    deleteSchool
    
}