# Javascript函数式编程2：Ramda 函数库介绍

## 简介及特性
在学习curry（柯里化）过程中，在示例代码中使用到了`Ramda.js`。

`Ramda.js`是一个很重要的库，提供了许多有用的方法，每个`JavaScript`程序员都应该掌握这个工具。。

`Ramda.js`有以下两个特点：

- "**function first，data last**"，数据一律放在最后一个参数。

```
var R = require('ramda');
R.map(square, [4, 8]) // [16, 64]
```
为什么要这样呢？？？

- "**All is curried**"，所有方法都支持柯里化。

也就是说`Ramda.js`所有多参数的函数，默认都可以单参数使用。

```
// 写法一
R.map(square, [4, 8])

// 写法二
R.map(square)([4, 8])
// 或者
var mapSquare = R.map(square);
mapSquare([4, 8]);
```
上面代码中，写法一是多参数版本，写法二是柯里化以后的单参数版本。Ramda 都支持，并且推荐使用第二种写法。

由于这两个特点，使得 Ramda 成为 JavaScript 函数式编程最理想的工具库。今天，我先介绍它的 API，后面再介绍这些方法如何用于实战。

## 一、比较运算
`gt`：判断第一个参数是否大于第二个参数。

```
R.gt(2)(1) // true
R.gt('a')('z') // false
```
`gte`：判断第一个参数是否大于等于第二个参数。

```
R.gte(2)(2) // true
R.gte('a')('z') // false
```
`lt`：判断第一个参数是否小于第二个参数。

```
R.lt(2)(1) // false
R.lt('a')('z') // true
```
`lte`：判断第一个参数是否小于等于第二个参数。

```
R.lte(2)(2) // true
R.lte('a')('z') // true
```
`equals`：比较两个值是否相等（支持对象的比较）。

```
R.equals(1)(1) // true
R.equals(1)('1') // false
R.equals([1, 2, 3])([1, 2, 3]) // true

var a = {}; 
a.v = a;
var b = {}; 
b.v = b;
R.equals(a)(b)
// true
```
`eqBy`：比较两个值传入指定函数的运算结果是否相等。

```
R.eqBy(Math.abs, 5)(-5)
// true
```

## 二、数学运算
`add`：返回两个值的和。

```
R.add(7)(10) // 17
```
`subtract`：返回第一个参数减第二个参数的差。

```
R.subtract(10)(8) // 2
```
`multiply`：返回两个值的积。

```
R.multiply(2)(5)  // 10
```
`divide`：返回第一个参数除以第二个参数的商。

```
R.divide(71)(100) // 0.71
```

## 三、逻辑运算
`either`：接受两个函数作为参数，只要有一个返回`true`，就返回`true`，否则返回`false`。相当于`||`运算。

```
var gt10 = x => x > 10;
var even = x => x % 2 === 0;

var f = R.either(gt10, even);
f(101) // true
f(8) // true
```
`both`：接受两个函数作为参数，只有它们都返回`true`，才返回`true`，否则返回`false`，相当于&&运算。

```
var gt10 = x => x > 10;
var even = x => x % 2 === 0;

var f = R.both(gt10, even);
f(15) // false
f(30) // true
```
`allPass`：接受一个函数数组作为参数，只有它们都返回`true`，才返回`true`，否则返回`false`。

```
var gt10 = x => x > 10;
var even = x => x % 2 === 0;

var isEvenAndGt10 = R.allPass([gt10, even]);
isEvenAndGt10(15) // false
isEvenAndGt10(30) // true
```

## 四、字符串
`split`：按照指定分隔符将字符串拆成一个数组。

```
R.split('.')('a.b.c.xyz.d')
// ['a', 'b', 'c', 'xyz', 'd']
```
`test`：判断一个字符串是否匹配给定的正则表达式。

```
R.test(/^x/)('xyz')
// true

R.test(/^y/)('xyz')
// false
```
`match`：返回一个字符串的匹配结果。

```
R.match(/([a-z]a)/g)('bananas')
// ['ba', 'na', 'na']

R.match(/a/)('b')
// []

R.match(/a/)(null)
// TypeError: null does not have a method named "match"
```
## 五、函数
###5.1 函数的合成
`compose`：将多个函数合并成一个函数，从右到左执行。

```
R.compose(Math.abs, R.add(1), R.multiply(2))(-4) // 7
```
`pipe`：将多个函数合并成一个函数，从左到右执行。

