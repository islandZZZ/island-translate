import { isString } from './type'
import { getMD5 } from './crypto'

// the translation between Chinese and English is supported
export const languageTypeMap = {
    zh: 'zh',
    en: 'en'
}

export const getLanguageType = str => {
    if (!isString(str)) return ''
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(str[i]) <= 255) return languageTypeMap.en
    }
    return languageTypeMap.zh
}

export const getLanguageTypeByReg = str => /[\u4e00-\u9fa5]/.test(str)

export const getMD5