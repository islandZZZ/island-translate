import { isString } from './type.js'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import 'colors'
import { homedir } from 'os' //系统的home目录 home dir
const home = process.env.HOME || homedir // 系统配置的home环境变量 home variable
const defaultConfigPath = path.join(home, 'island-translate.config.json')

// the translation between Chinese and English is supported
export const languageTypeMap = {
    zh: 'zh',
    en: 'en'
}

export const getLanguageType = str => {
    if (!isString(str)) {
        return ''
    }
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) <= 255) {
            return languageTypeMap.en
        }
    }
    return languageTypeMap.zh
}

export const isZH = str => /[\u4e00-\u9fa5]/.test(str)

export const getLangTarget = str => {
    const _isZH = isZH(str)
    return {
        from: _isZH ? languageTypeMap.zh : languageTypeMap.en,
        to: _isZH ? languageTypeMap.en : languageTypeMap.zh
    }
}

export const getMD5 = (data, encoding = 'hex') => {
    return crypto.createHash('md5').update(data).digest(encoding)
}

export const readConfig = (path = defaultConfigPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { flag: 'a+' }, (err, data) => {
            if (err) return reject(console.log(`read file ${path} failed`));
            let config = {}
            try {
                config = JSON.parse(data.toString())
            } catch (error) {
                config = {}
            }
            resolve(config)
        })
    })

}

export const writeConfig = (config, path = defaultConfigPath) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(config), (err) => {
            if (err) {
                reject(err)
                return
            }
            resolve(config)
        })
    })
}

export const setConfig = async payload => {
    const config = await readConfig()
    for (const [k, has] of Object.entries(payload.options)) {
        has && (config[k] = payload[k])
    }
    return writeConfig(config)
}

const format = number => String(number).length < 2 ? `0${number}` : number
export const getTime = () => {
    const f = format
    const now = new Date();
    const year = now.getFullYear(); //得到年份
    const month = now.getMonth() + 1;//得到月份
    const hour = now.getHours();//得到小时数
    const day = now.getDate();//得到日期
    const minute = now.getMinutes();//得到分钟数
    const second = now.getSeconds();//得到秒数
    return `${year}-${f(month)}-${f(day)} ${f(hour)}:${f(minute)}:${f(second)}`
}

export const logger = (data, time) => {
    const { src, dst } = data[0]
    console.log(`[DONE] ${getTime()} 耗时${time}ms\n查询: ${src}\n返回: ${dst}\n  `.green); // outputs green text
}

export const getAuth = (filePath = defaultConfigPath) => {
    return new Promise((resolve, reject) => {
        exec(`chmod +x ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                reject(error)
                return
            }
            resolve(logger(`${filePath} 执行权限开启成功!`))
        })
    })

}
