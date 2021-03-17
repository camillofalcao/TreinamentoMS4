import React from 'react';

const Mensagem = (props) => {
    //return <div>{`Olá ${props.nome}! ${props.mensagem}`}</div>;
    return <div>{"Olá " + props.nome + "! " + props.mensagem}</div>;
};

export default Mensagem;