const Tour = require('../schema/toureSchema')

exports.checkBody = (req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
}

exports.getAllToure = async(req,res)=>{
    try{
        const tours = await Tour.find();
        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: {
                tours
            }
        })
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTour = async(req,res)=>{
    try{
        const tours = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data:{
                tours
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.createToure = async(req,res)=>{
    try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            Tour: newTour
        }
    });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateToure = async(req, res)=>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteToure =async (req, res)=>{
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            staus: 'sucess',
            data: null,
        });
    } catch (err){
        res.status(404).json({
            staus: 'fail',
            message: err
        });
    }
        
    
};