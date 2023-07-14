function leapYear(year: number): boolean {
    if (year % 400 === 0) {
      console.log("Leap Year");
      return true;
    } else if (year % 100 === 0) {
      console.log("Not a Leap Year");
      return false;
    } else if (year % 4 === 0) {
      console.log("Leap Year");
      return true;
    } else {
      console.log("Not a Leap Year");
      return false;
    }
  }