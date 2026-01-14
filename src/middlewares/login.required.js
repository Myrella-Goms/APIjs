import jwt from 'jsonwebtoken'


export default (req, res, next) => {

    const {authorization} = req.headers;
    if (!authorization){
        return res.status(401).json({
            errors: ['Login inválido']
        })
    }

    const [, token ]= authorization.split(' ');

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET); //obtendo dados do usuario

        const { id, email } = dados;
        req.userId = id;
        console.log(req.userId)
        req.userEmail = email;
        console.log(req.userEmail)
        return next()
    } catch (error) {
        return res.status(401).json({
            errors: ['Token expirado ou inválido']
        })
    }
};

//criando um middleware que faz a validação se o usuario está logado, validando o authorization na header da requisição, depois extraindo o token do array com destructuring, depois preciso verificar o token com jwt.ferify, comparando o secret. Nisso eu já obtenho os dados do usuário