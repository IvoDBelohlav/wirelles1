

radio.onReceivedNumber(function (receivedNumber: number) {
    let L = Math.floor(receivedNumber / 1000)
    let R = receivedNumber % 1000
    PCAmotor.MotorRun(PCAmotor.Motors.M1, L)
   PCAmotor.MotorRun(PCAmotor.Motors.M4, R - 60)
})

input.onButtonPressed(Button.AB, function () {
   PCAmotor.MotorStopAll()
   })
