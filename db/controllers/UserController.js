const {User} = require('../index')

const UserController = {
    createUser: async (user) =>{
        await User.findOrCreate({
            where: {username: user?.username,
                firstName: user?.first_name,
                chosen_lang: user?.language_code,
                cart: {}
            },
            
        })
    },
   
    updateCart: async (cart, username) =>{
        try {
            let cur_user = await User.findOne({where: {username: username} })
            cur_user.cart = cart
            await cur_user.save();
        } catch (error) {
            console.log(error);
        }
    },

    getCart: async (username) =>{
        try {
            let user_cart = await User.findOne({where:{username : username}}).then((res) =>{
                return res.cart
            })
            return user_cart
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController;