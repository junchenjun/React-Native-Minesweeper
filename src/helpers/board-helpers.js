const initBoardData = (height, width, mines) => {
    // create a empty array
    let data = [];
    for (let i = 0; i < height; i++) {
        data.push([]);
        for (let j = 0; j < width; j++) {
            data[i][j] = {
                x: i,
                y: j,
                isMine: false,
                neighbour: 0,
                isRevealed: false,
                isEmpty: false,
                isFlagged: false,
            };
        }
    }

    // plant mines
    let randomx,
        randomy,
        minesPlanted = 0;
    while (minesPlanted < mines) {
        randomx = Math.floor(Math.random() * width);
        randomy = Math.floor(Math.random() * height);
        if (!data[randomx][randomy].isMine) {
            data[randomx][randomy].isMine = true;
            minesPlanted++;
        }
    }

    // get neighbours
    let newData = data;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (data[i][j].isMine !== true) {
                let mine = 0;
                const area = traverseBoard(
                    data[i][j].x,
                    data[i][j].y,
                    data,
                    height,
                    width
                );
                area.map(value => {
                    if (value.isMine) {
                        mine++;
                    }
                });
                if (mine === 0) {
                    newData[i][j].isEmpty = true;
                }
                newData[i][j].neighbour = mine;
            }
        }
    }
    return newData;
};

// looks for neighbouring cells and returns them
const traverseBoard = (x, y, data, height, width) => {
    const el = [];

    //up
    if (x > 0) {
        el.push(data[x - 1][y]);
    }

    //down
    if (x < height - 1) {
        el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
        el.push(data[x][y - 1]);
    }

    //right
    if (y < width - 1) {
        el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
        el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < width - 1) {
        el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < height - 1 && y < width - 1) {
        el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < height - 1 && y > 0) {
        el.push(data[x + 1][y - 1]);
    }

    return el;
};

// recursively reveals all the empty cells when a user clicks an empty cell.
const revealEmpty = (x, y, data, height, width) => {
    let area = traverseBoard(x, y, data, height, width);
    area.map(value => {
        if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
            data[value.x][value.y].isRevealed = true;
            if (value.isEmpty) {
                revealEmpty(value.x, value.y, data, height, width);
            }
        }
    });
    return data;
};

// get Hidden cells
const getHidden = data => {
    let mineArray = [];

    data.map(datarow => {
        datarow.map(dataitem => {
            if (!dataitem.isRevealed) {
                mineArray.push(dataitem);
            }
        });
    });

    return mineArray;
};

// get mines
const getMines = data => {
    let mineArray = [];

    data.map(datarow => {
        datarow.map(dataitem => {
            if (dataitem.isMine) {
                mineArray.push(dataitem);
            }
        });
    });

    return mineArray;
};

// get Flags
const getFlags = data => {
    let mineArray = [];

    data.map(datarow => {
        datarow.map(dataitem => {
            if (dataitem.isFlagged) {
                mineArray.push(dataitem);
            }
        });
    });

    return mineArray;
};

export {
    initBoardData,
    traverseBoard,
    revealEmpty,
    getHidden,
    getMines,
    getFlags,
};
