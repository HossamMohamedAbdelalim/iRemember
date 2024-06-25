import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  birthday: Date,
  photo: String, // URL or base64 string for the profile photo
  profileSetup: { type: Boolean, default: false }, // Track if the profile setup is completed
});

const User = mongoose.model('User', userSchema);

export default User;