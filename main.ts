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
    info.changeScoreBy(sprites.readDataNumber(sprite, "rank"))
})

function changeGravityVector(vector: number) {
    switch (vector) {
        case 0:             // vector is UP
            for (let c = 1; c <= gridW; c++) {
                for (let cIndex = 0; cIndex <= grid.colSprites(c).length - 2; cIndex ++) {       // assuming that indexes in the colSprites array start with 0
                    if (sprites.readDataNumber(grid.colSprites(c)[cIndex], "rank") == sprites.readDataNumber(grid.colSprites(c)[cIndex + 1], "rank")) {
                        sprites.changeDataNumberBy(grid.colSprites(c)[cIndex], "rank", 1)
                        sprites.setDataBoolean(grid.colSprites(c)[cIndex], "updated", false)
                        sprites.destroy(grid.colSprites(c)[cIndex + 1])
                    }
                }
            }
            for (let c = 1; c <= 8; c++) {
                let r = 1
                for (let sprite of grid.colSprites(c)) {        
                    grid.place(sprite, tiles.getTileLocation(c, r))
                    r ++
                }
            }
            break

        case 6:             // vector is DOWN
            for (let c = 1; c <= gridW; c++) {
                for (let cIndex = 0; cIndex <= grid.colSprites(c).length - 2; cIndex++) {       // assuming that indexes in the colSprites array start with 0
                    if (sprites.readDataNumber(grid.colSprites(c)[gridH - cIndex], "rank") == sprites.readDataNumber(grid.colSprites(c)[gridH - cIndex + 1], "rank")) {
                        sprites.changeDataNumberBy(grid.colSprites(c)[gridH - cIndex], "rank", 1)
                        sprites.setDataBoolean(grid.colSprites(c)[gridH - cIndex], "updated", false)
                        sprites.destroy(grid.colSprites(c)[gridH - cIndex + 1])
                    }
                }
            }
            for (let c = 1; c <= 8; c++) {
                let r = 0
                for (let sprite of grid.colSprites(c)) {
                    grid.place(sprite, tiles.getTileLocation(c, gridH - r))
                    r++
                }
            }
            break

        case 9:             // vector is LEFT   
            break

        case 3:             // vector is RIGHT
            break
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