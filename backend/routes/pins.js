const router = require("express").Router();
const Pin =require("../models/Pins")

// create a pin

router.post("/",async (req,res)=>{
    const newPin= new Pin(req.body)  // jo bhi body mai aarha hai voh modal mai store ho rha hai
    try{
        const savedPin= await newPin.save();
        res.status(200).json(savedPin);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// get all pin // get is used to retrieve

router.get("/", async (req,res)=>{
    try{
        const pins=await Pin.find();
    res.status(200).json(pins)
    }catch(err){
        res.status(500).json(err);
    }
    
})




module.exports=router