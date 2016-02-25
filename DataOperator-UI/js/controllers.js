/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */

var _base64 = {
    _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=_base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},
    decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=_base64._utf8_decode(t);return t},
    _utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},
    _utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}
}

function MainCtrl($scope, $state, $http) {
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get('http://127.0.0.1:8080/ui/userInformation?select=gender,status,firstName,lastName,email,address1,address2,cities_id,regions_id,countries_id,languages_id,nationalities_id,img_url_avatar,created').
        success(function(data, status, headers, config) {
            $scope.userInfo = data['1']
            console.log(data)
        }).
        error(function(data, status, headers, config) {
        });
};

function ProfileCtrl($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get('http://127.0.0.1:8080/ui/userInformation?select=gender,status,firstName,lastName,email,address1,address2,cities_id,regions_id,countries_id,languages_id,nationalities_id,img_url_avatar,created').
        success(function(data, status, headers, config) {
            $scope.userInfo = data['1']
            console.log(data)
        }).
        error(function(data, status, headers, config) {
        });
    $http.get('http://127.0.0.1:8080/ui/myServices/numberOfServices?status=All').
        success(function(data, status, headers, config) {
            $scope.numberOfServices = data.numberOfServices
            console.log(data)
        }).
        error(function(data, status, headers, config) {
        });
}

