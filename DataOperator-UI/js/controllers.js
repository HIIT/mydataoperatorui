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

var fakeUserInfo = {
    "214421": {
        "img_url_avatar": "assets/img/profilephoto.png",
        "firstName": "Linda",
        "lastName": "Leinonen",
        "email":"matti.virtanen@example.com",
        "account":"matti.virtanen",
        "created":"seconds"
    }
}

function MainCtrl($scope, $state, $http) {
    $http.defaults.headers.common.Authorization = "Basic " +_base64.encode('testuser' + ":" + 'Hello');
    $http.get('http://127.0.0.1:8080/ui/userInformation?select=gender,status,firstName,lastName,email,address1,address2,cities_id,regions_id,countries_id,languages_id,nationalities_id,img_url_avatar,created').
        success(function(data, status, headers, config) {
            $scope.userInfo = data['1']
            console.log(data)
        }).
        error(function(data, status, headers, config) {
            //$scope.userInfo = fakeUserInfo["214421"]
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
            //$scope.userInfo = fakeUserInfo["214421"]
        });
    $http.get('http://127.0.0.1:8080/ui/myServices/numberOfServices?status=All').
        success(function(data, status, headers, config) {
            $scope.numberOfServices = data.numberOfServices
            console.log(data)
        }).
        error(function(data, status, headers, config) {
            //$scope.userInfo = fakeUserInfo["214421"]
        });
}

function randomR(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function random(max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
}

var logoArray = ['amica', 'fitbit', 'kesko', 'mehilainen', 'myfitnesspal', 'sgroup']
var booleanArray = [true, false, null]

function fakeAPI_MyServices () {

    var fakeData = {}

    for(var i = 0; i < random(250); i++) {
        fakeData[HolderIpsum.words(1, true)] = (function () {
            var t = {}
            t.categories = [HolderIpsum.words(1, true), HolderIpsum.words(1, true), HolderIpsum.words(1, true)]
            t.name = HolderIpsum.words(1, true)
            t.img_url_logo = 'assets/img/' + logoArray[randomR(0,5)] + 'logo.svg'
            t.connections = {}
            t.connections.ReceivingData = {}
            t.connections.DataShared = {}
            return t
        })();
    }

    var keys = Object.keys(fakeData)
    var l = keys.length

    for (var k in fakeData) {
        var obj = fakeData[k];
        for (var s in obj) {
            o = obj[s]
            o.ReceivingData = (function () {
                t = {}
                for (var i = random(l); i < random(l); i++) {
                    t[keys[i]] = {}
                    t[keys[i]].serviceID = randomR(1000, 9999)
                    t[keys[i]].img_url_logo = 'assets/img/' + logoArray[randomR(0,5)] + 'logo.svg'
                    t[keys[i]].description = {}
                    t[keys[i]].description.short = HolderIpsum.words(30, false)
                    t[keys[i]].consentActive = booleanArray[randomR(0,2)]
                }
                return t
            })();
            o.DataShared = (function () {
                t = {}
                for (var i = random(l); i < random(l); i++) {
                    t[keys[i]] = {}
                    t[keys[i]].serviceID = randomR(1000, 9999)
                    t[keys[i]].img_url_logo = 'assets/img/' + logoArray[randomR(0,5)] + 'logo.svg'
                    t[keys[i]].description = {}
                    t[keys[i]].description.short = HolderIpsum.words(30, false)
                    t[keys[i]].consentActive = booleanArray[randomR(0,2)]
                }
                return t
            })();
        }
    }
    return fakeData

}

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
            //$scope.data = fakeAPI_MyServices()
        });
}

