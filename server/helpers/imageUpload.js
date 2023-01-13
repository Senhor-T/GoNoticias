const multer = require('multer')
const path = require('path')

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null,'./public/images/posts')
        },
        filename:(req,file,cb)=>{
            cb(null, Date.now().toString()+ "_" + file.originalname)
        }
    }),
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)){
            return cb(new Error("Envie Apenas Jpg ou Png"))
        }
        cb(undefined,true)
    },
}))