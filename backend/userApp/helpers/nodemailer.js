const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (user, hash) => {
    const output = `
        <h2>Welcome ${user.username}!</h2>
        <p>Thank you for registering a yournewwebapp.com account. To verify your account, please click the link below:</p>
        <p>https://yournewwebapp.com/users/verify?hash=${hash}</p>  
        <p>This is an automatically generated email, so don't bother replying.</p><br> 
        <p>Happy commenting!</p>   
    `;

    let transporter = nodemailer.createTransport({ 
        host: `${process.env.SMTP_HOST}`,
        port: 587,
        auth: {
            user: `${process.env.NODEMAILER_USER}`,
            pass: `${process.env.NODEMAILER_PASSWORD}`
        },
    });

    let mailOptions = {
        from: '"yournewwebapp" <dontreply@yournewwebapp.com>',
        to: `${user.email}`, 
        subject: 'Activate Your yournewwebapp.com Account',
        text: '',
        html: output
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) return console.log(error);
    });
} 

exports.sendPasswordEmail = async (user, hash) => {
    const output = `
        <h2>Hello ${user.username}!</h2>
        <p>You have requested to reset your password. You can do so via the following link:</p>
        <p>https://yournewwebapp.com/users/password?hash=${hash}</p>  
        <p>This is an automatically generated email, so don't bother replying.</p><br>  
        <p>Happy commenting!</p>  
    `;

    let transporter = nodemailer.createTransport({ 
        host: `${process.env.SMTP_HOST}`,
        port: 587,
        auth: {
            user: `${process.env.NODEMAILER_USER}`,
            pass: `${process.env.NODEMAILER_PASSWORD}`
        },
    });

    let mailOptions = {
        from: '"yournewwebapp" <dontreply@yournewwebapp.com>',
        to: `${user.email}`, 
        subject: 'Reset Your yournewwebapp.com Password',
        text: '',
        html: output
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) return error;
    });   
}