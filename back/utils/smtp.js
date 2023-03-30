const nodemailer = require ('nodemailer');
const { WEB_HOST, WEB_PORT, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS,SMTP_FROM } = process.env;

const transporter = nodemailer.createTransport({ port:SMTP_PORT,host:SMTP_HOST, auth:{ user: SMTP_USER, pass: SMTP_PASS },secure:false })


const sendRegisterMail = async(user)=>{
    try{
        const mailData = { 
            from:SMTP_FROM, 
            to:user.email,
            cc: 'lxalonso@gmail.com',
            subject: 'Codigo activación de cuenta',
            html:`
                <h1>Bienvenido a perfecto inquilino ${user.nombre}</h1>
                <p>Para procecder a la activación de mail haga click en el siguiente enlace</p>
                <a href="http://${WEB_HOST}:${WEB_PORT}/api/v1/users/${user.id_usuario}/activate-user/${user.activated_code}" > 
                    ACTIVA TU USUARIO
                </a>
                `
            }
        const data = await transporter.sendMail(mailData)
    }catch(error){
        console.error(error);
        throw{
            status: error?.status || 500,
            message: error?.message || 'No se ha podido enviar el correod de activación de usuario'
        }
    }
    
}

const sendChangePasswordAlert = async(user)=>{
    try{
        const mailData = { 
            from:SMTP_FROM, 
            to:user.email,
            cc: 'lxalonso@gmail.com',
            subject: 'Password cambiado',
            html:`
                <h1>Hola ${user.nombre}</h1>
                <p>Queremos notificarte que tu password de Perfecto Inquilino,ha sido modificado, si no has sido tu ponte en contacto con el administrador de la página web</p>
                `
            }
        const data = await transporter.sendMail(mailData)
    }catch(error){
        throw{
            status: error?.status || 500,
            message: error?.message || 'No se ha podido enviar el correo de cambio de password' 
        }
    }
    
}

module.exports = {
    sendRegisterMail,
    sendChangePasswordAlert
}