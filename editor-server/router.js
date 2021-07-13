const router = require('koa-router')()
const uploadimg = require('./uploadImg')

router.prefix('/api')
router.post('/uploadImg', async function(ctx) {
  const imgUrl = await uploadimg(ctx)
  if (imgUrl) {
    ctx.body = {
      data: imgUrl,
      message: '文件上传成功',
      code: '200',
    }
  } else {
    ctx.body = {
      data: imgUrl,
      message: '文件上传失败',
      code: '200',
    }
  }
})

module.exports = router