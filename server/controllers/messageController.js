// get all users except logged in
import Message from "../models/Message.js"
import Message from "../models/User.js"
export const getusersForSidebar = async (req,res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({_id: {$ne : userId}}).select("-password");
    // count no. of meassge not seen
    const unseenMessages = {}
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
      if(messages.length > 0){
        unseenMessages[user._id] = messages.length;
      }
    })
    await promises.all(promises);
    res.json({success: true,users:  filteredUsers, unseenMessages})
  } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message})
  }
}

//selected user all message 

export const getMessages = async (req,res) => {
  try {
    const {id: selectedUserId} = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or : [
        {senderId: myId, receiverId: selectedUserId},
        {senderId: selectedUserId, receiverId: myId},
      ]
    })
    await Message.updateMany({senderId: selectedUserId, receiverId: myId},{seen: true});
    res.json({success: true, messages})

  } catch (error) {
     console.log(error.messages)
    res.json({success: false, message: error.message})
  }
}