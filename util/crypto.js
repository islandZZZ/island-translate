import crypto from 'crypto'

export const getMD5 = (data, encoding = 'hex') => {
    return crypto.createHash('md5').update(data).digest(encoding)
}