function randomR(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function random(max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
}

var booleanArray = [true, false, null]

function MyServiceCtrl ($scope, $http) {
    this.title = 'My Service';
    $scope.noServices = true;

    $scope.returnObjLength = function (obj) {
        var t = Object.keys(obj)
        return t.length
    }
    $scope.returnObjKeys = function (obj) {
        var objKeysArray = Object.keys(obj)
        return objKeysArray

    }
    $scope.returnLongest = function (obj1, obj2) {
        var t1 = Object.keys(obj1).length
        var t2 = Object.keys(obj2).length
        if (t1 > t2) {
            return t1
        } else {
            return t2
        }
    }
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get("http://127.0.0.1:8080/ui/myServices?categories=&current=0&count=15").success(function(data) {
            console.log("Count of Services: " + $scope.returnObjLength(data));
            console.log(data);
            $scope.data = data;

            if($scope.returnObjLength(data) != 0) {
              // There is services to show --> Hide notification
              $scope.noServices = false;
            }

        })
        .error(function(data) {
            console.log(data);
        });
}

function ModalConsentDetailsCtrl ($scope, $state, $modalInstance, relatedService, myService, $http) {

    //Show selected categories and licenses
    var view_consent_by_id = null
    if(relatedService['consentID'] !== undefined){
        view_consent_by_id = relatedService['consentID']
    }

    $scope.myService = myService
    $scope.relatedService = relatedService
    $scope.consentSettings = {
        'default': 'customize'
    }

    if (relatedService.role === 'Sink') {
        var sinkmsg = JSON.stringify({
            "source_id": myService.serviceID,
            "sink_id": relatedService.serviceID,
            "consent_id": view_consent_by_id
        })
        $http.post("http://127.0.0.1:8080/ui/ConsentView", sinkmsg).success(function(data, status) {
            console.log('sink+consentView')
            console.log(data)
            $scope.licenses = reorganize(data.sink.licenses)
            $scope.categories = reorganize(data.source.categories)
            $scope.consent = data

            // Show selected categories and licenses of Consent
            if(view_consent_by_id !== null){
                show_selected_cats_lics()
            }
        })
    } else if (relatedService.role === 'Source') {
        var sourcemsg = JSON.stringify({
            "source_id": relatedService.serviceID,
            "sink_id": myService.serviceID,
            "consent_id": view_consent_by_id
        })
        $http.post("http://127.0.0.1:8080/ui/ConsentView", sourcemsg).success(function(data, status) {
            console.log('source+consentView')
            console.log(data)
            $scope.licenses = reorganize(data.sink.licenses)
            $scope.categories = reorganize(data.source.categories)

            $scope.consent = data

            // Show selected categories and licenses of Consent
            if(view_consent_by_id !== null){
                show_selected_cats_lics()
            }
        })
    }

    // show selected categories and licenses of Consent
    function show_selected_cats_lics () {
        lics = $scope.consent.sink.selected_licenses
        cats = $scope.consent.source.selected_categories
        for (i in cats){
            $scope.categories[cats[i]]['checked'] = true
        }
        for (j in lics){
            $scope.licenses[lics[j][0]]['checked'] = true
        }
    }

    function remove_duplicates(arr) {
        var obj = {};
        var arr2 = [];
        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] in obj)) {
                arr2.push(arr[i]);
                obj[arr[i]] = true;
            }
        }
        return arr2;
    }

    function reorganize(data) {
        sorted = {}
        data.forEach(function(i) {
            var mainCat = i[0]
            var othercats = i.slice(1, i.length)
            if (sorted[mainCat] === undefined) {
                sorted[mainCat] = {}
                sorted[mainCat]['subCates'] = []
                if (othercats.length > 0) {
                    sorted[mainCat].subCates.push([othercats])
                }
            } else {
                if (othercats.length) {
                    sorted[mainCat].subCates.push([othercats])
                }
            }
            sorted[mainCat]['checked'] = false
            sorted[mainCat]['isOpen'] = false
            sorted[mainCat].subCates = remove_duplicates(sorted[mainCat].subCates)
        })
        return sorted
    }

    $scope.$watch('consentSettings.default', function(n,o) {
        if (n === 'EFF') {
            console.log('its EFF')
            $scope.myCategories = $.map(relatedService.categories, function(cat) {
                var s = {}
                s['name'] = cat
                s['checked'] = booleanArray[randomR(0,2)]
                return s
            })
        }
    })

    $scope.isCustomize = function() {
        if ($scope.consentSettings.default === 'EFF') {
            return false
        } else {
            return true
        }
    }
    $scope.hadConsent = function() {
        if ($scope.relatedService.consentID) {
            return true
        } else {
            return false
        }
    }
    $scope.nothadConsent = function() {
        if ($scope.relatedService.consentID) {
            return false
        } else {
            return true
        }
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.saveChanges = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.removeConsent = function () {

        // Withdraw consent
        $http.get("http://127.0.0.1:8080/ui/disable_consent/" + view_consent_by_id).success(function(data, status) {
            console.log(data)
            $modalInstance.close('removeConsent');
        }).error(function(err){
            console.log(err);
        })
    };
    $scope.giveConsent = function () {
        console.log($scope.categories)
        //get the selected categories by check the status of Category
        var cats = []
        for (i in $scope.categories){
            if($scope.categories[i]['checked']){
                cats.push(i)
            }
        }
        console.log("selected categories")
        console.log(cats)

		// get the selected licenses
        console.log($scope.licenses)
		var lics = []
		for (i in $scope.licenses){
		    if($scope.licenses[i]['checked']){
                subCates = $scope.licenses[i]['subCates']
                if(subCates.length === 0){
                    lics.push(i)
                }
                for(j in subCates){
                    var temp = i + '.' +subCates[j];
                    lics.push(temp)
                    console.log(temp)
                }
		    }
		}
        // licenses[i].subCates
		console.log("selected licenses")
		console.log(lics)


        if (relatedService.role === 'Source') {
            var msg = JSON.stringify({"service_id": relatedService.serviceID, "categories": cats})
            $http.post("http://127.0.0.1:8080/protection/resourceSets", msg).success(function(data, status) {
                console.log(data)

                var newmsg =
                {
                    "source_id": relatedService.serviceID,
                    "sink_id": myService.serviceID,
                    "rs_id": data,
                    "usage_license": lics,
                    "status": "active"
                }
                $http.post("http://127.0.0.1:8080/ui/give_consent", JSON.stringify(newmsg)).success(function(data, status) {
                    console.log('consent made!')
                    $modalInstance.close('giveConsent');
                }).error(function(err){
                    console.log(JSON.stringify(newmsg))
                    console.log(err);
                })

            }).error(function(err){
                console.log(msg)
                console.log(err);
            })
        } else {
            var msg = JSON.stringify({"service_id": myService.serviceID, "categories": cats})
            $http.post("http://127.0.0.1:8080/protection/resourceSets", msg).success(function(data, status) {
                console.log(data)
                var newmsg =
                {
                    "source_id": myService.serviceID,
                    "sink_id": relatedService.serviceID,
                    "rs_id": data,
                    "usage_license": lics,
                    "status": "active"
                }
                $http.post("http://127.0.0.1:8080/ui/give_consent", JSON.stringify(newmsg)).success(function(data, status) {
                    console.log('consent made!')
                    $modalInstance.close('giveConsent');
                }).error(function(err){
                    console.log(JSON.stringify(newmsg))
                    console.log(err);
                })
            }).error(function(err){
                console.log(msg)
                console.log(err);
            })
        }
    };
}

