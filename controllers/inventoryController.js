const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async(req,res) =>{
    try {
        const {email} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            throw new Error("User not Found");
        }
        // if(inventoryType==='in' && user.role!=='donor'){
        //     throw new Error("Not a donor account");
        // }
        // 
        
        if(req.body.inventoryType == 'out'){
            const requestedBloodGroup = req.body.bloodGroup
            const requestedQuantityOfBlood = req.body.quantity
            const organisation = new mongoose.Types.ObjectId(req.body.userId);
            // calculate Blood Quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                  $match: {
                    organisation,
                    inventoryType: "in",
                    bloodGroup: requestedBloodGroup,
                  },
                },
                {
                  $group: {
                    _id: "$bloodGroup",
                    total: { $sum: "$quantity" },
                  },
                },
              ]);
            //   console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;
            //calculate OUT Blood Quanitity

            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                $match: {
                    organisation,
                    inventoryType: "out",
                    bloodGroup: requestedBloodGroup,
                },
                },
                {
                $group: {
                    _id: "$bloodGroup",
                    total: { $sum: "$quantity" },
                },
                },
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            //in & Out Calc
            const availableQuanityOfBloodGroup = totalIn - totalOut;
            //quantity validation
            if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                success: false,
                message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }
            req.body.hospital = user?._id;
            } else {
            req.body.donor = user?._id;
            }
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success:true,
            message:"Inventory saved successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in create inventory API",
            error
        })
    }
};
const getInventoryController = async (req,res) => {
    try {
        const inventory = await inventoryModel.find({organisation:req.body.userId}).populate('donor').populate('hospital').sort({createdAt :-1});
        return res.status(200).send({
            success:true,
            message:"Inventory Record fetched",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in get inventory API",
            error
        })
    }
};

// Get top 3 inventory
const getRecentInventoryController = async(req,res)=>{
  try {
    const inventory = await inventoryModel.find({
      organisation:req.body.userId,
    }).limit(3).sort({createdAt:-1});
    return res.status(200).send({
      success:true,
      message:'Recent Inventory Data',
      inventory
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:'Error in Inventory Controller',
      error
    })
    
  }
}

// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};


// get donors record
const getDonorController = async(req,res) => {
    try {
        const organisation = req.body.userId;
        // find donors
        const donorId = await inventoryModel.distinct("donor",{
            organisation,
        });
        // console.log(donorId);
        const donors = await userModel.find({_id:{$in:donorId}});
        return res.status(200).send({
            success:true,
            message:"Donors fetched successfully",
            donors
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in donor record",
            error
        })
    }
};

const getHospitalController = async(req,res) => {
    try {
        const organisation = req.body.userId;
        // find donors
        const hospitalId = await inventoryModel.distinct("hospital",{
            organisation,
        });
        // console.log(donorId);
        const hospitals = await userModel.find({_id:{$in:hospitalId}});
        return res.status(200).send({
            success:true,
            message:"Hospitals fetched successfully",
            hospitals
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in hospital record",
            error
        })
    }
};

const getOrganisationController = async (req, res) => {
            try {
              const donor = req.body.userId;
              const orgId = await inventoryModel.distinct("organisation", { donor });
              //find org
              const organisations = await userModel.find({
                _id: { $in: orgId },
              });
              return res.status(200).send({
                success: true,
                message: "Org Data Fetched Successfully",
                organisations,
              });
            } catch (error) {
              console.log(error);
              return res.status(500).send({
                success: false,
                message: "Error In ORG API",
                error,
              });
            }
          };

const getOrganisationForHospitalController = async (req, res) => {
            try {
              const hospital = req.body.userId;
              const orgId = await inventoryModel.distinct("organisation", { hospital });
              //find org
              const organisations = await userModel.find({
                _id: { $in: orgId },
              });
              return res.status(200).send({
                success: true,
                message: "Hospital Org Data Fetched Successfully",
                organisations,
              });
            } catch (error) {
              console.log(error);
              return res.status(500).send({
                success: false,
                message: "Error In Hospital ORG API",
                error,
              });
            }
          };

module.exports = {createInventoryController,getInventoryController,getDonorController,getHospitalController,getOrganisationController,getOrganisationForHospitalController,getInventoryHospitalController,getRecentInventoryController};

