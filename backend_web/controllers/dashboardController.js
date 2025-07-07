const BloodRequest = require("../models/bloodrequest");
const mongoose = require("mongoose");
const Donor = require("../models/user");

// ➤ Get requests over the last month grouped by date
exports.getRequestTrends = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const trends = await BloodRequest.aggregate([
      {
        $match: {
          hospitalId: new mongoose.Types.ObjectId(hospitalId),
          createdAt: { $gte: oneMonthAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ success: true, data: trends });
  } catch (error) {
    console.error("Trends Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get blood group demand counts
exports.getBloodGroupDemand = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const groups = await BloodRequest.aggregate([
      { $match: { hospitalId: new mongoose.Types.ObjectId(hospitalId) } },
      {
        $group: {
          _id: "$bloodType",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error("Blood Group Demand Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get totals (all, pending, fulfilled)
exports.getRequestSummary = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const totalRequests = await BloodRequest.countDocuments({ hospitalId });
    const pendingRequests = await BloodRequest.countDocuments({
      hospitalId,
      status: "pending",
    });
    const fulfilledRequests = await BloodRequest.countDocuments({
      hospitalId,
      status: "fulfilled",
    });

    res.status(200).json({
      success: true,
      data: {
        totalRequests,
        pendingRequests,
        fulfilledRequests,
      },
    });
  } catch (error) {
    console.error("Request Summary Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get latest 5 requests
exports.getRecentRequests = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const recent = await BloodRequest.find({ hospitalId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("bloodType quantity status");

    res.status(200).json({ success: true, data: recent });
  } catch (error) {
    console.error("Recent Requests Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMatchedDonors = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    // 1. Get active blood requests of this hospital
    const activeRequests = await BloodRequest.find({
      hospitalId,
      status: "pending",
    }).select("bloodType");

    const requiredBloodTypes = activeRequests.map((r) => r.bloodType);

    if (requiredBloodTypes.length === 0) {
      return res.status(200).json({ success: true, data: [], count: 0 });
    }

    // 2. Find matching donors
    const matchedDonors = await Donor.find({
      bloodGroup: { $in: requiredBloodTypes },
      isEligible: true,
    }).select("name bloodGroup phone lastDonation");

    const donors = matchedDonors.map((donor) => ({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      contact: donor.phone,
      lastDonation: formatLastDonation(donor.lastDonation),
    }));

    // 3. Send response
    res.status(200).json({
      success: true,
      data: donors,
      count: donors.length,
    });
  } catch (error) {
    console.error("Matched Donors Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Helper function to format donation date
function formatLastDonation(lastDonation) {
  if (!lastDonation) return "No record";
  const diff = Date.now() - new Date(lastDonation).getTime();
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  return `${months} month${months !== 1 ? "s" : ""} ago`;
}

// ➤ Only return the count of matched donors
exports.getMatchedDonorsCount = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const activeRequests = await BloodRequest.find({
      hospitalId,
      status: "pending",
    }).select("bloodType");

    const requiredBloodTypes = activeRequests.map((r) => r.bloodType);

    if (requiredBloodTypes.length === 0) {
      return res.status(200).json({ success: true, count: 0 });
    }

    const count = await Donor.countDocuments({
      bloodGroup: { $in: requiredBloodTypes },
      isEligible: true,
    });

    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Matched Donor Count Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
