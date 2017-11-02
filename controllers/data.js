const db = require('../models/db.js')
const Teacher = require('../models/Teacher.js')


ts = [
{
  username: '阳春白雪',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春黑雪',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春红雪',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春绿雪',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春黄雪',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '无雪',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '无花',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '灵魂摆渡',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '天堂来使',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '火骑士空空',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春白雪2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春黑雪2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春红雪2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春绿雪2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '阳春黄雪2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '无雪2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '无花2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '灵魂摆渡2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '天堂来使2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
{
  username: '火骑士空空2',
  nickname: '阳春白雪',
  password: '123456',
  phone: '13463438952',
  email: 'yangchunmian@foxmail.com',
  gender: 1,
  brithDay: '1998-12-18',
  joinDate: '2011-10-13'
},
]
ts.forEach(item => {
  const t = new Teacher(item)
  t.save()
  .then(doc => {
    console.log(doc.username + ' : 添加成功')
  })
})

Teacher.updateMany({}, {introduce: `
  云，男，
  1964年9月10日生于浙江省杭州市，祖籍浙江省嵊州市（原嵊县）谷来镇， 阿里巴巴集团主要创始人，现担任阿里巴巴集团董事局主席、日本软银董事、大自然保护协会中国理事会主席兼全球董事会成员、华谊兄弟董事、生命科学突破奖基金会董事。
  [1] 1988年毕业于杭州师范学院外语系，同年担任杭州电子工业学院英文及国际贸易教师，
  1995年创办中国第一家互联网商业信息发布网站“中国黄页”，
  1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理，
  1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席。`})
.then(result => {
  console.log('更新成功')
})
// module.exports
