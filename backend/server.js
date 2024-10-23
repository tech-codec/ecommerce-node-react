const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const UserRoutes = require('./routes/user.routes')
const RoleRoutes = require('./routes/role.routes')
const CategoryRoutes = require('./routes/category.routes')
const ProductRoutes = require('./routes/product.routes')
const {initRoles} = require('./utils/initRoles')


require('dotenv').config({path:'./config/.env'})
require('./config/db')

console.log(authRoutes)

app = express()

/**Constante */
const PORT = process.env.PORT || 3000



/**milddleware */
const corsOptions ={
    origin: function(origin, callback){
      return callback(null, true);
    },
     credentials:true,            
     optionSuccessStatus:200,
  }
    
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
//initRoles()



/**Les routes de l'Api */
app.use('/api/auth',authRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/roles', RoleRoutes)
app.use('/api/categories', CategoryRoutes)
app.use('/api/products', ProductRoutes)






app.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT} `)
})