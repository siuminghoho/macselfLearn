//promosify is a function that takes a function that takes a callback and returns a promise


//callback api


import fs from 'fs' ;

fs.readFile('xxx.txt', (err, data) => {

if(err){
    console.log(err);
}else{
    console.log(data.toString());


}
})
