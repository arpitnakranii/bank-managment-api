import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
// import { userLoginValidate, userRegisterValidate } from '#validators/user';
// import User from '#models/user'

export default class UserLocationMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // if (request.url() == '/user-register') {
    //    const validateUser = await userRegisterValidate.validate(request.all());
    //    if (!validateUser) {
    //     return response.status(200).json({
    //         masaage: validateUser
    //       })
    //     }
    //     const output = await next()
    //     return output
    // }
    // else {
    //   const validateUser = await userLoginValidate.validate(request.all());

    //   if (!validateUser) {
    //     return response.status(200).json({
    //       masaage: validateUser
    //     })
    //   }
    //   let data = request.all();
    //   const query = await User.query().where({ 'email': data.email });
    //   if (query) {
        const output = await next()
        return output
      // }
    }




  }
