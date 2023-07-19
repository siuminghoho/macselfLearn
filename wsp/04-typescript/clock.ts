// Instructions

// Implement a clock that handles times without dates.

// You should be able to add and subtract minutes to it.

// Two clocks that represent the same time should be equal to each other.


class Clock{
    // public minutes:number;
    // public hours:number;
    
    constructor (public minutes:number,public hours:number){
        this.minutes = minutes;
        this.hours = hours;
    }

}

const ClockA = new Clock(0,1)
const CLockB = new Clock(0,0)
console.log(`the clockA time is ${ClockA.minutes} minutes and ${ClockA.hours} hours`)

function timeAdjust(minutes:number,hours:number){


}


// while(){


// }