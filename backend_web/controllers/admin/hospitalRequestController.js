const HospitalRequest = require('../../models/hospitalRequest');
const Hospital = require("../../models/hospital");

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await HospitalRequest.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'fullName email');
    
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospital requests' });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    
    const request = await HospitalRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'approved';
    request.reason = 'Request approved by admin';
    await request.save();

    res.status(200).json({ message: 'Request approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving request' });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { reason } = req.body;
    
    const request = await HospitalRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'rejected';
    request.reason = reason || 'Request rejected by admin';
    await request.save();

    res.status(200).json({ message: 'Request rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting request' });
  }
};

exports.getPendingRequests = async(req, res) =>{
  try{
    const pendingHospitals = await Hospital.find({isApproved: false}).sort({createdAt: -1});
    console.log("Pending Hospitals:", pendingHospitals);
    res.status(200).json(
      {
        success:true,
        data: pendingHospitals,
      });
    

  }catch(error){
    console.error("Error fetching pending requests:", error.message);
    res.status(500).json({ message: 'Error fetching pending requests' });
  }
}
