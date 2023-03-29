import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//Object Square is a piece thats multiply instantiated. It renders html and uses props object to display value.
// always call super when defining a constructor of a subclass
// all React component classes that have a constructor should start with a super(props) call.
// read more documentation on javascript on objects and constructors, but will have to re-visit.
// class Square extends React.Component {
// this updates the object with state to have a new variable
// constructor(props) {
//     super(props);
//     this.state = {
//         value: null,
//     };
// }
// how does "setState" function update var value?
// if a constructor named country with variable value was defined, could you change by saying "setCountry?" no. 
//setState is a react component. https://reactjs.org/docs/react-component.html#setstate
// so in this case it looks like the state object is always available. You are only 

//     render() {
//         return (
//             <button
//                 className="square"
//                 // onClick={() => this.setState({ value: 'X' })}
//                 onClick={() => this.props.onClick()}
//             >
//                 {/* {this.state.value} */}
//                 {this.props.value}
//             </button>
//         );
//     }
// }
function Square(props) {
    return (
        <button className={"square " + (props.isWinning ? "square-winning" : null)} onClick={props.onClick}>
            {props.value}
            {props.isWinning}
        </button>
    )
}


//object Board renders object this.renderSquare which renders the object Square and passes props object into Square object
class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }
    // handleClick(i) {
    //     const squares = this.props.squares.slice();
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.props.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.props.xIsNext,
    //     });
    // }
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                //we need a method where square updates the board's state.
                //pass down a function from the board to the square. 
                //Then have square call that function when square is clicked.

                key={i}
                isWinning={this.props.winnerSquares.includes(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderSquares() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let squares = [];
            for (let j = 0; j < 3; j++) {
                squares.push(this.renderSquare(3 * i + j));
            }
            rows.push(<div className="board-row" key={i}>{squares}</div>);
        }
        return rows;
    }


    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }
        // <div className="status">{status}</div>
        //can't really use map...
        // const squares = this.props.squares.map((square, num) => {
        //     return (
        //         <div>
        //         {this.renderSquare(num)}</div>
        //     )
        // });
        return (
            <div key={0} >{this.renderSquares()}</div>
        );

        // return (
        //     <div>
        //         <div className="board-row">
        //             {this.renderSquare(0)}
        //             {this.renderSquare(1)}
        //             {this.renderSquare(2)}
        //         </div>
        //         <div className="board-row">
        //             {this.renderSquare(3)}
        //             {this.renderSquare(4)}
        //             {this.renderSquare(5)}
        //         </div>
        //         <div className="board-row">
        //             {this.renderSquare(6)}
        //             {this.renderSquare(7)}
        //             {this.renderSquare(8)}
        //         </div>
        //     </div>
        // );
    }
}

//Game objct renders Board object. 

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                row: null,
                col: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            reverseList: false,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        const row = Math.floor(i / 3);
        const col = i % 3;
        // stop handle click if square was already clicked or if the winner was already calculated. 
        if (calculateWinner(squares).length > 0 || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // this is concatenating. history is an array of hashes. the hash "squares" is being set as the array and is being added on top of what already exists in history 
        this.setState({
            history: history.concat([{
                squares: squares,
                row: row,
                col: col,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    reverseList() {
        const reverseListState = !this.state.reverseList
        this.setState({
            reverseList: reverseListState,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerSquares = calculateWinner(current.squares);
        const winner = winnerSquares.length > 0 ? current.squares[winnerSquares[0]] : null;
        const draw = calculateDraw(current.squares);

        const moves = history.map((step, move) => {
            const row = step.row;
            const col = step.col;
            // const desc = move ?
            //     // 'Go to move #' + move :
            //     'Go to move #' + move + ' (' + col + ',' + row + ')' :
            //     'Go to game start';
            let desc = ""
            if (move === 0) {
                desc = 'Go to game start';
            } else if (move === this.state.stepNumber) {
                desc = 'You are at move #' + this.state.stepNumber + ' (' + col + ',' + row + ')';
            } else {
                desc = 'Go to move #' + move + ' (' + col + ',' + row + ')';
            }

            // desc = (move==this.state.stepNumber) ? '<b>' + desc + '<\b>' : desc;

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {(this.state.stepNumber === move) ? <b>{desc}</b> : desc}
                    </button>
                </li>
            );// replaced 13 lines with 7 lines by embedding an expression in JSX for conditional rendering
            // if (move == this.state.stepNumber) {
            //     return (
            //         <li key={move}>
            //             <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
            //         </li>
            //     );
            // } else {
            //     return (
            //         <li key={move}>
            //             <button onClick={() => this.jumpTo(move)}>{desc}</button>
            //         </li>
            //     );
            // }
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if(draw){
            status = 'Draw';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerSquares={winnerSquares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.reverseList ? moves.reverse() : moves}</ol>
                </div>
                <div>
                    <button onClick={() => this.reverseList()}>Toggle</button>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return [];
}
function calculateDraw(squares) {
    for (let i=0; i<squares.length; i++){
        if(squares[i] === null) {
            return false;
        }
    }
    return true;
}

// class ShoppingList extends React.Component {
//     render() {
//         return (
//             <div className="shopping-list">
//                 <h1>Shopping List for {this.props.name}</h1>
//                 <ul>
//                     <li>Instagram</li>
//                     <li>WhatsApp</li>
//                     <li>Oculus</li>
//                 </ul>
//             </div>
//         );
//     }
// }
// return React.createElement('div', {className: 'shopping-list'});

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<ShoppingList />);
root.render(<Game />);
