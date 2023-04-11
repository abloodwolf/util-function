
function getQueryString(name){
    // 优化获取query参数的逻辑 优先hash 然后search
    let tempHashUrl = new URLSearchParams(window.location.hash.replace(/#[^]*\?/, '?'));
    let tempSearchUrl = new URLSearchParams(window?.location?.search);
    return tempHashUrl.get(name) || tempSearchUrl.get(name) || null;
};

const eventBus = {
    events: {}
};

eventBus.$emit = function (type, ...args) {
    if (Array.isArray(eventBus.events[type])) {
        for (let i = 0; i < eventBus.events[type].length; i++) {
            eventBus.events[type][i].apply(this, args);
        }
    }
};

eventBus.$on = function (type, cb) {
    if (!eventBus.events[type]) {   //如果从未注册过监听函数，则将函数放入数组存入对应的键名下
        eventBus.events[type] = [cb];
    } else {  //如果注册过，则直接放入
        eventBus.events[type].push(cb);
    }
};

eventBus.$off = function (type, cb) {
    if (!eventBus.events[type] || eventBus.events[type].indexOf(cb) === -1) {
        return;
    }
    eventBus.events[type].splice(eventBus.events[type].indexOf(cb), 1);
};

// 异步加载js
function asyncLoadScript(url, callback=()=>{}) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function () {
        callback();
    }
    script.src = url;
    document.body.appendChild(script);
}

/**
 * 搜索关键词高亮
 * @param {*} str
 * @param {*} key
 * @param {*} type text-纯文字，input-模拟输入框内容折行使用
 * @returns
 */
function regSearchResult(str, key, type = 'text', color='#588CE9') {
    if (!str) return ''
    if (!key) return str
    if (type === 'input') {
        str = str.replace('\n\n', '\n')
        let regNewLine = new RegExp('\n', 'g')
        str = str.replace(regNewLine, '<br/>')
    }

    let reg = new RegExp(key, 'gi')
    return str.replace(reg, "<span style='color:" + color + ";'>" + key + '</span>')
}

// 去掉arr2中与arr1 中重复的对象
function removeDuplicate (arr1 = [], arr2 = [], key = 'id') {
    const obj = {}
    let res = arr2
    if (arr1.length > 0) {
        arr1.forEach( v => obj[v[key]] = true)
        res = arr2.filter( v => !obj[v[key]])
    }
    return res
}

// 文字转换成p标签文本，http转换为a链接
function eleFormat(ele, httpEnd) {
    let resEle = ''
    // 域名后缀
    const HTTP_END = ['com', 'cn', 'cc', 'top', 'net', 'shop', 'wiki', 'icu', 'ltd', 'vip', 'club', 'art', 'online','fun']
    const _httpEnd = [...HTTP_END, ...httpEnd]
    if(ele?.includes('http')) {
        var httpStr = _httpEnd.join('|')
        var httpReg = new RegExp("(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.("+ httpStr +")(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?", "gi"); //用于判断文本内容超链接
        // 文本地址变为a链接
        const formatText = ele.replace(httpReg, function(httpText) {
            // return '<a href="' + httpText + '" target="_blank">' + httpText + '</a>'
            return `<a href="${httpText}" target="_blank">${httpText} </a>`
        });
        resEle = `<p>${formatText}</p>`
    } else {
        resEle = `<p>${ele}</p>`
    }
    return resEle
}

// 用一个符号替换字符串中的另一个符号
function replaceAllStr(str, symStr1, symStr2 = ''){
    if (str.includes(symStr1)) {
        str = str.replace(new RegExp(symStr1,"gm"),symStr2)
    }
    return str
}
// userAgent包含某一字符串，比如版本号等
function userAgentVersion(key='youzone') {
    var agent = window.navigator.userAgent.toLowerCase()
    // var regStr_youzone = /youzone.*?\/[\d.]+/gi
    // var regStr_electrone = /electron\/[\d.]+/gi
    var str = eval("/" + key + ".*?\\/[\\d.]+/gi")
    var keyVersion = agent.match(str)?.[0]?.split('/')
    return keyVersion?.[1]
}
export {
    getQueryString,
    eventBus,
    asyncLoadScript,
    regSearchResult,
    removeDuplicate,
    eleFormat,
    replaceAllStr,
    userAgentVersion
};