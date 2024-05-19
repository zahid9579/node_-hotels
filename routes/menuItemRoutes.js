const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem')
const {validate} = require('../models/menuItem');




// Create a Menu Items 
router.post('/', async (req, res)=>{
    try{
        const data = req.body
        const newItem = new MenuItem(data);
        const response = await newItem.save(data);
        console.log('Item saved...');
        res.status(200). json(response);
    }
    catch(err){
        console.log(err);
        res.status(500). json({error: 'Internal Server Error...'});
    }
    
});


// Reading the data from the database...
router.get('/', async (req, res) =>{
    try{
        const items = await MenuItem.find();
        console.log('data Fetched...');
        res.status(200).json(items);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// I have to complete this with parametrized Query in node 
router.get('//:tasteType', async (req, res)=>{
    try{
       const tasteType = req.params.tasteType;
       if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
        const response = await MenuItem.find({taste: tasteType});
        console.log('Response Fetched...');
        res.status(200).json(response);

       }else{
        res.status(404).json({error: 'Invalid Taste Type...'});

       }
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error.."});

    }
});

// Comment added

module.exports = router;