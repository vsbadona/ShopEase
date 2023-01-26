import Order from "../model/orderSchema.js"

export const orderNow = async(req,res) => {
    const {_id,fullname,village,state,district,pincode,total} = req.body.data.order
    const items = req.body.data.items

        const save = new Order({
            id : _id,
            fullname : fullname,
            village : village,
            state : state,
            district : district,
            pincode :pincode,
            total :total
        })
        await save.save()
        const Id = save._id
        const findOrder = await Order.findById(Id)
      
        findOrder.items = await findOrder.items.concat(items)
      await  findOrder.save()
       res.json({success : findOrder})
}

export const allOrders = async(req,res) => {
    const findOrders = await Order.find()
    res.json(findOrders)
}

