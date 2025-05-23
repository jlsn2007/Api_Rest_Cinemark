import customersModel from "../models/Customers.js"
import employeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js"

const loginController = {};

loginController.login = async(req, res)=> {

    const{email, password} = req.body;

    try{


        let userFound; 
        let userType;  

        if(email === config.ADMIN.emailAdmin && password === config.ADMIN.password){
            
            userType = "admin";
            userFound = {_id: "admin"};

        } else {

            userFound = await employeesModel.findOne({email})
            userType = "employee"
            if(!userFound){
 
                userFound = await customersModel.findOne({email})
                userType = "customer"
            }

        }

        if(!userFound){
            return res.json({message: "User not found 🔎"});
        }

        if(userType !== "admin"){
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "Invalid Password, Please write the correct password 🎃"})
            }
        }


        jsonwebtoken.sign(

            {id: userFound._id, userType},

            config.JWT.secret,

            {expiresIn: config.JWT.expiresIn},

            (error, token) =>{
                if(error) console.log("Error bro ❌😖: " + error)

                    res.cookie("authToken", token)
                    res.json({message: "Login Succesful"})
            }

        )

    } catch (error) {

        console.log("Error ❌: " + error)
        res.json({message: "Error to save customer"})

    }
}

export default loginController