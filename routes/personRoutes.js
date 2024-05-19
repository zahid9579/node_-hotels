const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { validate } = require('../models/menuItem');

//*******************************
// POST method to add a new person
//********************************
router.post('/', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data
        
        const newPerson = new Person(data); // Create a new Person document using the mongoose model..

        const response = await newPerson.save(data); // saving the new person to the database
        console.log('data saved...');
        res.status(200). json(response);
    }
    catch(err){
        console.log(err)
            res.status(500).json({error: ' Internal Server Error'});
    }
    
});



//*******************************
// Get method to get the data...
//*******************************
router.get('/', async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched..')
        res.status(200). json(data);
    }
    catch(err){
        console.log(err);
        res.status(500). json({error: 'Internal Server Error'});

    }
});




//*********************************
// Parametrized Query in node js...
//**********************************
router.get('//:workType', async(req, res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
            const response = await Person.find({work: workType});
            console.log('Response fetched...');
            res.status(200).json(response);
         }else{
            res.status(404).json({error: 'Invalid work type'});
         }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error...'});

    }

});

// Updating the data 

router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators:true,
        });

        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }


        console.log('data updating');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.json(500).json({error: 'Internal Server Error'});
        
    }
});


// Delete the data 
router.delete('/:id', async (req, res)=>{
    try{
       const personId = req.params.id;
       const response = await Person.findByIdAndDelete(personId);

       if(!response){
        return res.status(404).json({error: 'Person not found'});
       }

       console.log('data delete');
       res.status(200).json({message: 'Person Deleted Successfully'});



    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
});



module.exports = router;

