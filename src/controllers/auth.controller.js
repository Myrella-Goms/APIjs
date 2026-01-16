import Usuarios from '../models/Usuarios';
import jwt from 'jsonwebtoken'; 

class AuthController{
    async createToken(req, res){
        const {email, senha} = req.body;

        if(!email || !senha){
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }

        const user = await Usuarios.findOne({where: {email: email}})

        if(!user.email){
            return res.status(401).json({
                errors: ['Usuário não existe']
            })
        }

        if(!(await user.passwordCompare(senha))){
                return res.status(401).json({
                errors: ['Senha inválida']
            })
        }

        const {id} = user;

        const token = jwt.sign({ id, email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION})

        return res.json({token: token});
    }
}

export default new AuthController(); //exportando classe instanciada

//quando o usuario fizer login, vai ser nessa rota, pois ela válida o email e a senha, com findOnde(where) e passwordCompare com bcrypt, se válidos, ele gera o token com jwt.sign com o payload, secret e expiration. logo, toda vez que o client fizer uma requisição onde o usuario precise estar autenticado, o cliente vai enviar ao backend o token no header da requisição e o backend vai validar essw token