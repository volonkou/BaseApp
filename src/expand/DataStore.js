import AsyncStorage from '@react-native-community/async-storage';
import MD5 from 'md5';
export default class DataStore {

    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @param flag
     * @returns {Promise}
     */
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url).then((data) => {
                        resolve(this._wrapData(data));
                    }).catch((error) => {
                        reject(error);
                    })
                }

            }).catch((error) => {
                this.fetchNetData(url).then((data) => {
                    resolve(this._wrapData(data));
                }).catch((error => {
                    reject(error);
                }))
            })
        })
    }

    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchNetData(url) {
        let fetchUrl=this.RandString(url)
        return new Promise((resolve, reject) => {
            fetch(fetchUrl)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((responseData) => {
                    this.saveData(url, responseData)
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    //  MD5数据加密

    RandString(url){
        const key = '73cb46c718e9480d7c7f53be1bcaed79';
        const rand_string = Math.random();
        if (url.indexOf('?') > 0) {
            url += '&rand_string=' + rand_string;
          } else {
            url += '?rand_string=' + rand_string;
          }
          let secret = MD5(url + key);
          url += '&secret=' + secret;
          return url;
    }
     




    _wrapData(data) {
        return { data: data, timestamp: new Date().getTime() };
    }

    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() !== targetDate.getHours()) return false;//有效期4个小时
        if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}
