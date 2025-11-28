let mongoose = require('mongoose');
let express = require('express');
let enquiryModel = require('./enquirymodel');
let app = express();

app.use(express.json());

app.get('/first', (req, res) => {
    res.send("hello world");
});

app.post('/enquiry', async (req, res) => {
    try {
        let { name, email, message } = req.body;
        let newEnquiry = new enquiryModel({ name, email, message });
        let saved = await newEnquiry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/deleteenquiry/:id", async (req, res) => {
    try {
        let enquiryId = req.params.id;
        let deletedEnquiry = await enquiryModel.findByIdAndDelete(enquiryId); // ✅ Fixed
        res.status(200).json(deletedEnquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/updateenquiry/:id", async (req, res) => {
    try {
        let enquiryId = req.params.id;
        let { name, email, message } = req.body; // ✅ Fixed: removed ()
        let updatedEnquiry = await enquiryModel.findByIdAndUpdate(
            enquiryId, // ✅ Fixed parameter
            { name, email, message }, // ✅ Fixed update object
            { new: true } // ✅ Returns updated document
        );
        res.status(200).json(updatedEnquiry); // ✅ Added response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/enquiries", async (req, res) => {
    try {
        let enquiries = await enquiryModel.find();
        res.status(200).json(enquiries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ CORRECTED CONNECTION STRING
mongoose.connect("mongodb+srv://vardhanyadav1714:Meerut%4012345@cluster0.qd5i9ne.mongodb.net/enquiryDB")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(err => console.log(err));
