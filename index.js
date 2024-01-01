const express = require('express');

const server = express();

server.use(express.json());
const amigos = [];
const relationship = [];

// cadastro de Amigos * metodo Push *
server.post('/person', (req, res) => {
    const { CPF } = req.body;
    const findFriend = amigos.find(amigo => amigo.CPF === CPF);

    if (findFriend) {
        return res.status(400).json({ message: 'CPF já cadastrado'});
    }

    if (CPF.length != 11) { 
        return res.status(400).json({ message: 'CPF precisa conter 11 digitos' });
    }

    amigos.push(req.body);
    return res.status(200).json({ message: 'Cadastro realizado com sucesso!'})
}) 

// Busca o CPF digitado na rota ** metodo get
server.get('/person/:CPF', (req, res) => {
    const CPF = req.params.CPF;
    const buscaAmigos = amigos.find(amigo => amigo.CPF === CPF);
    if (!buscaAmigos) {
        return res.status(404).json({ message: 'Pessoa não encontrada' })
    }

    res.status(200).json(buscaAmigos)
})

// busca todos os cadastros 
server.get('/person', (req, res) => {
     return res.json(amigos);
})

//deleta todos os cadastros realizados ** metodo delete
server.delete('/clean', (req, res) => {
    amigos.splice(0, amigos.length);

    return res.json("lista de amigos apagada")
})

// cadastra um novo relacionamento ** metodo post
server.post('/relationship', (req, res) => {
    const { CPF1, CPF2 } = req.body;
    const achaAmigo1 = amigos.find(amigo => amigo.CPF == CPF1);
    const achaAmigo2 = amigos.find(amigo => amigo.CPF == CPF2);

    if( !achaAmigo1 || !achaAmigo2) {
        return res.status(404).json({ message: 'um ou ambos os usuários não foram localizados.'})
    }
    
    const existRelacionamento = relationship.some(relaciona => (relaciona.CPF1 === CPF1 && relaciona.CPF2 === CPF2) || (relaciona.CPF1 === CPF2 && relaciona.CPF2 === CPF1));

    if(!existRelacionamento) {
        relationship.push({CPF1, CPF2});
        return res.status(200).json({ message: ' cadastro realizado com sucesso'}, );
    }else {
        res.status(400).json({ message: "relacionamento já existe"});
    }
})

// lista todos os relacionamentos cadastrados
server.get('/relationship', (req, res) => {
    return res.json(relationship);
})

server.get('/recommendatons/:CPF'), (req, res) => {
    const CPF = req.params;

    if (CPF.length != 11) { 
        return res.status(400).json({ message: 'CPF precisa conter 11 digitos' });
    }
}

server.listen(3000)