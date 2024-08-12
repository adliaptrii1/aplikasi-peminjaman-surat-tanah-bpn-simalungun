const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const sendPasswordConfirmationEmail = require('../utils/email-controller');

const getUsers = async (req, res) => {
  console.log(`req.email : ${req.email}`);
  try {
    const users = await Users.findAll({
      attributes : ['id', 'name', 'username', 'email', 'phone_number', 'nik',  'isAdmin', 'password', 'address'],
    }
    );


    res.status(200).json(users);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({message: "Internal Server Error!"});
    console.log(error);
  }
}

const Register = async (req, res) => {
  console.log("Sedang register");
  const {name, username, email, phone_number, password, isAdmin, nik, address} = req.body;
  // Jika tidak ada akun yang sedang login namun memberikan isAdmin, maka tidak boleh
  if (req.isAdmin != 2 && isAdmin >= 1) {
    return res.status(401).json({message: "Anda tidak memiliki akses!"});
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    console.log("Sedang register");
    console.log(`Name : ${name}`);
    console.log(`Username : ${username}`);
    console.log(`Email : ${email}`);
    console.log(`Phone Number : ${phone_number}`);
    console.log(`Password
    : ${password
    }`);
    console.log(`isAdmin : ${isAdmin}`);
    console.log(`NIK : ${nik}`);
    console.log(`Address : ${address}`);

    // Cek apakah ada user dengan email yang sama
    const checkEmail = await Users.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({message: `User dengan email ${email} sudah ada!`});
    }

    // Cek apakah ada user dengan username yang sama
    const checkUsername = await Users.findOne({ where: { username } });
    if (checkUsername) {
      return res.status(400).json({message: `User dengan username ${username} sudah ada!`});
    }

    // Cek apakah ada user dengan NIK yang sama
    const checkNIK = await Users.findOne({ where: { nik } });
    if (checkNIK) {
      return res.status(400).json({message: `User dengan NIK ${nik} sudah ada!`});
    }

    await Users.create({
      name,
      username,
      email,
      phone_number,
      isAdmin,
      nik,
      address,
      password: hashedPassword,
    });
    res.status(201).json({message: "Register sukses!"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        [validator.isEmail(req.body.username) ? 'email' : 'username']: req.body.username,
      }
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({message: "Kata sandi salah!"});
    }

    console.log("Kata sandi sama!")
    const userId = user[0].id;
    const username = user[0].username;
    const name = user[0].name;
    const email = user[0].email;
    const phoneNumber = user[0].phone_number;
    const nik = user[0].nik;
    const isAdmin = user[0].isAdmin;
    const address = user[0].address;

    console.log(`User ID : ${userId}`);
    console.log(`Username : ${username}`);
    console.log(`Name : ${name}`);
    console.log(`Email : ${email}`);
    console.log(`Phone Number : ${phoneNumber}`);
    console.log(`Is Admin : ${isAdmin}`);
    console.log(`NIK : ${nik}`);
    console.log(`Address : ${address}`);

    const accessToken = jwt.sign({userId, username, name, email, phoneNumber, isAdmin, nik, address}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'});

    console.log("Access Token : ");
    console.log(accessToken);

    const refreshToken = jwt.sign({userId, username, name, email, phoneNumber, isAdmin, nik, address}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

    console.log("Refresh Token : ");
    console.log(refreshToken);

    await Users.update({
      refresh_token: refreshToken,
    }, {
      where: {
        id: userId,
      }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 86400000,
      secure: true,
    });

    // Cookie alertMessage dalam JSON
    res.cookie('alertMessage', JSON.stringify({
      message: "Login berhasil!",
      isDanger: false,
    }), {
      maxAge: 7000,
    });

    
    console.log(accessToken);
    console.log(refreshToken);

    res.json({accessToken});

  } catch (error){
    res.status(404).json({message: "Username atau email tidak ditemukan!"});
  }

}

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) { 
    res.status(401).json({message: "Anda tidak login!"});
    
    res.cookie('alertMessage', JSON.stringify({
      message: "Anda tidak login!",
      isDanger: true
    }), {
      maxAge: 7000,
    });
    return;
  }

  const user = await Users.findOne({ where: { refresh_token: refreshToken } });
  if (user == null)  {
    res.status(403).json({message: "Refresh token tidak valid!"});
    
    res.cookie('alertMessage', JSON.stringify({
      message: "Refresh token tidak valid!",
      isDanger: true
    }), {
      maxAge: 7000,
    });
    return;
  }

  await Users.update({
    refresh_token: null,
  }, {
    where: {
      id: user.id,
    }
  });

  res.clearCookie('refreshToken');

  res.cookie('alertMessage', JSON.stringify({
    message: "Logout berhasil!",
    isDanger: false
  }), {
    maxAge: 7000,
  });

  res.clearCookie('refreshToken');

  res.json({message: "Logout berhasil!"});
  res.status(200);
}

