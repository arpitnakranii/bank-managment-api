/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

//import auth from '@adonisjs/auth/services/main';
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';
const usersController = () => import('#controllers/users_controller');
const accountController = () => import('#controllers/accounts_controller')
//const userLocation = ()=>import('#middleware/user_location_middleware')
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'


const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/




router.post('/user/register', [usersController, 'creteUser']);
router.post('/user/login', [usersController, 'loginUser']).use(middleware.auth({ guards: ['api'] }));
router.get('/user/:id', [usersController, 'getUser']);
router.get('/user/:id/delete', [usersController, 'deleteUser']);

router.post('/accounts', [accountController, 'creatrAccount']);
router.get('/accounts/:id', [accountController, 'getUserInfo']);
router.post('/accounts/:id/deposite', [accountController, 'depositeById']);
router.post('/accounts/:id/withdraw', [accountController, 'withdraeById']);
router.post('/accounts/:id/transfer', [accountController, 'transferById']);
router.get('/accounts/:id/delete', [accountController, 'deleteAccount']);

//#region  upload file get 
router.get('/uploads/*', ({ request, response }) => {
    const filePath = request.param('*').join(sep)
    const normalizedPath = normalize(filePath)

    if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
        return response.badRequest('Malformed path')
    }

    const absolutePath = app.makePath('upload', normalizedPath)
    console.log(absolutePath)
    return response.download(absolutePath)
})
//#endregion

//#region  session

router.get('/session/:color',async({params,session,response})=>{
   session.put('theme',params.color)
   response.send('session store')
})

router.get('/session',async({session,response})=>{
    const data = session.get('theme')
    response.send(data)
 })

//#endregion 


