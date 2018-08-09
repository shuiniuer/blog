# Javascript函数式编程
## 常见的编程范式
- 命令式编程(Imperative)
> 命令式编程的主要思想是关注计算机执行的步骤，即一步一步告诉计算机先做什么再做什么。**命令式编程重点关注的是解决问题的步骤**。

- 声明式编程(Declarative)
>声明式编程是以数据结构的形式来表达程序执行的逻辑。它的主要思想是告诉计算机应该做什么，但不指定具体要怎么做。<br>
>SQL语句就是最明显的一种声明式编程的例子，例如：
`SELECT * FROM collection WHERE num > 5`<br>
除了 SQL，网页编程中用到的 HTML 和 CSS 也都属于声明式编程。<br>
通过观察声明式编程的代码我们可以发现它有一个特点是它不需要创建变量用来存储数据。<br>
另一个特点是它不包含循环控制的代码如 for， while。

- 函数式编程(Functional)
>函数式编程和声明式编程是有所关联的，因为他们思想是一致的：即只关注做什么而不是怎么做。但函数式编程不仅仅局限于声明式编程。<br><br>
函数式编程最重要的特点是“函数第一位（一等公民）”，即函数可以出现在任何地方，比如你可以把函数作为参数传递给另一个函数，不仅如此你还可以将函数作为返回值。<br><br>
函数式编程中的函数这个术语不是指计算机中的函数（实际上是Subroutine），而是指数学中的函数。<br>
>>[数学中函数的定义](https://www.mathsisfun.com/sets/function.html)：给定一个数集A，假设其中的元素为x。现对A中的元素x施加对应法则f，记作f（x），得到另一数集B。假设B中的元素为y。则y与x之间的等量关系可以用y=f（x）表示。我们把这个关系式就叫函数关系式，简称函数。函数概念含有三个要素：定义域A、值域C和对应法则f。其中核心是对应法则f，它是函数关系的本质特征。<br><br>
>>也就是说一个函数的值仅决定于函数参数的值，不依赖其他状态。比如sqrt(x)函数计算x的平方根，只要x不变，不论什么时候调用，调用几次，值都是不变的。**函数式编程重点关注的是数据之间的映射**。

## 函数是一等公民
>当我们说函数是“一等公民”的时候，我们实际上说的是它们和其他对象都一样...所以就是普通公民（坐经济舱的人？）。<br>
函数真没什么特殊的，你可以像对待任何其他数据类型一样对待它们——把它们赋值给变量，当作参数传递，作为返回值return...等等。

- 赋值给变量

```
let isBig = function(animal) {
    return animal.age > 5;
}
```

- 当参数传递

```
function isBig(animal) {
    return animal.age > 6;
}
animals.filter(isBig);

```

- 作为返回值

```
function isBigProducer(compare){
	return function(animal){
		return animal.age > compare;
	}
}
```
## 纯函数
纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。**纯函数就是数学上的函数，而且是函数式编程的全部。**

- 对比 slice 和 splice。

```
let xs = [1,2,3,4,5];

// 纯的
xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]


// 不纯的
xs.splice(0,3);
//=> [1,2,3]

xs.splice(0,3);
//=> [4,5]

xs.splice(0,3);

```
>>这两个函数的作用并无二致——但是注意，它们各自的方式却大不同，但不管怎么说作用还是一样的。slice 符合纯函数的定义是因为对相同的输入它保证能返回相同的输出。而 splice 却会改变调用它的那个数组，然后再返回；这就会产生了可观察到的副作用，即这个数组永久地改变了。

- 另一个例子

```
// 不纯的
let minimum = 21;

let checkAge = function(age) {
  return age >= minimum;
};


// 纯的
let checkAge = function(age) {
  let minimum = 21;
  return age >= minimum;
};
```
>>在不纯的版本中，checkAge 的结果将取决于 minimum 这个可变变量的值。换句话说，它取决于系统状态（system state）。<br>
纯函数是完全自给自足的，它需要的所有东西都能轻易获得。仔细思考思考这一点...这种自给自足的好处是什么呢？纯函数的依赖很明确，因此更易于观察和理解。<br>
命令式编程中“典型”的方法和过程都深深地根植于它们所在的环境中，通过状态、依赖和有效作用（available effects）达成；纯函数与此相反，它与环境无关，只要我们愿意，可以在任何地方运行它。<br>
面向对象语言的问题是，它们永远都要随身携带那些隐式的环境。你只需要一个香蕉，但却得到一个拿着香蕉的大猩猩...以及整个丛林。

## 实践出真知
- 边撸边讲

```
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
	]
```

- 找出`age>5`的`animal`

```
// 传统方式
let result = [];
for(let i = 0; i<animals.length; i++) {
	if(arr[i] > 5){
		result.push(arr[i]);
	}
}
console.log(result);

// 使用filter函数优化代码
console.log(animals.filter((animal)=>{
	return animal.age > 5;
}));

//减少代码的耦合
let isBig = function(animal) {
    return animal.age > 5;
}
console.log(animals.filter(isBig));
```

- 分别找出`age>4`，`age>5`，`age>6`，`age>7`的`animal`

```
// 添加三个新的函数
let isBig4 = function(animal) {
    return animal.age > 4;
};
let isBig5 = function(animal) {
    return animal.age > 5;
};
let isBig6 = function(animal) {
    return animal.age > 6;
};
let isBig7 = function(animal) {
    return animal.age > 7;
};
console.log(animals.filter(isBig4));
console.log(animals.filter(isBig5));
console.log(animals.filter(isBig6));
console.log(animals.filter(isBig7));

// 上面每次都要定义function，不爽
// 优化一下
let standard = 4;
let isBig = function(animal){
	return animal.age > standard;
};
console.log(animals.filter(isBig));
standard = 5;
console.log(animals.filter(isBig));
standard = 6;
console.log(animals.filter(isBig));
standard = 7;
console.log(animals.filter(isBig));

// 上面每次都要给standard重新赋值一下，不爽
// 进一步优化
let isBigProducer = function(standard){
	return function(animal){
		return animal.age > standard;
	}
}
animals.filter(isBigProducer(6));
animals.filter(isBigProducer(7));
animals.filter(isBigProducer(8));
```
- 找出`age>5`、`sex为male`、且`species为cat`的`animal`

```
let isBig5 = function(animal) {
    return animal.age > 5;
};
let isMale = function(animal){
	return animal.sex === 'male';
};
let isCat = function(animal){
	return animal. species === 'cat';
};
animals.filter(isBig5).filter(isMale).filter(isCat);
```

- 需求不停变更，找出age、sex、species的不同组合

```
// 抽象一下
let judgeBigProducer = function(standard){
	return function(animal){
		return animal.age > standard;
	}
};

let judgeSexProducer = function(standard){
	return function(animal){
		return animal.sex === standard;
	}
};

let judgeSpeciesProducer = function(standard){
	return function(animal){
		return animal.species === standard;
	}
};
animals
.filter(judgeBigProducer(6))
.filter(judgeSexProducer('female'))
.filter(judgeSpeciesProducer('dog'));

// 终极抽象
let judge = function(prop){
	return function(standard){
		return function(animal){
			if(prop==='age'){
				return animal[prop] > standard;
			}else{
				return animal[prop] === standard;
			}
		}
	};
};

animals
.filter(judge('species')('dog'))
.filter(judge('sex')('female'))
.filter(judge('age')(5));

```
## 柯里化（curry）
- 上面的终极抽象`judge`看着很蛋疼，有没有

```
let judge = function(prop){
	return function(standard){
		return function(animal){
			if(prop==='age'){
				return animal[prop] > standard;
			}else{
				return animal[prop] === standard;
			}
		}
	};
};

let judge2 = function(prop, standard, animal){
	if(prop==='age'){
		return animal[prop] > standard;
	}else{
		return animal[prop] === standard;
	}
};

let animal = {name:'dog3', species:'dog', age:5, sex:'male'};
judge2('sex','male', animal);
judge('sex')('male')(animal);
// 二者的作用是一样的
// filter 方法只接受一个参数
// judge2接受三个参数，需要转化为类似于judge这样的函数才能传入filter使用
// 这就是柯里化（curry）

```
在计算机科学中，柯里化（currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。<br>
顾名思义，柯里化其实本身是固定一个可以预期的参数，并返回一个特定的函数，处理批特定的需求。这增加了函数的适用性，但同时也降低了函数的适用范围。<br><br>
个人理解：**柯里化是指这样一个函数(假设叫做createCurry)，他接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数。**

#### 柯里化的用处：

- 提高适用性

【通用函数】解决了兼容性问题，但同时也会再来，使用的不便利性，不同的应用场景往，要传递很多参数，以达到解决特定问题的目的。有时候应用中，同一种规则可能会反复使用，这就可能会造成代码的重复性。

```
function square(i) {
    return i * i;
}

function dubble(i) {
    return i *= 2;
}

function map(handeler, list) {
    return list.map(handeler);
}

// 数组的每一项平方
map(square, [1, 2, 3, 4, 5]);
map(square, [6, 7, 8, 9, 10]);
map(square, [10, 20, 30, 40, 50]);
// ......

// 数组的每一项加倍
map(dubble, [1, 2, 3, 4, 5]);
map(dubble, [6, 7, 8, 9, 10]);
map(dubble, [10, 20, 30, 40, 50]);
```

例子中，创建了一个map通用函数，用于适应不同的应用场景。显然，通用性不用怀疑。同时，例子中重复传入了相同的处理函数：square和dubble。

应用中这种可能会更多。当然，通用性的增强必然带来适用性的减弱。但是，我们依然可以在中间找到一种平衡。

看下面，我们利用柯里化改造一下：

```
function square(i) {
    return i * i;
}

function dubble(i) {
    return i *= 2;
}

function map(handeler, list) {
    return list.map(handeler);
}

let cmap = currying(map);
let mapSQ = cmap(square);
mapSQ([1, 2, 3, 4, 5]);
mapSQ([6, 7, 8, 9, 10]);
mapSQ([10, 20, 30, 40, 50]);
// ......

var mapDB = cmap(dubble);
mapDB([1, 2, 3, 4, 5]);
mapDB([6, 7, 8, 9, 10]);
mapDB([10, 20, 30, 40, 50]);
// ......
```
- 延迟执行：不断的柯里化，累积传入的参数，最后执行。
- 固定易变因素：提前把易变因素，传参固定下来，生成一个更明确的应用函数。

## 后续

- 组合（composing）
- 类型签名（Hindley-Milner）
- 函子（Functor）
- Monad Functor
- Applicative Functor
