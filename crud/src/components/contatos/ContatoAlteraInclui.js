import React from 'react';

class ContatoAlteraInclui extends React.Component {
    constructor(props) {
        super(props);
        this.state={ objeto: props.objeto }
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
        const obj = this.props.objeto;

        return (
            <div>
                <button onClick={() => {this.props.voltar()}} className="tiny ui grey button">Voltar</button>
                <form className="ui form">
                    <div>
                        <div>
                            <label>Nome</label>
                            <input onChange={(e) => this.alteraProp("Nome", e.target.value)} value={obj.Nome} type="text" />
                        </div>
                        <div>
                            <label>Número</label>
                            <input onChange={(e) => this.alteraProp("Numero", e.target.value)} value={obj.Numero} type="text" />
                        </div>
                    </div>
                    <button onClick={this.salvar} className="tiny ui blue button">Salvar</button>
                </form>

            </div>
        );
    }
}

export default ContatoAlteraInclui;