import React from 'react';
import ContatoLista from './ContatoLista';
import api from '../../apis';

class ContatoCrud extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            objetos: [], 
            status: ETipoAcao.carregando
        };
    }

    componentDidMount() {
        this.consultarDados();
    }

    consultarDados = () => {
        api.get("/api/contato")
        .then(result => {
            this.setState({ objetos: result.data, status: ETipoAcao.listando });
        });
    }

    renderComponente() {
        if (this.state.status === ETipoAcao.listando) {
            return (
                <div>
                    <a href="/contato/novo/" className="tiny ui green button">Incluir</a>
                    <ContatoLista objetos={this.state.objetos} consultar={this.consultar} alterar={this.alterar} deletar={this.deletar} />
                </div>
            );
        }
        else {
            return <div>Carregando...</div>;
        }   
    }

    render() {
        return (
            <div className="ui container">
                <h1>Contatos</h1>
                {this.renderComponente()}
            </div>
        );
    }
}

const ETipoAcao = Object.freeze({
	"carregando":1, 
	"listando":2
});

export default ContatoCrud;