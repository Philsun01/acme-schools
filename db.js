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
            first_name VARCHAR(255) NOT NULL UNIQUE,
            CHECK (char_length(first_name) > 0),
            last_name VARCHAR(255) NOT NULL UNIQUE,
            CHECK (char_length(last_name) > 0),
            "schoolId" UUID REFERENCES schools(id)

        );

        INSERT INTO students(first_name, last_name) VALUES('John', 'Smith');
    `;

    client.query(SQL);
    const seedSchools = ['UCLA', 'USC', 'UCSD', 'Berkeley', 'Cal State Fullerton'];
    const [UCLA, USC, UCSD, BERKELEY, CSUF] = 
    await Promise.all(seedSchools.map(school=> createSchool(school)));
    
    console.log(UCLA);

};

const createSchool = async(name) => {
    return (await client.query('INSERT INTO schools(name) VALUES($1) returning *', [name])).rows[0];
}

sync();

module.exports = {
    sync
}