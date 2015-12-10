/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $urlRouterProvider
            .when('', '/index/home')
            //.otherwise("/index/404");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.404', {
            url: "/404",
            templateUrl: "views/404.html",
            data: { pageTitle: 'Not Found' }
        })
        .state('index.home', {
            url: "/home",
            templateUrl: "views/home.html",
            data: { pageTitle: 'Home' }
        })
        .state('index.profile', {
            url: "/profile",
            templateUrl: "views/profile.html",
            data: { pageTitle: 'Profile' }
        })
        .state('index.myservices', {
            url: "/myservices",
            templateUrl: "views/myservices.html",
            data: { pageTitle: 'My Services' }
        })
        .state('index.myservicescircle', {
            url: "/myservicescircle",
            templateUrl: "views/myservicescircle.html",
            data: { pageTitle: 'My Services Circle View' }
        })
        .state('index.myservicesdetails', {
            url: "/myservicesdetails/:id",
            templateUrl: "views/myservicesdetails.html",
            data: { pageTitle: '' }
        })
        .state('index.servicesdetails', {
            url: "/servicesdetails/:id",
            templateUrl: "views/servicesdetails.html",
            data: { pageTitle: '' }
        })
        .state('index.discover', {
            url: "/discover",
            templateUrl: "views/discover.html",
            data: { pageTitle: 'Discover' }
        })
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state
        $rootScope.$on("$stateChangeError", console.log.bind(console));

    });
