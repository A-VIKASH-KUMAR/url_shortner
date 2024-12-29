export const validateRegister = (req:any, res:any, next:any) => {
    const {email, password} = req.body;

    if (!email || !password || email === "" ||password === "") {
        return res.status(403).json({error:"Please provide email and password to register"})
    }
    return next()
}

export const validateLogin = (req:any, res:any, next:any) => {
    return next()
}