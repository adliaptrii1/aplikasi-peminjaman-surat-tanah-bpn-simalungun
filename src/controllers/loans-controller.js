const Loans = require('../models/loans');
const Kelurahan = require('../models/kelurahan');
const Kecamatan = require('../models/kecamatan');
const RightsType = require('../models/rights-type');
const Services = require('../models/services');
const Users = require('../models/user');

const getLoans = async (req, res) => {
    try {
        // Cek apakah ada query list lalu convert ke integer
        let list = req.query.list;
        if (list !== undefined) {
            list = parseInt(list);
        }

        let loans;

        // SELECT loans.id, kelurahan.name as kelurahan, kecamatan.name as kecamatan ,rights_type.name as rights_type, services.service as service, users.username as user, loans.file_number, loans.right_number, loans.file, loans.information, loans.history, loans.createdAt, loans.updatedAt, loans.status
        // FROM loans
        // JOIN kelurahan ON loans.id_kelurahan = kelurahan.id
        // JOIN kecamatan ON kelurahan.id_kecamatan = kecamatan.id
        // JOIN rights_type ON loans.id_rights_type = rights_type.id
        // JOIN services ON loans.id_service = services.id
        // JOIN users ON loans.id_user = users.id;
        // Gunakan query diatas untuk mengambil data loans
        if (list === undefined) {
            loans = await Loans.findAll({
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
                        attributes: ['username', 'name'],
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
        } else 
        if (list === 1) {
            // Cari loans dengan status = "Pengajuan" atau "Diterima"
            loans = await Loans.findAll({
                where: {
                    status: ['Pengajuan', 'Diterima']
                },
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
                        attributes: ['username', 'name'],
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
        } else 
        if (list === 2) {
            // Cari loans dengan status = "Peminjaman" atau "Pengembalian"
            loans = await Loans.findAll({
                where: {
                    status: ['Peminjaman', 'Pengembalian', "Diterima"]
                },
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
                        attributes: ['username', 'name'],
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
        } else
        if (list === 3) {
            // Cari loans dengan status = "Pengembalian" atau "Selesai"
            loans = await Loans.findAll({
                where: {
                    status: ['Pengembalian', 'Selesai', 'Rusak', 'Hilang']
                },
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
                        attributes: ['username', 'name'],
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
        } else 
        if (list === 4) {
            // Cari loans dengan status = "Rusak" atau "Hilang"
            loans = await Loans.findAll({
                where: {
                    status: ['Rusak', 'Hilang']
                },
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
                        attributes: ['username', 'name'],
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
        } else {
            res.status(400).json({message: "List tidak valid!"});
            return;
        }

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
                    name_user : loans[i].user.name,
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
        // Dapatkan waktu terlebih dahulu
        const date = new Date();
        date.setHours(date.getHours() + 7);



        await Loans.create({
            id_kelurahan,
            id_rights_type,
            id_service,
            id_user,
            file_number,
            right_number,
            file,
            information,

            history: JSON.stringify([
                {
                    status: 'Pengajuan',
                    date: date.toString()
                }
            ]),

            createdAt: date,
            updatedAt: date,
            
            
            status: 'Pengajuan',
        });
        res.status(201).json({message: "Pengajuan berhasil dibuat!"});
    } catch (error) {
        console.log(`Error : ${error}`);
        res.status(500).json({message: error.message});
    }
}

const upgradeLoans = async (req, res) => {
    const id = req.params.id;
    const {status} = req.body;
    if (!status) {
        res.status(400).json({message: "Status harus diisi!"});
        return;
    }

    // ('Pengajuan', 'Diterima', 'Ditolak', 'Peminjaman', 'Pengembalian', 'Selesai', 'Rusak', 'Hilang'));
    if (status !== 'Pengajuan' && status !== 'Diterima' && status !== 'Ditolak' && status !== 'Peminjaman' && status !== 'Pengembalian' && status !== 'Selesai' && status !== 'Rusak' && status !== 'Hilang') {
        res.status(400).json({message: "Status tidak valid!"});
        return;
    }

    if (!req.isAdmin && (status === 'Diterima' || status === 'Ditolak' || status === 'Selesai' || status === 'Rusak' || status === 'Hilang')) {
        res.status(403).json({message: "Hanya admin yang bisa mengubah status menjadi Diterima, Ditolak, Selesai, Rusak, dan Hilang!"});
        return;
    }


    try {
        const loans = await Loans.findOne({
            where: {
                id
            }
        });

        if (!loans) {
            res.status(404).json({message: `Pengajuan dengan id ${id} tidak ditemukan!`});
            return;
        }

        if (status === 'Peminjaman' || status === 'Pengembalian') {
            // Cek apakah user yang mengajukan adalah user yang sedang login
            const user = await Users.findOne({
                where: {
                    username: req.username
                }
            });

            if ((user.id !== loans.id_user) && !req.isAdmin) {
                res.status(403).json({message: "Hanya user yang mengajukan yang bisa melakukan peminjaman!"});
                return;
            }
        }

        if (status === 'Diterima' && loans.status !== 'Pengajuan') {
            res.status(403).json({message: "Pengajuan harus dalam status pengajuan untuk bisa diterima!"});
            return;
        }

        if (status === 'Ditolak' && loans.status !== 'Pengajuan') {
            res.status(403).json({message: "Pengajuan harus dalam status pengajuan untuk bisa ditolak!"});
            return;
        }

        if (status === 'Peminjaman' && loans.status !== 'Diterima') {
            res.status(403).json({message: "Pengajuan harus dalam status diterima untuk bisa dipinjamkan!"});
            return;
        }

        if (status === 'Pengembalian' && loans.status !== 'Peminjaman') {
            res.status(403).json({message: "Pengembalian hanya bisa dilakukan ketika status peminjaman!"});
            return;
        }

        if ((status === 'Hilang' || status === 'Rusak') && loans.status !== 'Pengembalian') {
            res.status(403).json({message: "Pengajuan harus dalam status pengembalian untuk bisa diselesaikan!"});
            return;
        }

        if (status == 'Selesai' && (loans.status !== 'Rusak' && loans.status !== 'Pengembalian' && loans.status !== 'Hilang')) {
            res.status(403).json({message: "Pengajuan harus dalam status rusak, pengembalian, atau hilang untuk bisa diselesaikan!"});
            return;
        }

        if (loans.status === 'Selesai' || loans.status === 'Ditolak') {
            res.status(403).json({message: "Pengajuan sudah selesai atau ditolak"});
            return;
        }

        // if (loans.)

        const date = new Date();
        date.setHours(date.getHours() + 7);

        let history = JSON.parse(loans.history);
        history.push({
            status,
            date: date.toString()
        });

        await Loans.update({
            status,
            history: JSON.stringify(history),
            updatedAt: date
        }, {
            where: {
                id
            }
        });

        res.status(200).json({message: "Pengajuan berhasil diupdate!"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error!"});
    }
}
    

module.exports = { 
    getLoans, createLoans, upgradeLoans
};