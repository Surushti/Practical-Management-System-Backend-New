import UserModel from "../models/User.js"

export const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userInfo = await UserModel.findOne({ email })

    if(userInfo && userInfo.role=="Admin")
    {
        next();
    }
    else{
        res.json({
            message:"Access Denied, only Admin can access"
        })
    }

  } catch (error) {
    res.json({
        message:"Internal server error"
    })
  }
};
