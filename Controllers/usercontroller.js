import User from "../models/User.js";


export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

 
    const allowedRoles = ["Admin", "Teacher", "Student"];
    if (!allowedRoles.includes(role)) {
      return res.json({
        error: "Invalid role. Allowed roles are: Admin, Teacher, Student.",
      });
    }


    const user = new User({
      name,
      email,
      password,
      role,
    });

  
    const savedUser = await user.save();

    res.json({
      savedUser,
      message: `${role} created successfully`,
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: "An error occurred while creating the user",
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
   
    const users = await User.find();

   
    if (!users.length) {
      return res.json({
        message: "No users found",
      });
    }

   
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

  
    res.json({
      users: usersWithoutPassword,
      message: "Users fetched successfully",
    });
  } catch (error) {
   
    console.error("Error fetching users:", error.message);
    res.json({
      error: "An error occurred while fetching users",
    });
  }
};


export const getAllAdmins = async (req, res) => {
  try {
  
    const admins = await User.find({ role: "Admin" });

  
    const adminsWithoutPassword = admins.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.json({
      admins: adminsWithoutPassword,
      message: "Admins fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: "An error occurred while fetching admins",
    });
  }
};


export const getAllTeachers = async (req, res) => {
  try {
   
    const teachers = await User.find({ role: "Teacher" });

    
    const teachersWithoutPassword = teachers.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.json({
      teachers: teachersWithoutPassword,
      message: "Teachers fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: "An error occurred while fetching teachers",
    });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    
    const allowedRoles = ["Admin", "Teacher"];
    const users = await User.find({ role: "Student" });

    
    const studentsWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.json({
      students: studentsWithoutPassword,
      message: "Students fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: "An error occurred while fetching students",
    });
  }
};
