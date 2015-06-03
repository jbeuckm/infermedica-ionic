angular.module('infermedica.services', []).service('Infermedica', function ($q, $http) {

    var _app_id, _app_key;

    var server = "https://api.infermedica.com/v1";

    function defaultHeaders() {
        return {
            'Content-Type': 'application/json',
            app_id: _app_id,
            app_key: _app_key
        };
    }

    return {

        init: function (app_id, app_key) {
            _app_id = app_id;
            _app_key = app_key;
        },

        lookup: function (phrase, sex) {


            var req = {
                method: 'GET',
                url: server + "/lookup",
                headers: defaultHeaders(),
                params: {
                    sex: sex,
                    phrase: phrase
                }
            }

            return $http(req);


        },

        observations: function () {

            var req = {
                method: 'GET',
                url: server + "/observations",
                headers: defaultHeaders()
            }

            return $http(req);

        },
        
        diagnosis : function(age, sex, evidence) {
            
            var req = {
                method: 'POST',
                url: server + "/diagnosis",
                headers: defaultHeaders(),
                data: {
                    sex: sex,
                    age: age,
                    evidence: evidence
                }
            }

            return $http(req);

        }

    };
});