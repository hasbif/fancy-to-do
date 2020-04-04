const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLECLIENTID);
const { User } = require('../models')
const jwt = require('jsonwebtoken')

class Google {

    static signin(req, res, next) {
        const token = req.body.token
        const user = {}
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLECLIENTID
        })
            .then(data => {
                const payload = data.getPayload();
                user.email = payload.email
                user.username = payload.name
                user.password = '12345'
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })

            })
            .then(userdata => {
                if (userdata) {
                    return userdata
                } else {
                    return User.create(user)
                }
            })
            .then(loguser => {
                console.log(loguser.id)
                const userObj = {
                    userId: loguser.id,
                    userEmail: loguser.email
                }
                res.status(200).json({
                    access_token: jwt.sign(userObj, process.env.SECRET)
                })

            })
            .catch(err => {
                res.status(500).text({ msg: 'Internal Server Error', err })
                console.log(err)
            })
    }
}

module.exports = Google




// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   //const domain = payload['hd'];
// }
// verify().catch(console.error);