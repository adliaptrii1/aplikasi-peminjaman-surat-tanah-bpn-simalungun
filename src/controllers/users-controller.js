const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const getUsers = async (req, res) => {
  console.log(`req.email : ${req.email}`);
  try {
    const users = await Users.findAll({
      attributes : ['id', 'name', 'username', 'email', 'phone_number', 'isAdmin'],
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
  const {name, username, email, phone_number, password, confirmPassword} = req.body;
  if (password !== confirmPassword) {
    res.status(400).json({message: "Password tidak sama!"});
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      username,
      email,
      phone_number,
      isAdmin: false,
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
      res.status(400).json({message: "Kata sandi salah!"});
    }


    const userId = user[0].id;
    const username = user[0].username;
    const name = user[0].name;
    const email = user[0].email;
    const phoneNumber = user[0].phone_number;
    const isAdmin = user[0].isAdmin;

    console.log(`User ID : ${userId}`);
    console.log(`Username : ${username}`);
    console.log(`Name : ${name}`);
    console.log(`Email : ${email}`);
    console.log(`Phone Number : ${phoneNumber}`);
    console.log(`Is Admin : ${isAdmin}`);


    const accessToken = jwt.sign({userId, username, name, email, phoneNumber, isAdmin}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});

    console.log("Access Token : ");
    console.log(accessToken);

    const refreshToken = jwt.sign({userId, username, name, email, phoneNumber, isAdmin}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

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

module.exports = {
  getUsers,
  Register,
  Login,
  Logout,
}