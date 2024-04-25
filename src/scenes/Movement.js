class Movement extends Phaser.Scene {
    constructor() {
        super("movementScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Define asset paths
        this.assets = [
            "character_roundGreen.png",
            "character_handGreen.png",
            "character_handPurple.png",
            "character_handRed.png",
            "character_handYellow.png",
            "tile_gem.png",
            "tile_key.png"
        ];

        // Define key objects
        this.keyA = null;
        this.keyD = null;
        this.keySPACE = null;  // Space bar key

        // Define game boundaries
        this.gameWidth = 800; // Adjust as needed for your game width
    }

    preload() {
        // Load avatar and other assets
        this.assets.forEach(asset => {
            this.load.image(asset, "assets/" + asset);
        });
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create parent container for the avatar
        my.avatarContainer = this.add.container(200, 300);

        // Create avatar components and add them to the container
        my.sprite.body = this.add.sprite(0, 0, "character_roundGreen.png");
        my.sprite.leftHand = this.add.sprite(-20, 0, "character_handGreen.png");
        my.sprite.rightHand = this.add.sprite(20, 0, "character_handPurple.png");
        my.sprite.leftLeg = this.add.sprite(0, 30, "character_handRed.png");
        my.sprite.rightLeg = this.add.sprite(0, 30, "character_handYellow.png");

        // Add sprites to the container
        my.avatarContainer.add([my.sprite.body, my.sprite.leftHand, my.sprite.rightHand, my.sprite.leftLeg, my.sprite.rightLeg]);

        // Set up keyboard input
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Placeholder sprites for tile_gem.png and tile_key.png
        my.sprite.gem = this.add.sprite(400, 200, "tile_gem.png").setVisible(false);
        my.sprite.key = this.add.sprite(500, 200, "tile_key.png").setVisible(false);
    }

    update() {
        let my = this.my;

        // Move player avatar left on "A" key press
        if (this.keyA.isDown) {
            my.avatarContainer.x -= 10; // Adjust the movement speed as needed
            this.checkBoundaries();
        }

        // Move player avatar right on "D" key press
        if (this.keyD.isDown) {
            my.avatarContainer.x += 10; // Adjust the movement speed as needed
            this.checkBoundaries();
        }

        // Emit sprite on space bar press
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.emitSprite();
        }
        
        // Update emitted sprite movement
        if (my.sprite.emitted) {
            my.sprite.emitted.y -= 4; // Adjust the upward movement speed as needed

            // Check if emitted sprite is out of bounds
            if (my.sprite.emitted.y < -100) {
                my.sprite.emitted.destroy(); // Destroy the emitted sprite if it goes off-screen
                my.sprite.emitted = null;
            }
        }
    }

    checkBoundaries() {
        let my = this.my;

        // Ensure avatar does not go off the left edge of the screen
        if (my.avatarContainer.x < 0) {
            my.avatarContainer.x = 0;
        }

        // Ensure avatar does not go off the right edge of the screen
        if (my.avatarContainer.x > this.gameWidth) {
            my.avatarContainer.x = this.gameWidth;
        }
    }

    emitSprite() {
        let my = this.my;

        // Create and emit a sprite from the player avatar
        my.sprite.emitted = this.add.sprite(my.avatarContainer.x, my.avatarContainer.y - 30, "tile_gem.png");
    }
}