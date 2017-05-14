'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Muestra todos los productos
app.get('/api/product',(req,res) => {
	res.send(200, {products: []})
})
//Acceder a un unico producto
app.get('/api/product/:productId', (req,res) => {

})

//Subir productos
app.post('/api/product',(req,res) => {
	console.log(req.body)
	res.status(200).send({message: 'El producto se ha recibido'})
})

//Actulizar productos
app.put('/api/product/:productId', (req,res) => {

})

//Borrar productos
app.delete('/api/product/:productId',(req,res) => {

})

//Conexion a la base datos con mongoose
mongoose.connect('mongodb://localhost:27017/shop',(err,res)=>{
	if (err) throw err
	console.log('Conexion a la base de datos establecida')
	
	app.listen(port, () => {
  	console.log(`Api rest corriendo en el puerto ${port}`)
	})
})

