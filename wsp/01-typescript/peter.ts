type Person ={
    name: string;
    age: number;
    students: ({
        name: string;
        age: number;
        exercises?: undefined;
    } | {
        name: string;
        age: number;
        exercises: {
            score: number;
            date: Date;
        }[];
    })[];
}

type Exercise = { 
  score: number; 
  date: Date 
};

interface IStudent {
  name: string;   
  age: number;
  exercises?: Exercise[];
}

interface ITeacher {
  name: string;   
  age: number;
  students: Array<IStudent>;
}





const peter:Person = {
    name: "Peter",
    age: 50,
    students: [
      { name: "Andy", age: 20 },
      { name: "Bob", age: 23 },
      {
        name: "Charlie",
        age: 25,
        exercises: [{ score: 60, date: new Date("2019-01-05") }],
      },
    ],
  };