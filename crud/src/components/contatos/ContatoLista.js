import React from 'react';

class ContatoLista extends React.Component {
    renderItens() {
        return (
            this.props.objetos.map(x => {
                return (
                    <tr key={x.contatoId}>
                        <td>{x.nome}</td>
                        <td>
                            <button onClick={() => {this.props.consultar(x)}} className="tiny ui grey button">Consultar</button>
                            <button onClick={() => {this.props.alterar(x)}} className="tiny ui blue button">Alterar</button>
                            <button onClick={() => {this.props.deletar(x.contatoId)}} className="tiny ui red button">Excluir</button>
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