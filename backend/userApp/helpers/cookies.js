exports.setRefreshCookie = (refreshToken, res) => {
    res.cookie('refreshCookie', refreshToken, { 
        maxAge: 1209600000,
        secure: true,
        sameSite: 'lax',
        httpOnly: true
    });
}

exports.setAccessCookie = (accessToken, res) => {
    res.cookie('accessCookie', accessToken, { 
        maxAge: 300000, 
        sameSite: 'lax',
        secure: true
    });
}

exports.deleteCookies = (res) => {
    res.cookie('refreshCookie', '', { maxAge: 1 });
    res.cookie('accessCookie', '', { maxAge: 1 });
}