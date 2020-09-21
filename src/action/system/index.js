import AsyncStorage from '@react-native-community/async-storage';
const BaseUrl = "http://ecoapi.megaward.com.au/api/system/"

export function LoginSystem(data) {
    const url = 'login'
   return fetch(BaseUrl+url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
}

export function PutLoginSystem(data) {
    const url = 'login'
   return fetch(BaseUrl+url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
}


export function GetUserDetail(token) {
    const url = 'system'
    fetch(BaseUrl+url,{
        headers: new Headers({
            Authorization: 'Bearer '+token
          })
    }).then(res => res.json()).then(res=>{
        if(res.debug&&res.debug.status_code){
          //  console.log(res.message)
        }else{
            AsyncStorage.setItem("userinfo", JSON.stringify(res))
        }
       
   }).catch(error=>{
       console.log(error)
   })
}

