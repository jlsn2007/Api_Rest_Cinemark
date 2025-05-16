import Employees from "../models/Employees.js";
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js"

const registrerEmployeesController = {};

registrerEmployeesController.registrer = async(req, res)=> {

    const { name, lastname, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified } = req.body;

    try {

        // Verificar la existencia del empleado, porque si ya existe ya no se debe guardar para evitar que se duplique el usuario
        const existEmployee = await Employees.findOne({email})
        if(existEmployee) {
            return res.json ({message: "Employee already exist"})
        }
    
        // Encriptar la contra
        const passwordHash = await bcryptjs.hash(password, 10)
        
        // Guardar todo en la tabla empleados
        const newEmployee = new Employees ({ name, lastname, birthday, email, address, hireDate, password: passwordHash, telephone, dui, isssNumber, isVerified})

        await newEmployee.save();

        //TOKEN
        jsonwebtoken.sign(
            // Lo que vamos a Guardar
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


