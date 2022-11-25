export default class AppComponent {
    constructor($log, $http) {
        this.$log = $log;
        this.$http = $http;
        this.location = '';
        this.isCelsius = true;
        this.isLoading = false;
        this.isLoaded = false;
        this.weatherData = {};
        this.isError = false;
        this.countries = [];
        this.init($http);
    }

    init() {
        const vm = this;
        this.$http.get("https://countriesnow.space/api/v0.1/countries").then(function(response) {
                vm.countries = response.data.data.map((d) => d.country)
                console.log(vm.countries)
        })  
        // const vm = this;
        // vm.isLoading = true;
        // navigator.geolocation.getCurrentPosition(function (position) {
        //     var lat = position.coords.latitude;
        //     var lon = position.coords.longitude;
        //     vm.$http.jsonp("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=5&APPID=a8f5261ee6863849df5a45497bb27163&callback=JSON_CALLBACK")
        //         .then(function (data) {
        //             vm.isError = false;
        //             vm.weatherData = data.data;
        //             vm.isLoading = false;
        //         })
        //         .catch(function() {
        //             vm.isError = true;
        //             vm.isLoading = false;
        //         });
        // });
    }

    refresh() {
        const vm = this;
        vm.isLoading = true;
        if (vm.location != '') {
            vm.$http.get("https://api.openweathermap.org/data/2.5/weather?q=" + this.location + "&APPID=794ee95e63c5a32aaf88cd813fa2e425").
            then(function (data) {
                vm.isError = false;
                vm.isLoaded = true;
                vm.weatherData = data.data;
                vm.isLoading = false;
            })
            .catch(function() {
                vm.isLoaded = false;
                vm.isError = true;
                vm.isLoading = false;
            });
        } else {
            vm.init();
        }
    }
		
    setDisplayFormat(isCelsius) {
        this.isCelsius = isCelsius;
    }



}