function MyServiceDetailCtrl ($scope, $http, $stateParams, $state, $modal) {

    var serviceID = $stateParams.id
    $http.get('http://127.0.0.1:8080/ui/services/' + serviceID).
        success(function(data, status, headers, config) {
            console.log("ui/services/ + serviceID")
            console.log(data)
            data[serviceID]['categories'] = reorganize(data[serviceID]['categories'])

            $scope.data = data[serviceID];
            $scope.data['serviceID'] = serviceID

            $state.current.data.pageTitle = "My Service > " + $scope.data.name + " details"
            getServicesWithConsentDetails($scope.data)
        }).
        error(function(data, status, headers, config) {
        });


    function getServicesWithConsentDetails  (data) {

        $scope.potentialDataSinkWithoutContract = [];
        $scope.potentialDataSourceWithoutContract = [];

        $scope.noSinkServicesWithoutContract = true;
        $scope.noSourceServicesWithoutContract = true;

        Object.keys(data.potentialServicesWithoutContract).forEach(function(id) {
            var obj = data.potentialServicesWithoutContract[id]
            $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
            $http.get('http://127.0.0.1:8080/ui/services/' + id).
                success(function(data, status, headers, config) {
                    data['serviceID'] = id
                    if (obj.role === 'Sink' || obj.role === 'Both') {
                        $scope.potentialDataSinkWithoutContract.push(data[id]);
                        $scope.noSinkServicesWithoutContract = false;
                    }
                    if (obj.role === 'Source' || obj.role === 'Both') {
                        $scope.potentialDataSourceWithoutContract.push(data[id]);
                        $scope.noSourceServicesWithoutContract = false;
                    }
                }).
                error(function(data, status, headers, config) {
                });
        });

        $scope.potentialDataSinkWithContract = [];
        $scope.potentialDataSourceWithContract = [];

        $scope.noSinkServicesWithContract = true;
        $scope.noSourceServicesWithContract = true;

        Object.keys(data.potentialServicesWithContract).forEach(function(id) {
            var obj = data.potentialServicesWithContract[id]
            $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
            $http.get('http://127.0.0.1:8080/ui/services/' + id).
                success(function(data, status, headers, config) {

                    var d = data[id]
                    d['serviceID'] = id
                    d['role'] = obj.role
                    console.log()
                    if (obj.role === 'Sink' || obj.role === 'Both') {
                        $scope.potentialDataSinkWithContract.push(d);
                        $scope.noSinkServicesWithContract = false;
                    }
                    if (obj.role === 'Source' || obj.role === 'Both') {
                        //FIX_FOR_DEMO: FIX THE DOT-NOTATION. CHANGE TO THE SAME STYLE SHOWING IN CONSENT DETAIL MODAL
                        d['categories'] = reorganize(d['categories']);
                        $scope.potentialDataSourceWithContract.push(d);
                        $scope.noSourceServicesWithContract = false;
                    }

                    console.log("potentialDataSinkWithContract")
                    console.log($scope.potentialDataSinkWithContract)
                    console.log("potentialDataSourceWithContract")
                    console.log($scope.potentialDataSourceWithContract)

                }).
                error(function(data, status, headers, config) {
                });
        });

        $scope.datasinkWithConsent = []
        $scope.datasourceWithConsent = []

        $scope.noSinkServicesWithoutConsent = true;
        $scope.noSourceServicesWithoutConsent = true;

        Object.keys(data.servicesWithConsent).forEach(function(id) {
            var obj = data.servicesWithConsent[id]
            $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
            $http.get('http://127.0.0.1:8080/ui/services/' + id).
                success(function(data, status, headers, config) {
                    var d = data[id]
                    d['serviceID'] = id
                    d['consentID'] = obj.consentID

                    d['consentStatus'] = (obj.consentStatus === 'active')

                    d['duration'] = obj.duration
                    d['role'] = obj.role
                    if (obj.role === 'Sink' || obj.role === 'Both') {
                        $scope.datasinkWithConsent.push(d);
                        $scope.noSinkServicesWithoutConsent = false;
                    }
                    if (obj.role === 'Source' || obj.role === 'Both') {
                        d['categories'] = reorganize(d['categories']);
                        $scope.datasourceWithConsent.push(d);
                        $scope.noSourceServicesWithoutConsent = false;
                    }
                }).
                error(function(data, status, headers, config) {
                });
        });
    }
        function reorganize(data) {
            sorted = {}
            data.forEach(function(i) {
                var cats = i.split("-", 2)
                var mainCat = cats[0].trim()
                var subcats = null
                if(cats.length > 1){
                    subcats = cats[1].trim()
                }
                if (sorted[mainCat] === undefined) {
                    sorted[mainCat] = {}
                    sorted[mainCat]['subCates'] = []
                    if (subcats) {
                        sorted[mainCat]['subCates'].push(subcats)
                    }
                } else {
                    if (subcats) {
                        sorted[mainCat]['subCates'].push(subcats)
                    }
                }
                sorted[mainCat]['isOpen'] = false
            })
            return sorted
        }

    $scope.showConsentModal = function (relatedService) {
        console.log("relatedService")
        console.log(relatedService)
        var consentModalInstance = $modal.open({
            templateUrl: 'views/consentDetailsModal.html',
            windowClass: "animated fadeIn consentDetailsModalPos",
            controller: ModalConsentDetailsCtrl,
            scope: $scope,
            size: 'lg',
            resolve: {
                relatedService: function () {
                    return relatedService;
                },
                myService: function () {
                    return $scope.data;
                },
            },
        });
        consentModalInstance.result.then(function () {
            //FOR_CLOSE
            $state.go($state.current, {}, {reload: true});
        }, function () {
            //FOR_DISMISS
        });

    }
 }

