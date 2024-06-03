const LastseenModel = require("../model/LastseenModel")

// GET LAST SEEN API CONTROL
module.exports.getLastseen = async (req, res) => {
console.log("getLastseen controller ",req.body)
    try {
        const { userEmail} = req.body;
        const userEntry = await LastseenModel.findOne({userId:userEmail});
        if (userEntry) {
            return res.status(200).json({
                success: true,
                msg: "lastseen Fatched",
                result: userEntry
            })
        }

        const setlastseen = await LastseenModel.create({
            userId:userEmail
        })

        console.log("lastseen created", setlastseen)
        if (setlastseen) {
            return res.status(200).json({
                success: true,
                msg: "lastseen created",
                result: setlastseen
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: "Server Error",
            result: { error: String(e) }
        });
    }
};


// SET LAST SEEN 
module.exports.setLastseen = async (data) => {
    try {
        console.log("Updating Lastseen status of ", data)
        let doc = await LastseenModel.findOneAndUpdate({ userId: data }, { lastActive: new Date() }, { new: true });
    } catch (e) {
        console.log(e)
    }
}