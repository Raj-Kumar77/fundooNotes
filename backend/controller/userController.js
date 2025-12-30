import bcrypt from "bcryptjs";
import validator from 'validator';
import User from "../model/user.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Please enter a strong password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await new User({ name, email, password: hashedPassword }).save();

        res.status(201).json({ success: true, message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { registerUser };
