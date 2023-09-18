import db from "../config/db.js";

const userModel = {
  insert: (nama, email, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (nama,email,password) VALUES ('${nama}','${email}','${password}')`,
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where email='${email}'`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};
export default userModel;
