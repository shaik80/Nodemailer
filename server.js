const express = require("express");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const bodyPaser = require("body-parser");
const app = express();

//view engine
app.set("view engine", ".hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayouts",
    layoutsDir: __dirname + "/views/layouts/defaultlayouts",
    partialsDir: __dirname + "/views/layouts/partiallayouts",
  })
);

//body parser
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());

app.get("/", (req, res) => {
  res.render("./mail/home");
});
app.post("/", async (req, res) => {
  console.log(req.body);
  let output = `<p>Name : ${req.body.name}</p>
  <p>Email: ${req.body.email}</p>
  <p>Company: ${req.body.company}</p>
  <p>Phone No: ${req.body.phone}</p>
  <p>Message: ${req.body.message}</p>`;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "your gmail account", // generated ethereal user
      pass: "your password", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Shaik 👻" <sh.mudassir80@gmail.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.render("./mail/home", { msg: "Email set....!" });
});

app.listen(3000, () => {
  console.log("server started...! on port 3000");
});
