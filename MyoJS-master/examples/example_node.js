console.log('I am here');


var arDrone = require('ar-drone');
var client  = arDrone.createClient();
// client.createRepl();

// //var pngStream = arDrone.createClient().getPngStream();
// client.disableEmergency();

//var pngStream = client.getPngStream();

var lastPng;
// pngStream
//   .on('error', console.log)
//   .on('data', function(pngBuffer) {
//     lastPng = pngBuffer;
//   });


/////////////////////////////////////////
//myo connection
var currentPose;
var Myo = require('../template/entry'),
    hub = new Myo.Hub();
    //Myo.setLockingPolicy("none");

hub.on('ready', function() { console.log('ready'); });
hub.on('connect', function() { console.log('connected'); });
hub.on('disconnect', function() { console.log('disconnect'); });

hub.on('pose', function(pose) {
    currentPose = pose;
    
    switch(currentPose.type) {
        //Fist
        case currentPose.POSE_FIST:

            console.log("fist");
            client.stop();
            break;
        //Wave in
        case currentPose.POSE_WAVE_IN:
            console.log("wave in");
            client.land();
            break;

        //Wave out
        case currentPose.POSE_WAVE_OUT:
            console.log("wave out");
            client.takeoff();
            break;

        //Finger spread
        case currentPose.POSE_FINGERS_SPREAD:
            console.log("fingers spreading");
            //console.log("#HackitShipIt");
            break;

        //Twist in
        case currentPose.POSE_TWIST_IN:
            console.log("twist in");
            break;


        //Nothing
        case currentPose.POSE_NONE:
        console.log('none pose');
        default:
	        console.log("rest")
	           
            break;
    }

});

// server.listen(8080, function() {
//   console.log('Serving latest png on port 8080 ...');
//   console.log('Taking off');
//   // client.takeoff();

//   // client
//   //   .after(5000, function() {
//   //     this.stop();
//   //   })
//   //   .after(1000, function() {
//   //     this.stop();
//   //     this.land();
//   //   });

// });

