import React from 'react';
import api from '../../apis';
import history from '../../history';

class ContatoAlteraInclui extends React.Component {
    constructor(props) {
        super(props);
        if (props.match.params.id) {
            this.state = { objeto: null, incluindo: false, carregando: true, numeroParaInserir: '', tipoParaInserir: 0 };
        } else  {
            this.state = { objeto: { nome: '', numeros: [] }, incluindo: true, carregando: false };
        }
    }

    componentDidMount() {
        if (!this.state.incluindo) {
            api.get(`/api/contato/${this.props.match.params.id}`)
            .then(result => {
                this.setState({ objeto: result.data, carregando: false });
            });
        }
    }
    
    salvar = (e) => {
        e.preventDefault();
        
        if (this.state.incluindo) {
            this.incluir();
        } else {
            this.alterar();
        }
    };

    alterar = () => {
        const objeto = this.state.objeto;

        console.log("salvando:");
        console.log(objeto);

        api.put(`/api/contato/${objeto.contatoId}`, objeto)
        .then(result => {
            if (result.status === 204) {
                history.push('/contato/');
            }
        });
    }

    incluir = () => {
        const objeto = this.state.objeto;
        api.post("/api/contato", objeto)
        .then(result => {
            if (result.status === 201) {
                history.push('/contato/');
            }
        });
    }

    alteraProp = (nomeProp, valorProp) => {
        let obj = this.state.objeto;
        obj[nomeProp] = valorProp;
        this.setState({ objeto: obj });
    };

    excluirNumero = (numeroParaExcluir) => {
        let objeto = {...this.state.objeto};
        
        objeto.numeros = objeto.numeros.filter(x => x.contatoNumeroId !== numeroParaExcluir.contatoNumeroId || x.numero !== numeroParaExcluir.numero);

        this.setState({objeto});
    };

    renderLinhas = () => {
        return (
            this.state.objeto.numeros.map(x => {
                return (
                    <tr key={x.contatoNumeroId}>
                        <td>{x.numero}</td>
                        <td>{this.retornarContatoString(x.tipo)}</td>
                        <td><button type="button" className="ui button red" onClick={() => {this.excluirNumero(x)}}>Excluir</button></td>
                    </tr>
                );
            })
        );
    };

    retornarContatoString = (tipo) => {
        if (tipo === 0) {
            return "Celular";
        } else {
            return "Residencial";
        }
    }

    adicionarNumero = (e) => {

        e.preventDefault();
        let objeto = {...this.state.objeto};

        objeto.numeros.push(
            {
                numero: this.state.numeroParaInserir,
                tipo: this.state.tipoParaInserir,
                contatoId: objeto.contatoId
            });

        this.setState({objeto, numeroParaInserir: ''});
    };

    render() {
        if (this.state.carregando) {
            return <div>Carregando...</div>;
        }

        const obj = this.state.objeto;

        return (
            <div className="ui container">
                <h2>{this.state.incluindo? "Incluindo" : "Alterando"} Contato</h2>
                <form className="ui form">
                    <div>
                        <div>
                            <label>Nome</label>
                            <input onChange={(e) => this.alteraProp("nome", e.target.value)} value={obj.nome} type="text" />
                        </div>
                    </div>
                    <br />
                    <h4>Números</h4>
                    <div className="fields">
                        <div className="field">
                            <label>Número a ser adicionado</label>
                            <input onChange={(e) => this.setState({ numeroParaInserir: e.target.value})}  value={this.state.numeroParaInserir} type="text" />
                        </div>
                        <div className="field">
                            <label>Tipo</label>
                            <select 
                                value={this.state.tipoParaInserir} 
                                onChange={(e) => {this.setState({tipoParaInserir: parseInt(e.target.value)})}}
                            >
                                <option value="0">Celular</option>
                                <option value="1">Residencial</option>
                            </select>
                        </div>
                        <div className="field">
                            <button type="button" style={{marginTop: "23px"}} onClick={this.adicionarNumero} className="ui button primary">Inserir Número</button>
                        </div>
                    </div>
                    
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Tipo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderLinhas()}
                        </tbody>
                    </table>
                </form>
                <button onClick={this.salvar} className="tiny ui blue button">Salvar</button>
                <button onClick={() => {history.push("/contato/")}} className="tiny ui grey button">Voltar</button>
            </div>
        );
    }
}

export default ContatoAlteraInclui;