function ModalAddServiceInstanceStepQCtrl ($scope, $modalInstance, $modal) {
    $scope.close = function () {
        $modalInstance.dismiss('end');
    }
    $scope.next = function () {
        var modalInstanceTwo = $modal.open({
            templateUrl: 'views/addServiceStepTwoModal.html',
            windowClass: "animated fadeIn addServiceModalPos",
            controller: ModalAddServiceInstanceStepTwoCtrl,
            scope: $scope,
            resolve: {
                data: function () {
                    return $scope.data;
                }
            }
        });
    };
}

function ModalAddServiceInstanceStepTwoCtrl ($scope, $modalInstance, $modal) {
    $scope.close = function () {
        $modalInstance.dismiss('end');
        $('.addServiceModal').remove()
        $('.modal').remove()
        $('.modal-backdrop').remove()
    }
}

function ModalAddServiceInstanceStepOneCtrl ($scope, $modalInstance, $modal, $http, $stateParams, $state) {
    var serviceID = $stateParams.id
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get('http://127.0.0.1:8080/ui/services/' + serviceID).
        success(function(data, status, headers, config) {
            console.log("Data: " + angular.toJson(data, true))
            $scope.serviceDetailsForForeignLogin = data[serviceID]
            $scope.serviceID = serviceID
            $state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
        }).
        error(function(data, status, headers, config) {
        });

    $scope.show_login = function () {
        // show foreign_login_step_1
          $( "#foreign_login_step_1" ).show( "scale", "fast", function() {
            // Animation complete.
          });
    };

    $scope.perform_login = function (user) {
        // perform foreign_login_step_1
        $( "#spinner" ).show( "scale", "fast", function() {
            // Animation complete.
        });

        $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
        $http.post('http://127.0.0.1:8080/ui/foreign_login', { "service_id": serviceID, "username": user.username, "password": user.password }).
            success(function(data, status, headers, config) {
                // perform foreign_login_step_1
                $( "#spinner" ).hide( "scale", "fast", function() {
                    // Animation complete.
                });
                console.log("Status: " + status)
                console.log("Config: " + config)
                console.log("Data: " + angular.toJson(data, true))
                $scope.sct = data
                $( "#sct_view" ).show( "scale", "fast", function() {
                    // Animation complete.
                });
            }).
            error(function(data, status, headers, config) {
                console.log("Status: " + status)
                console.log("Config: " + angular.toJson(data, true))
                console.log("Data: " + angular.toJson(data, true))

                $( "#spinner" ).hide( "scale", "fast", function() {
                    // Animation complete.
                });
                if (status == 403) {
                    $( "#login_failed_403" ).show( "scale", "fast", function() {
                        // Animation complete.
                    });
                }
                else {
                    $( "#login_failed_500" ).show( "scale", "fast", function() {
                        // Animation complete.
                    });
                }
            });
    };


    $scope.accept_sct = function () {
        // perform foreign_login_step_1
        $( "#spinner" ).show( "scale", "fast", function() {
            // Animation complete.
        });

        console.log("sct: " + JSON.stringify($scope.sct))

        $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
        $http.post('http://127.0.0.1:8080/ui/accept_contract', JSON.parse(JSON.stringify($scope.sct))).
            success(function(data, status, headers, config) {
                // perform accept_contract
                $( "#spinner" ).hide( "scale", "fast", function() {
                    // Animation complete.
                });
                console.log("Status: " + status)
                console.log("Config: " + angular.toJson(data, true))
                console.log("Data: " + angular.toJson(data, true))
                $scope.response_data = data

                $( "#foreign_login_step_1" ).hide( "scale", "fast", function() {
                    // Animation complete.
                });
                $( "#sct_view" ).hide( "scale", "fast", function() {
                    // Animation complete.
                });
                $( "#addService_2" ).show( "scale", "fast", function() {
                    // Animation complete.
                });
                $( "#addService_1" ).hide( "scale", "fast", function() {
                    // Animation complete.
                });
            }).
            error(function(data, status, headers, config) {
                console.log("Status: " + status)
                console.log("Config: " + angular.toJson(data, true))
                console.log("Data: " + angular.toJson(data, true))

                $( "#spinner" ).hide( "scale", "fast", function() {
                    // Animation complete.
                });
                $( "#sct_failed" ).show( "scale", "fast", function() {
                        // Animation complete.
                });
            });

    };

    $scope.discard_sct = function () {
        $( "#foreign_login_step_1" ).hide( "scale", "fast", function() {
            // Animation complete.
        });
        $( "#sct_view" ).hide( "scale", "fast", function() {
            // Animation complete.
        });

        $( "#addService_3" ).show( "scale", "fast", function() {
            // Animation complete.
        });
        $( "#addService_1" ).hide( "scale", "fast", function() {
            // Animation complete.
        });
    }

    $scope.close_login = function () {
        // hide foreign_login_step_1
          $( "#foreign_login_step_1" ).hide( "scale", "fast", function() {
            // Animation complete.
          });
    };
    $scope.close = function () {
        $modalInstance.dismiss('end');
        $('.addServiceModal').remove()
        $('.modal').remove()
        $('.modal-backdrop').remove()
    };
}

