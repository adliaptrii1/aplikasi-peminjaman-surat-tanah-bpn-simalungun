const { toInt } = require('validator');
const Officers = require('../models/officers');

const getOfficers = async (req, res) => {
    try {
        const officers = await Officers.findAll({
            attributes: ['id', 'name', 'position', 'nip', 'golongan'],
        });
        res.status(200).json(officers);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

const createOfficers = async (req, res) => {
    const { name, position, nip, golongan } = req.body;

    // Cek isAdmin apakah dia Administator atau bukan
    if (req.isAdmin != 2) {
        return res.status(401).json({ message: "Anda tidak memiliki akses!" });
    }

    const officers = await Officers.findOne({ 
        where: { nip : toInt(nip)} ,
        attributes: ['id'],
    });
    console.log("Mencari officer selesai")
    if (officers) {
        console.log(`Officer dengan NIP ${nip} sudah ada!`);
        await res.status(409).json({ message: `Pegawai dengan NIP ${nip} sudah ada!` });

        return res;
    }

    try {
        await Officers.create({
            name,
            position,
            nip,
            golongan,
        });

        res.status(201).json({ message: "Data pegawai berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOfficersById = async (req, res) => {
    const id = req.params.id;
    try {
        const officers = await Officers.findByPk(id);
        if (officers) {
            res.status(200).json(officers);
        } else {
            res.status(404).json({ message: `Pegawai dengan id ${id} tidak ditemukan!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOfficers = async (req, res) => {
    console.log("Execute updateOfficers");
    const id = req.params.id;
    const { name, position, nip, golongan } = req.body;

    if (req.isAdmin != 2) {
        return res.status(401).json({ message: "Anda tidak memiliki akses!" });
    }

    try {
        const officers = await Officers.findByPk(id);
        if (officers) {
            
            if (officers.nip != nip) {
                const checkNip = await Officers.findOne({ where: { nip } });
                if (checkNip) {
                    return res.status(400).json({ message: `Pegawai dengan NIP ${nip} sudah ada!` });
                }
            }
            officers.name = name;
            officers.position = position;
            officers.nip = nip;
            officers.golongan = golongan;
            await officers.save();
            res.status(200).json({ message: `Pegawai dengan id ${id} telah diupdate!` });
        } else {
            console.log("Gak dapet :)");
            res.status(404).json({ message: `Pegawai dengan id ${id} tidak ditemukan!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOfficers = async (req, res) => {
    if (req.isAdmin != 2) {
        return res.status(401).json({ message: "Anda tidak memiliki akses!" });
    }

    console.log("Execute deleteOfficers");
    const id = req.params.id;
    console.log(`id-officer : ${id}`);
    try {
        const officers = await Officers.findByPk(id);
        if (officers) {
            await officers.destroy();
            res.status(200).json({ message: `Pegawai dengan id ${id} telah dihapus!` });
        } else {
            res.status(404).json({ message: `Pegawai dengan id ${id} tidak ditemukan!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getOfficers, createOfficers, getOfficersById, updateOfficers, deleteOfficers };