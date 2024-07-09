/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const usersController = ()=>import('#controllers/users_controller');
const accountController = ()=>import('#controllers/accounts_controller')
//const userLocation = ()=>import('#middleware/user_location_middleware')




router.post('/user/register',[usersController,'creteUser']);
router.post('/user/login',[usersController,'loginUser']);
router.get('/user/:id',[usersController,'getUser']);
router.get('/user/:id/delete',[usersController,'deleteUser']);

router.post('/accounts',[accountController,'creatrAccount']);
router.get('/accounts/:id',[accountController,'getUserInfo']);
router.post('/accounts/:id/deposite',[accountController,'depositeById']);
router.post('/accounts/:id/withdraw',[accountController,'withdraeById']);
router.post('/accounts/:id/transfer',[accountController,'transferById']);
router.get('/accounts/:id/delete',[accountController,'deleteAccount']);
