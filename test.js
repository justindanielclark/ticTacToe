function Person(name){
    this.name = name;
}

const Justin = new Person('Justin');
const Natasha = new Person('Natasha');
const Vladimir = new Person('Vladimir');
const Alex = new Person('Alex'); 
const Katrina = new Person('Katrina');

let Persons = [Justin, Natasha, Vladimir, Katrina];

let indexOf = Persons.indexOf(Vladimir)

if(indexOf !== -1){
    Persons.splice(indexOf, 1);
}
console.log(Persons);