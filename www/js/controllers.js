angular.module('IonicBT.controllers', [])

.controller('BTController', function($scope) {
    $scope.btEnabled = false;
    $scope.connected = false;
    $scope.isLEDOn = false;
    $scope.macAddress = '20:13:06:13:41:02';

    $scope.enableBluetooth = function() {
        $scope.btEnabled = !$scope.btEnabled;

        if ($scope.btEnabled) {
            bluetoothSerial.enable(
                function () {
                    $scope.log("Bluetooth is enabled");
                },
                function () {
                    $scope.log("Bluetooth is not enabled");
                    $scope.btEnabled = false;
                }
             );
        }
    };

    $scope.connect = function() {
        if ($scope.btEnabled) {
            $scope.connected = !$scope.connected;

            if ($scope.connected) {
                bluetoothSerial.connect(
                    $scope.macAddress,
                    $scope.openPort,
                    $scope.log
                );
            }
            else {
                $scope.closePort();
            }
        }
    };

    $scope.openPort = function() {
        $scope.log("Connected to: " + $scope.macAddress);

        bluetoothSerial.subscribe('\n', function (data) {
            $scope.log(data);
        });
    };

    $scope.closePort = function() {
        $scope.log("Disconnected from: " + $scope.macAddress);

        bluetoothSerial.unsubscribe(
            function (data) {
                $scope.log(data);
            },
            $scope.log
        );
    }

    $scope.log = function(msg) {
        console.log(msg);
    }

    $scope.toggleLED = function() {
        if ($scope.btEnabled && $scope.connected)
        {
            $scope.isLEDOn = !$scope.isLEDOn;

            if ($scope.isLEDOn) {
                bluetoothSerial.write('1');
            }
            else {
                bluetoothSerial.write('0');
            }
        }
        else {
            $scope.log('Bluetooth not enabled or connected');
        }
    }
})