```
var negative = x => -1 * x;
var increaseOne = x => x + 1;

var f = R.pipe(Math.pow, negative, increaseOne);
f(3, 4) // -80 => -(3^4) + 1
```
`converge`：接受两个参数，第一个参数是函数，第二个参数是函数数组。传入的值先使用第二个参数包含的函数分别处理以后，再用第一个参数处理前一步生成的结果。

```
var sumOfArr = arr => {
  var sum = 0;
  arr.forEach(i => sum += i);
  return sum;
};
var lengthOfArr = arr => arr.length;

var average = R.converge(R.divide, [sumOfArr, lengthOfArr])
average([1, 2, 3, 4, 5, 6, 7])
// 4
// 相当于 28 除以 7

var toUpperCase = s => s.toUpperCase();
var toLowerCase = s => s.toLowerCase();
var strangeConcat = R.converge(R.concat, [toUpperCase, toLowerCase])
strangeConcat("Yodel")
// "YODELyodel"
// 相当于 R.concat('YODEL', 'yodel')
```

### 5.2 柯里化
`curry`：将多参数的函数，转换成单参数的形式。

```
var addFourNumbers = (a, b, c, d) => a + b + c + d;

var curriedAddFourNumbers = R.curry(addFourNumbers);
var f = curriedAddFourNumbers(1, 2);
var g = f(3);
g(4) // 10
```
`partial`：允许多参数的函数接受一个数组，指定最左边的部分参数。

```
var multiply2 = (a, b) => a * b;
var double = R.partial(multiply2, [2]);
double(2) // 4

var greet = (salutation, title, firstName, lastName) =>
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

var sayHello = R.partial(greet, ['Hello']);
var sayHelloToMs = R.partial(sayHello, ['Ms.']);
sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
```
`partialRight`：与partial类似，但数组指定的参数为最右边的参数。

```
var greet = (salutation, title, firstName, lastName) =>
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
greetMsJaneJones('Hello') // 'Hello, Ms. Jane Jones!'
```
`useWith`：接受一个函数fn和一个函数数组fnList作为参数，返回fn的柯里化版本。该新函数的参数，先分别经过对应的fnList成员处理，再传入fn执行。

```
var decreaseOne = x => x - 1;
var increaseOne = x => x + 1;

R.useWith(Math.pow, [decreaseOne, increaseOne])(3, 4) // 32
R.useWith(Math.pow, [decreaseOne, increaseOne])(3)(4) // 32
```
`memoize`：返回一个函数，会缓存每一次的运行结果。

```
var productOfArr = arr => {
  var product = 1;
  arr.forEach(i => product *= i);
  return product;
};
var count = 0;
var factorial = R.memoize(n => {
  count += 1;
  return productOfArr(R.range(1, n + 1));
});
factorial(5) // 120
factorial(5) // 120
factorial(5) // 120
count // 1
```
`complement`：返回一个新函数，如果原函数返回`true`，该函数返回`false`；如果原函数返回`false`，该函数返回`true`。

```
var gt10 = x => x > 10;
var lte10 = R.complement(gt10);
gt10(7) // false
lte10(7) // true
```

### 5.3 函数的执行
`binary`：参数函数执行时，只传入最前面两个参数。

```
var takesThreeArgs = function(a, b, c) {
  return [a, b, c];
};

var takesTwoArgs = R.binary(takesThreeArgs);
takesTwoArgs(1, 2, 3) // [1, 2, undefined]
```
`tap`：将一个值传入指定函数，并返回该值。

```
var sayX = x => console.log('x is ' + x);
R.tap(sayX)(100) // 100

R.pipe(
  R.assoc('a', 2),
  R.tap(console.log),
  R.assoc('a', 3)
)({a: 1})
// {a: 3}
```
`zipWith`：将两个数组对应位置的值，一起作为参数传入某个函数。

```
var f = (x, y) => {
  // ...
};
R.zipWith(f, [1, 2, 3])(['a', 'b', 'c'])
// [f(1, 'a'), f(2, 'b'), f(3, 'c')]
```
`apply`：将数组转成参数序列，传入指定函数。

```
var nums = [1, 2, 3, -99, 42, 6, 7];
R.apply(Math.max)(nums) // 42
```
`applySpec`：返回一个模板函数，该函数会将参数传入模板内的函数执行，然后将执行结果填充到模板。

```
var getMetrics = R.applySpec({
  sum: R.add,
  nested: { mul: R.multiply }
});

getMetrics(2, 4) // { sum: 6, nested: { mul: 8 } }
```
`ascend`：返回一个升序排列的比较函数，主要用于排序。

