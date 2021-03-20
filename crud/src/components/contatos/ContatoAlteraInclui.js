import React from 'react';
import api from '../../apis';

class ContatoAlteraInclui extends React.Component {
    constructor(props) {
        super(props);

        if (props.incluindo) {
            this.state = { objeto: {}, carregando: false };
        } else  {
            this.state = { objeto: null, carregando: true };
        }
    }

    componentDidMount() {
        if (!this.props.incluindo) {
            api.get(`/api/contato/${this.props.id}`)
            .then(result => {
                this.setState({ objeto: result.data, carregando: false });
            });
        }
    }
    
    salvar = (e) => {
        e.preventDefault();
        this.props.salvarAlteracao(this.state.objeto);
    };

    alteraProp = (nomeProp, valorProp) => {
        let obj = this.state.objeto;
        obj[nomeProp] = valorProp;
        this.setState({ objeto: obj });
    };

    render() {
        if (this.state.carregando) {
            return <div>Carregando...</div>;
        }

        const obj = this.state.objeto;

        return (
            <div>
                <button onClick={() => {this.props.voltar()}} className="tiny ui grey button">Voltar</button>
                <form className="ui form">
                    <div>
                        <div>
                            <label>Nome</label>
                            <input onChange={(e) => this.alteraProp("nome", e.target.value)} value={obj.nome} type="text" />
                        </div>
                    </div>
                    <button onClick={this.salvar} className="tiny ui blue button">Salvar</button>
                </form>
            </div>
        );
    }
}

export default ContatoAlteraInclui;