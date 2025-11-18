const HospitalRequest = require('../../models/hospitalRequest');
const Hospital = require("../../models/hospital");
const PDFDocument = require("pdfkit");
const User = require("../../models/user");
const BloodRequest = require("../../models/bloodrequest");
const Admin = require("../../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail} = require("../../utils/mailer");
const { approvalSubject, approvalText, approvalHtml } = require("../../utils/emailTemplates");
const { rejectionSubject, rejectionText, rejectionHtml } = require("../../utils/rejectionTemplates");


exports.registerAdmin = async(req,res)=>{
  try{
    console.log("Request body:", req.body); // Add this line
    const {name, email, phone,password} = req.body;

    if(!name || !email || !phone || !password){
      return res.status(400).json({message:"All fields are required"});
    }

    const existing = await Admin.findOne({ email})
    if(existing){
      return res.status(400).json({message:"Admin with this email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    return res.status(201).json({message:"Admin registered successfully", admin:newAdmin,token});

  }catch(e){
    console.error("Error registering admin:", e);
    res.status(500).json({message:"Error registering admin", error: e.message});
  }
}

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ 
      message: "Login successful", 
      admin,
      token 
    });

  } catch (error) {
    console.error("Error logging in admin:", error);
    return res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// exports.logoutAdmin = async (req, res) => {
//   try {
//     // If using cookies to store JWT, clear the cookie
//     // res.clearCookie("token");

//     // If token is stored in localStorage (frontend), just remove it there
//     return res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     console.error("Error logging out admin:", error);
//     return res.status(500).json({ message: "Error logging out", error: error.message });
//   }
// };


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

// exports.approveRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     console.log(req.url);
    
//     const request = await Hospital.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: 'Request not found' });
//     }

//     request.isApproved = true;
//     request.status = 'approved';
//     request.reason = 'Request approved by admin';
//     await request.save();

//     res.status(200).json({ message: 'Request approved successfully' });
//   } catch (error) {
//       console.error("Error approving request:", error);
//       res.status(500).json({message:"Error approving", error: error.message});
//   }
// };
exports.approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const updated = await Hospital.findByIdAndUpdate(
      requestId,
      { isApproved: true, status: 'approved', reason: 'Request approved by admin' },
      { new: true, runValidators: false } // Don't validate the whole document
    );

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

     // Email details
    const to = updated.email;
    const hospitalName = updated.hospitalName || "Hospital";
    const appUrl = process.env.APP_URL;

    const subject = approvalSubject(hospitalName);
    const text = approvalText(hospitalName, appUrl);
    const html = approvalHtml(hospitalName, appUrl);

    try {
      await sendEmail({ to, subject, text, html });
      console.log("Approval email sent to", to);
    } catch (mailError) {
      console.error("Email Error:", mailError);
    }

    res.status(200).json({ message: 'Request approved successfully' });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ message: "Error approving", error: error.message });
  }
};

// exports.rejectRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const { reason } = req.body;
    
//     const request = await Hospital.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: 'Request not found' });
//     }

//     request.status = 'rejected';
//     request.reason = reason || 'Request rejected by admin';
//     await request.save();

//     res.status(200).json({ message: 'Request rejected successfully' });
//   } catch (error) {
//       console.error("Error rejecting request:", error);
//      res.status(500).json({message:"Error rejecting", error: error.message});
//   }
// };

exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { reason } = req.body;

     if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    const updated = await Hospital.findByIdAndUpdate(
      requestId,
      { status: 'rejected', rejectionReason: reason },
      { new: true, runValidators: false } // Don't validate the whole document
    );

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

     // Prepare email details
    const to = updated.email;
    const hospitalName = updated.hospitalName || "Hospital";
    const appUrl = process.env.APP_URL;

    const subject = rejectionSubject(hospitalName);
    const text = rejectionText(hospitalName, reason, appUrl);
    const html = rejectionHtml(hospitalName, reason, appUrl);

    try {
      await sendEmail({ to, subject, text, html });
      console.log("Rejection email sent to", to);
    } catch (mailError) {
      console.error("Email Error:", mailError);
    }

    res.status(200).json({ message: 'Request rejected and email sent' });
  } catch (error) {
    console.error("Error rejected request:", error);
    res.status(500).json({ message: "Error rejecting", error: error.message });
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

exports.downloadHospitalHistoryReport = async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Fetch hospital-related blood requests
    const requests = await BloodRequest.find({ hospitalId }).sort({ createdAt: -1 });

    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const filename = `Hospital_History_${hospital.hospitalName}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    doc.pipe(res);

    doc.fontSize(20).text("Hospital History Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Hospital Name: ${hospital.hospitalName}`);
    doc.text(`Registration Number: ${hospital.registrationNumber}`);
    doc.text(`District: ${hospital.district}`);
    doc.text(`Address: ${hospital.address || "N/A"}`);
    doc.text(`Contact Person: ${hospital.name}`);
    doc.text(`Phone: ${hospital.phone}`);
    doc.text(`Email: ${hospital.email}`);
    doc.text(`Approved: ${hospital.isApproved ? "Yes" : "No"}`);
    doc.moveDown();

    doc.fontSize(16).text("Blood Request History", { underline: true });
    doc.moveDown(0.5);

    if (requests.length === 0) {
      doc.fontSize(12).text("No history available.");
    } else {
      requests.forEach((req, index) => {
        doc.fontSize(12).text(`Request #${index + 1}`);
        doc.text(`Donor Name: ${req.donorName || '-'}`);
        doc.text(`Blood Type: ${req.bloodType}`);
        doc.text(`Quantity: ${req.quantity}`);
        doc.text(`Status: ${req.status}`);
        doc.text(`Request Date: ${req.createdAt.toDateString()}`);
        doc.moveDown();
      });
    }

    doc.end();

  } catch (e) {
    console.error("Error generating hospital history report:", e);
    res.status(500).json({ message: "Error generating hospital history report" });
  }
};

exports.inactivateHospital = async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId;
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.status = "inactive"; // mark as inactive
    await hospital.save();

    res.status(200).json({ message: "Hospital inactivated successfully" });
  } catch (e) {
    console.error("Error inactivating hospital:", e);
    res.status(500).json({ message: "Error inactivating hospital" });
  }
};

exports.getDashboardStats = async(req,res)=>{
  try{
    const donorCount = await User.countDocuments({role:'donor', status:'active'});
    const hospitalCount = await Hospital.countDocuments({isApproved:true, status:'active'});
    const pendingRequests = await Hospital.countDocuments({isApproved:false});

    res.status(200).json({
      success: true,
      donorCount,
      hospitalCount,
      pendingRequests,
    })

  }catch(e){
    console.error("Error fetching dashboard stats:", e);
  }
}

exports.getMonthlyRegistrations = async(req,res)=>{
  try{

    const donorStats = await User.aggregate([
      {
       $match:{role:'donor'}
        }
      ,{
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
       { $sort: { "_id.month": 1 } }
    ]);

      const hospitalStats = await Hospital.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

     const formattedData = {
      donors: Array(12).fill(0),
      hospitals: Array(12).fill(0),
    };

    donorStats.forEach(item => {
      formattedData.donors[item._id.month - 1] = item.count;
    });

    hospitalStats.forEach(item => {
      formattedData.hospitals[item._id.month - 1] = item.count;
    });


    res.status(200).json({
      success:true,
      monthly: formattedData,
    });
  }catch(e){
    console.error("Error fetching monthly stats:", e);
  }
}



exports.getUserDistribution = async (req, res) => {
  try {
    const donorCount = await User.countDocuments({ role: "donor" });
    const hospitalCount = await Hospital.countDocuments();

    res.status(200).json({
      success: true,
      donors: donorCount,
      hospitals: hospitalCount,
      chartData: {
        labels: ["Donors", "Hospitals"],
        data: [donorCount, hospitalCount],
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};