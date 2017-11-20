(function () {
    document.getElementById('colourPick').addEventListener('change', function () {

        // document.styleSheets[15].insertRule(`.rebranded-header { background: ${this.value} !important;}`, 0);
        document.styleSheets[15].cssRules["0"].cssText = `.rebranded-header { background: ${this.value} !important;}`
    });

    angular.module('app', ['ngRoute', 'ngResource', 'ngAside', 'ui.bootstrap', 'chart.js', 'gridster', 'googlechart', 'adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.queue-widget'])
        .service('service', ['$http', '$rootScope', function($http, $rootScope){
            var that = this;
            this.city = 'London';
            that.getWeatherData = function(){
                console.log('data got')
                var apiKey = 'apikey=6bd81b03a64f7ae2cb9240d3271279aa';
                var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&${apiKey}&units=metric`;
                $http.get(apiUrl)
                    .then(function(response){
                        var data = response.data;
                        that.temp = data.main.temp;
                        that.humidity = data.main.humidity;
                });
            }
            that.getWeatherData();

            this.width;
            this.height;
        }])
        .config(function ($routeProvider, dashboardProvider) {
            $routeProvider
                .when("/dashboard", {
                    templateUrl: "views/dashboard.html",
                    controller: "dashboard"
                })
                .when("/dash_framework", {
                    templateUrl: "views/dashboard_framework.html",
                    controller: "dashboard_framework"
                })
                .when("/layout", {
                    templateUrl: 'views/layout.html'
                })
                .when("/layout02", {
                    templateUrl: 'views/layout02.html'
                });
            dashboardProvider
                .structure('6-6', {
                    rows: [{
                        columns: [{
                            styleClass: 'col-md-4'
                        }, {
                            styleClass: 'col-md-6'
                        }, {
                            styleClass: 'col-md-2'
                        }]
                    }]
                });
        })
        .controller("LineCtrl", function ($scope) {

            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };
        })
        .controller("MixedChartCtrl",
            function ($scope) {
                $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

                $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.data = [
                    [65, -59, 80, 81, -56, 55, -40],
                    [28, 48, -40, 19, 86, 27, 90]
                ];
                $scope.datasetOverride = [
                    {
                        label: "Bar chart",
                        borderWidth: 1,
                        type: 'bar'
                    },
                    {
                        label: "Line chart",
                        borderWidth: 3,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        type: 'line'
                    }
                ];
            })
        .controller("weeklyChartCtrl",
            function ($scope) {
                $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

                $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.data = [
                    [65, -59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
                $scope.datasetOverride = [
                    {
                        label: "Bar chart",
                        borderWidth: 1,
                        type: 'bar'
                    },
                    {
                        label: "Line chart",
                        borderWidth: 3,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        type: 'line'
                    }
                ];
            })
        .controller("monthlyChartCtrl",
            function ($scope) {
                $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

                $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40, 32, 45, 24, 65, 64],
                    [65, 59, 80, 81, 56, 55, 40, 32, 45, 24, 65, 64]
                ];
                $scope.datasetOverride = [
                    {
                        label: "Bar chart",
                        borderWidth: 1,
                        type: 'bar'
                    },
                    {
                        label: "Line chart",
                        borderWidth: 3,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        type: 'line'
                    }
                ];
            })

        .controller("DoughnutCtrl", function ($scope) {
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100, 450];
        })
        .controller('modalController', ['$scope', '$uibModal', '$uibModalInstance', 'service', function ($scope, $uibModal, $uibModalInstance, service) {
            $scope.service = service;

            $scope.service.city;

            $scope.ok = function () {
                $uibModalInstance.close();
                $scope.service.getWeatherData()
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };

        }])

        .controller("googleGeoChart", function ($scope) {

            var chart1 = {};
            chart1.type = "GeoChart";
            chart1.data = [
                ['Locale', 'Count', 'Percent'],
                ['GB', 22, 23],
                ['Ireland', 57, 32]
            ];

            chart1.options = {
                width: function(){return document.getElementById('gaugePanel').offsetWidth},
                height: 300,
                region: 'GB',
                chartArea: {left: 10, top: 10, bottom: 0, height: "100%"},
                colorAxis: {colors: ['#aec7e8', '#1f77b4']},
                displayMode: 'regions'
            };

            chart1.formatters = {
                number: [{
                    columnNum: 1,
                    pattern: "$ #,##0.00"
                }]
            };

            $scope.chart = chart1;
        })
        .controller('dashboard', ['$scope', '$rootScope', '$uibModal', '$aside', 'service', function ($scope, $rootScope, $uibModal, $aside, service) {
            $scope.service = service;

            $scope.test = 'My test';

            $scope.gaugeObject = {};
            $scope.gaugeObject.type = "Gauge";
            $scope.gaugeObject.options = {
                width: 100,
                height: 100,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5
            };

            $scope.gaugeObject.data = [
                ['Label', 'Value'],
                ['Tempreture', $scope.service.temp]
            ];

            $scope.openAside = function(){
                var asideInstance = $aside.open({
                    templateUrl: 'views/modals/settingsModal.html',
                    controller: 'modalController',
                    placement: 'left',
                    size: 'sm'
                });
            };


            $scope.standardItems = [
                {
                    sizeX: 3, sizeY: 8, row: 3, col: 12, callVolume: [
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845788927, calls: 237},
                        {number: 0845898989, calls: 657},
                        {number: 0845898989, calls: 657},
                    ]
                }
            ];
            $scope.calls = [
                {sizeX: 4, sizeY: 3, row: 0, col: 0}
            ];
            $scope.queues = [
                {sizeX: 4, sizeY: 3, row: 0, col: 4}
            ];
            $scope.minuets = [
                {sizeX: 4, sizeY: 3, row: 0, col: 8}
            ];
            $scope.lineChart = [
                {sizeX: 7, sizeY: 3, row: 10, col: 2}
            ];
            $scope.barChart = [
                {sizeX: 7, sizeY: 5, row: 3, col: 2}
            ];
            $scope.googleGauge = [
                {sizeX: 2, sizeY: 3, row: 3, col: 0},
                {sizeX: 2, sizeY: 3, row: 6, col: 0},
                {sizeX: 2, sizeY: 3, row: 9, col: 0}
            ];
            $scope.gridsterOpts = {
                columns: 12, // the width of the grid, in columns
                pushing: true, // whether to push other items out of the way on move or resize
                floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
                swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
                width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
                colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
                rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
                margins: [15, 15], // the pixel distance between each widget
                outerMargin: true, // whether margins apply to outer edges of the grid
                sparse: false, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
                isMobile: false, // stacks the grid items if true
                mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
                mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
                minColumns: 1, // the minimum columns the grid must have
                minRows: 2, // the minimum height of the grid, in rows
                maxRows: 100,
                defaultSizeX: 2, // the default width of a gridster item, if not specifed
                defaultSizeY: 1, // the default height of a gridster item, if not specified
                minSizeX: 1, // minimum column width of an item
                maxSizeX: null, // maximum column width of an item
                minSizeY: 1, // minumum row height of an item
                maxSizeY: null, // maximum row height of an item
                resizable: {
                    enabled: true,
                    handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                    start: function (event, $element, widget) {
                    }, // optional callback fired when resize is started,
                    resize: function (event, $element, widget) {
                        if(widget) {
                            $scope.service.width = document.getElementById('gaugePanel').offsetWidth - 45;
                            $scope.service.height = document.getElementById('gaugePanel').offsetHeight - 45;
                        } else{
                            return;
                        }

                    }, // optional callback fired when item is resized,
                    stop: function (event, $element, widget) {
                    } // optional callback fired when item is finished resizing
                },
                draggable: {
                    enabled: true, // whether dragging items is supported
                    // handle: '.my-class', // optional selector for drag handle
                    start: function (event, $element, widget) {
                    }, // optional callback fired when drag is started,
                    drag: function (event, $element, widget) {
                    }, // optional callback fired when item is moved,
                    stop: function (event, $element, widget) {
                    } // optional callback fired when item is finished dragging
                }
            };
        }])
        .controller("dashboard_framework", function ($scope) {
        })
        .controller('sb-admin', function ($scope) {

        })
        .controller('settingsController', ['$scope', '$uibModal', function($scope, $uibModal){

        }])
        .controller("GaugeChartCtrl01", function($scope) {

            $scope.myChartObject = {};
            $scope.myChartObject.type = "Gauge";

            $scope.myChartObject.options = {
                width: 200,
                height: 120,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5
            };

            $scope.myChartObject.data = [
                ['Label', 'Value'],
                ['Inbound', 85]
            ];
        })
        .controller("GaugeChartCtrl02", function($scope) {

            $scope.myChartObject = {};
            $scope.myChartObject.type = "Gauge";

            $scope.myChartObject.options = {
                width: 200,
                height: 120,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5
            };

            $scope.myChartObject.data = [
                ['Label', 'Value'],
                ['Outbound', 23]
            ];
        })
        .controller("GaugeChartCtrl03", function($scope) {

            $scope.myChartObject = {};
            $scope.myChartObject.type = "Gauge";

            $scope.myChartObject.options = {
                width: 400,
                height: 120,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5
            };

            $scope.myChartObject.data = [
                ['Label', 'Value'],
                ['National', 30]
            ];
        })
        .controller("DoughnutCtrl", function ($scope) {
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];
        })
        .directive('gaugeDirective', function(){
            return {
                templateUrl: 'views/directives/weather.html',
                scope: {
                    test: '@'
                }
            };
        })






        .run(['service', function (service) {
            service.getWeatherData();
        }]);

})();