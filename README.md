# util-function

## 常用的一些js工具函数，目前包含
* 识别http链接

## 使用
#### 1. 组件引入
* 先进行下载 `npm install --save util-function`
* 组件调用
```js
import getQueryString from "util-function"
const value = getQueryString('id')
// 例如地址栏https://www.baidu.com?id=22则获取到value为22
```

## 对应方法和参数说明
###1. `getQueryString`：获取链接中key为name的属性值

|参数|说明|类型|默认值|返回值|
| --- |----|---|---| --- |
|name|对应key值|string|null|name对应的属性值|

###2. `eventBus`：事件总线
* `eventBus.$emit(key, params)`: 发送事件

|参数|说明|类型|默认值|
| --- |----|---|---|
|key|发布事件名称|string|null|
|params|发布事件携带的参数，非必传|不限|null|

* `eventBus.$on(key, hanlder)`: 接收事件

|参数|说明|类型|默认值|
| --- |----|---|---|
|key|订阅事件名称|string|null|
|hanlder|监听订阅事件之后的操作，可以接收发布者传的参数|函数|null|

* `eventBus.$off(key, hanlder)`: 销毁事件

|参数|说明|类型|默认值|
| --- |----|---|---|
|key|移除事件名称|string|null|
|hanlder|销毁事件事件之后的操作，非必传|function|null|

###3. `asyncLoadScript(url, callback)`：异步加载对应的js

|参数|说明|类型|默认值|
| --- |----|---|---|
|url|需要异步加载的js地址|string|null|
|callback|需要异步加载之后的回调函数|function|()=>{}|

###4. `regSearchResult(str, key, type, color)`：搜索高亮显示某一词语

|参数|说明|类型|默认值|返回值|
| --- |----|---|---| --- |
|str|需要搜索的文本|string|null|
|key|搜索的关键字|string|null|
|type|input-模拟输入框内容折行使用/text-纯文字|string|text|
|color|高亮颜色|string|#588CE9| 带有高亮关键字的html文本

###5. `removeDuplicate (arr1, arr2, key)`：去掉arr2中与arr1 中重复的对象

|参数|说明|类型|默认值|返回值|
| --- |----|---|---|--- |
|arr1|数组1|Array|[]|
|arr2|数组2|Array|[]|
|key|去重的属性|string|id|去重后的数组

###6. `eleFormat(ele, httpEnd)`：字转换成p标签文本，带有http的转换为a链接

|参数|说明|类型|默认值|返回值|
| --- |----|---|---| --- |
|ele|原始文本|string||
|httpEnd|地址链接后缀|Array|['com', 'cn', 'cc', 'top', 'net', 'shop', 'wiki', 'icu', 'ltd', 'vip', 'club', 'art', 'online','fun']| 带有p标签或者带有p中含有a的html

###7. `replaceAllStr(str, symStr1, symStr2 = '')`：用一个符号替换字符串中的另一个符号

|参数|说明|类型|默认值|返回值|
| --- |----|---|---| --- |
|str|文本|string|[]|
|symStr1|需要替换的符号|string|null|
|symStr2|替换后的符号|string|' '|替换后的文本

###8. `userAgentVersion(key)`：从userAgent获取包含某一字符串对应的版本号

|参数|说明|类型|默认值|返回值|
| --- |----|---|---| --- |
|key|需要获取版本号的属性|string|youzone|对应的版本号|