function fakeAPI_Service (serviceID) {
    var fakeData = {}
    var contractStatusArray = ['Active', 'Paused', 'Withdrawed']
    var roleArray = ['source', 'sink', 'both']
    var consentStatusArray = ['Active', 'Paused', 'Withdrawed']

    fakeData[serviceID] = (function () {
        var t = {}
        t.name = HolderIpsum.words(1, true)
        t.img_url_logo = 'assets/img/' + logoArray[randomR(0,5)] + 'logo.svg'
        t.img_url_banner = 'assets/img/myfitnesspalphoto.png'
        t.img_url_overview = 'assets/img/myfitnesspalphoto.png'
        t.description = {}
        t.description['short'] = HolderIpsum.words(15, false)
        t.description['longer'] = HolderIpsum.words(80, false)
        t.categories = [
            HolderIpsum.words(1, true),
            HolderIpsum.words(1, true),
            HolderIpsum.words(1, true)
        ]
        t.labels = [
            'news',
            'popular'
        ]
        t.commonConsent = [
            "assets/img/cc/c1.svg",
            "assets/img/cc/c2.svg",
            "assets/img/cc/c3.svg",
            "assets/img/cc/c4.svg"
        ]

        t.potentialServicesWithoutContract = {}
        for(var i = 0; i < random(1,10); i++) {
            t.potentialServicesWithoutContract[random(1000,9999)] = (function () {
                var s = {}
                s.role = roleArray[randomR(0,3)]
                return s
            })();
        }

        t.potentialServicesWithContract = {}
        for(var i = 0; i < random(5,20); i++) {
            t.potentialServicesWithContract[random(1000,9999)] = (function () {
                var s = {}
                s.contractID = random(1000,9999)
                s.contractStatus = contractStatusArray[randomR(0,2)]
                s.role = roleArray[randomR(0,3)]
                return s
            })();
        }

        t.servicesWithConsent = {}
        for(var j = 0; j < randomR(1,10); j++) {
            t.servicesWithConsent[random(1000,9999)] = (function () {
                var s = {}
                var randomTime = new Date(randomR(999,999999999999))
                var duration = Math.abs(randomTime.getTime() - Date.now())
                s.consentID = random(1000,9999)
                s.consentStatus = consentStatusArray[randomR(0,2)]
                s.duration = new Date(duration)
                s.role = roleArray[randomR(0,3)]
                return s
            })();
        }

        return t
    })();
    return fakeData
}

