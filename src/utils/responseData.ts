import {message} from 'antd'

// 处理错误信息
// 响应回来的数据格式
/*
  errmsg:string
  errno:number    // 无错误 为 0  有错误为一个大于0的数字
  data:string | number | object | array
  返回值 data
*/
function handleResponseData(data:any){
    if(data.errno){
        // 有错误
        message.error('操作失败--' + data.errmsg)
    }else if(data.errno == 0){
        // 无错误
        message.success('操作成功')
        return data.data
    }
}

// 获取地址栏参数
// 
// http://localhost:8080/location-test.html/?a=1&b=2
// 返回 {a:1,b:2} | string
function getBrowserUrlParams(key?:string):string | object{
   let search = location.search // ?a=1&b=2
   let str = search.substr(1)  // a=1&b=2
   let params = {}
   str.split('&').forEach( item =>{
    params[item.split('=')[0]] = item.split('=')[1]   
   })
   if(key){
       return params[key]
   }else{
        return   params
   }
}
export {
    handleResponseData,
    getBrowserUrlParams
}