import React from 'react';

const Cartao = (props) => {
    return (
        <div className="ui card">
            <div className="image">
                <img src={props.foto} alt="Deveria ter uma imagem aqui" />
            </div>
            <div className="content">
                <a className="header">{props.nome}</a>
                <div className="meta">
                <span className="date">Membro desde {props.membroDesde}</span>
                </div>
                <div className="description">
                {props.descricao}
                </div>
            </div>
            <div className="extra content">
                <a>
                <i className="user icon"></i>
                {props.numeroAmigos} Amigos
                </a>
            </div>
        </div>
    );
};

export default Cartao;