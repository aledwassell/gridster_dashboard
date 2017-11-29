(function () {

    angular.module('app', ['ngRoute', 'ngResource', 'ngAside', 'ui.bootstrap', 'chart.js', 'gridster', 'googlechart', 'adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.weather', 'adf.widget.queue-widget', 'rzModule'])
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
            this.getHolidays = function(country){
                var apiKey = 'AIzaSyBeTJpWPqTIb4_eHxGb9cGQfPAR7N-x1c0';
                var url = `https://www.googleapis.com/calendar/v3/calendars/en.${country.code}%23holiday%40group.v.calendar.google.com/events?key=${apiKey}`;
                $http.get(url)
                    .then(function(response){
                        that.holidayData = response.data;
                        console.log(response)
                    })
                    .catch(function(err){console.log('There was an error: ', err)})
            }


        }])
        .config(function ($routeProvider, dashboardProvider, ChartJsProvider) {
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
                })
                .when("/layout03", {
                    templateUrl: 'views/layout03.html',
                    controller: 'layout03'
                })
                .when("/layout04", {
                    templateUrl: 'views/layout04.html',
                    controller: 'layout04'
                })
                .when("/possible_charts", {
                    templateUrl: 'views/charts.html',
                    controller: 'charts'
                })
                .when("/IVR_builder", {
                    templateUrl: 'views/IVR_builder.html',
                    controller: 'IVR_representation_controller'
                })
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
            ChartJsProvider.setOptions({
                chartColors: ['#FF5252', '#FF8A80'],
                responsive: true,
                maintainAspectRatio: true
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
                $scope.colors = ['#4062BB', '#B02E0C', '#4062BB'];

                $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
                $scope.datasetOverride = [
                    {
                        label: "Calls",
                        borderWidth: 1,
                        type: 'bar'
                    },
                    {
                        label: "Call abandoned",
                        borderWidth: 3,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        type: 'line'
                    }
                ];
            })
        .controller("monthlyChartCtrl",
            function ($scope) {
                $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                $scope.series = ['Series A', 'Series B'];
                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40, 28, 48, 40, 19, 65]
                ];
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
                $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
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
                        {number: 0845898989, calls: 657}
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
                minorTicks: 0
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


        //Layout 02 controllers
        .controller("DoughnutCtrl", function ($scope) {
            $scope.doughnutData = {
                calls: {
                    colors:['#81cd34', '#ff000f', '#ff00ee'],
                    labels:["Successful", "Abandoned"],
                    data:[564, 112]
                },
                queues: {
                    colors:['#cd801a', '#00fff8', '#58fdff'],
                    labels:["Queues", "Successful"],
                    data:[25, 670]
                },
                IVRs: {
                    colors:['#00cd08', '#ff6384', '#0004ff'],
                    labels:["West Midlands", "Wales"],
                    data:[12, 14]
                }
            }

        })
        .controller("layout02Chart",
            function ($scope) {
                $scope.lineChart01 = {};
                $scope.lineChart02 = {};

                $scope.lineChart01.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

                $scope.lineChart01.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.lineChart01.data = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
                $scope.lineChart01.datasetOverride = [
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

                $scope.lineChart02.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

                $scope.lineChart02.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                $scope.lineChart02.data = [
                    [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
                ];
                $scope.lineChart02.datasetOverride = [
                    {
                        label: "Line chart",
                        borderWidth: 3,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        type: 'line'
                    }
                ];
            })
        .controller("layout02Gauge", function($scope) {

            $scope.chart01 = {};
            $scope.chart02 = {};
            $scope.chart03 = {};

            $scope.chart01.type = "Gauge";
            $scope.chart01.options = {
                width: 150,
                height: 150,
                greenFrom: 0,
                greenTo: 90,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 0,
                ticks: 0
            };
            $scope.chart01.data = [
                ['Label', 'Value'],
                ['Outbound', 65]
            ];

            $scope.chart02.type = "Gauge";
            $scope.chart02.options = {
                width: 150,
                height: 150,
                greenFrom: 0,
                greenTo: 90,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 0
            };
            $scope.chart02.data = [
                ['Label', 'Value'],
                ['Inbound', 30]
            ];

            $scope.chart03.type = "Gauge";
            $scope.chart03.options = {
                width: 150,
                height: 150,
                greenFrom: 0,
                greenTo: 90,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 0
            };
            $scope.chart03.data = [
                ['Label', 'Value'],
                ['Queues', 24]
            ];
        })
        .controller('layout03', ['$scope', function ($scope) {
            //Chart top
            $scope.colors = ['#0004ff', '#ff000f', '#cd1b8a', '#58fdff']
            $scope.labels = ["January", "February", "March", "April", "May", "June", "July", 'August', 'September', 'October', 'November', 'December'];
            $scope.series = ['Inbound Calls', 'Outbound Calls'];
            $scope.data = [
                [35, 59, 40, 81, 26, 55, 40, 48, 96, 14, 23, 47],
                [28, 48, 40, 19, 66, 27, 30, 35, 59, 40, 81, 26]

            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
            $scope.options = {
                responsive: true,
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                elements: {
                    line: {
                        fill: false,
                        // tension: 0,
                        borderWidth: 3
                    }
                },
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: false,
                            position: 'left',
                            gridLines: false
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: false
                        }
                    ]
                },
                plugins: {
                    filler: {
                        propagate: true
                    }
                }
                // legend: {
                //     display: true,
                //     position: 'left'
                // }
            };

            //doughnut gauge settings
            $scope.doughnutColors = ['#ffffff', '#81cd34', '#ff00ee', '#ff000f']
            $scope.doughnutLabels = ['', 'Maximum', 'Queue', 'Callers', 'Abandoned'];
            $scope.doughnutData = [25, 200, 75, 25, 8];

            //mixed chart settings
            $scope.mixedChart = {};
            $scope.mixedChart.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

            $scope.mixedChart.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.mixedChart.data = [
                [65, -59, 80, 81, -56, 55, -40],
                [28, 48, -40, 19, 86, 27, 90]
            ];
            $scope.mixedChart.datasetOverride = [
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
            $scope.CDRreporting = function(){
                $scope.mixedChart = {};
                $scope.mixedChart.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

                $scope.mixedChart.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.mixedChart.data = [
                    [65, -59, 80, 81, -56, 55, -40],
                    [28, 48, -40, 19, 86, 27, 90]
                ];
                $scope.mixedChart.datasetOverride = [
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
            }
            $scope.IVRreporting = function(){
                $scope.mixedChart = {};
                $scope.mixedChart.colors = ['#cd6b1e', '#00cd08', '#00ffdb'];

                $scope.mixedChart.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.mixedChart.data = [
                    [65, 91, 80, 81, 37, 55, 24],
                    [32, 34, 20, 19, 26, 27, 90]
                ];
                $scope.mixedChart.datasetOverride = [
                    {
                        label: "IVR Reporting",
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
            }
            $scope.monthlyCalls = function(){
                $scope.mixedChart = {};
                $scope.mixedChart.colors = ['#cd00a1', '#0091cd', '#6dff00'];

                $scope.mixedChart.labels = ["January", "February", "March", "April", "May", "June", "July", 'August', 'September', 'October', 'November', 'December'];
                $scope.mixedChart.data = [
                    [35, 59, 40, 81, 26, 55, 40, 48, 96, 14, 23, 47],
                    [28, 48, 40, 19, 66, 27, 30, 35, 59, 40, 81, 26]
                ];
                $scope.mixedChart.datasetOverride = [
                    {
                        label: "IVR Reporting",
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
            }


            //gauge chart object
            $scope.gaugeChartObject = {};
            $scope.gaugeChartObject.type = "Gauge";

            $scope.gaugeChartObject.options = {
                height: 200,
                greenColor: '#41EAD4',
                greenFrom: 0,
                greenTo: 90,
                redColor: '#FF206E',
                redFrom: 90,
                redTo: 100,
                yellowColor: '#FBFF12',
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 0
            };

            $scope.gaugeChartObject.data = [
                ['Label', 'Value'],
                ['Memory', 50]
            ];

            $scope.radioData = {};

            $scope.$watch('radioData', function () {
                console.log('Hello');
            });

            $scope.priceSlider = {
                value: 100,
                options: {
                    floor: 0,
                    ceil: 100,
                    step: 10
                }
            };

        }])
        .controller('layout04', ['$scope', function($scope){

            //Chart top
            $scope.colors = ['#0004ff', '#ff000f', '#cd1b8a', '#58fdff']
            $scope.labels = ["January", "February", "March", "April", "May", "June", "July", 'August', 'September', 'October', 'November', 'December'];
            $scope.series = ['Inbound Calls', 'Outbound Calls'];
            $scope.data = [
                [35, 59, 40, 81, 26, 55, 40, 48, 96, 14, 23, 47],
                [28, 48, 40, 19, 66, 27, 30, 35, 59, 40, 81, 26]

            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
            $scope.options = {
                responsive: true,
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                elements: {
                    line: {
                        fill: false,
                        // tension: 0,
                        borderWidth: 3
                    }
                },
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left',
                            // gridLines: true
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: false
                        }
                    ]
                },
                plugins: {
                    filler: {
                        propagate: true
                    }
                }
                // legend: {
                //     display: true,
                //     position: 'left'
                // }
            };

            //doughnut gauge settings
            $scope.doughnutColors = ['#ffffff', '#81cd34', '#ff00ee', '#ff000f']
            $scope.doughnutLabels = ['', 'Maximum', 'Queue', 'Callers', 'Abandoned'];
            $scope.doughnutData = [25, 200, 75, 25, 8];

            //mixed chart settings
            $scope.mixedChart = {};
            $scope.mixedChart.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

            $scope.mixedChart.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.mixedChart.data = [
                [65, -59, 80, 81, -56, 55, -40],
                [28, 48, -40, 19, 86, 27, 90]
            ];
            $scope.mixedChart.datasetOverride = [
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
            $scope.CDRreporting = function(){
                $scope.mixedChart = {};
                $scope.mixedChart.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

                $scope.mixedChart.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.mixedChart.data = [
                    [65, -59, 80, 81, -56, 55, -40],
                    [28, 48, -40, 19, 86, 27, 90]
                ];
                $scope.mixedChart.datasetOverride = [
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
            }
            $scope.IVRreporting = function(){
                $scope.mixedChart = {};
                $scope.mixedChart.colors = ['#cd6b1e', '#00cd08', '#00ffdb'];

                $scope.mixedChart.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.mixedChart.data = [
                    [65, 91, 80, 81, 37, 55, 24],
                    [32, 34, 20, 19, 26, 27, 90]
                ];
                $scope.mixedChart.datasetOverride = [
                    {
                        label: "IVR Reporting",
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
            }
            $scope.monthlyCalls = function(){
                $scope.mixedChart = {};
                $scope.mixedChart.colors = ['#cd00a1', '#0091cd', '#6dff00'];

                $scope.mixedChart.labels = ["January", "February", "March", "April", "May", "June", "July", 'August', 'September', 'October', 'November', 'December'];
                $scope.mixedChart.data = [
                    [35, 59, 40, 81, 26, 55, 40, 48, 96, 14, 23, 47],
                    [28, 48, 40, 19, 66, 27, 30, 35, 59, 40, 81, 26]
                ];
                $scope.mixedChart.datasetOverride = [
                    {
                        label: "IVR Reporting",
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
            }


            //gauge chart object
            $scope.gaugeChartObject = {};
            $scope.gaugeChartObject.type = "Gauge";
            var containerWidth = document.getElementById('gauge_container').offsetWidth;
            $scope.$watch(function (newValue, OldValue) {

            })
            $scope.gaugeChartObject.options = {
                height: 200,
                greenColor: '#41EAD4',
                greenFrom: 0,
                greenTo: 90,
                redColor: '#FF206E',
                redFrom: 90,
                redTo: 100,
                yellowColor: '#FBFF12',
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 0
            };

            $scope.gaugeChartObject.data = [
                ['Label', 'Value'],
                ['Memory', 35]
            ];

        }])

        //possible charts
        .controller("charts", ['$scope', 'service', function ($scope, service) {

            $scope.service = service;
            $scope.countries = [
                {name: 'United Kingdom', code:'uk'},
                {name: 'United States', code:'usa'},
                {name: 'Australia', code:'australian'},
                {name: 'France', code:'french'},
                {name:'Sweden', code:'swedish'}
            ];
            $scope.selectedCountry = $scope.countries[0];
            $scope.service.countryCode = $scope.selectedCountry.code;
            $scope.$watch('service.holidayData', function(newValue, oldValue, scope){
                if($scope.service.holidayData) $scope.publicHolidayData = $scope.service.holidayData;
            });

            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
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
        }])
        .controller('IVRmodalController', ['$scope', '$uibModal', '$uibModalInstance', function ($scope, $uibModal, $uibModalInstance) {
            $scope.ok = function () {
                $uibModalInstance.close();
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };

            $scope.oneAtATime = true;

            $scope.groups = [
                {
                    title: 'Dynamic Group Header - 1',
                    content: 'Dynamic Group Body - 1'
                },
                {
                    title: 'Dynamic Group Header - 2',
                    content: 'Dynamic Group Body - 2'
                }
            ];

            $scope.items = ['Item 1', 'Item 2', 'Item 3'];

            $scope.addItem = function() {
                var newItemNo = $scope.items.length + 1;
                $scope.items.push('Item ' + newItemNo);
            };

            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };
        }])
        .controller("IVR_representation_controller", ['$scope', '$rootScope', '$uibModal', '$aside', function ($scope, $rootScope, $uibModal, $aside) {
            $scope.expanded = false;
            $scope.expand = function () {
                $scope.expanded = !$scope.expanded;
            };

            $scope.locked = false;
            $scope.unlock = function(){
                $scope.locked = !$scope.locked;
            };

            $scope.IVRhide = false;
            $scope.hide = function(){
                $scope.IVRhide = !$scope.IVRhide;
            };

            $scope.openAside = function(){
                var asideInstance = $aside.open({
                    templateUrl: 'views/modals/IVRmodal.html',
                    controller: 'IVRmodalController',
                    placement: 'left',
                    size: 'md'
                });
            };
            $scope.draw = function () {
                var ctx;
                var canvas = document.getElementById('canvas');
                if(canvas.getContext){
                    ctx = canvas.getContext('2d');
                }
            };

            $scope.IVRlist = [
                'London PAL Admin',
                'Top level IVR Helpline',
                'Scotland Emergency',
                'Helpline Engliand',
                'Helpline Wales',
                'Helpline Scotland',
                'Helpline Northern Ireland',
                'Manchester PAL Helpline'
            ]

        }])

        .run(['service', function (service) {
            service.getWeatherData();
        }]);

})();