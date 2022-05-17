const AuthHash = require('../models/authHash');

exports.createAuthHash = (userId) => { 
    let hash = Math.random().toString(36).slice(2);
    return AuthHash.create({
        authHash: hash,
        user: userId
    });
    // Hier nog iets toevoegen dat de persoon een mailtje krijgt oid.
}

exports.deleteAuthHash = (hashId) => {
    return AuthHash.findByIdAndDelete(hashId);
}

exports.deleteOldAuthHash = (userId) => {
    return AuthHash.findOneAndDelete({ user: userId });
}

exports.getAuthHash = (hash) => {
    return AuthHash.findOne({ authHash: hash })
        .lean();
}