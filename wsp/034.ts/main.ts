
class Student {
    //Fields/Attributes/property
    name: string
    age: number
    learningLevel: number


    constructor(name: string, age: number) {
        //this is a private locker
        this.name = name
        this.age = age
        this.learningLevel = 0
    }

    //Methods    
    learn(hourSpent: number) {
        this.learningLevel += hourSpent * 0.3
    }

    slack(hourSpent: number) {
        this.learningLevel -= hourSpent * 0.1
    }



}




const bob: Student = new Student("Bob", 20)
console.log(bob)

bob.learn(3)

console.log(bob)

//Coding student is a student
//But student may not be a coding student
class CodingStudent extends Student {

    constructor(name: string, age: number) {
        super(name, age)
        this.learningLevel = 15;


    }
    //override super's method learn
    learn(hourSpent: number) {
        this.learningLevel += hourSpent * 0.5
    }

    slack(hourSpent: number) {
        super.slack(hourSpent)
        this.learningLevel -= hourSpent * 0.3
    }

    readReddit(hourSpent: number) {
        this.learningLevel += hourSpent * 0.2
    }
}





const peter = new CodingStudent("Peter", 25)

peter.learn(3)


peter.slack(2)

peter.readReddit(2)

console.log(peter)




class TeckyStudent extends CodingStudent {

    slack(hourSpent: number) {
        this.learningLevel -= hourSpent * 0.8

    }
}

const tony = new TeckyStudent("Tony", 30)

tony.learn(5)
tony.slack(3)

console.log(tony)