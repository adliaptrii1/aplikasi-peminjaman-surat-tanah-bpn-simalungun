const Kelurahan = require('../models/kelurahan');

const getKelurahan = async (req, res) => {
    try {
        // Cek apakah ada query parameter kecamatan_id
        const id_kecamatan = req.query.id_kecamatan;
        if (id_kecamatan) {
            console.log(id_kecamatan);
            const kelurahan = await Kelurahan.findAll({
                where: { 
                    id_kecamatan 
                },
                attributes : ['id', 'name', 'id_kecamatan'],
            }
            );
            res.status(200).json(kelurahan);
            return;
        }

        const kelurahan = await Kelurahan.findAll({
            attributes : ['id', 'name', 'id_kecamatan'],
        }
        );
        res.status(200).json(kelurahan);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(500).json({message: "Internal Server Error!"});
        console.log(error);
    }
}

const getKelurahanById = async (req, res) => {
    const id = req.params.id;
    try {
        const kelurahan = await Kelurahan.findByPk(id);
        if (kelurahan) {
            res.status(200).json(kelurahan);
        } else {
            res.status(404).json({message: `Kelurahan dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateKelurahan = async (req, res) => {
    const id = req.params.id;
    const {name, id_kecamatan} = req.body;
    console.log(name, id_kecamatan);
    if (!name || !id_kecamatan) {
        res.status(400).json({message: "Semua field harus diisi!"});
        return;
    }

    try {
        const kelurahan = await Kelurahan.findByPk(id);
        if (kelurahan) {
            kelurahan.name = name;
            kelurahan.id_kecamatan = id_kecamatan;
            await kelurahan.save();
            res.status(200).json({message: `Kelurahan dengan id ${id} telah diupdate!`});
        } else {
            res.status(404).json({message: `Kelurahan dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createKelurahan = async (req, res) => {
    const {name, id_kecamatan} = req.body;
    try {
        // Cek apakah ada kelurahan dengan nama dan id_kecamatan yang sama
        const kelurahan = await Kelurahan.findOne({ where: { name, id_kecamatan } });
        if (kelurahan) {
            return res.status(400).json({message: `Kelurahan dengan nama ${name} dan id_kecamatan ${id_kecamatan} sudah ada!`});
            
        }

        console.log("Aman dari duplicate");
        await Kelurahan.create({
            name,
            id_kecamatan,
        });
        res.status(201).json({message: "Data kelurahan berhasil ditambahkan!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createArrayKelurahan = async (req, res) => {
    const data = req.body;
    try {
        await Kelurahan.bulkCreate(data);
        res.status(201).json({message: "Data kelurahan berhasil ditambahkan!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteKelurahan = async (req, res) => {
    const id = req.params.id;
    try {
        const kelurahan = await Kelurahan.findByPk(id);
        if (kelurahan) {
            await kelurahan.destroy();
            res.status(200).json({message: `Kelurahan dengan id ${id} telah dihapus!`});
        } else {
            res.status(404).json({message: `Kelurahan dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { getKelurahan, getKelurahanById, updateKelurahan, createKelurahan, deleteKelurahan, createArrayKelurahan };