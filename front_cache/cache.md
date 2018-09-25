# http缓存相关

## 相关字段简述

RFC2616规定的47种http报文首部字段中与缓存相关的字段。

### 通用头部字段
![cache-control](./1.png)

### 请求头部字段
![cache-control](./2.png)

### 响应头部字段
![cache-control](./3.png)

### 实体头部字段
![cache-control](./4.png)

## 使用meta设置浏览器是否缓存html

通常情况下，通过以下方式设置不缓存html，即再次访问页面时重新加载html

```
<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
```
### Pragma

禁止浏览器从本地缓存中访问html内容：

```
<meta http-equiv="Pragma" content="no-cache">
```

### cache-control
规定浏览器如何缓存某个响应以及缓存多长时间：
![cache-control](./htmlcache.png)

```
<meta http-equiv="cache-control" content="no-cache">
共有以下几种用法：
no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。
public: 缓存所有响应，但并非必须。因为max-age也可以做到相同效果。
private: 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）。
maxage: 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用60秒。
```

### expires
用于设定网页的到期时间，过期后网页必须重新从服务器获取：

```
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
```




https://segmentfault.com/a/1190000009652182