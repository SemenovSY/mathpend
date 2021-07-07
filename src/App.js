import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components'
import './App.css';
import Modal from './Modal';
import "./Pendulum.css"

let ROPE_LENGTH_MULTIPLIER = window.innerWidth > 1200 ? Math.floor(window.innerWidth / 18) :  Math.floor(window.innerWidth / 10);

function App() {

  let [ropeLength, setLength] = useState(1);
  let [force, setForce] = useState(9.8);
  let [position, setPosition] = useState(0);
  const [toggleState, setToggle] = useState(false)
  const [modalActive, setModalActive] = useState(false)

  let period = +((2*Math.PI*Math.sqrt(ropeLength/force)).toFixed(2));

  let move = keyframes`
        0% {
            transform: rotate(${-position}deg);
        }

        50% {
            transform: rotate(${position}deg);
        }

        100% {
            transform: rotate(${-position}deg);
        }
    `

  const Pendulum = styled.div`
      position: absolute;
      top: 10px;
      width: 10px;
      height: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(${-position}deg);
      animation: ${move} ${toggleState ? period : 0}s infinite ease-in-out;
  `

  return (
    <div className="App">
      <div className="params">
          <text id="description">&lt;Параметры системы&gt;</text>
          <input type="range" id="ropeLength" min="0.5" max="2.5" step="0.1" value={ropeLength} onInput={(event) => {setLength(event.target.value)}}></input>
          <text className="values" style={{zIndex: 2}}>{ropeLength} [м]</text>     
          <input type="range" id="force" min="0.1" max="40" step="0.1" value={force} onInput={(event) => {setForce(event.target.value)}}></input>
          <text className="values" style={{zIndex: 2}}>{force} [м/c^2]</text>
          <input type="range" id="startPos" min="-80" max="80" step="2" value={position} onInput={(event) => {setPosition(event.target.value)}}></input>
          <text className="values" style={{zIndex: 2}}>{position}°</text>
      </div>
      <a className="button" id="toggle" onClick={() => {setToggle(!toggleState)}}>&lt;{toggleState ? "Остановить" : "Запустить"}&gt;</a>
      <a className="button" id="help" onClick={() => {setModalActive(true)}}>&lt;?&gt;</a>
      <div className="main">
        <div className="roof"></div>
        <div className="knot" style={{top: `${12}px`}}></div>
        <Pendulum>
          <div className="rope" style={{height: `${ropeLength * ROPE_LENGTH_MULTIPLIER}px`}}></div>
          <div className="knot" style={{top: `${ropeLength * ROPE_LENGTH_MULTIPLIER}px`}}></div>
          <div className="ball" style={{top: `${5 + ropeLength * ROPE_LENGTH_MULTIPLIER}px`}}></div>
        </Pendulum>
        <div className="floor"></div>
        <text id="period-value">Т = {period}[с]</text>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <h1>Математический маятник</h1>
        <p>Осциллятор, представляющий собой механическую систему, 
          состоящую из материальной точки на конце невесомой нерастяжимой нити или лёгкого стержня 
          и находящуюся в однородном поле сил тяготения. </p>
        <div className="line"></div>
        <h2>Визуализация поведения математического маятника в зависимости от заданных параметров системы</h2>
        <h3>Пользователь может изменять исходные параметры системы:</h3>
        <p>Длина подвеса маятника (l): единица измерения - [м]</p>
        <p>Сила притяжения (g): единица измерения - [м/с^2]</p>
        <p>Начальное отклонение (p): единица измерения - [°]</p>
        <h3>Неизменяемый параметр системы:</h3>
        <p>Окружающая среда - вакуум</p>
        <h3>Период колебаний маятника рассчитывается по формуле:</h3>
        <p>T = 2*PI*sqrt(l/g) [с]</p>
      </Modal>
    </div>
  );
}

export default App;
