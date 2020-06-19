const nodeMailer = require('../config/nodemailer');
const path = require('path');


exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');


    nodeMailer.transporter.sendMail({
        from: 'chatterstop_mailer.com',
        to: comment.user.email,
        subject: "New comment publised!",
        html: htmlString
    }, (err, info)=>{
        if(err){console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent');
        return;
    });
}