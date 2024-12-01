const userModel = require("../models/userModel");

// Get Donor List
const getDonorListController = async(req,res)=>{
    try {
        const donorData = await userModel.find({role:'donor'}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:donorData.length,
            message:'Donor List fetched successfully',
            donorData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Donor list API',
            error
        })
    }
};
// Get Hospital List
const getHospitalListController = async(req,res)=>{
    try {
        const hospitalData = await userModel.find({role:'hospital'}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:hospitalData.length,
            message:'Hospital List fetched successfully',
            hospitalData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Hospital list API',
            error
        })
    }
};
// Get Org List
const getOrganisationListController = async(req,res)=>{
    try {
        const orgData = await userModel.find({role:'organisation'}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:orgData.length,
            message:'Org List fetched successfully',
            orgData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Org list API',
            error
        })
    }
};

// Delete Controller
const deleteDonorController = async(req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:'Donor record deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error while deleting donor',
            error
        })
    }
};

module.exports = {getDonorListController,getHospitalListController,getOrganisationListController,deleteDonorController}