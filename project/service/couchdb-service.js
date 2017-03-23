couchdb.service("couchdbService", ['$http', '$q', function($http, $q) {
    this.rootPath = "http://localhost:5984/form";
    // this.rootPath = "https://huytuanzz.cloudant.com/form/";


    this.getById = function(docId) {
        var deferred = $q.defer();
        var url = this.rootPath + "/" + docId;
        $http.get(url).success(function(doc) {
            return deferred.resolve(doc);
        });
        return deferred.promise;
    }

    this.getAllDocs = function() {
        var self = this;
        var deferred = $q.defer();
        var url = this.rootPath + "/_all_docs";
        self.allDocs = [];
        $http.get(url).success(function(response) {
            var rows = response.rows;
            var resolve = false;
            angular.forEach(rows, function(item, index) {
                // console.log(rows)
                self.getById(item.id).then(function(doc) {
                    self.allDocs.push(doc);
                    if (rows.length - 1 == index) {
                        return deferred.resolve(self.allDocs);
                    }
                });
            });
        });
        return deferred.promise;
    };

    this.save = function(doc) {
        var deferred = $q.defer();
        var url = this.rootPath;
        $http.post(url, doc).success(function(response) {
            return deferred.resolve(response.ok);
        });
        return deferred.promise;
    }
}]);