```
var byAge = R.ascend(R.prop('age'));
var people = [
  // ...
];
var peopleByYoungestFirst = R.sort(byAge)(people);
```
`descend`：返回一个降序排列的比较函数，主要用于排序。

```
var byAge = R.descend(R.prop('age'));
var people = [
  // ...
];
var peopleByOldestFirst = R.sort(byAge)(people);
```

## 六、数组
### 6.1 数组的特征判断
`contains`：如果包含某个成员，返回true。

```
R.contains(3)([1, 2, 3]) // true
R.contains(4)([1, 2, 3]) // false
R.contains({ name: 'Fred' })([{ name: 'Fred' }]) // true
R.contains([42])([[42]]) // true
```
`all`：所有成员都满足指定函数时，返回true，否则返回false

```
var equals3 = R.equals(3);
R.all(equals3)([3, 3, 3, 3]) // true
R.all(equals3)([3, 3, 1, 3]) // false
```
`any`：只要有一个成员满足条件，就返回true。

```
var lessThan0 = R.flip(R.lt)(0);
var lessThan2 = R.flip(R.lt)(2);
R.any(lessThan0)([1, 2]) // false
R.any(lessThan2)([1, 2]) // true
```
`none`：没有成员满足条件时，返回true。

```
var isEven = n => n % 2 === 0;

R.none(isEven)([1, 3, 5, 7, 9, 11]) // true
R.none(isEven)([1, 3, 5, 7, 8, 11]) // false
```
### 6.2 数组的截取和添加
`head`：返回数组的第一个成员。

```
R.head(['fi', 'fo', 'fum']) // 'fi'
R.head([])  // undefined
R.head('abc') // 'a'
R.head('') // ''
```
`last`：返回数组的最后一个成员。

```
R.last(['fi', 'fo', 'fum']) // 'fum'
R.last([]) // undefined
R.last('abc') // 'c'
R.last('') // ''
```
`tail`：返回第一个成员以外的所有成员组成的新数组。

```
R.tail([1, 2, 3])  // [2, 3]
R.tail([1, 2])     // [2]
R.tail([1])        // []
R.tail([])         // []

R.tail('abc')  // 'bc'
R.tail('ab')   // 'b'
R.tail('a')    // ''
R.tail('')     // ''
```
`init`：返回最后一个成员以外的所有成员组成的新数组。

```
R.init([1, 2, 3])  // [1, 2]
R.init([1, 2])     // [1]
R.init([1])        // []
R.init([])         // []

R.init('abc')  // 'ab'
R.init('ab')   // 'a'
R.init('a')    // ''
R.init('')     // ''
```
`nth`：取出指定位置的成员。

```
var list = ['foo', 'bar', 'baz', 'quux'];
R.nth(1)(list) // 'bar'
R.nth(-1)(list) // 'quux'
R.nth(-99)(list) // undefined

R.nth(2)('abc') // 'c'
R.nth(3)('abc') // ''
```
`take`：取出前 n 个成员。

```
R.take(1)(['foo', 'bar', 'baz']) // ['foo']
R.take(2)(['foo', 'bar', 'baz']) // ['foo', 'bar']
R.take(3)(['foo', 'bar', 'baz']) // ['foo', 'bar', 'baz']
R.take(4)(['foo', 'bar', 'baz']) // ['foo', 'bar', 'baz']
R.take(3)('ramda')               // 'ram'
```
`takeLast`：取出后 n 个成员。

```
R.takeLast(1)(['foo', 'bar', 'baz']) // ['baz']
R.takeLast(2)(['foo', 'bar', 'baz']) // ['bar', 'baz']
R.takeLast(3)(['foo', 'bar', 'baz']) // ['foo', 'bar', 'baz']
R.takeLast(4)(['foo', 'bar', 'baz']) // ['foo', 'bar', 'baz']
R.takeLast(3)('ramda')               // 'mda'
```
`slice`：从起始位置（包括）开始，到结束位置（不包括）为止，从原数组截取出一个新数组。

```
R.slice(1, 3)(['a', 'b', 'c', 'd']) // ['b', 'c']
R.slice(1, Infinity)(['a', 'b', 'c', 'd']) // ['b', 'c', 'd']
R.slice(0, -1)(['a', 'b', 'c', 'd']) // ['a', 'b', 'c']
R.slice(-3, -1)(['a', 'b', 'c', 'd']) // ['b', 'c']
R.slice(0, 3)('ramda') // 'ram'
```
`remove`：移除开始位置后的n个成员。

