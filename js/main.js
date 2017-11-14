angular.module('app', ['ngRoute', 'chart.js', 'gridster'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: "home"
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard.html",
                controller: "dashboard"
            });
            // .when("/dash_framework", {
            //     templateUrl: "views/dashboard_framework.html",
            //     controller: "dashboard_framework"
            // });
        // dashboardProvider
        //     .structure('6-6', {
        //         rows: [{
        //             columns: [{
        //                 styleClass: 'col-md-4'
        //             }, {
        //                 styleClass: 'col-md-6'
        //             }, {
        //                 styleClass: 'col-md-2'
        //             }]
        //         }]
        //     });
    })
    .controller("home", function ($scope) {
        $scope.name = 'Aled Wassell';
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

    .controller("DoughnutCtrl", function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100, 450];
    })
    .controller('dashboard', function ($scope) {

        $scope.numbers = {
            number: 0845788927
        }

        $scope.standardItems = [
            { sizeX: 1, sizeY: 1, row: 0, col: 8, number: 0845788927, calls: 237 },
            { sizeX: 1, sizeY: 1, row: 0, col: 8, number: 0845898989, calls: 657 }
        ];
        $scope.lineChart = [
            { sizeX: 5, sizeY: 3, row: 0, col: 2 }
        ];
        $scope.barChart = [
            { sizeX: 5, sizeY: 3, row: 2, col: 2 }
        ];
        $scope.doughnutChart = [
            { sizeX: 2, sizeY: 2, row: 0, col: 0 },
            { sizeX: 2, sizeY: 2, row: 0, col: 0 }
        ];
        $scope.gridsterOpts = {
            columns: 8, // the width of the grid, in columns
            pushing: true, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            margins: [10, 10], // the pixel distance between each widget
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
                start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },
            draggable: {
                enabled: true, // whether dragging items is supported
                handle: '.my-class', // optional selector for drag handle
                start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
            }
        };
    })
// .controller("dashboard_framework", function($scope){
//
// })