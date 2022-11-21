const { request } = require('express');
const multer = require('multer');
const fs = require('fs')

const basePath = process.env.NODE_ENV != 'test'
    ? process.env.USER_AVATAR_ROUTE 
    : process.env.TEST_USER_AVATAR_ROUTE


const subirUserAvatar = () => {
    let imageIndex = 1;
    let storage = multer.diskStorage({
        destination: (request, file, cb) => {
            const path = `${basePath}/${request.params.id_usuario}`
            fs.mkdirSync(path, { recursive: true });
            cb(
                null,
                `${path}`
            )
        },
        filename: (request, file, cb) => {
            let filename = `${imageIndex}-${file.originalname}`
            cb(null, filename);
            imageIndex += 1
        }
    });
    return multer({
        storage: storage,
        fileFilter: (request, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true)
            } else {
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
    })
}



module.exports = {
    subirUserAvatar
}