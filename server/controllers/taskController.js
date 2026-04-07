const TaskModel = require("../models/taskModel");
const nodemailer = require("nodemailer");
const authModel = require("../models/authModel");
const taskModel = require("../models/taskModel");
const { Resend } = require("resend");

const AssignTask = async (req, res) => {
  const { title, description, status, assignTo, createdBy, updatedBy } =
    req.body;

  const findUser = await authModel.findById(createdBy);
  const findtoSendUser = await authModel.findById(assignTo);
  console.log(findUser);
  console.log(findtoSendUser);
  const response = await TaskModel.create({
    title: title,
    description: description,
    status: status,
    assignTo: assignTo,
    createdBy: createdBy,
  });

  try {
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "vedantreddy2000@gmail.com",
    //     pass: "kkxwkuzgayfrrtlc", // Gmail App Password
    //   },
    // });

    const resend = new Resend("123456");

    // const mailOptions = {

    const data = await resend.emails.send({
      from: findUser.email,
      to: findtoSendUser.email,
      subject: `${title} 🚀`,

      html: `
    <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
      
      <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background:#0d6efd; color:white; padding:20px; text-align:center;">
          <h2>🚀 New Task Assigned</h2>
        </div>

        <!-- Body -->
        <div style="padding:20px;">
          <p style="font-size:16px;">Hello,</p>
          
          <p style="font-size:15px;">
            You have been assigned a new task. Please check the details below:
          </p>

          <!-- Task Box -->
          <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-top:10px;">
            <p><strong>📌 Title:</strong> ${title}</p>
            <p><strong>📝 Description:</strong> ${description}</p>
            <p>
              <strong>📊 Status:</strong> 
              <span style="color:orange; font-weight:bold;">${status}</span>
            </p>
          </div>

          <p style="margin-top:20px;">
            Assigned by: <strong>${findUser.email}</strong>
          </p>

          <p style="margin-top:20px;">
            Please complete this task on time.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#555;">
          <p>Task Management System</p>
        </div>

      </div>

    </div>
  `,
    });

    // const info = await transporter.sendMail(mailOptions);

    console.log(data);

    return res.status(200).json({
      message: "Task assigned successfully",
      task: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error sending mail",
    });
  }

  return res.send(response);
};

const showTask = async (req, res) => {
  const response = await TaskModel.find()
    .sort({ createdAt: -1 })
    .populate("createdBy")
    .populate("assignTo");

  res.send(response);
};

const showTaskById = async (req, res) => {
  const { id } = req.params;

  const response = await taskModel
    .find({ assignTo: id })
    .populate("assignTo")
    .populate("createdBy");
  res.send(response);
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  console.log(status);

  console.log(id);

  const response = await taskModel.findByIdAndUpdate(
    id,
    { status: status },
    { new: true },
  );

  res.send(response);
};

module.exports = {
  AssignTask,
  showTask,
  showTaskById,
  updateTaskStatus,
};
