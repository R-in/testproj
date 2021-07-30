const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');
const config = require('config');
const EmpProfile = require("../../models/EmpProfile");
const Employer = require("../../models/Employer");

//@route    GET api/emp_profile/me
//@desc     Get current employes profile
//@access   Private
router.get("/me", auth, async (req, res) => {
    try {
        const empprofile = await empProfile
                            .findOne({ employer: req.employe.id })
                            .populate('employe', ['name']);
        
        if(!empprofile){
            return res.status(400).json({msg: "There is no profile for this employe"})
        }
        res.json(empprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error ')
    }
})


//@route    POST api/empprofile
//@desc     Create or Update empprofile profile
//@access   Private
router.post("/", [auth, [
    check('status', "Status is required" ).not().isEmpty()
]] , async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status
    } = req.body;

    //Build empprofile Object
    const empprofileFields = {}

    empprofileFields.user = req.user.id;
    if(company) empprofileFields.company = company;
    if(website) empprofileFields.website = website;
    if(location) empprofileFields.location = location;
    if(bio) empprofileFields.bio = bio;
    if(status) empprofileFields.status = status;
    

    try {
        let empprofile = await EmpProfile.findOne({employe: req.employe.id})

        if(empprofile){
            // Update
            empprofile = await EmpProfile.findOneAndUpdate(
                {employe: req.employe.id}, 
                {$set: empprofileFields }, 
                {new: true}
            );

            return res.json(empprofile)
        }

        // Create New empprofile

        empprofile = new EmpProfile(empprofileFields);

        await empprofile.save()

        res.json(empprofile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

    res.send("hello")

})

//@route    GET api/empprofile
//@desc     Get all empprofiles
//@access   Public

router.get("/", async (req, res) => {
    try {
        const empprofiles = await EmpProfile.find().populate('employer', ['name'])
        res.json(empprofiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

//@route    GET api/empprofile/employe/:employe_id
//@desc     Get empprofile by employe id
//@access   Public

router.get("/employer/:employe_id", async (req, res) => {
    try {
        const empprofile = await EmpProfile.findOne({ employer: req.params.employe_id }).populate('employer', ['name']);

        if(!empprofile) return res.status(400).json({msg: "There is no emp profile for this employe"});
        
        res.json(empprofile);

    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: "EmpProfile not found"});
        }
        res.status(500).send("Server Error")
    }
})

//@route    Delete api/empprofile
//@desc     Delete EmpProfile, employee & Posts
//@access   Private
router.delete("/", auth,  async (req, res) => {
    try {
        // Remove Users and posts

        // Remove EmpProfile
        await EmpProfile.findOneAndRemove({ employer: req.employe.id});

        //Remove User
        await Employer.findOneAndRemove({ _id: req.employe.id});


        res.json({msg: "Employer deleted Successfully"})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

   

module.exports = router;