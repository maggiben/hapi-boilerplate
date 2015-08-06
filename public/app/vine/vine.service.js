'use strict';

import angular from 'angular';

class VineService {

    constructor($http){
        this.$http = $http;
    }

    getVines(){
        return this.$http.get('http://localhost:3000/store').then(r => r.data);
    }

    saveVine(item) {
        return this.$http.post('http://localhost:3000/store', {
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price
        });
    }

    static factory($http){
        return new VineService($http);
    }
};

VineService.factory.$inject = ['$http'];

export { VineService }
