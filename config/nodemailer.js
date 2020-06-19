const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

//it is the part which sends the email using the configuration given to it
let transporter = nodemailer.createTransport(env.smtp);


//it is the html being sent as the email
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, "../views/mailers", relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template', err); return;}

            mailHTML = template;
        }
    );

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate,
}