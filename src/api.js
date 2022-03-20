import { getLangTarget, getMD5 } from './util/index.js';
import axios from 'axios'

const url = 'https://api.fanyi.baidu.com/api/trans/vip/translate'

export const getRes = async (q, appid, key) => {
    const { from, to } = getLangTarget(q)
    const salt = Math.random()
    const sign = getMD5('' + appid + q + salt + key)
    const params = { q, from, to, appid, salt, sign }

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
