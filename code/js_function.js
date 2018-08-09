let curry = require('lodash').curry;

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

// 1、找出 age>5 的 animal
// 2、分别找出 age>4，age>5，age>6，age>7 的 animal
// 3、找出 age>5 且 sex===male 且 species===ca t的 animal
// 4、根据age、sex、species的值的不同组合筛选animal


