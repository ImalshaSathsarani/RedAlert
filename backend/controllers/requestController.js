const mongoose = require("mongoose");
const BloodRequest = require("../models/BloodRequest");
require("../models/hospital")

exports.getRequestDetails = async(req, res)=>{
   try {
    const request = await BloodRequest.findById(req.params.id).populate("hospitalId");
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  } 
}