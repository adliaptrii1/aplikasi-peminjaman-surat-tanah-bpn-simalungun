const Loans = require('../models/loans');
const Kelurahan = require('../models/kelurahan');
const Kecamatan = require('../models/kecamatan');
const RightsType = require('../models/rights-type');
const Services = require('../models/services');
const Users = require('../models/user');

const getLoans= async (req, res) => {
    try {
        // SELECT loans.id, kelurahan.name as kelurahan, kecamatan.name as kecamatan ,rights_type.name as rights_type, services.service as service, users.username as user, loans.file_number, loans.right_number, loans.file, loans.information, loans.history, loans.createdAt, loans.updatedAt, loans.status
        // FROM loans
        // JOIN kelurahan ON loans.id_kelurahan = kelurahan.id
        // JOIN kecamatan ON kelurahan.id_kecamatan = kecamatan.id
        // JOIN rights_type ON loans.id_rights_type = rights_type.id
        // JOIN services ON loans.id_service = services.id
        // JOIN users ON loans.id_user = users.id;
        // Gunakan query diatas untuk mengambil data loans

        const loans = await Loans.findAll({
            attributes: ['id', 'file_number', 'right_number', 'file', 'information', 'history', 'createdAt', 'updatedAt', 'status', 'id_kelurahan', 'id_rights_type', 'id_service', 'id_user'],
            include: [
                {
                    model: RightsType,
                    attributes: ['name'],
                    as: 'rights_type',
                },
                {
                    model: Services,
                    attributes: ['service'],
                    as: 'service',
                },
                {
                    model: Users,
                    attributes: ['username'],
                    as: 'user',
                },{
                    model: Kelurahan,
                    attributes: ['name'],
                    as: 'kelurahan',
                    include: {
                        model: Kecamatan,
                        attributes: ['name'],
                        as: 'kecamatan',
                    }
                },
            ]
        });
        console.log("=============")
        console.log(`REQ =`);
        console.log(req);
        console.log("=============")
        let ret = [];
        for (let i = 0; i < loans.length; i++) {
            if ((req.isAdmin) || (loans[i].user.username == req.username)) 
                ret.push({
                    id: loans[i].id,
                    kelurahan: loans[i].kelurahan.name,
                    id_kelurahan: loans[i].id_kelurahan,
                    kecamatan: loans[i].kelurahan.kecamatan.name,
                    id_kecamatan: loans[i].kelurahan.kecamatan.id,
                    rights_type: loans[i].rights_type.name,
                    id_rights_type: loans[i].id_rights_type,
                    service: loans[i].service.service,
                    id_service: loans[i].id_service,
                    user: loans[i].user.username,
                    id_user: loans[i].id_user,
                    file_number: loans[i].file_number,
                    right_number: loans[i].right_number,
                    file: loans[i].file,
                    information: loans[i].information,
                    history: loans[i].history,
                    createdAt: loans[i].createdAt,
                    updatedAt: loans[i].updatedAt,
                    status: loans[i].status
                });
        }
        
        // for (let i = 0; i < loans.length; i++) {
        //     loans[i].kelurahan = loans[i].kelurahan.name;
        //     loans[i].kecamatan = loans[i].kelurahan.kecamatan.name;
        //     loans[i].rights_type = loans[i].rights_type.name;
        //     loans[i].service = loans[i].service.service;
            // loans[i].user = loans[i].user.username;
        // }

        res.status(200).json(ret);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error!"});
        console.log(error);
    }
}

const createLoans = async (req, res) => {

    // Cari terlebih dahulu apakah user dengan id tersebut ada
    const username = req.username;
    console.log(`username : ${username}`);
    let user;
    try {
        user = await Users.findOne({
            where: {
                username
            }
        });

        if (!user) {
            res.status(404).json({message: `User dengan username ${username} tidak ditemukan!`});
            return;
        }

    } catch (error) {
        res.status(404).json({message: `User dengan username ${username} tidak ditemukan!`});
        return;
    }
    console.log(user);
    const id_user = user.id;

    const {id_kelurahan, file_number, right_number, id_rights_type, file, id_service, information} = req.body;
    if (!id_kelurahan || !file_number || !right_number || !id_rights_type || !file || !id_service || !information || !id_user) {
        res.status(400).json({message: "Semua field harus diisi!"});
        return;
    }

    try {
        await Loans.create({
            id_kelurahan,
            id_rights_type,
            id_service,
            id_user,
            file_number,
            right_number,
            file,
            information,
            
            // History dalam bentuk json
            // Contoh : 
            // [
            //     {
            //         "status" : "Pengajuan",
            //         "date" : "2021-08-01 12:00:00"
            //     }
            // ]
            history: JSON.stringify([
                {
                    status: 'Pengajuan',
                    date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
                }
            ]),
            status: 'Pengajuan',
        });
        res.status(201).json({message: "Pengajuan berhasil dibuat!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { 
    getLoans, createLoans
};