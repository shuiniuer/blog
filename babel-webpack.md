# webpack - babel配置

babel是一个javascript编译器，是前端开发中的一个利器。它突破了浏览器实现es标准的限制，使我们在开发中可以使用最新的javascript语法。

通过构建和babel，可以使用最新js语法进行开发，最后自动编译成用于浏览器或node环境的代码。

### webpack中使用babel

配合`webpack`使用`babel`前，需要首先使用`npm init`初始化一个项目，`npm install --save-dev webpack`安装webpack。

1. 安装babel-loader, babel-core, babel-preset-env

`npm install --save-dev babel-loader babel-core babel-preset-env`

其中，babel-preset-env插件是为了告诉babel只编译批准的内容，相当于babel-preset-es2015, es2016, es2017及最新版本。通过它可以使用最新的js语法。

2. 配置webpack.config.js

在webpack配置文件中配置bable-loader

```
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env',{
                            targets: {
                                browsers: ['> 1%', 'last 2 versions']
                            }
                        }]
                    ]
                }
            },
            exclude: '/node_modules/'
        }
    ]
}
```

其中，`exclude`是定义不希望`babel`处理的文件。`targets`是`presets`的一些预设选项，这里表示将js用于浏览器，只确保占比大于1%的浏览器的特性，主流浏览器的最新两个主版本。

更多与配置有关的信息，可以参考：

[babel env preset设置](https://babeljs.cn/docs/plugins/preset-env/)，

[browserlist](https://github.com/browserslist/browserslist)预设置。

3. 运行相应webpack命令

4. 由于babel-preset配置选项较多，我们一般可以在根目录下建立`.babelrc`文件，专门用来放置`babel preset`配置，这是一个json文件。可以将上述配置修改如下：

```
//.bablerc文件
{
    "presets": [
        ['env',{
            "targets": {
                "browsers": ['> 1%', 'last 2 versions']
            }
        }]
    ]
}

//原webpack.config.js文件
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: '/node_modules/'
        }
    ]
}
```

### babel-polifill插件

在上面的babel配置中，babel只是将一些es6，es7-8的语法转换成符合目标的js代码，但是如果我们使用一些特性或方法，比如Generator, Set, 或者一些方法。babel并不能转换为低版本浏览器识别的代码。这时就需要babel-polifill。

简单的说，polifill就是一个垫片，提供了一些低版本es标准对高级特性的实现。使用polifill的方法如下：

`npm install --save babel-polifill`

然后在应用入口引入polifill，要确保它在任何其他代码/依赖声明前被调用。

```
//CommonJS module
require('babel-polyfill');

//es module
import 'babel-polifill';
```

在webpack.config.js中，将babel-polifill加入entry数组中：

```
entry: ["babel-polifill", "./app.js"]
```

相比于runtime-transform，polifill用于应用开发中。会添加相应变量到全局，所以会污染全局变量。

更多细节参考[babel-polifill](https://babeljs.cn/docs/usage/polyfill/)。

### runtime-transform插件

runtime transform也是一个插件，它与polifill有些类似，但它不污染全局变量，所以经常用于框架开发。

安装：

```
npm install --save-dev babel-plugin-transform-runtime
npm install --save babel-runtime
```

用法：

将下面内容添加到.bablerc文件中

```
{
    "plugins": ["transform-runtime"]
}
```

更多细节参考[bable-runtime-transform插件](https://babeljs.cn/docs/plugins/transform-runtime/)。