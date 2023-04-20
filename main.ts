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
    sprites.setDataNumber(sprite, "rank", 0)
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

function mergeTiles(tiles: Sprite[], reversed: boolean) {
    for (let i = 0; i < tiles.length - 1; i++) {       // assuming that indexes in the colSprites array start with 0
        let cIndex = reversed ? tiles.length - i : i
        if (sprites.readDataNumber(tiles[cIndex], "rank") == sprites.readDataNumber(tiles[cIndex + 1], "rank")) {
            sprites.changeDataNumberBy(tiles[cIndex], "rank", 1)
            sprites.setDataBoolean(tiles[cIndex], "updated", false)
            sprites.destroy(tiles[cIndex + 1])
        }
    }
}

function moveTiles(tiles: Sprite[], reversed: boolean, vertical: boolean) {
    let tilesMoved: boolean = false
    let pos = reversed ? (vertical ? gridH : gridW) - tiles.length + (vertical ? 0 : 1) : (vertical ? 1 : 0)            // starting point to place tiles
    for (let sprite of tiles) {
        let tmpPos = vertical ? sprite.tilemapLocation().row : sprite.tilemapLocation().column 
        if (tmpPos != pos) { 
            tilesMoved = true 
            grid.move(sprite,  (vertical ? 0 : pos - tmpPos), (vertical ? pos - tmpPos : 0))
        }
        pos++
    }
    return tilesMoved
}

function changeGravityVector(vector: number) {
    let tilesMoved: boolean = false
    switch (vector) {
        case 0:             // vector is UP
            for (let c = 1; c <= gridW; c++) { mergeTiles(grid.colSprites(c), false) }
            for (let c = 1; c <= gridW; c++) { tilesMoved = moveTiles(grid.colSprites(c), false, true) }
            break

        case 6:             // vector is DOWN
            for (let c = 1; c <= gridW; c++) { mergeTiles(grid.colSprites(c), true) }
            for (let c = 1; c <= gridW; c++) { tilesMoved = moveTiles(grid.colSprites(c), true, true) }
            break

        case 9:             // vector is LEFT   
            for (let r = 1; r <= gridH; r++) { mergeTiles(grid.rowSprites(r), false) }
            for (let r = 1; r <= gridH; r++) { tilesMoved = moveTiles(grid.rowSprites(r), false, false) }
            break

        case 3:             // vector is RIGHT
            for (let r = 1; r <= gridH; r++) { mergeTiles(grid.rowSprites(r), false) }
            for (let r = 1; r <= gridH; r++) { tilesMoved = moveTiles(grid.rowSprites(r), true, false) }
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
info.setFontColor(10)

seed(4)

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