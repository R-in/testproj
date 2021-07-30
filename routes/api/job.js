const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Job = require('../../models/Job');

//Get all job
//@route    GET api/job
/*router.get("/job", function (req, res, next) {
    Job.find({}).then(function(job){
        res.send("job")
    }).catch(next)

})

//@router Post
router.post('/job', function (req, res, next){
    Job.create(req.body)
    .then(function(job){
        res.send(job)
    }).catch(next)
})


//error
app.use(function(err, req, res, next){
    res.status(404).send({error: err.message})
})*/
//@route    POST api/job
//@desc     Create Job
//@access   Private
/*router.post("/",  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not.isEmpty()
],  async (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const job = await Job.findById(req.job.id);

        const newJob = new Job({
            title: req.body.title,
            description: job.description,
            isAvailable: job.isAvailable
        });

        const job = await newJob.save()

        res.json(job)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }

})*/
router.post("/", [
    check('title', "Title is required" ).not().isEmpty(),
    check('description', "Description is Required").not().isEmpty()
] , async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {
        title,
        description,
        isAvailable
    } = req.body;

    //Build job Object
    const jobFields = {}

    jobFields.employe = req.employe.id;
    if(title) jobFields.title = title;
    if(description) jobFields.description = description;
    if(isAvailable) jobFields.isAvailable = isAvailable;
    

    try {
        let job = await Job.findOne({title})

       /* if(job){
            // Update
            job = await Job.findOneAndUpdate(
                {employe: req.employe.id}, 
                {$set: jobFields }, 
                {new: true}
            );

            return res.json(job)
        }*/
        if (job) {
            res.status(400).json({ errors: [{ msg: "Job Already Exists " }] });
          }

        // Create New job

        job = new Job(jobFields);

        await job.save()

        res.json(job)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

    res.send("job")

})

router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().populate('job', ['title', 'adescription'])
        res.json(jobs)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;
