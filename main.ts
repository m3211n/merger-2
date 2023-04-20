sprites.onCreated(SpriteKind.Player, function (sprite) {
    let freeCells: number[] = []
    let tilesCells: number[] = []

    for (let i0 = 0; i0 < 48; i0++) {
        freeCells.push(i0)
    }

    for (let sprite of tilesSprites) {
        let spriteCell = (sprite.tilemapLocation().column - 1 ) + 8 * (sprite.tilemapLocation().row - 1)
        freeCells.removeAt(freeCells.indexOf(spriteCell))
    }

    let freeCell = freeCells._pickRandom()

    sprites.setDataBoolean(sprite, "updated", false)
    sprites.setDataNumber(sprite, "rank", 0)
    grid.place(sprite, tiles.getTileLocation(freeCell % 8 + 1, Math.floor(freeCell / 8) + 1))
})

sprites.onDestroyed(SpriteKind.Player, function (sprite) {

})

function mergeTiles(tiles: Sprite[], reversed: boolean) {
    let cIndex = 0
    for (let i = 0; i <= tiles.length - 2; i++) {       // assuming that indexes in the colSprites array start with 0
        switch (reversed) {
            case false:
                cIndex = i
                break
            case true:
                cIndex = tiles.length - i - 1
                break
        }
        if (sprites.readDataNumber(tiles[cIndex], "rank") == sprites.readDataNumber(tiles[cIndex + 1], "rank")) {
            sprites.changeDataNumberBy(tiles[cIndex], "rank", 1)
            sprites.setDataBoolean(tiles[cIndex], "updated", false)
            sprites.destroy(tiles[cIndex + 1])
        }
    }
}

function moveTiles(tiles: Sprite[], reversed: boolean, hor: boolean) {
    let tilesMoved: boolean = false
    let i = 1
    for (let sprite of tiles) {
        let tmpR = sprite.tilemapLocation().row
        if (tmpR != i) { tilesMoved = true }
        if (hor) {
            grid.move(sprite, 0, i - tmpR)
        } else {
            grid.move(sprite, i - tmpR, 0)
        }
        i++
    }
    return tilesMoved
}

function changeGravityVector(vector: number) {
    let tilesMoved: boolean = false
    switch (vector) {
        case 0:             // vector is UP
            for (let c = 1; c <= gridW; c++) {
                mergeTiles(grid.colSprites(c), false)
            }
            for (let c = 1; c <= gridW; c++) {
                let r = 1
                for (let sprite of grid.colSprites(c)) {
                    let tmpC = sprite.tilemapLocation().column
                    let tmpR = sprite.tilemapLocation().row
                    if (tmpC != c || tmpR != r) { tilesMoved = true }        
                    grid.place(sprite, tiles.getTileLocation(c, r))
                    r ++
                }
            }
            break

        case 6:             // vector is DOWN
            for (let c = 1; c <= gridW; c++) {
                for (let cIndex = 0; cIndex <= grid.colSprites(c).length - 2; cIndex++) {       // assuming that indexes in the colSprites array start with 0
                    mergeTiles(grid.colSprites(c), true)
                }
            }
            for (let c = 1; c <= 8; c++) {
                let r = gridH - grid.colSprites(c).length + 1
                for (let sprite of grid.colSprites(c)) {
                    grid.place(sprite, tiles.getTileLocation(c, r))
                    r++
                }
            }
            break

        case 9:             // vector is LEFT   
            break

        case 3:             // vector is RIGHT
            break
    }   
    if (tilesMoved) {
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
let tilesSprites: Sprite[] = []
let gridW = 8
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

scene.centerCameraAt(80, 64)
tiles.setCurrentTilemap(tilemap`level1`)
info.setScore(0)

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