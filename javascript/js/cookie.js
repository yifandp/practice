// 添加cookie值
function addCookie(key,value,day,path,domain) {
    // 处理保存路径
    var index = window.location.pathname.lastIndexOf('/');
    var currentPath = window.location.pathname.slice(0,index)
    path = path || currentPath;
    // 处理默认保存的domain
    domain = domain || document.domain;
    // 处理默认过期时间
    if(!day){
        document.cookie = key+'='+value+';path='+path+';domain='+domain+';'
    }else{
        var date = new Date();
        date.setDate(data.getDate() + day);
        document.cookie = key+'='+value+';exipres='+ date.toGMTString()+';path='+path+';domain='+domain+';'r
    }
}

// 获取cookie 值
function getCookie(key) {
    var res = document.cookie.split(';');
    for(var i = 0; i < res.length; i++){
        var temp = res[i].split('=');
        if(temp[0].trim() == key){
            return temp[1];
        }
    }
}

// 删除cookie 值
function delCookie(key,path) {
    addCookie(key,getCookie(key),-1,path);
}