// This file generates the hard-coded modes for types of keyboards

import React from 'react';

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
        <div id="keyboard-container">
            <div id="num-row" className="key-row">
                {renderKey("1", "1", 49, true)}
                {renderKey("2", "2", 50, true)}
                {renderKey("3", "3", 51, true)}
                {renderKey("4", "4", 52, true)}
                {renderKey("5", "5", 53, true)}
                {renderKey("6", "6", 54, true)}
                {renderKey("7", "7", 55, true)}
                {renderKey("8", "8", 56, true)}
                {renderKey("9", "9", 57, true)}
                {renderKey("0", "0", 48, true)}
                {renderKey("-", "-", 189, true)}
                {renderKey("=", "=", 187, true)}
            </div>

            <div id="q-row" className="key-row">
                {renderKey("Q", "Q", 81, true)}
                {renderKey("W", "W", 87, true)}
                {renderKey("E", "E", 69, true)}
                {renderKey("R", "R", 82, true)}
                {renderKey("T", "T", 84, true)}
                {renderKey("Y", "Y", 89, true)}
                {renderKey("U", "U", 85, true)}
                {renderKey("I", "I", 73, true)}
                {renderKey("O", "O", 79, true)}
                {renderKey("P", "P", 80, true)}
                {renderKey("[", "[", 219, true)}
                {renderKey("]", "]", 221, true)}
            </div>

            <div id="a-row" className="key-row">
                {renderKey("A", "A", 65, true)}
                {renderKey("S", "S", 83, true)}
                {renderKey("D", "D", 68, true)}
                {renderKey("F", "F", 70, true)}
                {renderKey("G", "G", 71, true)}
                {renderKey("H", "H", 72, true)}
                {renderKey("J", "J", 74, true)}
                {renderKey("K", "K", 75, true)}
                {renderKey("L", "L", 76, true)}
                {renderKey(";", ";", 186, true)}
                {renderKey("'", "'", 222, true)}
            </div>

            <div id= "z-row" className="key-row">
                {renderKey("Z", "Z", 90, true)}
                {renderKey("X", "X", 88, true)}
                {renderKey("C", "C", 67, true)}
                {renderKey("V", "V", 86, true)}
                {renderKey("B", "B", 66, true)}
                {renderKey("N", "N", 78, true)}
                {renderKey("M", "M", 77, true)}
                {renderKey(",", ",", 188, true)}
                {renderKey(".", ".", 190, true)}
                {renderKey("/", "/", 191, true)}
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