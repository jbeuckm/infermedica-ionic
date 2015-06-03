angular.module('infermedica.services', []).service('Infermedica', function ($q, $http) {

    var _app_id, _app_key;

    var server = "https://api.infermedica.com/v1";

    return {

        init: function (app_id, app_key) {
            _app_id = app_id;
            _app_key = app_key;
        },

        observations: function () {

            var req = {
                method: 'GET',
                url: server + "/observations",
                headers: {
                    'Content-Type': 'application/json',
                    app_id: _app_id,
                    app_key: _app_key
                }
            }

            return $http(req);

        }

    };
});