```
R.remove(2, 3)([1,2,3,4,5,6,7,8]) // [1,2,6,7,8]
insert：在指定位置插入给定值。


R.insert(2, 'x')([1,2,3,4]) // [1,2,'x',3,4]
insertAll：在指定位置，插入另一个数组的所有成员。


R.insertAll(2，['x','y','z'])([1,2,3,4]) // [1,2,'x','y','z',3,4]
```
`prepend`：在数组头部插入一个成员

```
R.prepend('fee')(['fi', 'fo', 'fum'])
// ['fee', 'fi', 'fo', 'fum']
```
`append`：在数组尾部追加新的成员。

```
R.append('tests')(['write', 'more']) // ['write', 'more', 'tests']
R.append('tests')([]) // ['tests']
R.append(['tests'])(['write', 'more']) // ['write', 'more', ['tests']]
```
`intersperse`：在数组成员之间插入表示分隔的成员。

```
R.intersperse('n')(['ba', 'a', 'a'])
// ['ba', 'n', 'a', 'n', 'a']
```
`join`：将数组合并成一个字符串，并在成员之间插入分隔符。

```
R.join('|')([1, 2, 3]) // '1|2|3'
```

### 6.3 数组的过滤
`filter`：过滤出符合条件的成员。

```
var isEven = n => n % 2 === 0;
R.filter(isEven)([1, 2, 3, 4]) // [2, 4]
```
`reject`：过滤出所有不满足条件的成员。

```
var isOdd = (n) => n % 2 === 1;
R.reject(isOdd)([1, 2, 3, 4]) // [2, 4]
```
`takeWhile`： 一旦满足条件，后面的成员都会被过滤。

```
var isNotFour = x => x !== 4;
R.takeWhile(isNotFour)([1, 2, 3, 4, 3, 2, 1]) // [1, 2, 3]
```
`dropWhile`：一旦不满足条件，取出剩余的所有成员。

```
var lteTwo = x => x <= 2;
R.dropWhile(lteTwo)([1, 2, 3, 4, 3, 2, 1])
// [3, 4, 3, 2, 1]
```
`without`：返回指定值以外的成员。

```
R.without([1, 2])([1, 2, 1, 3, 4])
// [3, 4]
```

### 6.4 单数组运算
`countBy`：对每个成员执行指定函数以后，返回一个对象，表示各种执行结果分别包含多少成员。

```
var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
R.countBy(Math.floor)(numbers)  // {'1': 3, '2': 2, '3': 1}

var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
R.countBy(R.toLower)(letters)  // {'a': 3, 'b': 2, 'c': 1}
```
`splitAt`：在给定位置，将原数组分成两个部分。

```
R.splitAt(1)([1, 2, 3]) // [[1], [2, 3]]
R.splitAt(5)('hello world') // ['hello', ' world']
R.splitAt(-1)('foobar') // ['fooba', 'r']
```
`splitEvery`：按照指定的个数，将原数组分成多个部分。

```
R.splitEvery(3)([1, 2, 3, 4, 5, 6, 7])
// [[1, 2, 3], [4, 5, 6], [7]]

R.splitEvery(3)('foobarbaz')
// ['foo', 'bar', 'baz']
```
`splitWhen`：以第一个满足指定函数的成员为界，将数组分成两个部分。

```
R.splitWhen(R.equals(2))([1, 2, 3, 1, 2, 3])
// [[1], [2, 3, 1, 2, 3]]
```
`aperture`：每个成员与其后给定数量的成员分成一组，这些组构成一个新的数组。

```
R.aperture(3)([1, 2, 3, 4, 5, 6, 7])
// [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]
```
`partition`：根据是否满足指定函数，将成员分区。

```
R.partition(R.contains('s'))(['sss', 'ttt', 'foo', 'bars'])
// => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
```
`indexOf`：某个值在数组中第一次出现的位置。

```
R.indexOf(3)([1,2,3,4]) // 2
R.indexOf(10)([1,2,3,4]) // -1
```
`lastIndexOf`：某个值在数组中最后一次出现的位置。

```
R.lastIndexOf(3)([-1,3,3,0,1,2,3,4]) // 6
R.lastIndexOf(10)([1,2,3,4]) // -1
```
`map`：数组的每个成员依次执行某个函数。

```
var double = x => x * 2;
R.map(double)([1, 2, 3]) // [2, 4, 6]
```
`mapIndexed`：与map类似，区别是遍历函数可以额外获得两个参数：索引位置和原数组。

```
var mapIndexed = R.addIndex(R.map);
mapIndexed(
  (val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']
)
// ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
```
`forEach`：数组的每个成员依次执行某个函数，总是返回原数组。

