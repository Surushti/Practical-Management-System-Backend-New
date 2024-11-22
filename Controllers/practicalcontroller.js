import Practical from "../models/Practical.js";
import Subject from "../models/Subject.js";
import User from "../models/User.js";


export const createPractical = async (req, res) => {
    try {
        const { subjectId, title, description, createdBy, enrolledStudents } = req.body;


        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.json({ 
                error: "Invalid subject for the practical" 
            });
        }

        const user = await User.findById(createdBy);
        if (!user || user.role !== "Teacher") {
            return res.json({
                 error: "Only teachers are allowed to create practicals"
                 });
        }


        const validStudents = await User.find({
            '_id': { $in: enrolledStudents },
            role: "Student"
        });

        if (validStudents.length !== enrolledStudents.length) {
            return res.json({ 
                error: "One or more enrolled students are invalid"
             });
        }
        const practical = new Practical({
            subjectId,
            title,
            description,
            createdBy,
            enrolledStudents,
        });

        const savedPractical = await practical.save();

        res.json({
            savedPractical,
            message: "Practical created successfully",
        });
    } catch (error) {
        console.error(error);
        res.json({
            error: "Error occurred while creating practical",
        });
    }
};
export const getPracticals = async (req, res) => {
    try {
        const practicals = await Practical.find()
            .populate("subjectId", "name code")
            .populate("createdBy", "name email role")
            .populate("enrolledStudents", "name email");

        res.json({
            practicals,
            message: "Practical details fetched successfully",
        });
    } catch (error) {
        res.json({
            error: "Error occurred while fetching practicals",
        });
        console.error(error);
    }
};

export const enrollInPractical = async (req, res) => {
    try {
        const { practicalId, studentId } = req.body;
        const practical = await Practical.findById(practicalId);
        if (!practical) {
            return res.json({
                error: "Practical not found"
            });
        }


        const student = await User.findById(studentId);
        if (!student || student.role !== "Student") {
            return res.json({
                error: "Only students can enroll in practicals"
            });
        }


        if (practical.enrolledStudents.includes(studentId)) {
            return res.json({
                 error: "Student is already enrolled in this practical"
                 });
        }


        practical.enrolledStudents.push(studentId);
        const updatedPractical = await practical.save();

        res.json({
            updatedPractical,
            message: "Student enrolled successfully",
        });
    } catch (error) {

        res.json({
            error: "Error occurred while enrolling in practical",
        });
        console.error(error);
    }
};
