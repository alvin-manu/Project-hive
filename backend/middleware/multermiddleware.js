const multer = require("multer")

// define storage 
// it havs 2 keys
// destination
// file name

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const filename = `image-${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

function fileFilter(req, file, cb) {

  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {

    // To accept the file pass `true`, like so:
    cb(null, true)
  }else{
    // To reject this file pass `false`, like so:
      cb(null, false)
      return cb(new Error("only png jpg, jpeg, webp are allowed"))
  }

}

const multerconfig = multer({ storage: storage , fileFilter: fileFilter})

module.exports = multerconfig
