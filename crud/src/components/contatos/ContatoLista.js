import React from 'react';

class ContatoLista extends React.Component {
    renderItens() {
        return (
            this.props.objetos.map(x => {
                return (
                    <tr key={x.contatoId}>
                        <td>{x.nome}</td>
                        <td>
                            <a href={`/contato/consultar/${x.contatoId}`} className="tiny ui grey button">Consultar</a>
                            <a href={`/contato/alterar/${x.contatoId}`} className="tiny ui blue button">Alterar</a>
                            <a href={`/contato/deletar/${x.contatoId}`} className="tiny ui red button">Excluir</a>
                        </td>
                    </tr>
                );
            })
        );
    }

    render() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItens()}
                </tbody>
            </table>
        );
    }
}

export default ContatoLista;