function ServiceDetailCtrl ($scope, $http, $stateParams, $modal, $state) {
    var serviceID = $stateParams.id
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get('http://127.0.0.1:8080/ui/services/' + serviceID).
        success(function(data, status, headers, config) {
            console.log(data)
            $scope.serviceDetails = data[serviceID]
            makeListOfserviceCanAccess($scope.serviceDetails)
            $state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
        }).
        error(function(data, status, headers, config) {
        });

    $scope.clickAddTo = function(){
        var modalInstance = $modal.open({
            templateUrl: 'views/addServiceStepOneModal.html',
            windowClass: "animated fadeIn addServiceModalPos",
            controller: ModalAddServiceInstanceStepOneCtrl,
            scope: $scope,
            resolve: {
                data: function () {
                    return $scope.data;
                }
            },
        });
    }

    $scope.sinkServicesCanAccess = []
    $scope.sourceServicesCanAccess = []

    $scope.noSinkServices = true;
    $scope.noSourceServices = true;

    function makeListOfserviceCanAccess(serviceDetails) {
        Object.keys(serviceDetails.potentialServicesWithContract).forEach(function(id) {
            var obj = serviceDetails.potentialServicesWithContract[id]
            $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
            $http.get('http://127.0.0.1:8080/ui/services/' + id).
                success(function(data, status, headers, config) {
                    console.log(data)
                    var d = data[id]
                    d['serviceID'] = id

                    if (obj.role === 'Sink' || obj.role === 'Both') {
                        $scope.sinkServicesCanAccess.push(data[id]);
                        $scope.noSinkServices = false;
                    }
                    if (obj.role === 'Source' || obj.role === 'Both') {
                        $scope.sourceServicesCanAccess.push(data[id]);
                        $scope.noSourceServices = false;
                    }
                }).
                error(function(data, status, headers, config) {
                });
        });
    }
}

