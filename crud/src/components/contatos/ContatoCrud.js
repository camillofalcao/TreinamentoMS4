import React from 'react';
import ContatoLista from './ContatoLista';
import ContatoConsulta from './ContatoConsulta';
import ContatoAlteraInclui from './ContatoAlteraInclui';
import api from '../../apis';

class ContatoCrud extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            objetos: [], 
            objetoSelecionado: null,
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

    consultar = (objeto) => {
        this.setState({ objetoSelecionado: objeto, status: ETipoAcao.consultando });
    };

    alterar = (objeto) => {
        this.setState({ objetoSelecionado: objeto, status: ETipoAcao.alterando });
    };

    incluir = () => {
        this.setState({ status : ETipoAcao.incluindo });
    }

    salvarAlteracao = (objeto) => {
        api.put(`/api/contato/${objeto.contatoId}`, objeto)
        .then(result => {
            if (result.status === 204) {
                this.setState({ status: ETipoAcao.carregando });
                this.consultarDados();
            }
        });
    };

    salvarInclusao = (objeto) => {
        api.post("/api/contato", objeto)
        .then(result => {
            if (result.status === 201) {
                this.setState({ status: ETipoAcao.carregando });
                this.consultarDados();
            }
        });
    }

    deletar = (id) => {
        api.delete(`/api/contato/${id}`)
        .then(result => {
            if (result.status === 204) {
                this.setState({ status: ETipoAcao.carregando });
                this.consultarDados();
            }
        });
    };

    voltar = () => {
        this.setState({ status: ETipoAcao.listando });
    };

    renderComponente() {
        if (this.state.status === ETipoAcao.listando) {
            return (
                <div>
                    <button onClick={this.incluir} className="tiny ui green button">Incluir</button>
                    <ContatoLista objetos={this.state.objetos} consultar={this.consultar} alterar={this.alterar} deletar={this.deletar} />
                </div>
            );
        }
        else if (this.state.status === ETipoAcao.consultando) {
            return <ContatoConsulta voltar={this.voltar} id={this.state.objetoSelecionado.contatoId} />;
        }
        else if (this.state.status === ETipoAcao.alterando) {
            return <ContatoAlteraInclui incluindo={false} salvarAlteracao={this.salvarAlteracao} voltar={this.voltar} id={this.state.objetoSelecionado.contatoId} />;
        }
        else if (this.state.status === ETipoAcao.incluindo) {
            return <ContatoAlteraInclui incluindo={true} salvarAlteracao={this.salvarInclusao} voltar={this.voltar} />
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
	"listando":2, 
	"consultando":3, 
	"incluindo":4, 
	"alterando":5
});

export default ContatoCrud;