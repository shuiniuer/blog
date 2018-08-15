const R = require('ramda');
const compose = R.compose;
let head = function(x) {
	return x[0];
};
let reverse = R.reduce(function(acc, x) {
	return [x].concat(acc);
}, []);
let toUpperCase = function(x) {
	return x.toUpperCase();
};
let exclaim = function(x) {
	return x + '!';
};
let arr = ['jumpkick', 'roundhouse', 'uppercut'];

// compose1
// let loudLastUpper = compose(exclaim, toUpperCase, head, reverse);
// console.log(loudLastUpper(arr));

// compose2
// let last = compose(head, reverse);
// let loudLastUpper = compose(exclaim, toUpperCase, last);
// console.log(loudLastUpper(arr));

// compose3
let last = compose(head, reverse);
let angry = compose(exclaim, toUpperCase);
let loudLastUpper = compose(angry, last);
console.log(loudLastUpper(arr));