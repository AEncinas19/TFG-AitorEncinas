
const {models} = require('../models');
const Sequelize = require('sequelize');

//-----------------------------------------------------------

// POST /register
exports.register = async (req, res, next) => {

    console.log(req.body)

    const {username, password} = req.body;

    let user = await models.User.build({
        username,
        password,
    });

    // Password must not be empty.
    if (!password) {
        res.sendStatus(500);
    }

    try {
        // Save into the data base
        user = await user.save({fields: ["username", "password", "salt"]});
        res.status(200)
        .send({success: 'Username create succesfully'})

    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            res.status(404)
            .send({error: 'Username already exists'})
            
        }
        else{
        next(error);
        }
    } 
};

// POST /pushtoken
exports.insertpush = async (req, res, next) => {
    try {
        if ((req.user.pushtoken != req.body.pushtoken) || !req.user.pushtoken){

            console.log(req.sessionID);

            let user = req.user;
            user.pushtoken = req.body.pushtoken;
            // Save into the data base
            user = await user.save({fields: ["pushtoken"]});
            res.status(200)
            .send({success: 'PushToken saved succesfully'})
        } else {
            console.log('PushToken has been saved yet');
            res.sendStatus(200)
        }
    } catch (error) {
        next(error);
    }
}