```
var printXPlusFive = x => console.log(x + 5);
R.forEach(printXPlusFive, [1, 2, 3]) // [1, 2, 3]
// logs 6
// logs 7
// logs 8
```
`reduce`：数组成员依次执行指定函数，每一次的运算结果都会进入一个累积变量。

```
var mySubtract = function (a, b) {
  return a - b;
};
R.reduce(mySubtract, 0)([1, 2, 3, 4]) // -10
```
`reduceRight`：与reduce类似，区别是数组成员从左到右执行。

```
R.reduceRight(R.subtract, 0)([1, 2, 3, 4]) // -2
```
`reduceWhile`：与reduce类似，区别是有一个判断函数，一旦数组成员不符合条件，就停止累积。

```
var isOdd = (acc, x) => x % 2 === 1;
var xs = [1, 3, 5, 60, 777, 800];
R.reduceWhile(isOdd, R.add, 0)(xs) // 9

var ys = [2, 4, 6];
R.reduceWhile(isOdd, R.add, 111)(ys) // 111
```
`sort`：按照给定函数，对数组进行排序。

```
var diff = function(a, b) { return a - b; };
R.sort(diff)([4,2,7,5])
// [2, 4, 5, 7]
```
`sortWith`：按照给定的一组函数，进行多重排序。

```
var alice = {
  name: 'alice',
  age: 40
};
var bob = {
  name: 'bob',
  age: 30
};
var clara = {
  name: 'clara',
  age: 40
};
var people = [clara, bob, alice];
var ageNameSort = R.sortWith([
  R.descend(R.prop('age')),
  R.ascend(R.prop('name'))
]);
ageNameSort(people); //=> [alice, clara, bob]
```
`adjust`：对指定位置的成员执行给定的函数。

```
R.adjust(R.add(10), 1)([1, 2, 3]) // [1, 12, 3]
R.adjust(R.add(10)，1)([1, 2, 3]) // [1, 12, 3]
```
`ap`：数组成员分别执行一组函数，将结果合成为一个新数组。

```
R.ap([R.multiply(2), R.add(3)])([1,2,3])
// [2, 4, 6, 4, 5, 6]

R.ap([R.concat('tasty '), R.toUpper])(['pizza', 'salad'])
// ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
```
`flatten`：将嵌套数组铺平。

```
R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```
`groupBy`：将数组成员依次按照指定条件两两比较，并按照结果将所有成员放入子数组。

```
R.groupWith(R.equals)([0, 1, 1, 2, 3, 5, 8, 13, 21])
// [[0], [1, 1], [2], [3], [5], [8], [13], [21]]

R.groupWith((a, b) => a % 2 === b % 2)([0, 1, 1, 2, 3, 5, 8, 13, 21])
// [[0], [1, 1], [2], [3, 5], [8], [13, 21]]

R.groupWith(R.eqBy(isVowel), 'aestiou')
//=> ['ae', 'st', 'iou']
```

### 6.5 双数组运算
`concat`：将两个数组合并成一个数组。

```
R.concat('ABC')('DEF') // 'ABCDEF'
R.concat([4, 5, 6])([1, 2, 3]) // [4, 5, 6, 1, 2, 3]
R.concat([])([]) // []
```
`zip`：将两个数组指定位置的成员放在一起，生成一个新数组。

```
R.zip([1, 2, 3])(['a', 'b', 'c'])
// [[1, 'a'], [2, 'b'], [3, 'c']]
```
`zipObj`：将两个数组指定位置的成员分别作为键名和键值，生成一个新对象。

```
R.zipObj(['a', 'b', 'c'])([1, 2, 3])
// {a: 1, b: 2, c: 3}
```
`xprod`：将两个数组的成员两两混合，生成一个新数组。

```
R.xprod([1, 2])(['a', 'b'])
// [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
`intersection`：返回两个数组相同的成员组成的新数组。

```
R.intersection([1,2,3,4], [7,6,5,4,3]) // [4, 3]
```
`intersectionWith`：返回经过某种运算，有相同结果的两个成员。

```
var buffaloSpringfield = [
  {id: 824, name: 'Richie Furay'},
  {id: 956, name: 'Dewey Martin'},
  {id: 313, name: 'Bruce Palmer'},
  {id: 456, name: 'Stephen Stills'},
  {id: 177, name: 'Neil Young'}
];
var csny = [
  {id: 204, name: 'David Crosby'},
  {id: 456, name: 'Stephen Stills'},
  {id: 539, name: 'Graham Nash'},
  {id: 177, name: 'Neil Young'}
];

