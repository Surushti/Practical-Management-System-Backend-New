import Subject from "../models/Subject.js";
import User from "../models/User.js";


export const createSubject = async (req, res) => {
    try {
        const { name, code, createdBy } = req.body;

        const user = await User.findById(createdBy);
        if (!user || user.role !== "Admin") {
            return res.json({ error: "Only admins are allowed to create subjects" });
        }
        const subject = new Subject({
            name,
            code,
            createdBy,
        });
        const savedSubject = await subject.save();

        res.json({
            savedSubject,
            message: "Subject created successfully",
        });
    } catch (error) {
        
        res.json({
            error: "Error occurred while creating subject",
        });
        console.error(error);
    }
};


export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate("createdBy", "name email role"); // Include role to confirm admin
        res.json({
            subjects,
            message: "Subjects fetched successfully",
        });
    } catch (error) {

        res.json({
            error: "Error occurred while fetching subjects",
        });
        console.error(error);
    }
};
