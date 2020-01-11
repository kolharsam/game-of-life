import React, { Component } from "react";
import Controls from "./Controls";
import Stats from "./Stats";
import { Cell } from "./Cell";
import Preset from "./Preset";
import { STARTERS } from "./constants/starters.constants";

import "../styles/styles.css";

class Conway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this._getNewGrid(),
      globalAnimationID: undefined,
      isAnimating: false
    };
  }

  _getNewGrid = (preset = []) => {
    const presetProvided = preset.length > 0;
    const { rows, cols } = this.props;
    let grid = [];
    for (let iter = 0; iter < rows; iter++) {
      let temp = [];
      for (let iter2 = 0; iter2 < cols; iter2++) {
        temp.push(0);
      }
      grid.push(temp);
    }

    if (presetProvided) {
      preset.forEach(loc => {
        grid[loc.x][loc.y] = 1;
      });
    }

    return grid;
  };

  _getAliveCells() {
    const currentGrid = this.state.grid;
    return currentGrid.reduce(
      (acc, val) => (acc += val.reduce((acc2, val2) => (acc2 += val2), 0)),
      0
    );
  }

  onClickCell = (e, pos) => {
    e.preventDefault();
    const [x, y] = pos;
    let currentGrid = this.state.grid;
    if (currentGrid[x][y] === 1) {
      currentGrid[x][y] = 0;
    } else if (currentGrid[x][y] === 0) {
      currentGrid[x][y] = 1;
    }

    this.setState({ grid: currentGrid });
  };

  _getRandomCellState() {
    return Math.floor(Math.random() * Math.floor(2));
  }

  _getNeighbourCount = (row, col) => {
    const directions = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 },
      { x: -1, y: 1 }
    ];
    const { rows, cols } = this.props;
    let neighbourCount = 0;

    directions.forEach(dir => {
      const nei_row = row + dir.x;
      const nei_col = col + dir.y;
      if (nei_row >= 0 && nei_col >= 0 && nei_row < rows && nei_col < cols) {
        if (this.state.grid[nei_row][nei_col]) {
          neighbourCount++;
        }
      }
    });

    return neighbourCount;
  };

  _gotoNextState = () => {
    const { grid } = this.state;
    const { rows, cols } = this.props;
    let nextGrid = this._getNewGrid();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const neighbourCount = this._getNeighbourCount(r, c);
        if (neighbourCount === 3 && grid[r][c] === 0) {
          nextGrid[r][c] = 1;
        }
        if (
          (neighbourCount === 2 || neighbourCount === 3) &&
          grid[r][c] === 1
        ) {
          nextGrid[r][c] = 1;
        }
      }
    }

    return nextGrid;
  };

  onClickNextState = () => {
    const grid = this._gotoNextState();
    this.setState({ grid });
  };

  _nextBoardState = () => {
    const nextGrid = this._gotoNextState();

    this.setState(
      {
        grid: nextGrid,
        globalAnimationID: window.requestAnimationFrame(this._nextBoardState)
      },
      () => {
        if (this._getAliveCells() === 0) {
          this._stopAnimation();
        }
      }
    );
  };

  tickBoard = e => {
    e.preventDefault();

    if (this._getAliveCells() === 0) {
      alert("The Board is Empty!");
      return;
    }
    this.setState({
      globalAnimationID: window.requestAnimationFrame(this._nextBoardState),
      isAnimating: true
    });
  };

  _stopAnimation = () => {
    this.setState({ isAnimating: false });
    window.cancelAnimationFrame(this.state.globalAnimationID);
  };

  pauseBoard = e => {
    e.preventDefault();
    this._stopAnimation();
  };

  clearBoard = e => {
    e.preventDefault();

    this.setState({
      grid: this._getNewGrid(),
      isAnimating: false,
      globalAnimationID: undefined
    });
  };

  createRandomGrid = e => {
    e.preventDefault();
    let grid = this._getNewGrid();
    const { rows, cols } = this.props;

    for (let iter = 0; iter < rows; iter++) {
      for (let iter2 = 0; iter2 < cols; iter2++) {
        grid[iter][iter2] = this._getRandomCellState();
      }
    }

    this.setState({ grid });
  };

  _renderGrid = () => {
    return this.state.grid.map((cells, row) => {
      return (
        <div
          className="cells-row"
          key={`cell-row-${row}`}
          style={{ width: `${this.props.cols * 15}` }}
        >
          {cells.map((cell, col) => (
            <Cell
              isAlive={cell === 1}
              pos={[row, col]}
              onClick={this.onClickCell}
              key={`cell-${row}-${col}`}
            />
          ))}
        </div>
      );
    });
  };

  loadGridFromPreset = (e, preset) => {
    e.preventDefault();
    const grid = this._getNewGrid(preset);
    this.setState({ grid });
  };

  _renderPresetOptions = () => {
    return STARTERS.map(starter => (
      <Preset
        presetName={starter.name}
        key={starter.name}
        onClick={this.loadGridFromPreset}
      />
    ));
  };

  render() {
    const { rows, cols } = this.props;
    const { isAnimating } = this.state;
    return (
      <div className="game-container">
        <div className="top">
          <Stats numberAlive={this._getAliveCells()} />
          <div className="preset-wrapper">{this._renderPresetOptions()}</div>
        </div>
        <div
          className="cells-box"
          style={{ height: `${12 * rows}px`, width: `${12 * cols}px` }}
        >
          {this._renderGrid()}
        </div>
        <Controls
          onClickHandlers={[
            this.tickBoard,
            this.pauseBoard,
            this.onClickNextState,
            this.clearBoard,
            this.createRandomGrid
          ]}
          isAnimating={isAnimating}
        />
      </div>
    );
  }
}

export default Conway;
