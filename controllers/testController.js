const testController = (req,res) => {
    res.status(200).send({
        message:'Welcome to test',
        success:true
    });
};

module.exports = testController;