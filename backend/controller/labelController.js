import Label from "../model/label.js";

const createLabel = async (req, res) => {
    try {
        const { name, color } = req.body;

        let newLabel = new Label({ name, color, user: req.user.id });

        await newLabel.save();

        newLabel = await newLabel.populate('user', 'name email');

        res.status(201).json({
            success: true,
            message: 'Label created',
            label: newLabel
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { createLabel };
