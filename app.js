//載入express
const express = require('express')
const app = express()
const port = 3000

//載入express-handlebars
const exphbs = require('express-handlebars')

//把template engin交給express-handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//告訴express使用靜態檔案:bootstrap,css...etc
app.use(express.static('public'))

//把json資料載入
const restaurantList = require('./restaurant.json')

//route setting
app.get('/', (req, res) => {
  
  res.render('index', {restaurants: restaurantList.results})
})


//route setting 動態路由:params
app.get('/restaurants/:id', (req, res) => {
  const chosenRestaurant = restaurantList.results.find(item => item.id.toString() === req.params.id)
 res.render('show',{restaurant: chosenRestaurant})
})

//route setting 搜尋功能:query string
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const searchRestaurant = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword))
 res.render('index', {restaurants: searchRestaurant, keyword: keyword})
})

//start server and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})