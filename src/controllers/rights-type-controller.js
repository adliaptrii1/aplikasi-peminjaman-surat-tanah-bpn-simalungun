const RightsType = require('../models/rights-type');

const getRightsType = async (req, res) => {
    try {
        const rightsType = await RightsType.findAll({
            attributes : ['id', 'name'],
        }
        );
        res.status(200).json(rightsType);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(500).json({message: "Internal Server Error!"});
        console.log(error);
    }
}

const createRightsType = async (req, res) => {
    const name = req.body.name;

    try {
        const rightsType = await RightsType.findOne({ where: { name } });
        if (rightsType) {
            res.status(400).json({message: `Rights Type dengan nama ${name} sudah ada!`});
        }
        await RightsType.create({
            name,
        });
        
        res.status(201).json({message: "Data Rights Type berhasil ditambahkan!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
        
}

const getRightsTypeById = async (req, res) => {
    const id = req.params.id;
    try {
        const rightsType = await RightsType.findByPk(id);
        if (rightsType) {
            res.status(200).json(rightsType);
        } else {
            res.status(404).json({message: `Rights Type dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateRightsType = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    try {
        const rightsType = await RightsType.findByPk(id);
        if (rightsType) {
            rightsType.name = name;
            await rightsType.save();
            res.status(200).json({message: `Rights Type dengan id ${id} telah diupdate!`});
        } else {
            res.status(404).json({message: `Rights Type dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteRightsType = async (req, res) => {
    const id = req.params.id;
    try {
        const rightsType = await RightsType.findByPk(id);
        if (rightsType) {
            await rightsType.destroy();
            res.status(200).json({message: `Rights Type dengan id ${id} telah dihapus!`});
        } else {
            res.status(404).json({message: `Rights Type dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { getRightsType, createRightsType, getRightsTypeById, updateRightsType, deleteRightsType };