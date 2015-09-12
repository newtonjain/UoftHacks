console.log('I am here');
//myo connection
var currentPose;
var Myo = require('../template/entry'),
    hub = new Myo.Hub();
    //Myo.setLockingPolicy("none");

hub.on('ready', function() { console.log('ready'); });
hub.on('connect', function() { console.log('connected'); });
hub.on('disconnect', function() { console.log('disconnect'); });
hub.on('frame', function(frame) {
    console.dir(frame);

    if (frame.rotation) {
       console.log(frame.rotation.toString());
    }

    if (frame.pose && frame.pose.valid) {
       console.log(frame.pose.toString());
    }
    
});
hub.on('pose', function(pose) {
    currentPose = pose;
    
    switch(currentPose.type) {
        //Fist
        case currentPose.POSE_FIST:
            console.log("fist");
            break;
        //Wave in
        case currentPose.POSE_WAVE_IN:
            console.log("wave in");
            break;

        //Wave out
        case currentPose.POSE_WAVE_OUT:
            console.log("wave out");
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

// var MyoJS = require('./../index'),
//     hub = new Myo.Hub(),
//     checkConnection;

// hub.on('ready', function() { console.log('ready'); });
// hub.on('connect', function() { console.log('connected'); });
// hub.on('disconnect', function() { console.log('disconnect'); });
// hub.on('frame', function(frame) {
//     setInterval(function() {
//     console.log(frame.rotation.toString());
//     console.log(frame.accel.toString());
//     console.log(frame.gyro.toString());
//     }, 4000);
// });

// checkConnection = setInterval(function() {
//     if(hub.connection.connected) {
//         clearInterval(checkConnection);
//     } else {
//         console.log('Waiting for connection...');
//     }
// }, 1000);