R.intersectionWith(R.eqBy(R.prop('id'))，buffaloSpringfield)(csny)
// [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
```
`difference`：返回第一个数组不包含在第二个数组里面的成员。

```
R.difference([1,2,3,4])([7,6,5,4,3]) // [1,2]
R.difference([7,6,5,4,3])([1,2,3,4]) // [7,6,5]
R.difference([{a: 1}, {b: 2}])([{a: 1}, {c: 3}]) // [{b: 2}]
```
`differenceWith`：返回执行指定函数后，第一个数组里面不符合条件的所有成员。

```
var cmp = (x, y) => x.a === y.a;
var l1 = [{a: 1}, {a: 2}, {a: 3}];
var l2 = [{a: 3}, {a: 4}];
R.differenceWith(cmp, l1)(l2) // [{a: 1}, {a: 2}]
```
`symmetricDifference`：返回两个数组的非共有成员所组成的一个新数组。

```
R.symmetricDifference([1,2,3,4])([7,6,5,4,3]) // [1,2,7,6,5]
R.symmetricDifference([7,6,5,4,3])([1,2,3,4]) // [7,6,5,1,2]
```
`symmetricDifferenceWith`：根据指定条件，返回两个数组所有运算结果不相等的成员所组成的新数组。

```
var eqA = R.eqBy(R.prop('a'));
var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
R.symmetricDifferenceWith(eqA, l1, l2) // [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
```

### 6.6 复合数组
`find`：返回符合指定条件的成员。

```
var xs = [{a: 1}, {a: 2}, {a: 3}];
R.find(R.propEq('a', 2))(xs) // {a: 2}
R.find(R.propEq('a', 4))(xs) // undefined
```
`findIndex`：返回符合指定条件的成员的位置。

```
var xs = [{a: 1}, {a: 2}, {a: 3}];
R.findIndex(R.propEq('a', 2))(xs) // 1
R.findIndex(R.propEq('a', 4))(xs) // -1
```
`findLast`：返回最后一个符合指定条件的成员。

```
var xs = [{a: 1, b: 0}, {a:1, b: 1}];
R.findLast(R.propEq('a', 1))(xs) // {a: 1, b: 1}
R.findLast(R.propEq('a', 4))(xs) // undefined
```
`findLastIndex`：返回最后一个符合指定条件的成员的位置。

```
var xs = [{a: 1, b: 0}, {a:1, b: 1}];
R.findLastIndex(R.propEq('a', 1))(xs) // 1
R.findLastIndex(R.propEq('a', 4))(xs) // -1
```
`pluck`：取出数组成员的某个属性，组成一个新数组。

```
R.pluck('a')([{a: 1}, {a: 2}]) // [1, 2]
R.pluck(0)([[1, 2], [3, 4]])   // [1, 3]
```
`project`：取出数组成员的多个属性，组成一个新数组。

```
var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
var kids = [abby, fred];
R.project(['name', 'grade'])(kids)
// [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
```
`transpose`：将每个成员相同位置的值，组成一个新数组。

```
R.transpose([[1, 'a'], [2, 'b'], [3, 'c']])
// [[1, 2, 3], ['a', 'b', 'c']]

R.transpose([[1, 2, 3], ['a', 'b', 'c']])
// [[1, 'a'], [2, 'b'], [3, 'c']]

R.transpose([[10, 11], [20], [], [30, 31, 32]])
// [[10, 20, 30], [11, 31], [32]]
```
`mergeAll`：将数组的成员合并成一个对象。

```
R.mergeAll([{foo:1},{bar:2},{baz:3}])
// {foo:1,bar:2,baz:3}

R.mergeAll([{foo:1},{foo:2},{bar:2}])
// {foo:2, bar:2}
```
`fromPairs`：将嵌套数组转为一个对象。

```
R.fromPairs([['a', 1], ['b', 2], ['c', 3]])
// {a: 1, b: 2, c: 3}
```
`groupBy`：将数组成员按照指定条件分组。

```
var byGrade = R.groupBy(function(student) {
  var score = student.score;
  return score < 65 ? 'F' :
         score < 70 ? 'D' :
         score < 80 ? 'C' :
         score < 90 ? 'B' : 'A';
});
var students = [{name: 'Abby', score: 84},
                {name: 'Eddy', score: 58},
                // ...
                {name: 'Jack', score: 69}];
byGrade(students);
// {
//   'A': [{name: 'Dianne', score: 99}],
//   'B': [{name: 'Abby', score: 84}]
//   // ...,
//   'F': [{name: 'Eddy', score: 58}]
// }
```
`sortBy`：根据成员的某个属性排序。

```
var sortByFirstItem = R.sortBy(R.prop(0));
sortByFirstItem([[-1, 1], [-2, 2], [-3, 3]])
// [[-3, 3], [-2, 2], [-1, 1]]

