// Module
import moment from 'moment'
import jwt from 'jsonwebtoken'

// Response
const retFunc: any = {
  'result': true,
  'remark': 'success',
  'run_time': null,
  'data': {
    'input': null,
    'output': null
  }
}

export default async (objConfig: any, objData: any) => {
  const et: any = Date.now()
  const _retFunc: any = Object.create(retFunc)

  return new Promise(async (RESOLVE) => {
    try {
      const objPayload = {
        'iss': objConfig.iss,
        'iat': moment().unix(),
        'exp': moment().unix() + objConfig.exp,
        'data': objData
      }

      _retFunc.data.input = objPayload
      _retFunc.data.output = await jwt.sign(objPayload, objConfig.secret)
    } catch (err: any) {
      _retFunc.result = false
      _retFunc.remark = `[F] catch : ${err.stack}`
      _retFunc.data = null
    } finally {
      _retFunc.run_time = Date.now() - et
      return RESOLVE(_retFunc)
    }
  })
}