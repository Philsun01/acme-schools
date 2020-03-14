const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/style', express.static(path.join(__dirname, 'style')));

app.get('/', (req, res, next) => {
    res.sendFile( path.join(__dirname,'index.html'));
});

app.get('/api/schools', (req, res, next)=>{
    db.readSchools()
        .then( (data)=>res.send(data))
        .catch(next);
});

app.get('/api/students', (req, res, next)=>{
    db.readStudents()
        .then( data=>res.send(data))
        .catch(next);
});

app.post('/api/schools', (req, res, next)=>{
    db.createSchool(req.body)
       .then( data=>res.send(data))
       .catch(next);
});

app.post('/api/students', (req, res, next)=>{
    db.createStudent(req.body)
       .then( data=>res.send(data))
       .catch(next);
});

app.put('/api/students', (req, res, next)=>{
    console.log(req.body);
    db.updateStudent(req.body)
        .then(data => res.send(data))
        .catch(next);
})

app.delete('/api/students/:id', (req, res, next)=>{
    console.log(req.params.id);
    db.deleteStudent(req.params.id)
        .then(data=> console.log(data))
        .catch(next);
});



db.sync()
.then( ()=> app.listen(port, ()=> console.log(`Listening on ${port}`)));