var sortByNameCaseInsensitive = R.sortBy(
  R.compose(R.toLower, R.prop('name'))
);
var alice = {name: 'ALICE', age: 101};
var bob = {name: 'Bob', age: -10};
var clara = {name: 'clara', age: 314.159};
var people = [clara, bob, alice];
sortByNameCaseInsensitive(people)
// [alice, bob, clara]
```

## 七、对象
###7.1 对象的特征判断
`has`: 返回一个布尔值，表示对象自身是否具有该属性。

```
var hasName = R.has('name')
hasName({name: 'alice'})   //=> true
hasName({name: 'bob'})     //=> true
hasName({})                //=> false

var point = {x: 0, y: 0};
var pointHas = R.has(R.__, point);
pointHas('x')  // true
pointHas('y')  // true
pointHas('z')  // false
```
`hasIn`：返回一个布尔值，表示对象自身或原型链上是否具有某个属性。

```
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}
Rectangle.prototype.area = function() {
  return this.width * this.height;
};

var square = new Rectangle(2, 2);
R.hasIn('width')(square)  // true
R.hasIn('area')(square)  // true
```
`propEq`：如果属性等于给定值，返回true。

```
var abby = {name: 'Abby', age: 7, hair: 'blond'};
var fred = {name: 'Fred', age: 12, hair: 'brown'};
var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
var alois = {name: 'Alois', age: 15, disposition: 'surly'};
var kids = [abby, fred, rusty, alois];
var hasBrownHair = R.propEq('hair', 'brown');
R.filter(hasBrownHair)(kids) // [fred, rusty]
```
`whereEq`：如果属性等于给定值，返回true。

```
var pred = R.whereEq({a: 1, b: 2});

pred({a: 1})              // false
pred({a: 1, b: 2})        // true
pred({a: 1, b: 2, c: 3})  // true
pred({a: 1, b: 1})        // false
```
`where`：如果各个属性都符合指定条件，返回true。

```
var pred = R.where({
  a: R.equals('foo'),
  b: R.complement(R.equals('bar')),
  x: R.gt(__, 10),
  y: R.lt(__, 20)
});

pred({a: 'foo', b: 'xxx', x: 11, y: 19}) // true
pred({a: 'xxx', b: 'xxx', x: 11, y: 19}) // false
pred({a: 'foo', b: 'bar', x: 11, y: 19}) // false
pred({a: 'foo', b: 'xxx', x: 10, y: 19}) // false
pred({a: 'foo', b: 'xxx', x: 11, y: 20}) // false
```
### 7.2 对象的过滤
`omit`：过滤指定属性。

```
R.omit(['a', 'd'])({a: 1, b: 2, c: 3, d: 4})
// {b: 2, c: 3}
```
`filter`：返回所有满足条件的属性

```
var isEven = n => n % 2 === 0;
R.filter(isEven)({a: 1, b: 2, c: 3, d: 4}) // {b: 2, d: 4}
```
`reject`：返回所有不满足条件的属性

```
var isOdd = (n) => n % 2 === 1;
R.reject(isOdd)({a: 1, b: 2, c: 3, d: 4})
// {b: 2, d: 4}
```
###7.3 对象的截取
`dissoc`：过滤指定属性。

```
R.dissoc('b')({a: 1, b: 2, c: 3})
// {a: 1, c: 3}
```
`assoc`：添加或改写某个属性。

```
R.assoc('c', 3)({a: 1, b: 2})
// {a: 1, b: 2, c: 3}
```
`partition`：根据属性值是否满足给定条件，将属性分区。

```
R.partition(R.contains('s'))({ a: 'sss', b: 'ttt', foo: 'bars' })
// [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
```
`pick`：返回指定属性组成的新对象

```
R.pick(['a', 'd'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1, d: 4}

R.pick(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1}
```
`pickAll`：与pick类似，但会包括不存在的属性。

```
R.pickAll(['a', 'd'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1, d: 4}

R.pickAll(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1, e: undefined, f: undefined}
```
`pickBy`：返回符合条件的属性

```
var isUpperCase = (val, key) => key.toUpperCase() === key;
R.pickBy(isUpperCase)({a: 1, b: 2, A: 3, B: 4})
// {A: 3, B: 4}
```
`keys`：返回对象自身属性的属性名组成的新数组。

```
R.keys({a: 1, b: 2, c: 3}) // ['a', 'b', 'c']
```
`keysIn`：返回对象自身的和继承的属性的属性名组成的新数组。

```
var F = function() { this.x = 'X'; };
F.prototype.y = 'Y';
var f = new F();
R.keysIn(f) // ['x', 'y']
```
`values`：返回对象自身的属性的属性值组成的数组。

```
R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
```
`valuesIn`：返回对象自身的和继承的属性的属性值组成的数组。

```
var F = function() { this.x = 'X'; };
F.prototype.y = 'Y';
var f = new F();
R.valuesIn(f) // ['X', 'Y']
```
`invertObj`：将属性值和属性名互换。如果多个属性的属性值相同，只返回最后一个属性。

```
var raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice',
};
R.invertObj(raceResultsByFirstName)
// {"alice": "third", "jake": "second"}
```
`invert`：将属性值和属性名互换，每个属性值对应一个数组。

```
var raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice',
};
R.invert(raceResultsByFirstName)
// { 'alice': ['first', 'third'], 'jake':['second'] }
```
###7.4 对象的运算
`prop`：返回对象的指定属性

```
R.prop('x')({x: 100})
// 100

