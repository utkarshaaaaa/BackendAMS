const express = require("express");
const user = require("../models/schema");
const asynchandler = require("express-async-handler");
const { error } = require("console");
const router = express.Router();
const nodemailer = require("nodemailer");

router.route("/userReg").post(
  asynchandler(async (req, res) => {
    const { User_name, userId, profile_image, userEmail, attendence } =
      req.body;

    //updating the data
    
      const userDet = await user.create({
        User_name: User_name,
        userId: userId,
        profile_image: profile_image,
        userEmail: userEmail,
        attendence: attendence,
      });
      res.json({ user: userDet });
    
  })
);

//Send if the student is absent
async function mailSender(to) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "userEmail@gmail.com",
      pass: "passowrd",
    },
  });

  let info = await transporter.sendMail({
    from: "fromemail@gmail.com",
    to: to,
    subject: "",
    html: `
      <h1>Attendence</h1>
      <p>Absent</p>
      `,
  });

  console.log(info.messageId);
}

router.route("/sendMail").post(async (req, res) => {
  const userexist = await user.find();
  userexist.map((users) => {
    if (users.attendence == "A") {
      console.log("mail sent");
      mailSender(users.userEmail).catch((err) => console.log(err));
    }
  });
});

//Mark student attendance
router.route("/attendance:id").post(async (req, res) => {
  const userId = req.params.id;
  const { userAttendanceStatus } = req.body;
  const userAttendance = await user.findOneAndUpdate(
    { userId: Number(userId) },
    { attendence: userAttendanceStatus },
    { new: true }
  );
  res.status(200).json({ user: userAttendance });
});

module.exports = router;
