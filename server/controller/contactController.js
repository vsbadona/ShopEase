import Contact from "../model/contactSchema.js"

export const sendMessage = async(req,res) => {
    const {name,email,message} = req.body
   if(!name || !email || !message){
    res.json({alert : "Please Enter Both Fields"})
   }else{
    const sendMessage =await new Contact({name,email,message})
    if(sendMessage){
        await sendMessage.save()
        res.json({success : "Message Sent"})
    }else{
        res.json({error : "couldn't send message"})
    }
   }
}

export const getMessage = async(req,res) => {
    const message = await Contact.find()
    res.json(message)
}

export const deleteMessage = async(req,res) => {
    const {_id}=req.body
    if(!_id){
        res.json({alert : "Please Provide _id "})
    }else{
        const findmessage = await Contact.findByIdAndDelete(_id)
        if(findmessage){
           res.json({success : "Message Deleted"})
        }else{
            res.json({error : "Can't Delete Message"})
        }
    }
}