R.prop('x')({})
// undefined
```
`map`：对象的所有属性依次执行某个函数。

```
var double = x => x * 2;
R.map(double)({x: 1, y: 2, z: 3})
// {x: 2, y: 4, z: 6}
```
`mapObjIndexed`：与map类似，但是会额外传入属性名和整个对象。

```
var values = { x: 1, y: 2, z: 3 };
var prependKeyAndDouble = (num, key, obj) => key + (num * 2);

R.mapObjIndexed(prependKeyAndDouble)(values)
// { x: 'x2', y: 'y4', z: 'z6' }
```
`forEachObjIndexed`：每个属性依次执行给定函数，给定函数的参数分别是属性值和属性名，返回原对象。

```
var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
R.forEachObjIndexed(printKeyConcatValue)({x: 1, y: 2}) // {x: 1, y: 2}
// logs x:1
// logs y:2
```
`merge`：合并两个对象，如果有同名属性，后面的值会覆盖掉前面的值。

```
R.merge({ 'name': 'fred', 'age': 10 })({ 'age': 40 })
// { 'name': 'fred', 'age': 40 }

var resetToDefault = R.merge(R.__, {x: 0});
resetToDefault({x: 5, y: 2}) // {x: 0, y: 2}
```
`mergeWith`：合并两个对象，如果有同名属性，会使用指定的函数处理。

```
R.mergeWith(
  R.concat,
  { a: true, values: [10, 20] },
  { b: true, values: [15, 35] }
);
// { a: true, b: true, values: [10, 20, 15, 35] }
```
`eqProps`：比较两个对象的指定属性是否相等。

```
var o1 = { a: 1, b: 2, c: 3, d: 4 };
var o2 = { a: 10, b: 20, c: 3, d: 40 };
R.eqProps('a', o1)(o2) // false
R.eqProps('c', o1)(o2) // true
```
`R.evolve`：对象的属性分别经过一组函数的处理，返回一个新对象。

```
var tomato  = {
  firstName: '  Tomato ',
  data: {elapsed: 100, remaining: 1400},
  id: 123
};
var transformations = {
  firstName: R.trim,
  lastName: R.trim, // 不会被调用
  data: {elapsed: R.add(1), remaining: R.add(-1)}
};
R.evolve(transformations)(tomato)
// {
//   firstName: 'Tomato',
//   data: {elapsed: 101, remaining: 1399},
//   id: 123
// }
```
### 7.5 复合对象
`path`：取出数组中指定路径的值。

```
R.path(['a', 'b'], {a: {b: 2}}) // 2
R.path(['a', 'b'], {c: {b: 2}}) // undefined
```
`pathEq`：返回指定路径的值符合条件的成员

```
var user1 = { address: { zipCode: 90210 } };
var user2 = { address: { zipCode: 55555 } };
var user3 = { name: 'Bob' };
var users = [ user1, user2, user3 ];
var isFamous = R.pathEq(['address', 'zipCode'], 90210);
R.filter(isFamous)(users) // [ user1 ]
```
`assocPath`：添加或改写指定路径的属性的值。

```
R.assocPath(['a', 'b', 'c'], 42)({a: {b: {c: 0}}})
// {a: {b: {c: 42}}}

R.assocPath(['a', 'b', 'c'], 42)({a: 5})
// {a: {b: {c: 42}}}
```
## 下一节：[compose（组合）](./compose.md)