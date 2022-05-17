exports.setRefreshCookie = (refreshToken, res) => {
    return res.cookie('refreshCookie', refreshToken, { 
        httpOnly: true, 
        secure: true,
        maxAge: 1209600000, 
        overwrite: true, 
        sameSite: 'lax' 
    });
}

exports.setAccessCookie = (accessToken, res) => {
    return res.cookie('accessCookie', accessToken, { 
        maxAge: 300000, 
        overwrite: true, 
        sameSite: 'lax',
        secure: true
    });
}

exports.deleteCookies = (res) => {
    res.cookie('refreshCookie', '', { maxAge: 1 });
    res.cookie('accessCookie', '', { maxAge: 1 });
}