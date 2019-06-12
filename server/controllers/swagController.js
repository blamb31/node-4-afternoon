const swag = require('../../server/models/swag')

module.exports = {
    read: (req, res) => {
        res.status(200).send(swag)
    }

}