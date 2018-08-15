const R = require('ramda');
const curry = R.curry;
let animals = [
	{name:'duck2', species:'duck', age:2, sex:'male'},
	{name:'cat1', species:'cat', age:2, sex:'male'},
	{name:'dog1', species:'dog', age:2, sex:'male'},
	{name:'rabit1', species:'rabit', age:6, sex:'male'},
	{name:'dog2', species:'dog', age:2, sex:'female'},
	{name:'dog3', species:'dog', age:5, sex:'male'},
	{name:'duck1', species:'duck', age:3, sex:'male'},
	{name:'cat3', species:'cat', age:8, sex:'male'},
	{name:'rabit2', species:'rabit', age:5, sex:'male'},
	{name:'cat2', species:'cat', age:5, sex:'male'},
	{name:'rabit3', species:'rabit', age:2, sex:'female'}
];

let judge = curry(function(prop, standard, animal){
	if(prop==='age'){
		return animal[prop] > standard;
	}else{
		return animal[prop] === standard;
	}
});

console.log(animals.filter(judge('age')(1)));
console.log(animals.filter(judge('species')('dog')));
console.log(animals.filter(judge('sex')('male')));


