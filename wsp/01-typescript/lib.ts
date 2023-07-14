// **Another format
//  type Lib = ...


export const lib: {
    someObject: string,
    someFunction: () => string
}
    = {
    someObject: "Hello World",
    someFunction:() => "Foobar",
};



//lib is a const , with a type of object, which has two properties, someObject and someFunction. the value of its properties are a string and a function respectively.