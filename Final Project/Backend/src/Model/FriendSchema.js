import mongoose from 'mongoose';

const FriendSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String }
});

const Friend = mongoose.model('Friend', FriendSchema);
export default Friend;