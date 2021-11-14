const mysql = require('mysql');
const util = require('util');
const config = require('./config.js');
var dbpool = mysql.createPool(config);
const query = util.promisify(dbpool.query).bind(dbpool);
const test = dbpool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    dbpool.query('SELECT * from store LIMIT 1', (err2, rows) => {
        connection.release();
        if (err2) throw err2;
        console.log('The data from users table are: \n', rows);
    });
});

const TableCreate = () => {
    dbpool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        dbpool.query('SELECT * from store LIMIT 1', (err2, rows) => {
            connection.release();
            if (err2) throw err2;
            console.log('The data from users table are: \n', rows);
        });
    });
}

const insertProduct = (storekind, name, date, pic, number) => {
    dbpool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `INSERT INTO product (name,storekind,pic,number,date) VALUES ('${name}','${storekind}', '${pic}', ${number},'${date}');`
        dbpool.query(sql, (err2, rows) => {
            connection.release();
            if (err2) throw err2;
            console.log('Insert: \n', rows);
        });
    });
}

const udpateProduct = (id, storekind, name, date, pic, number) => {
    dbpool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `UPDATE product SET storekind=${storekind},name=${name} ,date=${date},pic=${pic} ,number=${number} WHERE id=${id};`
        dbpool.query(sql, (err2, rows) => {
            connection.release();
            if (err2) throw err2;
            console.log('UPDate: \n', rows);
        });
    });
}

const deleteProduct = (id) => {
    dbpool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `DELETE FROM product WHERE id=${id};`
        dbpool.query(sql, (err2, rows) => {
            connection.release();
            if (err2) throw err2;
            console.log('Delete: \n', rows);
        });
    });
}

const addStore = (name, address, tel, kind, email) => {
    dbpool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `INSERT INTO store (name,address,tel,kind,email) VALUES ('${name}','${address}', '${tel}', ${kind}),${email};`
        dbpool.query(sql, (err2, rows) => {
            connection.release();
            if (err2) throw err2;
            console.log('AddStore: \n', rows);
        });
    });
}

const deleteStore = (id) => {
    dbpool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `DELETE FROM store WHERE id=${id};`
        dbpool.query(sql, (err2, rows) => {
            connection.release();
            if (err2) throw err2;
            console.log('DeleteStore: \n', rows);
        });
    });
}

const updateStore = (name, address, tel, kind, email) => {
    dbpool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `UPDATE store SET name=${name},address=${address} ,tel=${tel},kind=${kind};email=${email};`
        dbpool.query(sql, (err2, rows) => {
            connection.release();
            if (err2) throw err2;
            console.log('Update Store: \n', rows);
        });
    });
}

const addUser = (name, email, password, kind, pic = 'none') => {
    return new Promise((resolve, reject) => {
        dbpool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                const checksql = `SELECT * FROM user WHERE email='${email}' AND kind='${kind}';`
                connection.query(checksql, (err2, rows) => {
                    console.log(rows, "!!!!")
                    if (rows.length>0) {
                        resolve({
                            "error": "email has been use!"
                        })
                        connection.release() // 結束會話
                    } else {
                        const addsql = `INSERT INTO user (name,email,password,kind,pic) VALUES ('${name}','${email}', '${password}', '${kind}', '${pic}');`
                        connection.query(addsql, (err3) => {
                            if (err3) {
                                reject(err3)
                            } else {
                                // connection.commit()
                                resolve({
                                    "message": "success"
                                })
                            }
                            connection.release() // 結束會話
                        })
                    }
                })
            }
        })
    })
}

const checkUserExist = function (email, kind, password) {
    return new Promise((resolve, reject) => {
        dbpool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                let sql = `SELECT * FROM user WHERE email='${email}' AND kind='${kind}' LIMIT 1`
                // 執行 sql 腳本對資料庫進行讀寫
                connection.query(sql, (err2, rows) => {
                    if (err2) {
                        reject(err)
                    } else {
                        if(rows.length>0){
                            resolve({"message":"success"})
                        }else{
                            resolve({"error":"not exist"})
                        }            
                    }
                    connection.release() // 結束會話
                })
            }
        })
    })
}
const getProduct = (type,name)=>{
    return new Promise((resolve, reject) => {
        var data=null
        dbpool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                let sql = `SELECT * FROM product WHERE ${type}='${name.trim()}' `
                // 執行 sql 腳本對資料庫進行讀寫
                console.log(sql)
                connection.query(sql, (err2, rows) => {
                    if (err2) {
                        reject(err)
                    } else {
                        if(rows.length>0){
                            data=rows
                            resolve(data)
                        }else{
                            resolve({"error":"not exist"})
                        }            
                    }
                    connection.release() // 結束會話
                })
            }
        })
    })
}
const getStore = (kind)=>{
    return new Promise((resolve, reject) => {
        dbpool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                let sql = `SELECT * FROM store WHERE kind='${kind.trim()}' `
                // 執行 sql 腳本對資料庫進行讀寫
                console.log(sql)
                connection.query(sql, (err2, rows) => {
                    if (err2) {
                        reject(err)
                    } else {
                        if(rows.length>0){
                            resolve(rows)
                        }else{
                            resolve({"error":"not exist"})
                        }            
                    }
                    connection.release() // 結束會話
                })
            }
        })
    })
}

const getSearch = (name)=>{
    return new Promise((resolve, reject) => {
        dbpool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                const sql =name=="kind"?`SELECT DISTINCT kind FROM store`:`SELECT DISTINCT address,name,kind FROM store`
                connection.query(sql, (err2, rows) => {
                    if (err2) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release() // 結束會話
                })
            }
        })
    })
}
module.exports = {
    udpateProduct,
    deleteProduct,
    insertProduct,
    addStore,
    deleteStore,
    updateStore,
    addUser,
    checkUserExist,
    getProduct,
    getStore,
    getSearch,
    test
};