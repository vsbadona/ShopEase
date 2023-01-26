import Authencticate from "../middleware/authenticate.js"
import User from "../model/userSchema.js"

export const getCart = async (req, res) => {
    const { _id } = req.user
    const findUser = await User.findById(_id)
    if (findUser) {
        const cart = await findUser.cart
        res.json(cart)
    }
    else {
        res.json({ alert: "No User Found" })
    }
}
export const emptyCart = async(req,res) => {
    const _id  = req.body.data
    const findUser = await User.findById(_id)
    if (findUser) {
        await findUser.cart.splice(0,findUser.cart.length)
        await findUser.save()
    }
    else {
        res.json({ alert: "No User Found" })
    }
}

export const addCart = async (req, res) => {
    const { name, image, price, quantity, category, id } = req.body

    const data = {
        name: name,
        image: image,
        price: price,
        category: category,
        quantity: quantity
    }
    const findUser = await User.findById(id)
    if (findUser) {
        findUser.cart = await findUser.cart.concat(data)
        await findUser.save()
        res.json(data)
    }
    else {
        res.json({ error: "Can't Add To Cart" })
    }
}

export const deleteCart = async (req, res) => {
    const { _id, id } = req.query
    const findUser = await User.findById(id)
    if (findUser) {
        const product = await findUser.cart.filter(item => item._id != _id)
        findUser.cart = product
        const save = await findUser.save()
        if (save) {
            res.json(product)
        } else {
            res.json({ error: "Can't Add To Cart" })
        }
    } else {
        res.json({ alert: "User Not Found" })
    }
}

export const updateCart = async (req, res) => {
    const { quantity, id,data } = req.body
    const {_id,name,image,price,category} = data.data
    const Data = {
        name: name,
        image: image,
        price: price,
        category: category,
        quantity: quantity,
        _id : _id
    }
    const findUser = await User.findById(id)
    if (findUser) {
              const productIndex = await findUser.cart.findIndex(item => item._id == _id)
            findUser.cart[productIndex] = Data
            await findUser.save()
            res.json(findUser.cart)
      
        } else {
        res.json({ alert: "Can't Find User" })
    }
}
