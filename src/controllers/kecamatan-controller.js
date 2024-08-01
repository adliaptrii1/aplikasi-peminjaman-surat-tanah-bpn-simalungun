const Kecamatan = require('../models/kecamatan');
const getKecamatan = async (req, res) => {
    try {
        const kecamatan = await Kecamatan.findAll({
            attributes : ['id', 'name'],
        }
        );
        res.status(200).json(kecamatan);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(500).json({message: "Internal Server Error!"});
        console.log(error);
    }
}

const createKecamatan = async (req, res) => {
    const {id, name} = req.body;
    try {
        const kecamatan = await Kecamatan.findOne({ where: { id } });
        if (kecamatan) {
            res.status(400).json({message: `Kecamatan dengan id ${id} sudah ada!`});
        }
        const kecamatan2 = await Kecamatan.findOne({ where: { name } });
        if (kecamatan2) {
            res.status(400).json({message: `Kecamatan dengan nama ${name} sudah ada!`});
        }
        await Kecamatan.create({
            id,
            name,
        });
        
        res.status(201).json({message: "Data kecamatan berhasil ditambahkan!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getKecamatanById = async (req, res) => {
    const id = req.params.id;
    try {
        const kecamatan = await Kecamatan.findByPk(id);
        if (kecamatan) {
            res.status(200).json(kecamatan);
        } else {
            res.status(404).json({message: `Kecamatan dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateKecamatan = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    try {
        const kecamatan = await Kecamatan.findByPk(id);
        if (kecamatan) {
            kecamatan.name = name;
            await kecamatan.save();
            res.status(200).json({message: `Kecamatan dengan id ${id} telah diupdate!`});
        } else {
            res.status(404).json({message: `Kecamatan dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 

const deleteKecamatan = async (req, res) => {
    const id = req.params.id;
    try {
        const kecamatan = await Kecamatan.findByPk(id);
        if (kecamatan) {
            await kecamatan.destroy();
            res.status(200).json({message: `Kecamatan dengan id ${id} telah dihapus!`});
        } else {
            res.status(404).json({message: `Kecamatan dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { getKecamatan, createKecamatan, getKecamatanById, updateKecamatan, deleteKecamatan };
