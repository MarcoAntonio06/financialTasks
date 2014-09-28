// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ui.utils.masks'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var admob_ios_key = 'ca-app-pub-5728861242665708/7424493963';
    var admob_android_key = 'ca-app-pub-5728861242665708/7424493963';
    var adId = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;
    
    
    function createAd() {
            if ( window.plugins && window.plugins.AdMob ) {
                var am = window.plugins.AdMob;
                am.createBannerView(
                                    {
                                    'publisherId': adId,
                                    'adSize': am.AD_SIZE.BANNER,
                                    'bannerAtTop': false
                                    }, function() {
                                    am.requestAd( { 'isTesting':false }, function() {
                                                 am.showAd( true );
                                                 }, function() {
                                                 alert('failed to request ad');
                                                 })
                                    }, function(){
                                    alert( "failed to create ad view" );
                                    });
                                    
                                    
            } else {
                alert('AdMob plugin not available/ready.');
            }
        }
        createAd();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.operacao', {
      url: '/dash/operacao',
      views: {
        'tab-dash': {
          templateUrl: 'templates/operacao.html',
          controller: 'OperacaoCtrl'
        }
      }
    })

    .state('tab.operacao-update', {
      url: '/dash/operacao/:financaId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/operacao.html',
          controller: 'OperacaoCtrl'
        }
      }
    })

    .state('tab.receita', {
      url: '/receita',
      views: {
        'tab-receita': {
          templateUrl: 'templates/tab-receita.html',
          controller: 'ReceitaCtrl'
        }
      }
    })
    .state('tab.receita-detail', {
      url: '/receita/:financaId',
      views: {
        'tab-receita': {
          templateUrl: 'templates/receita-detail.html',
          controller: 'ReceitaDetailCtrl'
        }
      }
    })

    .state('tab.despesa', {
      url: '/despesa',
      views: {
        'tab-despesa': {
          templateUrl: 'templates/tab-despesa.html',
          controller: 'DespesaCtrl'
        }
      }
    })
    .state('tab.despesa-detail', {
      url: '/despesa/:financaId',
      views: {
        'tab-despesa': {
          templateUrl: 'templates/despesa-detail.html',
          controller: 'DespesaDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

