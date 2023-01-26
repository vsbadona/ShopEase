import User from "../model/userSchema.js"

export const addAddress = async(req,res) => {
    const {_id,name,village,district,state,pincode} = req.body
    const findUser = await User.findById(_id)
    if(findUser){
        const data = {
            name : name,
            village : village,
            district : district,
            state : state,
            pincode : pincode
        }
findUser.address = await findUser.address.concat(data)
await findUser.save()
res.json(findUser.address)
    }else{
        res.json({error : "No User Found"})
    }
}

export const deleteAddress = async(req,res) => {
    const {_id,id} = req.body
    const findUser = await User.findById(_id)
    if(findUser){
const findProduct = findUser.address.filter(item => item._id != id)
findUser.address = findProduct
await findUser.save()
res.json(findUser.address)
    }else{
        res.json({error : "No User Found"})
    } 
}