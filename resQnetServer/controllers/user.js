import User from "../models/userModel.js"
import Organisation from "../models/orgModel.js";
import bcrypt from "bcrypt"

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist"});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials."});
        res.status(200).json({existingUser});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}



export const continueSignup = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
        name,
        phoneNumber
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        res.status(200).json({
            name,email,phoneNumber,password
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
export const signupUser = async (req, res) => {
    const {
        email,
        password,
        name,
        phoneNumber,
        gender,
        age,
        aadharNumber,
        Description,
        type,
        skills
    } = req.body;
    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userData = await User.create({
            email,
            password: hashedPassword,
            name,
            phoneNumber,
            gender,
            age,
            aadharNumber,
            Description,
            type,
            skills
        });

        res.status(200).json({
            name: userData.name,
            description: userData.Description,
            type: userData.type,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const signupOrganisation = async (req, res) => {
    const {
        email,
        password,
        name,
        orgName,
        phoneNumber,
        type,
        address,
        city,
        state,
        description
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const organisationData = await Organisation.create({
            email,
            password: hashedPassword,
            name,
            orgName,
            phoneNumber,
            type,
            address,
            city,
            state,
            description
        });

        res.status(200).json({
            name: organisationData.name,
            orgName: organisationData.orgName,
            phoneNumber: organisationData.phoneNumber,
            type: organisationData.type,
            address: organisationData.address,
            city: organisationData.city,
            state: organisationData.state,
            description: organisationData.description
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


export const getNameByUserId = async (req, res) => {
    try {
      const { _id } = req.params;
  
      if (!_id) {
        console.error("Received request without _id");
        return res.status(400).json({ error: "Invalid request" });
      }
  
      const user = await User.findOne({ _id });
  
      if (!user) {
        console.error("User not found for _id:", _id);
        return res.status(404).json({ error: "User not found" });
      }
  
      const username = user.name;
      return res.status(200).json({ username });
    } catch (error) {
      console.error("Error in /byUserId route:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  

  export const getUserIdByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      console.log(email)
      const user = await User.findOne({ email });
  
      if (user) {
        // Assuming _id is the user ID generated by MongoDB
        const userIdres = user._id;
        const userId = userIdres.toString()
        res.json({ userId });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching userId:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  
