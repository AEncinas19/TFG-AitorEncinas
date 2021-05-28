const {models} = require("../models");

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Esta variable contiene el tiempo máximo que se puede estar sin hacer peticiones. Si el usuario no hace peticiones durante
// este tiempo, la sesión será cerrada.
// 5 minutos.
const maxIdleTime = 5*60*1000;

exports.createLoginExpires = (req, res, next) => {

    req.session.loginExpires = Date.now() + maxIdleTime;

    console.log(req.user)

    res.status(200).send({username: req.body.username});
};

// Middleware used to check the inactivity time.
// If the inactivity time has been exceeded, then the user session is destroyed.
exports.checkLoginExpires = (req, res, next) => {

    if (req.session.loginExpires) { // There exist a user session

        if (req.session.loginExpires < Date.now()) { // Expired

            console.log("Expira")

            delete req.session.loginExpires;

            req.logout(); // Passport logout

            res.status(401).send({fin: "Fin de la sesión"});

        } else { // Not expired. Reset value.
            req.session.loginExpires = Date.now() + maxIdleTime;
            next();
        }
    }
    else{
        var err = new Error('Se ha perdido al usuario');
        next(err)
    }
};

/*
 * Serialize user to be saved into req.session.passport.
 * It only saves the id of the user.
 */
passport.serializeUser((user, done) => {

    console.log("Entra en serializeUser")

    done(null, user.id);
});

/*
 * Deserialize req.session.passport to create the user.
 * Find the user with the serialized id.
 */
passport.deserializeUser(async (id, done) => {

    try {
        console.log("Entra en deserializeUser")
        const user = await models.User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


/*
 * Configure Passport: local strategy.
 *
 * Searches a user with the given username, and checks that the password is correct.
 *
 * If the authentication is correct, then it invokes done(null, user).
 * If the authentication is not correct, then it invokes done(null, false).
 * If there is an error, then it invokes done(error).
 */
passport.use(new LocalStrategy(
    async (username, password, done) => {

        try {
            const user = await models.User.findOne({where: {username}});
            if (user && user.verifyPassword(password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }
));

// POST /login   -- Create the session if the user authenticates successfully
exports.create = (req, res, next) => {
    
    passport.authenticate(
    'local',
    function(err, user, info) {
        if(err){ return next(err);}
        else if(!user) {
            res.sendStatus(401);
        } else {
    // save user in session
        req.login(user, (err) => {
            if (err) {
                res.status(401).send({ message: 'Session save went bad.' });
            }
            next()
        })
        
        }
    })(req, res, next)  
};

// POST /logout   --  Close the session
exports.destroy = (req, res, next) => {

    delete req.session.loginExpires;

    req.logout();  // Passport logout
    
    console.log(req.user)

    res.sendStatus(200)
};