import userModel from "../model/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userController = {
  register: async (req, res) => {
    const { nama, email, password, confPassword } = req.body;

    if (password !== confPassword)
      return res.status(400).json({ msg: "password invalid" });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await userModel.insert(nama, email, hashedPassword);
      res.status(200).json({ message: "register berhasil", email: email });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findByEmail(email);
      console.log(user.rows[0].nama);
      const match = await bcrypt.compare(password, user.rows[0].password);
      if (!match) return res.status(400).json({ message: "password salah!" });

      const id = user.rows[0].id;
      const nama = user.rows[0].nama;
      const accessToken = jwt.sign(
        { id, nama },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ message: "login success", token: accessToken });
    } catch (error) {
      res
        .status(400)
        .json({ message: "email tidak ditemukan!", error: error.message });
    }
  },
};

export default userController;
