const bcrypt = require('bcrypt');

const { autoLogin } = require('../helpers/autoLogin');

const { cacheUser } = require('../helpers/cache');

const { getAuthHash, deleteAuthHash } = require('../helpers/databaseAuthHash');

const { getPasswordHash } = require('../helpers/databasePasswordHash')

const { findUserByUsername,
    patchUser,
    updateRights } = require('../helpers/databaseUser');

exports.activateUser = async (req, res, next) => {
    try {
        const authHash = await getAuthHash(req.params.authHash);
        if (!authHash)  { 
            return res.status(403).json({ message: 'Forbidden' });
        } else {
            const verifiedUser = await patchUser(authHash.user, { isverified: true });
            await deleteAuthHash(authHash._id);
            return res.status(201).json({
                message: 'successfully actived your account',
                username: verifiedUser.username
            });
        }
    } catch (err) {
        next (err);
    }
}

exports.patchUsername = async (req, res, next) => {
    try {
        if (!req.user) { 
            return res.status(401).json({ message: 'not logged in'});

        // Check if username is available
        } else {
            const userExists = await findUserByUsername(req.body.newUsername);
            if (userExists) {
                return res.status(409).json({ message: 'already exists'});

            // Password verification
            } else {
                const hashedPassword = await bcrypt.compare(req.body.password, req.user.password);
                if (!hashedPassword) {
                    return res.status(401).json({ message: 'Incorrect password' });
                
                // Update User
                } else {
                    const updatedUser = await patchUser(req.user._id, { username: req.body.newUsername });
                    cacheUser(updatedUser);
                    req.user = updatedUser;

                    // AccessToken issuen met nieuwe gebruikersnaam
                    autoLogin(req, res);
                    return res.status(201).json({
                        message: 'Successfully updated your username!',
                        user: updatedUser
                    });
                }
            }
        }
    } catch (err) {
        next (err);
    };
};


exports.patchAvatar = async (req, res, next) => {
    try {   
        const updatedUser = await patchUser(req.user._id, { avatar: req.body.avatar });
        cacheUser(updatedUser);
        return res.status(201.).json({ 
            message: 'Successfully updated your avatar!',  
            avatar: updatedUser.avatar 
        });
    } catch (err) {
        next (err);
    }
}

exports.patchPassword = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'something went wrong!' });
        } else {
            // Password controle
            const hashedPassword = await bcrypt.compare(req.body.password, req.user.password);
            if (!hashedPassword) {
                return res.status(401).json({ message: 'something went wrong!' });

            // Wachtwoord hashen en gebruiker updaten
            } else {
                const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
                const updatedUser = await patchUser(req.user._id, { password: hashedPassword });
                cacheUser(updatedUser);
                return res.status(201).json({ message: 'Successfully updated your password!' });
            }
        }
    } catch (err) {
        next (err);
    };
};

exports.patchRights = async (req, res, next) => {
    try {
        if (req.user.rights !== 3) {
            res.status(403).json({ message: 'Forbidden' });
        } else {
            const updatedUser = await updateRights(req.body.username, req.body.newRights);
            cacheUser(updatedUser);
            return res.status(201).json({
                message: `Gebruiker ${req.user.username} heeft nu ${req.user.rights} rechten`
            });
        }
    } catch (err) {
        next (err);
    }
}

exports.patchPasswordWithHash = async (req, res, next) => {
    try {
        const hash = await getPasswordHash(req.params.passwordHash);
        if (!hash || !req.body.userId) {
            return res.status(401).json({ message: 'Something went wrong' });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
            const updatedUser = await patchUser(req.body.userId, { password: hashedPassword });
            if (!updatedUser) {
                return res.status(401).json({ message: 'Something went wrong' });
            } else {
                await hash.delete();
                return res.status(200).json({ message: 'Successfully updated your password!' });
            }
        }
    } catch (err) {
        next (err);
    }
}