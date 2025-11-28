let mongoose = require('mongoose');
let express = require('express');
let enquiryModel = require('./enquirymodel');
let app = express();

app.use(express.json()); // IMPORTANT: Keep this before routes

app.get('/first', (req, res) => {
    res.send("hello world");
});

app.post('/enquiry', async (req, res) => {
    try {
        let { name, email, message } = req.body;

        let newEnquiry = new enquiryModel({
            name,
            email,
            message
        });

        let saved = await newEnquiry.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete("/deleteenquiry/:id",async (req,res)=>{
    try{
          let enquiryId=req.params.id;
          let deletedEnquiry= await enquiryModel.findByIdAndDelete({_id:enquiryId});
          res.status(200).json(deletedEnquiry);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})
app.put("/updateenquiry/:id",async (req,res)=>{
      try{
        let enquiryId=req.params.id;
        let {name,email,message}=req.body();
        let updatedEnquiry= await enquiryModel.findByIdandUpdate({_id:enquiryId},{set:{name,email,message}});
      }
      catch(err){
        res.status(500).json({error:err.message});
      }
});
 app.get("/enquiries",async (req,res)=>{
    try{
        let enquiries= await enquiryModel.find();
        res.status(200).json(enquiries);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})

mongoose.connect("mongodb://localhost:27017/enquiryDB")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(err => console.log(err));

