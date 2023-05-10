basic.forever(function () {
    let x = input.acceleration(Dimension.Y) 
    let y = input.acceleration(Dimension.X)
    let z = input.acceleration(Dimension.Z)

    let pwr = x
    let R = 0
    let L = 0

    if (y < 0) {
        y = 0 - y
        let max = 1024
        if (y > max) {
            y = max
            R = pwr
            L = pwr * (max - y) / max
        } else {
            R = pwr * (max - y) / max
            L = pwr
        }
    }

    radio.sendNumber(L*1000 +R)


    basic.pause(1)
})


radio.onReceivedNumber(function (receivedNumber: number) {
    let L = Math.floor(receivedNumber / 1000)
    let R = receivedNumber % 1000
    PCAmotor.MotorRun(PCAmotor.Motors.M1, L)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, R)
})

//input.onButtonPressed(Button.AB, function () {
   // PCAmotor.MotorStopAll()
//})
