const MAX_ACCELERATION = 1000;

function calculateMotorSpeeds(xAcceleration: number, yAcceleration: number): [number, number] {
    let leftMotorSpeed = xAcceleration;
    let rightMotorSpeed = xAcceleration;

    if (yAcceleration < 0) {
        yAcceleration = 0 - yAcceleration;

        if (yAcceleration > MAX_ACCELERATION) {
            leftMotorSpeed = xAcceleration * (MAX_ACCELERATION - yAcceleration) / MAX_ACCELERATION;
        } else {
            rightMotorSpeed = xAcceleration * (MAX_ACCELERATION - yAcceleration) / MAX_ACCELERATION;
        }
    }

    return [leftMotorSpeed, rightMotorSpeed];
}

basic.forever(function () {
    let xAcceleration = input.acceleration(Dimension.X);
    let yAcceleration = input.acceleration(Dimension.Y);

    let [leftMotorSpeed, rightMotorSpeed] = calculateMotorSpeeds(xAcceleration, yAcceleration);

    radio.sendNumber(leftMotorSpeed * 1000 + rightMotorSpeed);

    basic.pause(1);
});

radio.onReceivedNumber(function (receivedNumber: number) {
    let leftMotorSpeed = Math.floor(receivedNumber / 1000);
    let rightMotorSpeed = receivedNumber % 1000;
    PCAmotor.MotorRun(PCAmotor.Motors.M1, leftMotorSpeed);
    PCAmotor.MotorRun(PCAmotor.Motors.M4, rightMotorSpeed);
});

input.onButtonPressed(Button.AB, function () {
    PCAmotor.MotorStopAll();
});

radio.onReceivedNumber(function (receivedNumber: number) {
    let L = Math.floor(receivedNumber / 1000)
    let R = receivedNumber % 1000
    PCAmotor.MotorRun(PCAmotor.Motors.M1, L)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, R)
})

input.onButtonPressed(Button.AB, function () {
    PCAmotor.MotorStopAll()
})