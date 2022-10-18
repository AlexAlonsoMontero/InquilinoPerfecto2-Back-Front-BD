const nodemailer = require ('nodemailer');
const { WEB_HOST, PORT, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS,SMTP_FROM } = process.env;

const transporter = nodemailer.createTransport({ port:SMTP_PORT,host:SMTP_HOST, auth:{ user: SMTP_USER, pass: SMTP_PASS },secure:false })


const sendRegisterMail = async()=>{
    const mailData = { from:SMTP_FROM, to:'lxalonso@gmail.com', subject: 'Mail de prueba2', html:`<p>Prueba</p>`}
    console.log('entra')
    const data = await transporter.sendMail(mailData)
    console.log(data)
}


module.exports = {
    sendRegisterMail
}