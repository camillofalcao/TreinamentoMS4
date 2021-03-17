import React from 'react';
import ContatoLista from './ContatoLista';
import ContatoConsulta from './ContatoConsulta';
import ContatoAlteraInclui from './ContatoAlteraInclui';

class ContatoCrud extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            objetos: contatos, 
            objetoSelecionado: null,
            status: ETipoAcao.listando
        };
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
        let objetoNoVetor = null;
        const objetos = this.state.objetos;
        for (let i = 0; i < objetos.length; i++) {
            if (objetos[i].ContatoId === objeto.ContatoId) {
                objetoNoVetor = objetos[i];
            }
        }

        if (objetoNoVetor !== null) {
            objetoNoVetor.Nome = objeto.Nome;
            objetoNoVetor.Numero = objeto.Numero;
        }

        this.setState({ objetos: objetos, status: ETipoAcao.listando });
    };

    salvarInclusao = (objeto) => {
        this.setState({ objetos: [...this.state.objetos, objeto], status: ETipoAcao.listando });
    }

    deletar = (id) => {
        const objetos = this.state.objetos;
        let indice = -1;

        for (let i = 0; i < objetos.length; i++) {
            if (objetos[i].ContatoId === id) {
                indice = i;
            }
        }

        if (indice >= 0) {
            objetos.splice(indice, 1);
        }

        this.setState({ objetos: objetos });
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
            return <ContatoConsulta voltar={this.voltar} objeto={this.state.objetoSelecionado} />;
        }
        else if (this.state.status === ETipoAcao.alterando) {
            return <ContatoAlteraInclui salvarAlteracao={this.salvarAlteracao} voltar={this.voltar} objeto={this.state.objetoSelecionado} />;
        }
        else if (this.state.status === ETipoAcao.incluindo) {
            return <ContatoAlteraInclui salvarAlteracao={this.salvarInclusao} voltar={this.voltar} objeto={{}} />
        }
        else {
            return <div></div>;
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

const contatos = [
    { ContatoId: 'a', Nome: 'Ana', Numero: '(11)1111-1111' },
    { ContatoId: 'b', Nome: 'Bruno', Numero: '(22)2222-2222' },
    { ContatoId: 'c', Nome: 'Carlos', Numero: '(33)3333-3333' }
];

const ETipoAcao = Object.freeze({
	"carregando":1, 
	"listando":2, 
	"consultando":3, 
	"incluindo":4, 
	"alterando":5
});

export default ContatoCrud;