function ModalConsentDetailsCtrl ($scope, $state, $modalInstance, relatedService, myService, $http) {

    //FIX_FOR_DEMO: show selected categories and licenses
    var view_consent_by_id = null
    if(relatedService['consentID'] !== undefined){
        view_consent_by_id = relatedService['consentID']
    }
    //End_FIX

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

            //FIX_FOR_DEMO: show selected categories and licenses of Consent
            if(view_consent_by_id !== null){
                show_selected_cats_lics()
            }
            //End_FIX

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
            //TODO_FOR_DEMO: Names of the services should be included in the texts
            //!!!FIXED!!!
            $scope.consent = data

            //FIX_FOR_DEMO: show selected categories and licenses of Consent
            if(view_consent_by_id !== null){
                show_selected_cats_lics()
            }
            //End_FIX
        })
    }

    //FIX_FOR_DEMO: show selected categories and licenses of Consent
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
    //End_FIX

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

        //FIX_FOR_DEMO: withdraw consent
        $http.get("http://127.0.0.1:8080/ui/disable_consent/" + view_consent_by_id).success(function(data, status) {
            console.log(data)
            $modalInstance.close('removeConsent');
        }).error(function(err){
            console.log(err);
        })
        //END_FIX



		// For faking the Consent Withdraw in UI-code
        // delete $scope.relatedService['consentID']
        // delete $scope.relatedService['consentStatus']
        // delete $scope.relatedService['duration']

        // var sinkIndex = $scope.$parent.datasinkWithConsent.indexOf($scope.relatedService)
        // var sourceIndex = $scope.$parent.datasourceWithConsent.indexOf($scope.relatedService)
        // if (sinkIndex >= 0) {
        //     $scope.$parent.datasinkWithConsent.splice(sinkIndex,1)
        //     $scope.$parent.potentialDataSinkWithContract.push($scope.relatedService)
        // }
        // if (sourceIndex >= 0) {
        //     $scope.$parent.datasourceWithConsent.splice(sourceIndex,1)
        //     $scope.$parent.potentialDataSourceWithContract.push($scope.relatedService)
        // }

        //FIX_FOR_DEMO: refresh
        // $route.reload();
        // $state.reload();
        // $state.go($state.current, {}, {reload: true});
    };
    $scope.giveConsent = function () {
        console.log($scope.categories)
        //FIX_FOR_DEMO: change to get categories that user selected.
        // var cats = Object.keys($scope.categories)
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


        //below is for faking the process in UI, should be removed when back-end endpoints of checking consent is ready
        // var sinkIndex = $scope.$parent.potentialDataSinkWithContract.indexOf($scope.relatedService)
        // var sourceIndex = $scope.$parent.potentialDataSourceWithContract.indexOf($scope.relatedService)
        // if (sinkIndex >= 0) {
        //     $scope.$parent.potentialDataSinkWithContract.splice(sinkIndex,1)
        //     $scope.$parent.datasinkWithConsent.push($scope.relatedService)
        // }
        // if (sourceIndex >= 0) {
        //     $scope.$parent.potentialDataSourceWithContract.splice(sourceIndex,1)
        //     $scope.$parent.datasourceWithConsent.push($scope.relatedService)
        // }

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
            //$scope.data = fakeAPI_Service(serviceID)[serviceID]
            //$state.current.data.pageTitle = "My Service's Details > " + $scope.data.name
            //getServicesWithConsentDetails($scope.data)
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
                    //var fakeData = fakeAPI_Service(serviceID)[serviceID]
                    //
                    //if (obj.role === 'sink' || obj.role === 'both') {
                    //    $scope.potentialDataSinkWithoutContract.push(fakeData)
                    //}
                    //if (obj.role === 'source' || obj.role === 'both') {
                    //    $scope.potentialDataSourceWithoutContract.push(fakeData)
                    //}
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
                    //var fakeData = fakeAPI_Service(serviceID)[serviceID]
                    //fakeData['role'] = obj.role
                    //if (obj.role === 'sink' || obj.role === 'both') {
                    //    $scope.potentialDataSinkWithContract.push(fakeData)
                    //}
                    //if (obj.role === 'source' || obj.role === 'both') {
                    //    $scope.potentialDataSourceWithContract.push(fakeData)
                    //}
                    //console.log($scope.potentialDataSourceWithContract)
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

                    //d['consentStatus'] = obj.consentStatus
                    d['duration'] = obj.duration
                    d['role'] = obj.role
                    if (obj.role === 'Sink' || obj.role === 'Both') {
                        $scope.datasinkWithConsent.push(d);
                        $scope.noSinkServicesWithoutConsent = false;
                    }
                    if (obj.role === 'Source' || obj.role === 'Both') {
                        //FIX_FOR_DEMO: FIX THE DOT-NOTATION. CHANGE TO THE SAME STYLE SHOWING IN CONSENT DETAIL MODAL
                        d['categories'] = reorganize(d['categories']);
                        $scope.datasourceWithConsent.push(d);
                        $scope.noSourceServicesWithoutConsent = false;
                    }
                }).
                error(function(data, status, headers, config) {
                    //var fakeData = fakeAPI_Service(serviceID)[serviceID]
                    //fakeData['consentID'] = obj.consentID
                    //fakeData['consentStatus'] = obj.consentStatus
                    //fakeData['duration'] = obj.duration
                    //fakeData['role'] = obj.role
                    //if (obj.role === 'sink' || obj.role === 'both') {
                    //    $scope.datasinkWithConsent.push(fakeData)
                    //}
                    //if (obj.role === 'source' || obj.role === 'both') {
                    //    $scope.datasourceWithConsent.push(fakeData)
                    //}
                });
        });
    }
    //FIX_FOR_DEMO: FIX THE DOT-NOTATION. CHANGE TO THE SAME STYLE SHOWING IN CONSENT DETAIL MODAL
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
            //size: 'sm',
        });
        consentModalInstance.result.then(function () {
            //FOR_CLOSE
            //FIX_FOR_DEMO: refresh
            // $route.reload();
            // $state.reload();
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
        //$modalInstance.dismiss('next');
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
            //$scope.serviceDetails = fakeAPI_Service(serviceID)[serviceID]
            //makeListOfserviceCanAccess($scope.serviceDetails)
            //$state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
        });
    /*
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
        //$modalInstance.dismiss('next');
    };
    */
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
                //$scope.serviceID = serviceID
                //$state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
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
                //$scope.serviceDetails = fakeAPI_Service(serviceID)[serviceID]
                //makeListOfserviceCanAccess($scope.serviceDetails)
                //$state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
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
                /*$( "#sct_view" ).show( "scale", "fast", function() {
                    // Animation complete.
                });*/
                $( "#foreign_login_step_1" ).hide( "scale", "fast", function() {
                    // Animation complete.
                    //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
                });
                $( "#sct_view" ).hide( "scale", "fast", function() {
                    // Animation complete.
                    //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
                });
                $( "#addService_2" ).show( "scale", "fast", function() {
                    // Animation complete.
                    //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
                });
                $( "#addService_1" ).hide( "scale", "fast", function() {
                    // Animation complete.
                    //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
                });
                /*
                var modalInstanceTwo = $modal.open({
                    templateUrl: 'views/addServiceStepTwoModal.html',
                    windowClass: "animated fadeIn addServiceModalPos",
                    controller: ModalAddServiceInstanceStepTwoCtrl,
                    scope: $scope,
                    resolve: {
                        serviceDetails: function () {
                            return $scope.serviceDetails;
                        }
                    }
                });
                */
                //$scope.serviceID = serviceID
                //$state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
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
                //$scope.serviceDetails = fakeAPI_Service(serviceID)[serviceID]
                //makeListOfserviceCanAccess($scope.serviceDetails)
                //$state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
            });

    };

    $scope.discard_sct = function () {
        $( "#foreign_login_step_1" ).hide( "scale", "fast", function() {
            // Animation complete.
            //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
        });
        $( "#sct_view" ).hide( "scale", "fast", function() {
            // Animation complete.
            //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
        });

        $( "#addService_3" ).show( "scale", "fast", function() {
            // Animation complete.
            //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
        });
        $( "#addService_1" ).hide( "scale", "fast", function() {
            // Animation complete.
            //$state.current.data.pageTitle = $scope.serviceDetails.name + "Login"
        });
        /*
        var modalInstanceThree = $modal.open({
            templateUrl: 'views/addServiceStepThreeModal.html',
            windowClass: "animated fadeIn addServiceModalPos",
            controller: ModalAddServiceInstanceStepThreeCtrl,
            scope: $scope,
            resolve: {
                serviceDetails: function () {
                    return $scope.serviceDetails;
                }
            }
        });
        */
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
            //$scope.serviceDetails = fakeAPI_Service(serviceID)[serviceID]
            //makeListOfserviceCanAccess($scope.serviceDetails)
            //$state.current.data.pageTitle = "Service's Details > " + $scope.serviceDetails.name
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

                    //$scope.servicesCanAccess.push(d)
                    //$scope.servicesCanAccess.push(data[id])

                    if (obj.role === 'Sink' || obj.role === 'Both') {
                        $scope.sinkServicesCanAccess.push(data[id]);
                        //console.log("Length of sinkServicesCanAccess: " + $scope.sinkServicesCanAccess.length);
                        $scope.noSinkServices = false;
                    }
                    if (obj.role === 'Source' || obj.role === 'Both') {
                        $scope.sourceServicesCanAccess.push(data[id]);
                        //console.log("Length of sourceServicesCanAccess: " + $scope.sourceServicesCanAccess.length);
                        $scope.noSourceServices = false;
                    }
                }).
                error(function(data, status, headers, config) {
                    //$scope.servicesCanAccess.push(fakeAPI_Service(id)[id])
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
            //$scope.availableServices = {
            //    "212223":
            //    {
            //        "name": "s-group",
            //        "img_url_overview": "assets/img/services/s-group_l.png",
            //        "description": "Short description of the service written by the provider"
            //    },
            //    "123123":
            //    {
            //        "name": "myfitnesspal",
            //        "img_url_overview": "assets/img/services/myfitnesspal_l.png",
            //        "description": "Short description of the service written by the provider"
            //    },
            //    "413123":
            //    {
            //        "name": "if-insurance",
            //        "img_url_overview": "assets/img/services/if-insurance_l.png",
            //        "description": "Short description of the service written by the provider"
            //    },
            //}
        });

    $scope.loadMore = function() {
        var ref = ['s-group', 'myfitnesspal', 'if-insurance'][randomR(0,3)]
        var id = random(100000,999999)
        var imgUrl = "assets/img/services/" + ref + "_l.png"
        for (var i = 0; i < 2; i++) {
            $scope.availableServices[id] = {
                "name": ref,
                "img_url_overview": imgUrl,
                "description": "Short description of the service written by the provider"
            }
        }
    };

}

