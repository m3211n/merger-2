sprites.onCreated(SpriteKind.Player, function (sprite) {
    let freeCells: number[] = []
    let tilesCells: number[] = []

    for (let i0 = 0; i0 < gridW * gridH; i0++) {
        freeCells.push(i0)
    }

    for (let sprite of tilesSprites) {
        let spriteCell = (sprite.tilemapLocation().column ) + gridW * (sprite.tilemapLocation().row - 1)
        freeCells.removeAt(freeCells.indexOf(spriteCell))
    }

    let freeCell = freeCells._pickRandom()

    sprites.setDataBoolean(sprite, "updated", false)
    sprites.setDataNumber(sprite, "rank", Math.randomRange(0, 5))
    grid.place(sprite, tiles.getTileLocation(freeCell % gridW, Math.floor(freeCell / gridW) + 1))
})

sprites.onDestroyed(SpriteKind.Player, function (sprite) {
})

function seed(count: number) {
    for (let i = 0; i < count; i ++) {
        tilesSprites.push(sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player))
    }
}

function mergeTiles(segment: Sprite[], reversed: boolean) {
    let s = " | "
    for (let i = 0; i < segment.length - 1; i++) {
        let index = reversed ? segment.length - 1 - i : i
        let next = reversed ? index - 1 : index + 1
        s = s + sprites.readDataNumber(segment[index], "rank") + "<>" + sprites.readDataNumber(segment[next], "rank") + " | "
        if (sprites.readDataNumber(segment[index], "rank") == sprites.readDataNumber(segment[next], "rank")) {
            sprites.changeDataNumberBy(segment[index], "rank", 1)
            sprites.setDataBoolean(segment[index], "updated", false)
            sprites.destroy(segment[next])
        }
    }
    console.log(s)
}

function moveTiles(tiles: Sprite[], reversed: boolean, vertical: boolean) {
}

function changeGravityVector(vector: number) {

    console.log("== INITIAL ==")

    for (let col = 0; col < grid.numColumns(); col++) {
        let s = "col " + col + ": | "
        for (let sprite of grid.colSprites(col)) {
            s = s + sprites.readDataNumber(sprite, "rank") + " | "
        }
        console.log(s)
    }

    console.log("----------------")

    for (let row = 0; row < grid.numRows(); row++) {
        let s = "row " + row + ": | "
        for (let sprite of grid.rowSprites(row)) {
            s = s + sprites.readDataNumber(sprite, "rank") + " | "
        }
        console.log(s)
    }

    switch (vector) {
        case 9:             // LEFT
            for (let row = 0; row < grid.numRows(); row++) {
                console.log("row " + row + ":")
                mergeTiles(grid.rowSprites(row), false)
            }
            break
        
        case 3:             // RIGHT
            for (let row = 0; row < grid.numRows(); row++) {
                console.log("row " + row + ":")
                mergeTiles(grid.rowSprites(row), true)
            }
            break
        
        case 0:             // UP
            for (let col = 0; col < grid.numColumns(); col++) {
                console.log("col " + col + ":")
                mergeTiles(grid.colSprites(col), false)
            }
            break

        case 6:             // DOWN
            for (let col = 0; col < grid.numColumns(); col++) {
                console.log("col " + col + ":")
                mergeTiles(grid.colSprites(col), true)
            }
            break

    }

    console.log("== RESULT ==")

    for (let col = 0; col < grid.numColumns(); col ++) {
        let s = "col " + col + ": | "
        for (let sprite of grid.colSprites(col)) {
            s = s + sprites.readDataNumber(sprite, "rank") + " | "
        }
        console.log(s)
    }

    console.log("----------------")

    for (let row = 0; row < grid.numRows(); row++) {
        let s = "row " + row + ": | "
        for (let sprite of grid.rowSprites(row)) {
            s = s + sprites.readDataNumber(sprite, "rank") + " | "
        }
        console.log(s)
    }

}

let tilesSprites: Sprite[] = []
let gridW = 10
let gridH = 6

let tilesImages = [
    assets.image`tile_0`,
    assets.image`tile_1`,
    assets.image`tile_2`,
    assets.image`tile_3`,
    assets.image`tile_4`,
    assets.image`tile_5`,
    assets.image`tile_6`,
    assets.image`tile_7`,
    assets.image`tile_8`,
    assets.image`tile_9`
]

tiles.setCurrentTilemap(tilemap`level2`)
info.setScore(0)
info.setBorderColor(0)
info.setBackgroundColor(0)
info.setFontColor(2)

seed(20)

game.onUpdateInterval(10, function() {
    for (let sprite of tilesSprites) {
        if (!(sprites.readDataBoolean(sprite, "updated"))) {
            sprite.setImage(tilesImages[sprites.readDataNumber(sprite, "rank")])
            info.changeScoreBy(sprites.readDataNumber(sprite, "rank"))
            sprites.setDataBoolean(sprite, "updated", true)
        }
        if (sprites.readDataNumber(sprite, "rank") == 10) {
            pause(500)
            game.gameOver(true)
        }
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    changeGravityVector(9)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    changeGravityVector(3)
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    changeGravityVector(0)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    changeGravityVector(6)
})