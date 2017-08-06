let Sequelize = require('sequelize')


let db = new Sequelize('debate-game', 'aaron', 'Debate1914', {
    host: 'debate-game.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        encrypt: true
    }
})

module.exports = new class DB {
    constructor() {
        this.marketing = db.define('marketing', {
            name: {
                type: Sequelize.STRING
            },
            level: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            revenue: {
                type: Sequelize.INTEGER
            }
        })

        this.quality = db.define('quality', {
            name: {
                type: Sequelize.STRING
            },
            level: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.INTEGER
            },
            marketlvls: {
                type: Sequelize.STRING
            }
        })

        this.loan = db.define('loan', {
            amount: {
                type: Sequelize.INTEGER
            },
            interest: {
                type: Sequelize.INTEGER
            }
        })

        this.login = db.define('login', {
            username:{
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            }
        })

        this.game = db.define('game',{
            round: {
                type: Sequelize.INTEGER
            },
            university: {
                type: Sequelize.STRING
            }
        })

        this.university = db.define('university', {
            name: {
                type: Sequelize.STRING
            },
            marketlvl: {
                type: Sequelize.INTEGER
            },
            qualitylvl: {
                type: Sequelize.INTEGER
            },
            totalmoney: {
                type: Sequelize.INTEGER
            },
            netrevenue: {
                type: Sequelize.INTEGER
            },
            debtamount: {
                type: Sequelize.INTEGER
            },
            interest: {
                type: Sequelize.INTEGER
            },
            bribeamount: {
                type: Sequelize.INTEGER
            }
        })
        this.university.hasOne(this.marketing)
        // this.marketing.belongsTo(this.university)
        this.university.hasOne(this.quality)
        this.game.hasOne(this.loan)
        this.game.hasMany(this.university)
    }

    test() {
        return db.authenticate().then(() => {
            return "Connected"
        })
    }

    init(force) {
        return db.sync({force}).then(() => {
            return this.university.create({
                name: "idk"
            }).then(university => {
                console.log(university)
                return university
            })
        })
    }
}