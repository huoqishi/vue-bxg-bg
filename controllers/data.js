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

