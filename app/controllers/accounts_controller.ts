import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'


export default class AccountsController {
    public async creatrAccount({ request, response }: HttpContext) {
        try {
            let data = request.all();
            const account = new Account();
            account.user_id = data.user_id;
            account.account_type = data.account_type;
            account.balance = data.initial_balance;
            await account.save();

            return response.status(200).json({
                massage: 'Account created'
            })
        }
        catch (err) {
            return response.status(200).json({
                massage: err
            })
        }
    }

    public async getUserInfo({ params, response }: HttpContext) {
        try {
            let id = params.id;
            const query = await Account.find(id);
            if (query) {
                return response.status(200).json({
                    data: query
                });
            }
            else {
                return response.status(200).json({
                    massage: 'Data not Found'
                });
            }
        }
        catch (err) {
            return response.status(200).json({
                error: err
            });
        }
    }

    public async depositeById({ params, request, response }: HttpContext) {
        try {
            let id = params.id;
            let depositeMoney = request.only(['amount'])
            if (depositeMoney.amount < 0) {
                return response.status(200).json({
                    massage: 'Plz Deposite more than 0'
                })
            }
            const query = await Account.findOrFail(id);
            if (query) {
                query.balance += Number(depositeMoney.amount);
                await query.save();
                let obj = {
                    id: query.id,
                    balance: query.balance
                }
                return response.status(200).json({
                    massage: 'Deposite Successfully',
                    account: obj
                })
            }
            else {
                return response.status(200).json({
                    massage: 'Data Not Found'
                })
            }
        }
        catch (err) {
            return response.status(200).json({
                error: err
            })
        }
    }

    public async withdraeById({ params, request, response }: HttpContext) {
        try {
            let id = params.id;
            let withdrawMoney = request.only(['amount']);
            const query = await Account.findOrFail(id);
            if (query) {
                if (query.balance < Number(withdrawMoney.amount)) {
                    return response.status(200).json({
                        massage: 'insufficient Money'
                    });
                }
                else {
                    query.balance -= Number(withdrawMoney.amount)
                    await query.save();
                    let obj = {
                        id: query.id,
                        balance: query.balance
                    }
                    return response.status(200).json({
                        massage: 'Withdrawal successful',
                        account: obj

                    })
                }
            }
        }
        catch (err) {
            return response.status(200).json({
                error: err
            })
        }
    }

    public async transferById({ params, request, response }: HttpContext) {
        try {
            let id = params.id;
            let { to, amount } = request.only(['to', 'amount']);
            const findUer = await Account.findOrFail(id);
            if (findUer) {
                if (findUer.balance < Number(amount)) {
                    return response.status(200).json({
                        massage: 'insufficient Money to Transfer money'
                    });
                }
                else {
                    const targetUser = await Account.findOrFail(to)
                    if (targetUser) {
                        findUer.balance -= Number(amount);
                        await findUer.save();
                        targetUser.balance += Number(amount);
                        await targetUser.save();
                        let from = {
                            id: findUer.id,
                            balance: findUer.balance
                        }
                        let to = {
                            id: targetUser.id,
                            balance: targetUser.balance
                        }
                        return response.status(200).json({
                            massage: 'Transfer successful',
                            from_account: from,
                            to_account: to
                        })

                    }
                    else {
                        return response.status(200).json({
                            massage: 'Not Found Target User'
                        })
                    }
                }
            }
            else {
                return response.status(200).json({
                    massage: 'Not Found any User'
                })
            }
        }
        catch (err) {
            return response.status(200).json({
                error: err
            })
        }
    }

    public async deleteAccount({ params, response }: HttpContext) {
        try {
            let id = params.id;
            const query = await Account.findOrFail(id);
            if (query) {
                await query.delete();
                return response.status(200).json({
                    massage: 'Account Delete successfull'
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