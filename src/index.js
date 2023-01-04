import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//Object Square is a piece thats multiply instantiated. It renders html and uses props object to display value.
// always call super when defining a constructor of a subclass
// all React component classes that have a constructor should start with a super(props) call.
// read more documentation on javascript on objects and constructors, but will have to re-visit.
class Square extends React.Component {
    // this updates the object with state to have a new variable
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    // how does "setState" function update var value?
    // if a constructor named country with variable value was defined, could you change by saying "setCountry?" no. 
    //setState is a react component. https://reactjs.org/docs/react-component.html#setstate
    // so in this case it looks like the state object is always available. You are only 
    render() {
        return (
            <button
                className="square"
                onClick={() => this.setState({ value: 'X' })}
            >
                {this.state.value }
            </button>
        );
    }
}

//object Board renders object this.renderSquare which renders the object Square and passes props object into Square object
class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//Game objct renders Board object. 

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}
// return React.createElement('div', {className: 'shopping-list'});

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<ShoppingList />);
root.render(<Game />);