const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        const {category} = req.query

        if(!category) {
            res.status(200).send(swag)
        }
        else {
            const searchedSwag = swag.filter( item => {
                return item.category === category
            })
            res.status(200).send(searchedSwag)
        }
    }
}