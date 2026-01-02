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

const getLabel = async(req, res) => {
    try {

        const {id} = req.params

        const label = await Label.findById({_id:id, user:req.user.id})
        if(!label){
            res.status(404).json({success: false, message: 'Label not found or unauthorized'})
        }

        return res.status(200).json({success: true, message: 'Lable found', label})
        
    } catch (error) {
         console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllLabels = async (req, res) => {
    try {

        const labels = await Label.find({ user: req.user.id })
        res.status(200).json({ success: true, message: 'All labels', labels })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateLabel = async (req, res) => {
    try {

        const {id} = req.params
        const {name, color} = req.body

        const updateData = {}
        if(name) updateData.name = name
        if(color) updateData.color = color 

        const updatedLabel = await Label.findOneAndUpdate({_id:id, user: req.user.id}, updateData, {new: true})
        if(!updatedLabel){
            res.status(404).json({success: false, message: 'Lable not found or not authorize'})
        }

        res.status(200).json({success: true, message: 'Label updated', updatedLabel})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteLabel = async(req, res) => {
    try {

        const {id} = req.params

        const deletedLabel = await Label.findOneAndDelete({_id:id, user:req.user.id})
        if(!deleteLabel){
            res.status(404).json({success: false, message: 'Label not found or unautorized'})
        }

        res.status(200).json({success: true, message: 'Label deleted', deletedLabel})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { createLabel, getAllLabels, updateLabel, getLabel, deleteLabel };
