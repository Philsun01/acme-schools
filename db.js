const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools');

client.connect();

const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS schools;

        CREATE TABLE schools(
            id UUID PRIMARY KEY default uuid_generate_v4(),
            name VARCHAR(100) NOT NULL UNIQUE,
            CHECK (char_length(name) > 0)
        );

        CREATE TABLE students(
            id UUID PRIMARY KEY default uuid_generate_v4(),
            first_name VARCHAR(255) NOT NULL,
            CHECK (char_length(first_name) > 0),
            last_name VARCHAR(255) NOT NULL,
            CHECK (char_length(last_name) > 0),
            "schoolId" UUID REFERENCES schools(id)

        );

        INSERT INTO students(first_name, last_name) VALUES('John', 'Smith');
    `;

    client.query(SQL);

    const seedSchools = ['UCLA', 'USC', 'UCSD', 'Berkeley', 'Cal State Fullerton'];
    const [UCLA, USC, UCSD, BERKELEY, CSUF] = await Promise.all(seedSchools.map(school=> createSchool(school)));
    
    const seedStudents = [
        { firstName: 'Mike', lastName: 'Jordan', schoolId: USC.id },
        { firstName: 'Jim', lastName: 'Smith', schoolId: UCSD.id },
        { firstName: 'Daniel', lastName: 'Lee', schoolId: BERKELEY.id },
        { firstName: 'Jennifer', lastName: 'Ran', schoolId: CSUF.id },
        { firstName: 'Lisa', lastName: 'Kim', schoolId: UCLA.id },
        { firstName: 'Natalie', lastName: 'Flemming', schoolId: BERKELEY.id },
        { firstName: 'Stanley', lastName: 'Marsh', schoolId: UCLA.id },
        { firstName: 'Bart', lastName: 'Simpson', schoolId: UCLA.id },
    ];
    const [Mike, Jim, Daniel, Jennifer, Lisa, Natalie, Stanley, Bart] = await Promise.all(seedStudents.map(student=>createStudent(student.firstName, student.lastName, student.schoolId)));
    await Promise.all([ 
        deleteStudent(Mike.id),
        deleteStudent(Jim.id),
        deleteStudent(Daniel.id),
        deleteStudent(Jennifer.id),
        deleteStudent(Lisa.id),
        deleteStudent(Natalie.id),
        deleteStudent(Stanley.id)
    ])
    console.log(await readStudents());

};

const createSchool = async(name) => {
    return (await client.query('INSERT INTO schools(name) VALUES($1) RETURNING *', [name])).rows[0];
};

const createStudent = async(firstName, lastName, schoolId) => {
    const SQL = 'INSERT INTO students(first_name, last_name, "schoolId") VALUES( $1, $2, $3) RETURNING *';
    return (await client.query(SQL, [firstName, lastName, schoolId])).rows[0];
};

const readSchools = async() => {
    return (await client.query('SELECT * FROM schools')).rows;
};

const readStudents = async() => {
    return (await client.query('SELECT * FROM students')).rows;
};

const deleteStudent = async(id) => {
    return await client.query('DELETE FROM students WHERE id = $1', [id]);
};

sync();

module.exports = {
    sync,
    createSchool,
    createStudent,
    readSchools,
    readStudents,
    deleteStudent
    
}