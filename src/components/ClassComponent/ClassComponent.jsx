/* eslint-disable max-len */
import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';
import {element} from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber:
    Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
    count: 0,
    gameOver: false,
    btnPlayAgainIsVisible: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: this.state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return [
        setTimeout(() => {
          this.setState({
            gameOver: true,
            btnPlayAgainIsVisible: true,
            result: `Вы угадали загаданное число ${state.userNumber},
          попыток ${state.count}`,
          });
        }, 0)
      ];
    });
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleClick = () => {
    setTimeout(() => {
      this.setState({
        userNumber: '',
      });
    }, 0);
  };
  playAgainClick = () => {
    setTimeout(() => {
      this.setState({
        result: 'Результат',
        userNumber: '',
        randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
        count: 0,
        gameOver: false,
        btnPlayAgainIsVisible: false,
      });
    }, 0);
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form
          className={style.form}
          onSubmit={this.handleSubmit}>
          <label className={`${style.label} ${this.state.gameOver ? style.hidden : ''}`} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={`${style.input} ${this.state.gameOver ? style.hidden : ''}`} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}
          />

          <button className={`${style.btn} ${this.state.gameOver ? style.hidden : ''}`} onClick={this.handleClick}>Угадать</button>
          <button className={`${style.btn} ${this.state.btnPlayAgainIsVisible ? '' : style.hidden}`} onClick={this.playAgainClick}>Сыграть еще</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
