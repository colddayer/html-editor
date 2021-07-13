const path = require('path')
const fs = require('fs')

const uploadimg = async(ctx) => {
  let remotefilePath = null;
  const file = ctx.request.files.upfile
  if (file) {
    // // 创建可读流
    const reader = fs.createReadStream(file.path)
    let filePath = `${path.resolve(__dirname, './static')}/${file.name}`
    remotefilePath = `http://localhost:8080/${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  return remotefilePath;
}

module.exports = uploadimg;