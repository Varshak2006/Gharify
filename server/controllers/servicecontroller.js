const Service=require("../models/Services");
const createService=async(req,res)=>{
    try{
        const service=await Service.create(req.body);
        res.status(201).json(service);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getAllServices=async(req,res)=>{
    try{
        const services=await Service.find();
        res.status(200).json(services);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports={createService,getAllServices};