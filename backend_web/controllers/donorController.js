const User = require("../models/user");

// exports.searchDonors = async (req, res) => {
//     try{
//         const { name, email, bloodType, location} = req.query;

//         let query = { role: 'donor' };
//         if(name) {
//             query.name = { $regex: name, $options: 'i' };
//         }
//         if(email) {
//             query.email = { $regex: email, $options: 'i' };
//         }
//         if(bloodType) {
//             query.bloodType = bloodType;
//         }
//         if(location) {
//             query.location = { $regex: location, $options: 'i' };
//         }

//         const donors = await User.find(query).select('name email bloodType lastDonationDate isAvailable verified');
//         res.status(200).json({success:true, data: donors});
//     } catch (error) {
//         console.error("Error searching donors:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }
exports.searchDonors = async (req, res) => {
    try {
        const { search, bloodType, location } = req.query;

        let query = { role: 'donor' };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }

        if (bloodType) query.bloodType = bloodType;
        if (location) query.location = { $regex: location, $options: 'i' };

        const donors = await User.find(query).select('name email bloodType lastDonationDate isAvailable verified');
        res.status(200).json({ success: true, data: donors });
    } catch (error) {
        console.error("Error searching donors:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
