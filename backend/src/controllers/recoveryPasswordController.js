import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"

import customersModel from "../models/Customers.js"
import employeesModel from "../models/Employees.js"

import { sendEmail, HTMLRecoverEmail } from "../utils/mailPasswordRecovery.js"
import { config }  from "../config.js"

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req,res) => {
    const { email } = req.body;

    try{

        let userFound;
        let userType;

        userFound = await customersModel.findOne({ email })
        if(userFound){

            userType = "customer" 

        } else {

            userFound = await employeesModel.findOne({ email });

            if(userFound){
                userType = "employee";
            }
        }

        if (!userFound){
            res.json ({message: "User not found"})
        }

        const code = Math.floor(10000+Math.random()*90000).toString()

        const token = jsonwebtoken.sign(

            {email, code, userType, verified: false},

            config.JWT.secret,

            {expiresIn: "20m"}
        );

        res.cookie("tokenRecoveryCode", token, {maxAge: 20*60*1000})

        await sendEmail(
            email,
            "Your verification code",
            "Hello! Remember don't forget your pass",
            HTMLRecoverEmail(code)
        );

        res.json({ message: "Mail sended" });

    } catch (error) {
        console.log("Tu error en el recovery password controller: " + error);
    }

};

passwordRecoveryController.verifyCode = async (req, res)=> {
    const { code } = req.body;

    try {
        
        const token = req.cookies.tokenRecoveryCode

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (decoded.code !== code) {

            return res.json({message: "Invalid code"}) 
        
        }

            const newToken= jsonwebtoken.sign (
                
                {email: decoded.email,
                    code: decoded.code,
                    userType: decoded.userType,
                    verified: true
                },

                config.JWT.secret,

                {expiresIn: "20m"}
            );

            res.cookie("tokenRecoveryCode", newToken,{maxAge: 20 * 60 * 1000})

            res.json({ message: "Code verified succesfully" });
            
        

    } catch (error) {

        console.log("Error en recovery password controller en el try del tokenRecoveryCode: " + error )

    }
};

passwordRecoveryController.newPassword = async(req, res) => {

    const { newPassword } = req.body;

    try {
        
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (!decoded.verified) {

            const { email, userType } = decoded;

            const hashedPassword = await bcryptjs.hash(newPassword, 10)

            console.log({message: "contraaaa"})

            let updateUser;

            if (userType == "client") {

                updateUser = await customersModel.findOneAndUpdate(
                    {email},
                    {password: hashedPassword},
                    {new: true}
                );
                
            } else  if(userType == "employee") {

                updateUser = await employeesModel.findOneAndUpdate(
                    {email},
                    {password: hashedPassword},
                    {new: true}
                );

            }

            res.clearCookie("tokenRecoveryCode");

            res.json({ message: "Password updated"});
            
        }

    } catch (error) {

        console.log("Error changing password: " + error )

    }
};

export default passwordRecoveryController;
