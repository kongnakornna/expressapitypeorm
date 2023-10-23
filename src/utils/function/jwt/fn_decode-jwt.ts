// Module
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

export default async (strJWT: string) => {
  const et: any = Date.now()
  const _retFunc: any = Object.create(retFunc)

  return new Promise(async (RESOLVE) => {
    try {
      _retFunc.data.input = strJWT
      _retFunc.data.ouput = await jwt.decode(strJWT)
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