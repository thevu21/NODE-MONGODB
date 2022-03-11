const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const connectDB = require('./config/db')

//mhap khau routes
const posts = require('./routes/posts')

//khoi dong app 
const app = express()

//khoi dong handlebars middleware
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//khoi dong methodOverride middleware
app.use(methodOverride('_method'))

//khoi dong express middleware
app.use(express.json())

// ket noi co so du lieu
connectDB()

//mot so routes co ban co the dua vao file rieng
app.get('/',(req,res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))
//mang routes vao de su dung
app.use('/posts', posts)

const PORT = 5000;

app.listen(PORT, () => console.log(`Server khoi dong tai port ${PORT}`))