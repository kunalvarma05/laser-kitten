var loki = require('lokijs');
var path = require('path');
var fs = window.require('fs');
var remote = window.require('remote');
var app = remote.require('app');

/* LOKI FILESYSTEM ADAPTER */
function FileSystemAdapter(options) {
    this.options = options;
}

FileSystemAdapter.prototype.loadDatabase = function(name, callback) {
    var filePath = path.join(app.getAppPath(), name);
    fs.readFile(filePath, 'utf8', function read(err, data) {
        if (err) {
            console.log('[DB ERROR]');
            console.log(err);
            return callback(err);
        }

        callback(data);
    });
};

FileSystemAdapter.prototype.saveDatabase = function(name, data, callback) {
    var filePath = path.join(app.getAppPath(), name);
    fs.writeFile(filePath, data, function(err) {
        if (err) {
            console.log('[ERROR]');
            console.log(err);
            return callback(err);
        }

        callback(null);
    });
};
/* LOKI FILESYSTEM ADAPTER */


var fsAdapter = new FileSystemAdapter();

function Cache() {
    this.db = new loki('test.db', {
        adapter: fsAdapter
    });
    this.collection = null;
    this.loaded = false;

    return this;
}

Cache.prototype.init = function() {

    var d = Promise.defer();

    this.reload()
        .then(function() {
            this.collection = this.db.getCollection('posts');
            d.resolve(this);
        }.bind(this))
        .catch(function(err) {
            console.log('[ERROR] ' + err);
            // create collection
            this.db.addCollection('posts');
            // save and create file
            this.db.saveDatabase();

            this.collection = this.db.getCollection('posts');
            this.loaded = true;

            d.resolve(this);
        }.bind(this));

    return d.promise;
};

Cache.prototype.reload = function() {
    var d = Promise.defer();

    this.loaded = false;

    this.db.loadDatabase({}, function(err) {
        if (err) {
            d.reject(err);
        } else {
            this.loaded = true;
            d.resolve(this);
        }
    }.bind(this));

    return d.promise;
}


Cache.prototype.isLoaded = function() {
    return this.loaded;
};

Cache.prototype.getCollection = function() {
    var d = Promise.defer();
    this.collection = this.db.getCollection('posts');
    d.resolve(this.collections);
    return d.promise;
};

Cache.prototype.addDoc = function(data) {
    var d = Promise.defer();

    if (this.isLoaded() && this.getCollection()) {
        this.getCollection().insert(data);
        this.db.saveDatabase();

        d.resolve(this.getCollection());
    } else {
        d.reject(new Error('DB NOT READY'));
    }

    return d.promise;
};

Cache.prototype.removeDoc = function(doc) {
    var d = Promise.defer();

    if (this.isLoaded() && this.getCollection()) {
        this.getCollection().remove(doc);
        this.db.saveDatabase();
        d.resolve(true);
    } else {
        d.reject(new Error('DB NOT READY'));
    }

    return d.promise;
};

Cache.prototype.getDocs = function() {
    return (this.getCollection()) ? this.getCollection().data : null;
};