const logHelper = require("../common/log.js");
const mysql = require("mysql");
const util = require('util');
var con = mysql.createPool({
    // host: "10.113.98.238",
    // port: 3306,
    // user: "root",
    // password: "Hy$2020",
    // database: "linebalancing"

    host: "10.113.99.3",
    port: 3306,
    user: "root",
    password: "123456",
    database: "linebalancing"
});
con.getConnection(function (err) {
    if (err)
        logHelper.writeLog("con.connect", err);
});

// node native promisify
const query = util.promisify(con.query).bind(con);
class Database {

    async excuteQueryAsync(queryString) {
        try {
            var result = await query(queryString);
            return result;
        }
        catch (error) {
            logHelper.writeLog("excuteQueryAsync", error);
            return null;
        }
    }

    async excuteSPAsync(queryString) {
        try {
            var result = await query(queryString);
            return result;
        }
        catch (error) {
            logHelper.writeLog("excuteSPAsync", error);
            return null;
        }
    }

    async excuteNonQueryAsync(queryString) {
        try {
            var result = await query(queryString);
            return result.affectedRows;
        }
        catch (error) {
            logHelper.writeLog("excuteNonQueryAsync", error);
            return null;
        }
    }

    async excuteInsertReturnIdAsync(queryString) {
        try {
            var result = await query(queryString);
            return result.insertId;
        }
        catch (error) {
            logHelper.writeLog("excuteInsertReturnIdAsync", error);
            return 0;
        }
    }

    async excuteInsertWithParametersAsync(queryString, parameters) {
        try {
            var result = await query(queryString, [parameters]);
            return result.affectedRows;
        }
        catch (error) {
            logHelper.writeLog("excuteInsertReturnIdAsync", error);
            return 0;
        }
    }

    excuteQuery(queryString, callback) {
        try {
            con.query(queryString, function (err, result, fields) {
                if (err) {
                    callback({ rs: false, msg: err });
                }
                else {
                    callback({ rs: true, msg: "", data: result });
                }
            })
        }
        catch (error) {
            logHelper.writeLog("excuteQuery", error);
            return null;
        }
    }

    excuteSP(queryString, callback) {
        try {
            con.query(queryString, function (err, result, fields) {
                if (err) {
                    callback({ rs: false, msg: err });
                }
                else {
                    callback({ rs: true, msg: "", data: result[0] });
                }
            })
        }
        catch (error) {
            logHelper.writeLog("excuteSP", error);
            return null;
        }
    }
}

module.exports = Database;