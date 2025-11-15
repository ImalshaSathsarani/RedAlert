const HospitalRequest = require('../../models/hospitalRequest');
const Hospital = require("../../models/hospital");
const PDFDocument = require("pdfkit");
const User = require("../../models/user");
const BloodRequest = require("../../models/bloodrequest");

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
    console.log(req.url);
    
    const request = await Hospital.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.isApproved = true;
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
    
    const request = await Hospital.findById(requestId);
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

exports.pendingHospitalReport = async(req,res)=>{
  try{
    const hospital = await Hospital.findById(req.params.id);
    if(!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const doc = new PDFDocument({margin:40, size:'A4'});

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${hospital.hospitalName}_report.pdf`
    );

    doc.pipe(res);

    // Add hospital info to the PDF
    doc.fontSize(20).text("Hospital Registration Report", { align: "center" });
    doc.moveDown(1);

    doc.fontSize(14).fillColor("#333").text(`Hospital Name: ${hospital.hospitalName}`);
    doc.text(`Type: ${hospital.type}`);
    doc.text(`Registration Number: ${hospital.registrationNumber}`);
    doc.text(`District: ${hospital.district}`);
    doc.text(`Address: ${hospital.address || "N/A"}`);
    doc.moveDown(0.5);

    doc.text(`Contact Person: ${hospital.name}`);
    doc.text(`Phone: ${hospital.phone}`);
    doc.text(`Designation: ${hospital.designation}`);
    doc.text(`Email: ${hospital.email}`);
    doc.text(`Approved: ${hospital.isApproved ? "Yes" : "No"}`);
    doc.moveDown(0.5);
    
    if (hospital.registrationDocument) {
  doc
    .fillColor("blue")
    .text("View Registration Document", {
      link: hospital.registrationDocument.startsWith("http")
        ? hospital.registrationDocument
        : `${process.env.BASE_URL}/${hospital.registrationDocument}`,
      underline: true,
    });
}

if (hospital.officeLetter) {
  doc
    .fillColor("blue")
    .text("View Office Letter", {
      link: hospital.officeLetter.startsWith("http")
        ? hospital.officeLetter
        : `${process.env.BASE_URL}/${hospital.officeLetter}`,
      underline: true,
    });
}
    
    doc.moveDown(0.5);
    
    doc.fillColor("#333");
    doc.text(`Created At: ${hospital.createdAt.toDateString()}`);
    doc.text(`Updated At: ${hospital.updatedAt.toDateString()}`);

    // Finalize the PDF
    doc.end();



  }catch(e){
    console.error("Error generating report:", e.message);
    res.status(500).json({ message: 'Error generating report' });
  }
}

exports.getBloodDonors = async(req,res)=>{
  try{
    const bloodDonors = await User.find({role:'donor'}).sort({createdAt:-1});
    console.log("Blood Donors:", bloodDonors);
    res.status(200).json({
      success:true,
      data:bloodDonors,
    })

  }catch(e){
    console.log("Error fetching blood donors:",e)
  }
}

exports.getRegisteredHospitals = async(req,res)=>{
  try{
    const registeredHospitals = await Hospital.find({isApproved:true}).sort({createdAt:-1});
    console.log("Registered Hospitals:", registeredHospitals);
    res.status(200).json({
      success:true,
      data:registeredHospitals,
    })

  }catch(e){
    console.log("Error fetching registered hospitals:",e)
  }
}

exports.downloadDonorReport = async(req,res)=>{
  try{
    const donorId =req.params.donorId;

    const donor = await User.findById(donorId);
    if(!donor){
      return res.status(404).json({message:"Donor not found"});
    }

    const donations = await BloodRequest.find({donorId});

    const doc = new PDFDocument();
    const filename = `Donor_Report_${donor.name}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}`
    );

    doc.pipe(res);

    doc.fontSize(22).text("Blood Donor Report", {align:"center"});
    doc.moveDown();

    doc.fontSize(16).text(`Name: ${donor.name}`);
    doc.text(`Email: ${donor.email}`);
    doc.text(`Blood Type: ${donor.bloodType || "Not specified"}`);
    doc.text(`Phone: ${donor.contactNumber || "Not available"}`);
    doc.text(`Location: ${donor.location || "Not specified"}`);
    doc.text(`Last Donation Date: ${donor.lastDonationDate ? donor.lastDonationDate.toDateString() : "Not available"}`);
    doc.moveDown();

    // Donation History Section
    doc.fontSize(16).text("Donation History", { underline: true });
    doc.moveDown(0.5);

    if (donations.length === 0) {
      doc.fontSize(12).text("No donation records available.");
    } else {
      donations.forEach((record, index) => {
        doc.fontSize(12).text(`Record #${index + 1}`, { bold: true });
        doc.text(`Hospital: ${record.hospitalName}`);
        doc.text(`Blood Type Requested: ${record.bloodType}`);
        doc.text(`Quantity: ${record.quantity}`);
        doc.text(`Donation Date: ${record.donationDate ? record.donationDate.toDateString() : "-"}`);
        doc.text(`Status: ${record.status}`);
        doc.moveDown();
      });
    }

    doc.end();


  }catch(e){
    console.log("Error generating donor report:",e)
  }
}

exports.inactivateDonor = async(req,res) =>{
  try{
    const donorId = req.params.donorId;
    const donor = await User.findById(donorId);
    if(!donor){
      return res.status(404).json({message:"Donor not found"});
    }
    donor.status = "inactive";
    await donor.save();
    res.status(200).json({message:"Donor inactivated successfully"});

  }catch(e){
    console.log("Error inactivating donor:",e)
  }
}