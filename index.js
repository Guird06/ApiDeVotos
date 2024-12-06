const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const port = 80;
const cors = require("cors");
const session = require('express-session');

const connection = require("./database/connection.js");

const Politicians = require("./politicians/Politicians.js");

const Admin = require("./admin/Admin.js");

const Auth = require("./middlewares/Auth.js");

app.use(cors());

app.use(express.json());

app.use(session({
    secret: 'sla',
    resave: false,
    saveUninitialized: true,
}));

connection
    .authenticate()
    .then(()=>{
        console.log("connection success");
    }).catch((error)=>{
        console.log(error);
    });

app.get('/', (req, res) => {
    res.send('API DE VOTOS');
});

app.get('/politicos', (req, res) => {
    Politicians.findAll().then(politicans =>{
        res.json(politicans);
    });
});

app.post("/admin/login", (req,res)=>{

    let user = req.body.user
    let password = req.body.password


    Admin.findOne({where:{user:user}}).then(admin =>{
        if(user != undefined){

            if(admin.password == password){
                req.session.user = user;
                res.json({message:"logado"});
                
            }else{
                res.status(401).json({ message: 'Credenciais inválidas.' });
            }
        }else{
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }     
    });   
});

app.get('/admin/logout', Auth,(req, res) => {
    if(req.session.user !== undefined){
        req.session.destroy(() => {
        res.json({message:"deslogado com sucesso"});
        });
    }else{
        res.json({message:"voce nao esta logado"});
    }

  });

app.post("/admin/adicionar", Auth, (req,res)=>{
    let politicanName = req.body.name;
    
    if(politicanName !== undefined){
        Politicians.create({
            name : politicanName,
            votes : 0
        }).then(()=>{
            res.json({message : "adicionado com sucesso"});
        }).catch(()=>{
            res.status(500);
        })
    }  
})

app.post("/politicos/votar", (req,res) =>{
    let id = req.body.id;
    
    if(id !== undefined){
        Politicians.findByPk(id).then(politican =>{
            Politicians.update({votes: politican.votes + 1},{
                where:{
                    id:id
                }
            }).then(()=>{

                res.json({ message: 'Voto Computado.' });

            });
        });
    }
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