const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const {name, username, email, phone_number, isAdmin, nik, address} = req.body;
  console.log(`Update User`);
  console.log(`Name : ${name}`);
  console.log(`Username : ${username}`);
  console.log(`Email : ${email}`);
  console.log(`Phone Number : ${phone_number}`);
  console.log(`isAdmin : ${isAdmin}`);
  console.log(`NIK : ${nik}`);
  console.log(`Address : ${address}`);

  try {
    const user = await Users.findByPk(id);
    if (user) {
      if (user.email != email) {
        const checkEmail = await Users.findOne({ where: { email } });
        if (checkEmail) {
          return res.status(400).json({ message: `User dengan email ${email} sudah ada!` });
        }
      }

      if (user.username != username) {
        // Cek apakah username yang sedang login adalah admin
        if (req.isAdmin != 2) {
          return res.status(401).json({message: "Anda tidak memiliki akses! (Bukan admin)"});
        }

        const checkUsername = await Users.findOne({ where: { username } });
        if (checkUsername) {
          return res.status(400).json({ message: `User dengan username ${username} sudah ada!` });
        }
      }

      if (user.nik != nik) {
        const checkNIK = await Users.findOne({ where: { nik } });
        if (checkNIK) {
          return res.status(400).json({ message: `User dengan NIK ${nik} sudah ada!` });
        }
      }

      user.name = name;
      user.username = username;
      user.email = email;
      user.phone_number = phone_number;
      user.nik = nik;
      user.address = address;

      // Cek apakah akun administrator berusaha mengubah isAdmin
      if (req.isAdmin == 2 && user.isAdmin != 2 && isAdmin == 2) {
        return res.status(401).json({message: "Anda tidak memiliki akses!"});
      }

      // Selain admin, tidak ada yang bisa mengubah role
      if (req.isAdmin != 2 && user.isAdmin != isAdmin) {
        return res.status(401).json({message: "Anda tidak memiliki akses untuk mengubah role!"});
      }

      user.isAdmin = isAdmin;

      await user.save();
      res.status(200).json({message: `User dengan id ${id} telah diupdate!`});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
  
}

const DeleteUser = async (req, res) => {
  if (req.isAdmin != 2) {
    return res.status(401).json({message: "Anda tidak memiliki akses untuk menghapus akun!"});
  }

  const id = req.params.id;

  try {
    const user = await Users.findByPk(id);
    if (user) {
      // Jika user yang akan dihapus adalah admin, maka tidak boleh dihapus
      if (user.isAdmin == 2) {
        return res.status(401).json({message: "Tidak bisa menghapus akun admin!"});
      }

      await user.destroy();
      res.status(200).json({message: `User dengan id ${id} telah dihapus!`});
    } else {
      res.status(404).json({message: `User dengan id ${id} tidak ditemukan!`});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const CreateResetPasswordToken = async (req, res) => {
  const {email} = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({message: `User dengan email ${email} tidak ditemukan!`});
    }

    // Cek apakah user sudah pernah request reset password dan token belum expired
    // if (user.reset_pass_token) {
    //   const decoded = jwt.verify(user.reset_pass_token, process.env.RESET_TOKEN_SECRET);
    //   if (decoded) {
    //     return res.status(400).json({message: "Anda sudah pernah request reset password! Silahkan cek email Anda!"});
    //   }
    // }

    const resetPasswordToken = jwt.sign({email}, process.env.RESET_TOKEN_SECRET, {expiresIn: '1d'});

    const email_response = await sendPasswordConfirmationEmail(email, resetPasswordToken);

    if (!email_response) {
      return res.status(500).json({message: "Gagal mengirim email!"});
    }

    user.reset_pass_token = resetPasswordToken;
    await user.save();

    res.status(200).json({message: `Reset password token berhasil dibuat!`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const ResetPassword = async (req, res) => {
  const {reset_pass_token, password} = req.body;

  try {
    const user = await Users.findOne({ where: { reset_pass_token } });
    if (!user) {
      return res.status(404).json({message: "Token tidak valid!"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cek apakah password sudah expired
    const decoded = jwt.verify(reset_pass_token, process.env.RESET_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({message: "Token sudah expired!"});
    }

    user.password = hashedPassword;
    user.reset_pass_token = null;
    await user.save();

    res.status(200).json({message: "Password berhasil direset!"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  getUsers,
  Register,
  Login,
  Logout,
  UpdateUser,
  DeleteUser,
  CreateResetPasswordToken,
  ResetPassword,
}