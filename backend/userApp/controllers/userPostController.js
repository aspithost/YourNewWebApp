const bcrypt = require('bcrypt');

const { cacheBlacklistedUser,
    checkUserCache } = require('../helpers/cache');

const { createAuthHash, 
    deleteOldAuthHash } = require('../helpers/databaseAuthHash');

const { createUser,
    findUserByEmail,
    findUserById,
    findUserIfExists } = require('../helpers/databaseUser');

const { createPasswordHash, 
    deleteOldPasswordHash } = require('../helpers/databasePasswordHash');

const { sendVerificationEmail, 
    sendPasswordEmail } = require('../helpers/nodemailer');

const { autoLogin } = require('../helpers/autoLogin');

exports.blacklistUser = async (req, res, next) => {
    try {
        if (!req.user || req.user.rights < 3) {
            return res.status(401).json({ message: 'mag jij niet vriend' });
        } else {
            let user = await checkUserCache(req.body.userId);
            if (!user) {
                user = await findUserById(req.body.userId);
            }
            cacheBlacklistedUser(user);
            return res.status(200).json({ 
                message: `blacklisted ${user.username}'s token successfully` 
            });
        }
    } catch (err) {
        next (err);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        if (req.user) {
            res.status(403).json({ message: 'je hebt al een account en bent al ingelogd vriend' });
        } else {
        
            // Check if User exists
            const userExists = await findUserIfExists(req.body.username, req.body.email);
            if (userExists[0]) {
                return res.status(409).json({ message: 'You can\'t use that username!' });
            } else if (userExists[1]) {
                return res.status(409).json({ message: 'You can\'t use that email!' });

            // Create User
            } else {
                if (req.body.password.length < 6){
                    return res.status(400).json({ message: 'Password has to be at least 6 characters in length' });
                } else {
                    const hashedPassword = await bcrypt.hash(req.body.password, 12);
                    const user = await createUser(req.body.username, req.body.email, hashedPassword);
                    const hash = await createAuthHash(user._id);
                    await sendVerificationEmail(user, hash.authHash);
                    res.status(201).json({
                        message: 'Successfully registered!',
                        user
                    });
                }
            }
        }
    } catch (err) {
        next (err);
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        // Controleren op gebruiker
        if (req.user && (req.user.isverified.toString() === 'false')) {
            return res.status(401).json({ message:'You still have to activate your account' });
        } else if (req.user) {
            return res.status(201).json({message: 'al ingelogd gino'});
        } else {

        // Check Email
            const user = await findUserByEmail(req.body.email)
            if (!user) {
                return res.status(401).json({ message: 'Something went wrong, please try again!' });
            } else {

                // Check Password
                const hashedPassword = await bcrypt.compare(req.body.password, user.password);
                if (!hashedPassword) { 
                    return res.status(401).json({ message: 'Something went wrong, please try again!' });

                // Check if verified
                } else if (!user.isverified) {
                    return res.status(401).json({ message: 'You still have to activate your account!' });

                // Login User
                } else {
                    req.user = user;
                    req.needsRefreshToken = true;
                    autoLogin(req, res);
                    return res.status(200).json({ 
                        message: 'ingelogd gino, van harte' 
                    });
                }
            }
        }
    } catch (err){
        next (err);
    }
}

exports.newAuthHash = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user) {
            return res.status(403).json({ message: 'You are not registered' });
        } else {
            await deleteOldAuthHash(user._id)
            const newHash = await createAuthHash(user._id);    
            await sendVerificationEmail(user, newHash.authHash)
            return res.status(201).json({ 
                message: 'Generated a new activation string. Please check your email!' 
            });
        }
    } catch (err) {
        next(err);
    }
}
  
exports.newPasswordHash = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user) {
            return res.status(403).json({ message: 'Something went wrong!'});
        } else {
            await deleteOldPasswordHash(user._id)
            const hash = await createPasswordHash(user._id);
            // await sendPasswordEmail(user, hash.passwordHash)
            return res.status(201).json({ 
                message: 'You can now reset your password. Please check your email'
            });
        }
    } catch (err) {
        next (err);
    }
}