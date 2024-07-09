import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user';
import hash from '@adonisjs/core/services/hash';

//import jwt from 'jsonwebtoken'



//const jwt= require('jsonwebtoken')
export default class UsersController {
    public async creteUser({ request, response }: HttpContext) {
        try {
            console.log("hello")
            const data = request.all();
            let user = new User();
            user.username = data.username;
            user.password = data.password;
            user.email = data.email;
            await user.save();

            return response.status(200).json({
                massage: 'User Created',
            })
        }
        catch (err) {
            return response.status(200).json({
                massage: err
            })
        }

    }

    public async loginUser({ request, response }: HttpContext) {
        try {
            const { email, password } = request.only(['email', 'password']);

            const query = await User.query().where({ 'email': email }).first();



            if (query) {
                if (await hash.verify(query?.$attributes["password"], password)) {
                    return response.status(200).json({
                        massage: 'Log in Successfully'
                    })
                }
                else {
                    return response.status(200).json({
                        massage: 'password incorrect'
                    })
                }
            }
            else {
                return response.status(200).json({
                    massage: 'Data Not Found'
                })
            }
        }
        catch (err) {
            return response.status(200).json({
                massage: err
            })
        }
    }

    public async getUser({ params, response }: HttpContext) {
        try {
            let data = params.id;
            console.log(data);

            const query = await User.find(data);
            console.log(query?.$attributes);
            const obj = {
                id: query?.$attributes["id"],
                name: query?.$attributes["username"],
                email: query?.$attributes["email"]
            }
            return response.status(200).json({
                data: obj
            })
        }
        catch (err) {
            return response.status(200).json({
                error: err
            })
        }

    }
    public async deleteUser({ params, response }: HttpContext) {
        try {
            let id = params.id; 
            console.log(id)
            const query = await User.findOrFail(id);
            if (query) {
                await query.delete();
                return response.status(200).json({
                    massage: 'User Delete successfull'
                })
            }
            else {
                return response.status(200).json({
                    massage: 'Enter valid id in params'
                })
            }

        }
        catch (err) {
            return response.status(200).json({
                error: err
            });
        }
    }
}