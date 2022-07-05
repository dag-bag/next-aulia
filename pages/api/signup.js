// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

require("dotenv").config();
var jwt = require("jsonwebtoken");
import { setCookies } from "cookies-next";
const handler = async (req, res) => {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    // if (user) {
    //   console.log("Exist");
    //   return res
    //     .status(400)
    //     .json({ msg: "This user is already exist", success: false });
    // }
    const { name, email } = req.body;

    let salt = bcrypt.genSaltSync(10);

    const secPassword = bcrypt.hashSync(req.body.password, salt);

    let newUser = await new User({ name, email, password: secPassword });

    let savedUser = await newUser.save();

    // let Euser = await User.findOne({ email: newUser. });
    const userID = {
      id: savedUser._id,
    };

    // console.log(Euser);
    var token = jwt.sign(userID, process.env.SECRET);

    setCookies("auth_token", token, { req, res });
    // Send mail for sign up

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testpubg3424342@gmail.com",
        pass: "wkpabegppqzvlmbg",
      },
    });

    var mailOptions = {
      from: "virenderkumar23435@gmail.com",
      to: email,
      subject: "Please verify the email",
      html: `<!doctype html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <title>
          </title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a{padding: 0;}
                  .ReadMsgBody{width: 100%;}
                  .ExternalClass{width: 100%;}
                  .ExternalClass *{line-height: 100%;}
                  body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
                  table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
                  img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
                  p{display: block; margin: 13px 0;}
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
            @media only screen and (max-width:480px) {
                        @-ms-viewport {width: 320px;}
                        @viewport {	width: 320px; }
                    }
          </style>
          <!--<![endif]-->
          <!--[if mso]> 
          <xml> 
            <o:OfficeDocumentSettings> 
              <o:AllowPNG/> 
              <o:PixelsPerInch>96</o:PixelsPerInch> 
            </o:OfficeDocumentSettings> 
          </xml>
          <![endif]-->
          <!--[if lte mso 11]> 
          <style type="text/css"> 
            .outlook-group-fix{width:100% !important;}
          </style>
          <![endif]-->
          <style type="text/css">
            @media only screen and (max-width:480px) {
            
                    table.full-width-mobile { width: 100% !important; }
                    td.full-width-mobile { width: auto !important; }
            
            }
            @media only screen and (min-width:480px) {
            .dys-column-per-90 {
              width: 90% !important;
              max-width: 90%;
            }
            }
          </style>
        </head>
        <body>
          <div>
            <!--
      >>>>>>>>> CHANGING PROGRESS STEP IMAGES <<<<<<<<<<<<<<<
      
      Pink Step One  - https://assets.opensourceemails.com/imgs/oxygen/iRYXoEbnSQAMzQYRy6hG_v33_03.jpg
      White Step One - https://assets.opensourceemails.com/imgs/oxygen/0oYLLViRBKv7a0Lzh6vC_v3_03.jpg
      
      
      Pink Step Two  - https://assets.opensourceemails.com/imgs/oxygen/YL3H3V5bRyGuy6pess9T_v33_04.jpg
      White Step Two - https://assets.opensourceemails.com/imgs/oxygen/piymv8dOQmuAc8nxb4Or_v3_04.jpg
      
      
      Pink Step Three  - https://assets.opensourceemails.com/imgs/oxygen/caYiXZF9TBS23k4EPXIN_v33_05.jpg
      White Step Three - https://assets.opensourceemails.com/imgs/oxygen/YSTlgtgaTSa897tPTUhl_v3_05.jpg
      -->
            <!-- Progress Modal Start -->
            <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#f7f7f7;background-color:#f7f7f7;width:100%;'>
              <tbody>
                <tr>
                  <td>
                    <div style='margin:0px auto;max-width:600px;'>
                      <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                        <tbody>
                          <tr>
                            <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
                              <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:540px;">
      <![endif]-->
                              <div class='dys-column-per-90 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                                <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                                  <tbody>
                                    <tr>
                                      <td style='background-color:#ffffff;border:1px solid #ccc;padding:75px 0px;vertical-align:top;'>
                                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                                          <tr>
                                            <td align='center' style='font-size:0px;padding:0px 0px 20px 0px;word-break:break-word;'>
                                              <table border='0' cellpadding='0' cellspacing='0' style='cellpadding:0;cellspacing:0;color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:300px;' width='300'>
                                                <tbody>
                                                  <tr>
                                                    <!-- STEP ONE -->
                                                    <td width='33%'>
                                                      <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                                                        <tbody>
                                                          <tr>
                                                            <td style='width:100px;'>
                                                              <img alt='step 1' height='auto' src='https://assets.opensourceemails.com/imgs/oxygen/0oYLLViRBKv7a0Lzh6vC_v3_03.jpg' style='border:none;display:block;font-size:13px;height:auto;outline:none;text-decoration:none;width:100%;' width='100' />
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <p style='text-align:center; font-size: 14px; color: #777777; text-align: center; line-height: 21px;'>
                                                        Create Account
                                                      </p>
                                                    </td>
                                                    <!-- STEP TWO -->
                                                    <td width='33%'>
                                                      <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                                                        <tbody>
                                                          <tr>
                                                            <td style='width:100px;'>
                                                              <img alt='step 2 highlighted' height='auto' src='https://assets.opensourceemails.com/imgs/oxygen/YL3H3V5bRyGuy6pess9T_v33_04.jpg' style='border:none;display:block;font-size:13px;height:auto;outline:none;text-decoration:none;width:100%;' width='100' />
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <p style='text-align:center; font-size: 14px; color: #777777; text-align: center; line-height: 21px;'>
                                                        Update Info
                                                      </p>
                                                    </td>
                                                    <!-- STEP THREE -->
                                                    <td width='33%'>
                                                      <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                                                        <tbody>
                                                          <tr>
                                                            <td style='width:100px;'>
                                                              <img alt='step 3' height='auto' src='https://assets.opensourceemails.com/imgs/oxygen/YSTlgtgaTSa897tPTUhl_v3_05.jpg' style='border:none;display:block;font-size:13px;height:auto;outline:none;text-decoration:none;width:100%;' width='100' />
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <p style='text-align:center; font-size: 14px; color: #777777; text-align: center; line-height: 21px;'>
                                                        Complete
                                                      </p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;' vertical-align='middle'>
                                              <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:separate;line-height:100%;'>
                                                <tr>
                                                  <td align='center' bgcolor='#ff6f6f' role='presentation' style='background-color:#ff6f6f;border:none;border-radius:5px;cursor:auto;padding:10px 25px;' valign='middle'>
                                                    <a href='http://localhost:3000/verification/${userID.id}' style='background:#ff6f6f;color:#ffffff;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;font-weight:400;line-height:21px;margin:0;text-decoration:none;text-transform:none;' target='_blank'>
                                                      Verify Here
                                                    </a>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Progress Modal End -->
          </div>
        </body>
      </html>`,
      // `${name} please verify the email link <a href="http://localhost:3000/verification/${userID.id}">Verify here<a>.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(200).json({
      success: true,
      msg: "User is created successfully",
      token,
      name: savedUser.name,
    });
  } else {
    return res
      .status(400)
      .json({ msg: "This method is not allowed", success: false });
  }
};
export default connectDb(handler);
