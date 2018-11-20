import React from 'react';

// This class holds the ModeSelector component which allows the user to switch between keyboard configurations
// using a dropdown list.
class ModeSelector extends React.Component {
    // Render an <option> element for a single mode
    renderMode(mode) {
        return (
            <option value={mode}>{mode}</option>
        );
    }

    // When a mode is selected, propagate change to parent component KeyBoard
    onChange(e) {
        var mode = e.target.value;
        this.props.onSelectMode(mode);
    }

    render() {
        return (
            <div className="dropbtn">
                <select id="select-mode" className="selector" onChange={this.onChange.bind(this)}>
                    {this.renderMode("Default")}
                	{this.renderMode("Piano")}
                	{this.renderMode("808")}
                </select>
            </div>
        );
    }
}

export default ModeSelector;