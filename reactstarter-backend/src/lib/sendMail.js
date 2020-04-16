require('dotenv').config();

const nodemailer = require('nodemailer');
const striptags = require('striptags');


// send verification mail
module.exports.sendApproveEmail = async (firstName, lastName, email) => {

const {
    MAIL_USERNAME: user,
    MAIL_PASSWORD: pass,
    MAIL_SENDER_SUPPORT: senderSupport,
    MAIL_SENDER_TITLE: senderTitle,
    MAIL_SITE_LINK: siteLink
    } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user,
        pass
    }
});
let output = `<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>ProAV Room Builder Approve</title>
    <style type="text/css">
        .applelink a {
            text-decoration: none !important;
            color: #FFFFFF !important;
        }

        .applelink2 a {
            text-decoration: none;
            color: #000000;
        }

        img {
            max-width: 100%;
            max-height: 100%;
        }

        ul,
        ul * {
            list-style-type: none !important;
        }

        @media screen and (max-width: 599px) {

            table[class=emailwrapto100pc],
            td[class=emailwrapto100pc],
            img[class=emailwrapto100pc] {
                width: 100% !important;
                height: auto !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
                margin: 0px !important;
                box-shadow: none !important;
                box-shadow: 0 0 0 transparent !important;
                border: none;
                border-radius: 0px !important;
            }

            td[class=emailwrapto100pc] {
                display: inline-block !important;
                box-shadow: none !important;
                box-shadow: 0 0 0 transparent !important;

            }

            *[class="gmailfix"] {
                display: none !important;
            }

            .divider {
                display: inline-block !important;
                width: 100% !important;
                height: 1px !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
                margin: 0px !important;
            }

            table[class=emailwrapto50pc],
            td[class=emailwrapto50pc],
            img[class=emailwrapto50pc] {
                width: 50% !important;
                height: 100% !important;
                padding: 0px !important;
                border: 0 !important;

            }

            td[class=hr] {
                width: 100% !important;
                height: 2px !important;
            }

            table[class=center],
            td[class=center] {
                text-align: center !important;
                padding: 0px !important;
            }

            td[class=auto-height] {
                height: auto !important;
            }

            .hide {
                display: none !important;
            }

            .center {
                text-align: center !important;
            }

            .center img {
                display: inline-block !important;
            }

            .left {
                text-align: left !important;
            }

            .left img {
                display: inline-block !important;
            }

            .right {
                text-align: right !important;
            }

            .right img {
                display: inline-block !important;
            }

            .auto-width {
                width: auto !important;
                max-width: 100% !important;
            }

            .fluid-height {
                height: auto !important;
                padding: 0 !important;
            }

            .padding-horz-20 {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            .padding-vert-10 {
                padding-top: 10px !important;
                padding-bottom: 10px !important;
            }

            .padding-left-0 {
                padding-left: 0 !important;
            }

            .padding-top-10 {
                padding-top: 10px !important;
            }

            .footer-imgwrap {
                width: 201px;
                /* Adjust in inspector until images align*/
            }

            .small-cta {
                width: 250px !important;
            }

            .side {
                width: 16px !important;
            }

            .gmailignore {
                max-width: 100% max-height: 100%;
            }

            /* this error breaks the styles for gmail...*/
        }
    </style>
</head>

<body style="width: 100%; padding: 0; margin: 0;" bgcolor="#f6f6f6">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-adjust:none;">
        <tr>
            <td valign="top" align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="emailwrapto100pc" bgcolor="#221A51"
                    style="background-image: linear-gradient(to bottom, #221A51, #221A51 100vh, #f6f6f6 100vh); height: 50vh">

                    <!-- pre-header -->
                    <tr>
                        <td>
                            <table border="0" cellspacing="0" cellpadding="0" class="emailwrapto100pc" width="100%" align="center">
                                <tr>
                                    <td height="5"></td>
                                </tr>
                                <tr>
                                    <td width="20">
                                    </td>
                                    <td>
                                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" class="emailwrapto100pc">
                                            <tr>
                                                <td height="5" style="margin:0px; padding:0px; font-size:0px;"></td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="font-family: Verdana, Geneva, sans-serif; font-size: 11px; line-height:16px; color: #ffffff">You&rsquo;ve received this email from
                                                    ProAV Room Builder | Can&rsquo;t see it properly?
                                                        <a href="${siteLink}" target="_blanlk" style="text-decoration:underline; color:#ffffff !important; white-space: nowrap;">Click here</a>.
                                                        <br />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="15" style="margin:0px; padding:0px; font-size:0px;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="40"></td>
                    </tr>
                    <tr>
                        <td height="50"></td>
                    </tr>


                    <!-- end pre-header -->

                    <!-- body block -->

                    <tr>
                        <td height="10"></td>
                    </tr>


                    <tr>
                        <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="emailwrapto100pc" width="600" bgcolor="ffffff" style="padding: 40px 20px; box-shadow:0 3px 12px 0 rgba(103, 103, 103, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12); border-radius: 15px;">
                                <tr>
                                    <td height="5"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="emailwrapto100pc" width="600">
                                            <tr>
                                                <td width="30"></td>
                                                <td align="center">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="emailwrapto100pc" width="540">

                                                        <!-- wrap in another table for side by side image -->
                                                        <tr>
                                                            <td align="center" width="540" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; text-align: left; font-weight: 600; color: #221A51; letter-spacing: 0px; line-height: 24px;">
                                                             ${firstName+' '+lastName}!, Your account has been approved!.
                                                            </td>                                                                
                                                        </tr>
                                                        <tr>
                                                            <td height="15"></td>
                                                        </tr>                                                            
                                                        <!-- wrap end -->
                                                        <tr>        
                                                            <td height="30"></td>
                                                        </tr>
                                                            </table>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width="30"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>                                        
                </table>
            </td>
        </tr>
    </table>
    <div class="gmailfix" style="white-space:nowrap; font:15px courier; line-height:0; color:#ffffff; background-color:#ffffff;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>

</body>

</html>
`
// setup email data with unicode symbols
let mailOptions = {
    from: senderSupport, // sender address
    to: email, // list of receivers
    subject: senderTitle, // Subject line
    html: output // html body
};
await transporter.sendMail(mailOptions, (err,info) => {
        console.log(err)
        if (err) {
                
            return err
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg: 'Email has been sent'});
    })
};
