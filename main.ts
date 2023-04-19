sprites.onCreated(SpriteKind.Player, function (sprite) {
    success = false
    while (!(success)) {
        randomC = randint(1, 8)
        randomR = randint(1, 6)
        if (tiles2.length > 0) {
            for (let sprite of grid.allSprites()) {
                if (grid.spriteCol(sprite) != randomC || grid.spriteRow(sprite) != randomR) {
                    success = true
                }
            }
        } else {
            success = true
        }
    }
    grid.place(sprite, tiles.getTileLocation(randomC, randomR))
    sprites.setDataBoolean(sprite, "updated", false)
    sprites.setDataNumber(sprite, "rank", 0)
})
let randomR = 0
let randomC = 0
let success = false
let tiles2: Sprite[] = []
let images2 = [
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
tiles2 = []
scene.centerCameraAt(80, 64)
tiles.setCurrentTilemap(tilemap`level1`)
tiles2.push(sprites.create(img`
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
tiles2.push(sprites.create(img`
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
game.onUpdate(function () {
    for (let sprite of tiles2) {
        if (!(sprites.readDataBoolean(sprite, "updated"))) {
            sprite.setImage(images2[sprites.readDataNumber(sprite, "rank")])
            sprites.setDataBoolean(sprite, "updated", true)
        }
        if (sprites.readDataNumber(sprite, "rank") == 9) {
            pause(500)
            game.gameOver(true)
        }
    }
})
