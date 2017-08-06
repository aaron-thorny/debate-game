let expect = require('chai').expect

let db = require('../DB/sequel')
let _ = require('lodash')

let marketingLvls = require('../DB/marketlvl')

let qualityLvls = require('../DB/qualitylvl')

let university = require('../DB/db')

let login = require('../DB/login')

let loan = require('../DB/loan')

describe('database', () => {
    it('authenticates', () => {
        return db.test().then(res => {
            console.log(res)
            return res
        })
    }).timeout(5000)

    it('makes the db', () => {
        return db.init(true).then(thing => {
            console.log(thing.get())
            return thing
        })
    }).timeout(5000)

    let game = {}


    it('makes the market levels', () => {
        let promises = []
        _.forEach(marketingLvls, (lvl) => {
            let m = db.marketing.create({
                name: lvl.name,
                price: lvl.price,
                revenue: lvl.revenue,
                level: lvl.level
            })
            promises.push(m)
        })
        return Promise.all(promises).then(results => {
            expect(results).to.be.an('array')
            results.forEach(function(result) {
                console.log(result.get())
            }, this);
        })
    }).timeout(5000)

    it('makes the quality levels', () => {
        let promises = []
        _.forEach(qualityLvls, (lvl) => {
            let m = db.quality.create({
                name: lvl.name,
                price: lvl.price,
                marketlvls: lvl.marketlvls,
                level: lvl.level
            })
            promises.push(m)
        })
        return Promise.all(promises).then(results => {
            expect(results).to.be.an('array')
            results.forEach(function(result) {
                console.log(result.get())
            }, this);
        })
    }).timeout(5000)

    it('makes the universities', () => {
        let promises = []
        _.forEach(university, (Univ) => {
            let m = db.university.create({
                name: Univ.name,
                marketlvl: Univ.marketlvl,
                qualitylvl: Univ.qualitylvl,
                totalmoney: Univ.totalmoney,
                netrevenue: Univ.netrevenue,
                debtamount: Univ.debtamount,
                interest: Univ.interest,
                bribeamount: Univ.bribeamount
            })
            promises.push(m)
        })
        return Promise.all(promises).then(results => {
            expect(results).to.be.an('array')
            console.log(results)
            results.forEach(function(result) {
                console.log(result.get())
            }, this);
        })
    }).timeout(5000)

    it('makes the login', () => {
        let promises = []
        _.forEach(login, (lvl) => {
            let m = db.login.create({
                username: lvl.username,
                password: lvl.password,
                role: lvl.role,
            })
            promises.push(m)
        })
        return Promise.all(promises).then(results => {
            expect(results).to.be.an('array')
            results.forEach(function(result) {
                console.log(result.get())
            }, this);
        })
    }).timeout(5000)

    it('makes the loans', () => {
        let promises = []
        _.forEach(loan, (lvl) => {
            let m = db.loan.create({
                amount: lvl.amount,
                interest: lvl.interest,
            })
            // .then(l => {
            //     l.setGame()
            // })
            promises.push(m)
        })
        return Promise.all(promises).then(results => {
            expect(results).to.be.an('array')
            results.forEach(function(result) {
                console.log(result.get())
            }, this);
        })
    }).timeout(5000)
})