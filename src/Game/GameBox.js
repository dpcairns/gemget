import React, { Component } from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import Hero from './Hero';
import Gem from './Gem';
import './game.css';

class GameBox extends Component {
  constructor() {
    super();
    this.state = {
      heroPos: {
        x: 50,
        y: 50
      },
      name: 'default name',
      gemPos: {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500)
      },
      gemCount: 0,
      otherHeroes: {}
    }
  }

  update = () => {
    this.props.socket.emit('move', {
      ...this.state.heroPos,
      key: this.props.heroKey,
      gemCount: this.state.gemCount,
      name: this.state.name
    });
  }
  goRight = () => {
    const { heroPos: { x, y } } = this.state;
    this.update();
    this.setState({ heroPos: { x: x + 7, y } });
  }

  goLeft = () => {
    const { heroPos: { x, y } } = this.state;
    this.update()
    this.setState({ heroPos: { x: x - 7, y } });
  }

  goUp = () => {
    const { heroPos: { x, y } } = this.state;
    this.update();
    this.setState({ heroPos: { x, y: y - 7 } });
  }

  goDown = () => {
    const { heroPos: { x, y } } = this.state;
    this.update();
    this.setState({ heroPos: { x, y: y + 7 } });
  }

  collisionCheck = () => {
    const { heroPos, gemPos, gemCount } = this.state;

    if (Math.abs(heroPos.x - gemPos.x) < 15 &&
    Math.abs(heroPos.y - gemPos.y) < 15) {
      this.setState({ gemPos: {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500)
      },
      gemCount: this.state.gemCount + 1
      })
    }
}

  componentDidMount = () => {
    this.props.socket.on('other-player', (player) => {
      if (player.key !== this.props.heroKey) {
        this.setState({
          otherHeroes: {
            ...this.state.otherHeroes,
            [player.key]: {
              ...player
            }
          }
        })
      }
    })
  }

  handleInput = (e) => {
    this.setState({ name: e.target.value });
    this.update();
  }

  render() {
    this.collisionCheck();
    const {
      heroPos,
      gemPos,
      keyValue,
      gemCount,
      otherHeroes,
      name
    } = this.state;
    const { socket } = this.props;

    return (
      <div className="game">

      <input value={name} onChange={ (e) => { this.handleInput(e) }} />
	<p>j, k, l, i to move</p>
      <Hero position={heroPos}
        gemCount={gemCount}
        name={name}
        onClick={ () => { socket.emit('heroclick')} }
      />

      {Object.keys(otherHeroes).length > 0 &&
        Object.keys(otherHeroes).map((otherHeroKey) => {
          return <Hero
            color="grey"
            name={otherHeroes[otherHeroKey].name}
            gemCount={otherHeroes[otherHeroKey].gemCount}
            key={otherHeroes[otherHeroKey].key}
            position={
              {x: otherHeroes[otherHeroKey].x,
              y: otherHeroes[otherHeroKey].y}}
            onClick={ () => { socket.emit('heroclick')} }
          />
        }
        )}
      <Gem position={gemPos} />

      <KeyHandler keyEventName={KEYPRESS} keyValue="i" onKeyHandle={this.goUp} />
      <KeyHandler keyEventName={KEYPRESS} keyValue="k" onKeyHandle={this.goDown} />
      <KeyHandler keyEventName={KEYPRESS} keyValue="j" onKeyHandle={this.goLeft} />
      <KeyHandler keyEventName={KEYPRESS} keyValue="l" onKeyHandle={this.goRight} />

      </div>
    );
  }
}

export default GameBox;
