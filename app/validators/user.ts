
import vine from '@vinejs/vine'


export const userRegisterValidate =vine.compile(
    vine.object({
        username:vine.string().trim().maxLength(6),
        email:vine.string().email(),
        password:vine.string().minLength(5).maxLength(5)
    })
)

export const userLoginValidate =vine.compile(
    vine.object({
        email:vine.string().email(),
        password:vine.string().minLength(2)
    })
)

export const validateFile = vine.compile(
    vine.object({
        document:vine.array(
            vine.file({
                size:'2mb',
                extnames:['png','jpg']
            })
        )
            
           
    })
)
