import { getLangTarget, getMD5, languageTypeMap } from './util/index.js';
import axios from 'axios'

const url = 'https://api.fanyi.baidu.com/api/trans/vip/translate'

export const getRes = async (q, appid, key, isJp, isMain) => {
    const { from, to } = getLangTarget(q)
    const salt = Math.random()
    const sign = getMD5('' + appid + q + salt + key)
    const params = { q, from, to, appid, salt, sign }
    const paramsList = []

    isJp && Object.assign(params, {
        from: languageTypeMap.jp,
        to: languageTypeMap.zh
    })

    // if(isMain){
    //     return Promise.all()
    //     return 
    // }
    
    return getTranslateResult(params)

}


const getTranslateResult = params => {
    return new Promise((resolve, reject) => {
        axios.get(url, { params }).then(res => {
            if (res.status === 200) {
                resolve(res.data.trans_result)
                return
            }
            reject(res)
        }, reason => {
            reject(reason)
        })
    })
}

