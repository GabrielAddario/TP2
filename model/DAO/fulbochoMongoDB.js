import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {
    obtenerProductos = async id => {   
        if(!CnxMongoDB.connection) return id? {}:[]

        if(id) {
            const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
            return producto
        }
        else {
            const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
            return productos
        }
    }

    guardarProducto = async producto => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection('productos').insertOne(producto)
        return producto
    }

    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection('productos').updateOne(
            { _id: new ObjectId(id) },
            { $set: producto }
        )

        const productosActualizado = await this.obtenerProductos(id)
        return productosActualizado
    }

    borrarProducto = async id => {
        if(!CnxMongoDB.connection) return {}

        const productosBorrado = await this.obtenerProductos(id)
        await CnxMongoDB.db.collection('productos').deleteOne( { _id: new ObjectId(id) })
        return productosBorrado
    }
}

export default ModelMongoDB