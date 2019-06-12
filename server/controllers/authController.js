const users = require('../models/users')

id = 1

module.exports = {
    login: (req, res) => {
        let {username, password } = req.body
        let {session} = req
        let user = users.filter( indUser => {
            return (indUser.username === username && indUser.password === password)
        })
        console.log(1111111,user)
        if (user[0]) {
            session.user.username = user.username
            res.status(200).send(session.user)
        }
        else {
            res.status(500).send('Unauthorized')
        }
    },
    register: (req, res) => {
        let {username, password} = req.body
        let {session} = req
        users.push( {
            id: id++,
            username,
            password
        })

        session.user.username = username

        console.log(222222, session.user)
        console.log(users)

        res.status(200).send(session.user)
    },
    signout: (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },

    getUser: (req, res) => res.status(200).send(req.session.user)
}