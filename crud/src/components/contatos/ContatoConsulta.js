import React from 'react';
import api from '../../apis';
import history from '../../history';

class ContatoConsulta extends React.Component {
    constructor(props) {
        super(props);
        this.state = { objeto: { nome: ''}, carregando: true };
    }

    componentDidMount() {
        api.get(`/api/contato/${this.props.match.params.id}`)
        .then(result => {
            this.setState({ objeto: result.data, carregando: false });
        });
    }

    renderLinhas = () => {
        return (
            this.state.objeto.numeros.map(x => {
                return (
                    <tr key={x.contatoNumeroId}>
                        <td>{x.numero}</td>
                        <td>{x.tipoString}</td>
                    </tr>
                );
            })
        );
    };

    render() {
        if (this.state.carregando) {
            return <div>Carregando...</div>;
        }

        const obj = this.state.objeto;

        return (
            <div className="ui container">
                <h2>Consultando Contato</h2>
                <div className="ui form">
                    <div>
                        <div>
                            <label>Nome</label>
                            <input className="disabled field" readOnly value={obj.nome} type="text" />
                        </div>
                    </div>
                    <div>
                        <br />
                        <h4>Números</h4>
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>Número</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderLinhas()}
                            </tbody>
                        </table>
                        <br />
                    </div>
                </div>
                <button onClick={() => {history.push("/contato/")}} className="tiny ui grey button">Voltar</button>
            </div>
        );
    }
}

export default ContatoConsulta;