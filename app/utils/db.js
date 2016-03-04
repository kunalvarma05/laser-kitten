var path = require('path');
var loki = require('lokijs');
var remote = window.require('remote');
var app = remote.require('app');

function Database() {
    var dbpath = path.join(app.getAppPath(), 'loki.json');
    console.log('db path '+dbpath)
    this._db = new loki('Example');
    this.init();
}

Database.prototype.init = function() {
    var db = this._db;
    if (db.collections.length == 0) {
        db.addCollection('settings');
        db.addCollection('posts');
        db.addCollection('auth');
    }
}


Database.prototype.getDb = function() {
    return this._db;
}

Database.prototype.getCollection = function(collectionName) {
    return this._db.getCollection(collectionName);
}

Database.prototype.getOrCreate = function(collectionName, obj) {
    var collection = this.getCollection(collectionName)
    var record = collection.findOne({key: obj.key});
    if(!record) {
        record = collection.insert(obj);
    }
    this._db.saveDatabase();
    return record;
}

Database.prototype.update = function(collectionName, obj) {
    var collection = this.getCollection(collectionName);
    var updatedObj = collection.update(obj);
    this._db.saveDatabase();
    return updatedObj;
}

module.exports = new Database();
