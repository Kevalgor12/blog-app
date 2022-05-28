const dotenv = require('dotenv');
dotenv.config();
const jwtToken = require("jsonwebtoken");
const usermodel = require("../../models/usermodel");

module.exports = {
    checkToken: async (req, res, next) => {
        try {
            const token = req.cookies.jwttoken;
            const verifyUser = jwtToken.verify(token, process.env.SECRET);
            // console.log(token);
            // console.log(verifyUser);
            const user = await usermodel.findOne({
                where: {
                    userId: verifyUser.userId
                }
            });
            
            if (user) {
                next();
            } else {
                res.status(401).json({ error: "Authorization denied." });
            }
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
        // if(token) {
        //     verify(token, process.env.SECRET, (err, decoded) => {
        //         if(err) {
        //             res.status(401).json({ error: "err.message" });
        //         }
        //         else {
        //             next();
        //         }
        //     })
        // }
        // else {
        //     res.status(401).json({ error: "authorization denied." });
        // }
    }
}