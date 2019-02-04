// This file generates the hard-coded modes for types of keyboards

import React from 'react';
import Key from './Key.js';

// This function renders individual keys, should be called for each key on an actual keyboard
function renderKey(label, keyname, keycode, show) {
  return (
    <div className="key" data-key={keyname} data-keycode={keycode} data-show={show}>
      {label}
    </div>
  );
}

// Default keyboard where every key is available
export function Default() {
  return (
    <div id="keyboard-container" style={{marginTop: 10}}>
        <div id="num-row" className="key-row">
        <Key label={1} keyname={1} keycode={49} show={true} />
        <Key label={2} keyname={2} keycode={50} show={true} />
        <Key label={3} keyname={3} keycode={51} show={true} />
        <Key label={4} keyname={4} keycode={52} show={true} />
        <Key label={5} keyname={5} keycode={53} show={true} />
        <Key label={6} keyname={6} keycode={54} show={true} />
        <Key label={7} keyname={7} keycode={55} show={true} />
        <Key label={8} keyname={8} keycode={56} show={true} />
        <Key label={9} keyname={9} keycode={57} show={true} />
        <Key label={0} keyname={0} keycode={48} show={true} />
        <Key label={'-'} keyname={'-'} keycode={189} show={true} />
        <Key label={'='} keyname={'='} keycode={187} show={true} />
      </div>

      <div id="q-row" className="key-row">
        <Key label={"Q"} keyname={"Q"} keycode={81} show={true} />
        <Key label={"W"} keyname={"W"} keycode={87} show={true} />
        <Key label={"E"} keyname={"E"} keycode={69} show={true} />
        <Key label={"R"} keyname={"R"} keycode={82} show={true} />
        <Key label={"T"} keyname={"T"} keycode={84} show={true} />
        <Key label={"Y"} keyname={"Y"} keycode={89} show={true} />
        <Key label={"U"} keyname={"U"} keycode={85} show={true} />
        <Key label={"I"} keyname={"I"} keycode={73} show={true} />
        <Key label={"O"} keyname={"O"} keycode={79} show={true} />
        <Key label={"P"} keyname={"P"} keycode={80} show={true} />
        <Key label={"["} keyname={"["} keycode={219} show={true} />
        <Key label={"]"} keyname={"]"} keycode={221} show={true} />      
      </div>

      <div id="a-row" className="key-row">
        <Key label={"A"} keyname={"A"} keycode={65} show={true} />
        <Key label={"S"} keyname={"S"} keycode={83} show={true} />
        <Key label={"D"} keyname={"D"} keycode={68} show={true} />
        <Key label={"F"} keyname={"F"} keycode={70} show={true} />
        <Key label={"G"} keyname={"G"} keycode={71} show={true} />
        <Key label={"H"} keyname={"H"} keycode={72} show={true} />
        <Key label={"J"} keyname={"J"} keycode={74} show={true} />
        <Key label={"K"} keyname={"K"} keycode={75} show={true} />
        <Key label={"L"} keyname={"L"} keycode={76} show={true} />
        <Key label={";"} keyname={";"} keycode={186} show={true} />
        <Key label={"'"} keyname={"'"} keycode={222} show={true} />
      </div>

      <div id= "z-row" className="key-row">
        <Key label={"Z"} keyname={"Z"} keycode={90} show={true} />
        <Key label={"X"} keyname={"X"} keycode={88} show={true} />
        <Key label={"C"} keyname={"C"} keycode={67} show={true} />
        <Key label={"V"} keyname={"V"} keycode={86} show={true} />
        <Key label={"B"} keyname={"B"} keycode={66} show={true} />
        <Key label={"N"} keyname={"N"} keycode={78} show={true} />
        <Key label={"M"} keyname={"M"} keycode={77} show={true} />
        <Key label={","} keyname={","} keycode={188} show={true} />
        <Key label={"."} keyname={"."} keycode={190} show={true} />
        <Key label={"/"} keyname={"/"} keycode={191} show={true} />
      </div>
    </div>
  );
}

// Piano keyboard where only select keys are shown, configuration is based off of Ableton
export function Piano() {
  return (
    <div id="keyboard-container">
      <div id="num-row" className="key-row">
        {renderKey("", "1", 49, false)}
        {renderKey("", "2", 50, false)}
        {renderKey("", "3", 51, false)}
        {renderKey("", "4", 52, false)}
        {renderKey("", "5", 53, false)}
        {renderKey("", "6", 54, false)}
        {renderKey("", "7", 55, false)}
        {renderKey("", "8", 56, false)}
        {renderKey("", "9", 57, false)}
        {renderKey("", "0", 48, false)}
        {renderKey("", "-", 189, false)}
        {renderKey("", "=", 187, false)}
      </div>

      <div id="q-row" className="key-row">
        {renderKey("", "Q", 81, false)}
        {renderKey("C#", "W", 87, true)}
        {renderKey("D#", "E", 69, true)}
        {renderKey("", "R", 82, false)}
        {renderKey("F#", "T", 84, true)}
        {renderKey("G#", "Y", 89, true)}
        {renderKey("A#", "U", 85, true)}
        {renderKey("", "I", 73, false)}
        {renderKey("", "O", 79, false)}
        {renderKey("", "P", 80, false)}
        {renderKey("", "[", 219, false)}
        {renderKey("", "]", 221, false)}
      </div>

      <div id="a-row" className="key-row">
        {renderKey("C", "A", 65, true)}
        {renderKey("D", "S", 83, true)}
        {renderKey("E", "D", 68, true)}
        {renderKey("F", "F", 70, true)}
        {renderKey("G", "G", 71, true)}
        {renderKey("A", "H", 72, true)}
        {renderKey("B", "J", 74, true)}
        {renderKey("C", "K", 75, true)}
        {renderKey("", "L", 76, false)}
        {renderKey("", ";", 186, false)}
        {renderKey("", "'", 222, false)}
      </div>

      <div id= "z-row" className="key-row">
        {renderKey("Octave Up", "Z", 90, true)}
        {renderKey("Octave Down", "X", 88, true)}
        {renderKey("Velocity Up", "C", 67, true)}
        {renderKey("Velocity Down", "V", 86, true)}
        {renderKey("", "B", 66, false)}
        {renderKey("", "N", 78, false)}
        {renderKey("", "M", 77, false)}
        {renderKey("", ",", 188, false)}
        {renderKey("", ".", 190, false)}
        {renderKey("", "/", 191, false)}
      </div>
    </div>
  );
}