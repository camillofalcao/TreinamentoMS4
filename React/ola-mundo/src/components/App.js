import React from 'react';
import Cartao from './Cartao';
import Loader from './Loader';
import api from '../apis/api';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { objetos: [], status: STATUS_CARREGANDO };
    }

    componentDidMount() {
        api.get("cartoes")
            .then(resp => {
                this.setState({ objetos: resp.data, status: STATUS_PRONTO });
        });
    }

    render() {
        if (this.state.status === STATUS_CARREGANDO) {
            return <Loader mensagem="Carregando..."/>;
        }

        return (
            <div>
                {
                    this.state.objetos.map(x => {
                        return <Cartao 
                            key={x.id}
                            foto={x.foto} 
                            nome={x.nome}
                            membroDesde={x.membroDesde}
                            descricao={x.descricao} 
                            numeroAmigos={x.numeroAmigos}
                        />;
                    })
                }
            </div>
        );
    }
};

const STATUS_CARREGANDO = 0;
const STATUS_PRONTO = 1;

export default App;