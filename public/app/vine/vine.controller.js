'use strict';

class VineController {
    constructor(VineService, $http) {
        this.vineService = VineService;
        this.http = $http;
        this.init();
    }

    init(){
        this.vineService.getVines().then(items => {
            this.items = items;
        });
    }

    scroll() {
    }

    getUrl(tags) {
        return `http://api.flickr.com/services/feeds/photos_public.gne?tags=${tags}&tagmode=any&format=json&jsoncallback=JSON_CALLBACK`;
    }

    addMe() {
        var topic = prompt('Choose a topic');
        var url = this.getUrl(topic);
        this.http.jsonp(url).success(response => {
            var index = Math.floor(Math.random() * response.items.length);
            var item = response.items[index];
            this.vineService.saveVine({
                name: item.title,
                description: topic,
                image: item.media.m,
                price: 1
            }).then(item => {
                console.log("saved: ", item)
            })
            this.items.push({
                name: item.title,
                image: item.media.m,
                comments: []
            })
        })
    }
    comment(item) {
        item.comments.push({
            message: item.message
        })
        item.message = null;
    }
}

VineController.$inject = ['VineService', '$http'];

export { VineController }
