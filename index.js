'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')



//Conexion a la base datos con mongoose
mongoose.connect(config.db,(err,res)=>{
	if (err) throw err
	console.log('Conexion a la base de datos establecida')
	
	app.listen(config.port, () => {
  	console.log(`Api rest corriendo en el puerto ${config.port}`)
	})
})

