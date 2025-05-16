import Employees from "../models/Employees.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js"

const registrerEmployeesController = {};

registrerEmployeesController.registrer = async(req, res)=> {

    const { name, lastname, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified } = req.body;

    try {

        const existEmployee = await Employees.findOne({email})
        if(existEmployee) {
            return res.json ({message: "Employee already exist"})
        }
    
        const passwordHash = await bcryptjs.hash(password, 10)
        
        const newEmployee = new Employees ({ name, lastname, birthday, email, address, hireDate, password: passwordHash, telephone, dui, isssNumber, isVerified})

        await newEmployee.save();

        jsonwebtoken.sign(

            {id: newEmployee._id},

            config.JWT.secret,

            {expiresIn: config.JWT.expiresIn},

            (error, token) =>{
                if(error) console.log("Error bro :/ : "+ error)

                    res.cookie("authToken", token)
                    res.json({message: "Employee Save"})
            }

        )
    
    } catch (error) {
        console.log("Error: " + error)
        res.json({message: "Error saving employee"})
    
    }

}

export default registrerEmployeesController;


