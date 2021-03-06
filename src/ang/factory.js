angular.module("main.service",[])
    .factory("dataFactory", function ($http,$q) {
        var property = false;
        var articles = {};
	
        return {
            getSymbols: function (creds) {
				var deferred = $q.defer();
				$http({method:'GET',
				       url:'/data/symbols',
				       cache:true
				       })
				.then(function(data){
					deferred.resolve(data);			
		            	},function(){
				deferred.reject('Gene List Not Found');
			   	 });

		            return deferred.promise;
		        },
	     getGene: function (src){
				var deferred = $q.defer();
				$http({method:'POST',
					url:'/data/symbol',
					params:{"gene":src},
					cache:true
					})
				.then(function(data){
					deferred.resolve(data);
		
				},function(){
				  deferred.reject('Gene Not Found');
				});
				return deferred.promise;
			
	  		},
		getArticles: function(cancers){
			cancers = JSON.stringify(cancers);
			var deferred= $q.defer();
			$http({method:'POST',
			url:'/data/articles/',
			params: {"all":cancers},
			cache:true,
			})
			.then(function(data){
				deferred.resolve(data);
				articles = data;
	
			},function(){
				deferred.reject("Article Fetch Error");

			});
			return deferred.promise;
		 },
		 getTotals: function(){
			var deferred= $q.defer();
			$http({method:'GET',
			url:'/data/totals/',
			cache:true,
			})
			.then(function(data){
				deferred.resolve(data);
				articles = data;
	
			},function(){
				deferred.reject("Article Fetch Error");

			});
			return deferred.promise;
		 }
	}	
});
