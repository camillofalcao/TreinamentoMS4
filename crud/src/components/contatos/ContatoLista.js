import React from 'react';

class ContatoLista extends React.Component {
    renderItens() {
        return (
            this.props.objetos.map(x => {
                return (
                    <tr key={x.ContatoId}>
                        <td>{x.Nome}</td>
                        <td>{x.Numero}</td>
                        <td>
                            <button onClick={() => {this.props.consultar(x)}} className="tiny ui grey button">Consultar</button>
                            <button onClick={() => {this.props.alterar(x)}} className="tiny ui blue button">Alterar</button>
                            <button onClick={() => {this.props.deletar(x.ContatoId)}} className="tiny ui red button">Excluir</button>
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
                        <th>Número</th>
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