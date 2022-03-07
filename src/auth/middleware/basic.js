'use strict'

const {Users} = require("../models/users-model")
const bcrypt = require('bcrypt');
const base64 = require('base-64');

module.exports = async (req,res,next)=>{
    if(req.headers.authorization) {
        
        let encodedPart= req.headers.authorization.split(' ')[1];

        let decoded = base64.decode(encodedPart);

        let [username,password]= decoded.split(':');

        try {
            const user = await Users.findOne({where:{username:username}});
            const valid = await bcrypt.compare(password,user.password);
            req.user=user;
            if(valid) {
               next()
            } else {
                next('user is not valid')
            }
        } catch(error) {
            res.send(error)
        }
    }else{
        next('Not Autherised')
    }
}