import React from 'react';

const Loader = (props) => {
    return (
        <div className="">
            <div className="ui active inverted dimmer">
                <div className="ui large text loader">{props.mensagem}</div>
            </div>
        </div>
    );
};

export default Loader;