function HomeCtrl ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get('http://127.0.0.1:8080/ui/services?categories=Health,Fitness,Shopping,Location&current=0&count=15&labels=new')
        .success(function(data) {
            $scope.availableServices = data
        }
        ).error(function(data){
            $scope.availableServices = {}
        });
}

function DiscoveryCtrl ($scope, $http) {

    function compileAsGroup (services) {

        Object.keys(services).forEach(function (serviceID) {
            var obj = services[serviceID]
            obj['serviceID'] = serviceID
        });

        var newServices = []
        var popularServices = []

        Object.keys(services).forEach(function (id) {
            var obj = services[id]
            if (obj.labels.indexOf('popular') >= 0) {
                popularServices.push(obj)
            }
            if (obj.labels.indexOf('new') >= 0) {
                newServices.push(obj)
            }
        });

        var sortedServices = {}


        var allCategories = []
        Object.keys(services).forEach(function (id) {
            var obj = services[id]
            obj.categories.forEach(function (element){
                if (allCategories.indexOf(element) === -1) {
                    allCategories.push(element);
                }
            })
        });

        sortedServices['New Services'] = newServices
        sortedServices['Popular Services'] = popularServices

        allCategories.forEach(function (element){
            sortedServices[element] = []
        })

        Object.keys(services).forEach(function (id) {
            var obj = services[id]

            obj.categories.forEach(function (Cat){
                allCategories.forEach(function (prefixedCat){
                    if (Cat === prefixedCat) {
                        sortedServices[prefixedCat].push(obj)
                    }
                })
            })
        });
        return sortedServices
    }
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get('http://127.0.0.1:8080/ui/services?categories=Health,Fitness,Shopping,Location&current=0&count=15&labels=new')
        .success(function(data) {
            $scope.sortedListofService = compileAsGroup(data)
            console.log(data)
            console.log("sortedListofService")
            console.log($scope.sortedListofService);
        }
        ).error(function(data){
        });
}

angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('MyServiceCtrl',MyServiceCtrl)
    .controller('MyServiceDetailCtrl', MyServiceDetailCtrl)
    .controller('HomeCtrl', HomeCtrl)
    .controller('DiscoveryCtrl', DiscoveryCtrl)
    .controller('ServiceDetailCtrl', ServiceDetailCtrl)
    .controller('ProfileCtrl', ProfileCtrl)
