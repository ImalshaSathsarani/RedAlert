const BloodRequest = require("../models/bloodrequest");
const mongoose = require("mongoose");

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
