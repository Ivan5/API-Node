'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Muestra todos los productos
app.get('/api/product',(req,res) => {
	Product.find({},(err,products) => {
		if (err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
		if (!products) return res.status(404).send({message : `No existen productos`})

		res.send(200, {products})

	})
})
//Acceder a un unico producto
app.get('/api/product/:productId', (req,res) => {
	let productId = req.params.productId
	Product.findById(productId, (err,product) => {
		if (err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
		if (!product) return res.status(404).send({message : `El producto no existe`})


		res.status(200).send({product})
	})

})

//Subir productos
app.post('/api/product',(req,res) => {
	console.log('Post api/product')
	console.log(req.body)

	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err,productStore)=>{
		if (err) res.status(500).send({message:`Error al salvar ${err}`})

		res.status(200).send({product: productStore})
	})
})

//Actulizar productos
app.put('/api/product/:productId', (req,res) => {
	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update, (err,productUpdate) => {
		if (err) res.status(500).send({message: `Error al actualizar el producto ${err}`})

		res.status(200).send({product: productUpdate})
	})
})

//Borrar productos
app.delete('/api/product/:productId',(req,res) => {
	let productId = req.params.productId

	Product.findById(productId,(err,product) => {
		if (err) res.status(500).send({message: `Error al borrar el producto ${err}`})

		product.remove(err => {
			if (err) res.status(500).send({message: `Error al borrar el producto ${err}`})

			res.status(200).send({message: `El producto ha sido eliminado`})
		})
	})
})

//Conexion a la base datos con mongoose
mongoose.connect('mongodb://localhost:27017/shop',(err,res)=>{
	if (err) throw err
	console.log('Conexion a la base de datos establecida')
	
	app.listen(port, () => {
  	console.log(`Api rest corriendo en el puerto ${port}`)
	})
})

