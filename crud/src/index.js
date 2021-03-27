import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import App from './components/App';
import history from './history';
import ContatoCrud from './components/contatos/ContatoCrud';
import ContatoAlteraInclui from './components/contatos/ContatoAlteraInclui';
import ContatoConsulta from './components/contatos/ContatoConsulta'
import ContatoExclui from './components/contatos/ContatoExclui';

ReactDOM.render(
    (<Router history={history}>
        <Route path="/" exact={true} component={App} />
        <Route path="/contato/" exact={true} component={ContatoCrud} />
        <Route path="/contato/novo/" exact={true} component={ContatoAlteraInclui} />
        <Route path="/contato/alterar/:id" exact={true} component={ContatoAlteraInclui} />
        <Route path="/contato/consultar/:id" exact={true} component={ContatoConsulta} />
        <Route path="/contato/deletar/:id" exact={true} component={ContatoExclui} />
    </Router>)
, document.querySelector("#root"));
