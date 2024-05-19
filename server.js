
// function add(a, b){
//    return a + b;
// }


// var add = function(a, b){
//    return a + b;
// }

// var add = (a, b) =>{return a+b};

 // var add = (a, b) => a + b;


//  (function(){
 //   console.log('zahid is doing coding');
// }) ();

// var result  = add(2,9);
// console.log(result);


// This is CALLBACK Demo

// -------------------------------------------------------
/*
function callback(){
    console.log('Now adding is success fully completed....');
}

const add = function(a, b, callback){
let result = a+b;
console.log('result: '+ result);
   callback();
}


// Inlind function
add(2,3, () => console.log('add completed...'));
*/

//-----------------------------------------------------------
// Here MODULES starts...
//-----------------------------------------------------------

/* var fs = require ('fs');
var os = require('os'); // os package gives us all information about the user or system which we currently uses...
*/
/*
var user = os.userInfo();
console.log(user.username);

fs.appendFile('greeting.txt', 'Hii' + user.username + '!\n', () =>
     { console.log('file got created...')
});


console.log(os);
console.log(fs);
*/

//--------------------------------
// Here FILE IMPORT BEGINS...  MODULE. EXPORT
//--------------------------------

/*
const notes = require('./notes.js');

const _ = require('lodash');

console.log('server file is availabe');

var age = notes.age;
console.log(age); 

var result = notes.addNumber(age+18, 10)
console.log(result);


var data = ['person', 'person', 1, 2, 1, 2,'name', 'age', '2' ];
var filter = _.uniq(data);
console.log(filter);

console.log(_.isString('zahid'));
console.log(_.isString(5));
*/

// MODULES and FUNCTION ends here

/*

let age = prompt('Enter you age:');

if(age < 18){
    console.log('You get a discount of 20 %');
}
else if(age >= 18 && age <= 65){
    console.log('Normal Tickel price...');
}

else{
    console.log('you get a 30 % discount....');
}
*/


// Converting JSON to OBJECT

/*
const jsonString = '{"name": "Zahid", "age": 20, "City": "Bhopal"}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.age);
*/

// OBJECT to JSON

/*
const objectToConvert = {
    name:'Ansari',
    age: 30,
    hobbies:'Cricket'
};
const json = JSON.stringify(objectToConvert);
console.log(json);
console.log(typeof json);
*/


//-------------------------------------------------------
// CREATEING THE SERVER WITH THE HELP OF EXPRESS.....
//-------------------------------------------------------

const express = require('express')
const app = express();

const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Task = require('./models/task_management');

app.get('/', function (req, res) {
  res.send('Welcome to my hotel...');
})

app.get('/chicken', (req, res)=>{
    res.send('sure sir , i would love to serve chicken')
});

app.get('/idli', (req, res)=>{
    var customized_idli = {
        name:'rava idli',
        size:' 10 cm diameter',
        is_shambhar:true,
        is_chutney: false
    }
    res.send(customized_idli)

});

app.post('/items', (req, res) => {
   res.send('data is saved..'); 
});




//******************* 
//  CRUD OPERATION
//******************* 


//#######################
// TASK MANAGEMENT SYSTEM 
//#######################


app.post('/task_management', async (req, res) =>{
    try{
        const tasks = req.body;
        const newTasks = new Task(tasks);
        const response = await newTasks(tasks);
        console.log('Tasks Saved..');
        req.status(200). json(response);
    } 
    catch(err){
        console.log(err);
        req.status(500).json({error: 'Internal Server Error...'});
    }
});



// Importing the router files...
const personRouters = require('./routes/personRoutes');
app.use('/person', personRouters);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);


app.listen(3000, ()=>{
    console.log('listening on port 3000');
});


// Tasks or HomeWork.......
// parametrized  menuItem as like person..