function DiscoveryCtrl ($scope, $http) {
    var fakeServices = {
        "212223":
        {
            "name": "s-group",
            "img_url_overview": "assets/img/services/s-group_l.png",
            "description": "Short description of the service written by the provider",
            "categories":["Food", "Health"],
            "labels":["popular"]
        },
        "123123":
        {
            "name": "myfitnesspal",
            "img_url_overview": "assets/img/services/myfitnesspal_l.png",
            "description": "Short description of the service written by the provider",
            "categories":["Health", 'Fitness'],
            "labels":["popular", 'new']
        },
        "413123":
        {
            "name": "if-insurance",
            "img_url_overview": "assets/img/services/if-insurance_l.png",
            "description": "Short description of the service written by the provider",
            "categories":["Health"],
            "labels":["popular"]
        },
        "613123":
        {
            "name": "polarflow",
            "img_url_overview": "assets/img/services/polarflow_l.png",
            "description": "Short description of the service written by the provider",
            "categories":["Food", "Health", 'Fitness'],
            "labels":['new']
        },
        "419123":
        {
            "name": "basis",
            "img_url_overview": "assets/img/services/basis_l.png",
            "description": "Short description of the service written by the provider",
            "categories":["Food", "Health"],
            "labels":['new']
        },
    }

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

        // sortedServices['newServices'] = newServices
        // sortedServices['popularServices'] = popularServices

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
            //console.log(angular.toJson($scope.sortedListofService, true));
        }
        ).error(function(data){
            //$scope.sortedListofService = compileAsGroup(fakeServices)
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
