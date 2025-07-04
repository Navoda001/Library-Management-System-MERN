const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const {v4: uuidv4} = require('uuid')

async function addUser(user){
    try{
        const hashPassword = await bcrypt.hash(user.password, 10)

        const newUser = new User({
            userId: uuidv4(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashPassword,
            role:user.role
        });
        return newUser.save();

    }catch(err){
        console.error(err);
        throw err;
    }
}
module.exports = { addUser }