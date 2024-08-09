const Services = require('../models/services');

const getServices = async (req, res) => {
    try {
        const service = await Services.findAll({
            attributes : ['id', 'service'],
        }
        );
        res.status(200).json(service);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(500).json({message: "Internal Server Error!"});
        console.log(error);
    }
}

const createServices = async (req, res) => {
    const service = req.body.service;

    try {
        const isFind = await Services.findOne({ where: { service } });
        if (isFind) {
            res.status(400).json({message: `Services dengan nama ${service} sudah ada!`});
        }
        await Services.create({
            service,
        });
        
        res.status(201).json({message: "Data Services berhasil ditambahkan!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getServicesById = async (req, res) => {
    const id = req.params.id;
    try {
        const service = await Services.findByPk(id);
        if (service) {
            res.status(200).json(service);
        } else {
            res.status(404).json({message: `Services dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateServices = async (req, res) => {
    const id = req.params.id;
    const {service} = req.body;
    try {
        const serviceData = await Services.findByPk(id);
        if (serviceData) {
            serviceData.service = service;
            await serviceData.save();
            res.status(200).json({message: `Services dengan id ${id} telah diupdate!`});
        } else {
            res.status(404).json({message: `Services dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteServices = async (req, res) => {
    const id = req.params.id;
    try {
        const service = await Services.findByPk(id);
        if (service) {
            await service.destroy();
            res.status(200).json({message: `Services dengan id ${id} telah dihapus!`});
        } else {
            res.status(404).json({message: `Services dengan id ${id} tidak ditemukan!`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { getServices, createServices, getServicesById, updateServices, deleteServices };