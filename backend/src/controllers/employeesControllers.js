const employeesControllers = {};
import employeesModel from "../models/Employees.js"

//Select
employeesControllers.getEmployees = async (req, res) => {
    const employees = await employeesModel.find()
    res.json(employees)
}

//Insert
employeesControllers.postEmployees = async (req, res) => {
    const { name, email, password, telephone, address, position, hireDate, salary,  dui } = req.body;
    const newEmployees = new employeesModel ({ name, email, password, telephone, address, position, hireDate, salary,  dui })
    await newEmployees.save()
    res.json({message: "Employee Insert"})
}

//Delete
employeesControllers.deleteEmployees = async (req, res) => {
    await employeesModel.findOneAndDelete(req.params.id)
    res.json({message: "Employee Deleted"})
}

//Update
employeesControllers.putEmployees = async (req, res) => {
    const { name, email, password, telephone, address, position, hireDate, salary,  dui } = req.body;

    await employeesModel.findByIdAndUpdate(req.params.id, {
        name, 
        email, 
        password, 
        telephone, 
        address, 
        position, 
        hireDate, 
        salary,  
        dui
    }, {new: true}
);
res.json({ message: "Employee Updated"});
}

export default employeesControllers