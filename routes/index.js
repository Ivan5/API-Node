'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product')
const api = express.Router()

//Muestra todos los productos
api.get('/product',ProductCtrl.getProducts)

//Acceder a un unico producto
api.get('/product/:productId', ProductCtrl.getProduct)

//Subir productos
api.post('/product', ProductCtrl.saveProduct)

//Actulizar productos
api.put('/product/:productId', ProductCtrl.updateProduct)

//Borrar productos
api.delete('/product/:productId', ProductCtrl.deleteProduct)

module.exports = api