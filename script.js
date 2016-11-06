$(document).ready(function() {

    // 0 = border, 1 = pellet, 2 power pellet, 3 ghost, 4 fruit, 5 portal, 6 nothing
    var stage0 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],

    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],

    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],

    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,6,6,6,6,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,6,6,6,6,6,6,6,6,6,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,6,6,6,6,0],
    [0,0,0,0,0,0,1,0,0,6,0,6,6,6,6,6,6,0,6,0,0,1,0,0,0,0,0,0],

    [5,6,6,6,6,6,1,6,6,6,0,6,6,6,6,6,6,0,6,6,6,1,6,6,6,6,6,5], // Center row with teleport

    [0,0,0,0,0,0,1,0,0,6,0,6,6,6,6,6,6,0,6,0,0,1,0,0,0,0,0,0],
    [0,6,6,6,6,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,6,6,6,6,6,6,6,6,6,0,0,1,0,6,6,6,6,0],
    [0,6,6,6,6,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,6,6,6,6,0],
    [0,0,0,0,0,0,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,0,0,0,0,0,0],

    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],

    [0,2,1,1,0,0,1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1,0,0,1,1,2,0],

    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],

    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],

    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],

    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    var stage0Graph

    $.getScript("graph.js", function() {
        stage0Graph = new Graph()
        stage0Graph.consumeGrid(stage0, [0])
        stage0Graph.pointToPoint = function(p0, p1) {
            //note: pacman assumes x is horizontal axis and y is vertical, but graph assumes the opposite, so values must be transposed before passing in
            var length = stage0[0].length
            var width = stage0.length
            return stage0Graph.Astar(Math.floor(p0.y)*length+Math.floor(p0.x),Math.floor(p1.y)*length+Math.floor(p1.x), true, length, width)
        }
    })

    var gameManager = {
        shiftCadence: 50, //ms
        wakaCadence:  100, //ms
        powerPelletPulseCadence: 500, //ms
        powerPelletActive: false,
        initialized: false,
        shiftIntervalID: undefined,
        wakaIntervalID: undefined,
        powerPelletPulseIntervalID: undefined,
        fired: false, //keeps track of whether a keypress has been registered so that it can fire more than once
        stageMatrix: undefined //set in buildUrl; separate from stage0 just in case more stages (stage1, stage2, etc) are added later
    }

    var pacman = {
        name: 'pacman',
        direction: 'right',
        shiftDelta: 4, //px
        nextMove: undefined,
        isGhost: false,
        waka: true
    }
    
    var inky = {
        name: 'inky',
        direction: 'left',
        shiftDelta: 4, //px
        nextMove: undefined,
        pathHome: [],
        isGhost: true
    }

    var blinky = {
        name: 'blinky',
        direction: 'right',
        shiftDelta: 4, //px
        nextMove: undefined,
        pathHome: [],
        isGhost: true
    };
    var pinky = {
        name: 'pinky',
        direction: 'left',
        shiftDelta: 4, //px
        nextMove: undefined,
        pathHome: [],
        isGhost: true
    };
    var clyde = {
        name: 'clyde',
        direction: 'right',
        shiftDelta: 4, //px
        nextMove: undefined,
        pathHome: [],
        isGhost: true
    };

    var ghosts = [inky, blinky, pinky, clyde]

    $(document).on('keydown', function(e) {
        if (gameManager['fired']) {
            return false; //ignore
        }
        gameManager['fired'] = true;
        if (e.which == 32) {
            if (!gameManager['initialized']) {
                buildStage(stage0);
                positionGhost(inky);
                positionGhost(blinky);
                positionGhost(pinky);
                positionGhost(clyde);
                positionPacman();
                $('audio.start')[0].play();
                gameManager['initialized'] = true;
                $('audio.start').on('ended', function() {
                    gameManager['shiftIntervalID'] = setInterval(function() {
                        shift($('.pacman'));
                        
                        for (g in ghosts) {
                            var sprite = $('.'+ghosts[g].name)

                            if (sprite.hasClass('eaten')) {//if eaten move faster, head home
                                shift(sprite)
                            }
                            if (shift(sprite)) {//checking for if pacman is caught
                                clearInterval(gameManager['shiftIntervalID']);
                                console.log('THIS IS THE END, GOODBYE PACMAN');
                            }
                        }
                    }, gameManager['shiftCadence']);
                    gameManager['wakaIntervalID'] = setInterval(waka, gameManager['wakaCadence']);
                    gameManager['powerPelletPulseIntervalID'] = setInterval(powerPelletPulse, gameManager['powerPelletPulseCadence']);
                    gameManager['ghostStepIntervalID'] = setInterval(ghostStepAndScared, 100);
                    //$('audio.waka0')[0].play();
                });
            } else {
                console.log('Stopping');
                clearInterval(gameManager['shiftIntervalID']);
            }
            return false;
        }

        if (e.which == 82) {
            location.reload();
            return false;
        }

        if (e.which < 37 || e.which > 40) {
            return false;
        }

        changeDirection($('.pacman'), getKeyName(e));
    });

    $(document).on('keyup', function(e) {
        gameManager['fired'] = false;
    });

    function changeDirection(sprite, dir) {
        var move = canMove(sprite, dir);
        var data = sprite.data('data');
        data['nextMove'] = move['canMove'] ? move : undefined;
    }

    function shift(sprite) {
        var move;
        var spriteData = sprite.data('data');
        var nextMove = spriteData['nextMove'];
        var shiftDelta = spriteData['shiftDelta'];

        if (spriteData.pathHome && spriteData.pathHome.length) {
            var pos = getMatrixPos(getCenter(sprite))
            var nextHome = {//head towards next node on path home
                x: spriteData.pathHome[spriteData.pathHome.length-1].id%stage0[0].length,
                y: Math.floor(spriteData.pathHome[spriteData.pathHome.length-1].id/stage0[0].length),
            }

            if (pos.x == nextHome.x && pos.y == nextHome.y) { //if current position is final node on path home, pop and recalc dir to path home
                spriteData.pathHome.pop()
                if (spriteData.pathHome.length) {
                    nextHome = {//head towards next node on path home
                        x: spriteData.pathHome[spriteData.pathHome.length-1].id%stage0[0].length,
                        y: Math.floor(spriteData.pathHome[spriteData.pathHome.length-1].id/stage0[0].length),
                    }
                } else {
                    sprite.removeClass('eaten')
                }
            }

            if (pos.x-nextHome.x > 0) {
                nextMove = canMove(sprite, 'left')
            } else if (pos.x-nextHome.x < 0) {
                nextMove = canMove(sprite, 'right')
            } else if (pos.y-nextHome.y > 0) {
                nextMove = canMove(sprite, 'up')
            } else if (pos.y-nextHome.y < 0) {
                nextMove = canMove(sprite, 'down')
            }
        }

        if (nextMove !== undefined && nextMove['canMove'] == true) { //if passed a new direction and the new direction is able to be moved to, then set old direction to new direction
            spriteData['direction'] = nextMove['direction'];
            move = nextMove;
        } else {
            move = canMove(sprite, spriteData['direction']);
            if (!move['canMove']) { //if new direction fails, check to see if old direction can be moved to. if cant, return false with no displacement. else continue trucking on
                spriteData['waka'] = spriteData['isGhost'] ? undefined : false; //stop the waka
                return false;
            }
        }

        turnSprite(sprite, spriteData['direction']);
        spriteData['waka'] = spriteData['isGhost'] ? undefined : true; //if waka isnt running, start it back up
        spriteData['nextMove'] = undefined; //always clear queued move

        if (move['teleport']) {
            teleport(sprite, move['moveTo']);
        }

        if (spriteData['direction'] == 'left') {
            sprite.animate({'left': '-='+shiftDelta}, 0, 'linear');
        } else if (spriteData['direction'] == 'up') {
            sprite.animate({'top': '-='+shiftDelta}, 0, 'linear');
        } else if (spriteData['direction'] == 'right') {
            sprite.animate({'left': '+='+shiftDelta},0, 'linear');
        } else if (spriteData['direction'] == 'down') {
            sprite.animate({'top': '+='+shiftDelta}, 0, 'linear');
        }

        if (move['collectPellet'] || move['collectPowerPellet']) {
            collectPellet(move['moveTo'], move['collectPowerPellet']);
        }

        if (spriteData['isGhost'] && isCollisionWithPacman(sprite)) {
            if (sprite.hasClass('scared')) {
                eatGhost(sprite, spriteData);
            } else if (!gameManager['powerPelletActive'] && !sprite.hasClass('eaten')) {
                return true; //Game Over
            }
        }
    }

    function eatGhost(sprite, spriteData) {
        sprite.removeClass('scared');
        sprite.addClass('eaten');
        var pos = getMatrixPos(getCenter(sprite)) //11r13.5c
        spriteData.pathHome = stage0Graph.pointToPoint({x:pos.x,y:pos.y}, {x:13,y:11})
        console.log(spriteData.pathHome)
    }

    function isCollisionWithPacman(ghost) {
        function removePx(str) {
            var index = str.indexOf('px');
            return Number(str.slice(0, index));
        }
        var gx0 = removePx(ghost.css('left'));
        var gx1 = removePx(ghost.css('left'))+16;
        var gy0 = removePx(ghost.css('top'));
        var gy1 = removePx(ghost.css('top'))+16;

        var pacman = $('.pacman');
        var px0 = removePx(pacman.css('left'));
        var px1 = removePx(pacman.css('left'))+16;
        var py0 = removePx(pacman.css('top'));
        var py1 = removePx(pacman.css('top'))+16;

        if (gx0 > px1 || gx1 < px0 || gy0 > py1 || gy1 < py0) {
            return false;
        } else {
            return true;
        }
    }

    function canMove(sprite, dir) { //collision
        var center = getCenter(sprite);
        var matrixPos = getMatrixPos(center);
        var canMove = false;
        var moveTo;
        var spriteData = sprite.data('data');

        var x = matrixPos['x'];
        var y = matrixPos['y'];
        var collectPellet = false;
        var collectPowerPellet = false;
        var block;
        var collideBlockCenter; //front edge colliding with block center
        var atBlockCenter; //directly over block center
        var teleport;
        var stageMatrix = gameManager['stageMatrix'];

        if (!Number.isInteger(x) && x-Math.floor(x) == 0.5) {
            collideBlockCenter = true;
        } else if (!Number.isInteger(y) && y-Math.floor(y) == 0.5) {
            collideBlockCenter = true;
        } else if (Number.isInteger(x) && Number.isInteger(y)) {
            atBlockCenter = true;
        }

        if (atBlockCenter && spriteData['isGhost'] && !sprite.hasClass('eaten')) { //if ghost can turn from center of block, override dir unless returning home after being eaten
            var turn = canTurn(sprite, {x: x, y: y});
            if (turn['canTurn'] && turn['atCorner']) {
                var index = turn['options'].indexOf(spriteData['direction']); //find index of current direction in options
                if (index < 0) { //if options doesnt have current direction, equally weighted for new direction 
                    dir = turn['options'][getRandomInt(0, turn['options'].length)]; 
                    spriteData['direction'] = dir;
                } else { //weighted decision; ghost should want to continue going straight iff its a possibility 
                    if (getRandomInt(0, 100) < 70) {
                        //do nothing and continue in current direction
                    } else {
                        turn['options'].splice(index, 1); //remove current direction as an option
                        dir = turn['options'][getRandomInt(0, turn['options'].length)]; 
                        spriteData['direction'] = dir;
                    }
                }
            }
        }

        if (dir == 'up') {
            if ((Number.isInteger(x) && !Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                y = Math.ceil(y);
                block = getBlockType(stageMatrix[y-1][x]);
                moveTo = {x: x, y: y-1};
            }
        } else if (dir == 'right') {
            if ((!Number.isInteger(x) && Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                x = Math.floor(x);
                block = getBlockType(stageMatrix[y][x+1]);
                moveTo = {x: x+1, y: y};
            }
        } else if (dir == 'down') {
            if ((Number.isInteger(x) && !Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                y = Math.floor(y);
                block = getBlockType(stageMatrix[y+1][x]);
                moveTo = {x: x, y: y+1};
            }
        } else if (dir == 'left') {
            if ((!Number.isInteger(x) && Number.isInteger(y)) || (Number.isInteger(x) && Number.isInteger(y))) {
                x = Math.ceil(x);
                block = getBlockType(stageMatrix[y][x-1]);
                moveTo = {x: x-1, y: y};
            }
        }

        if (block !== undefined) {
            canMove = block !== 'border';
            if (collideBlockCenter) {
                collectPellet = (block == 'pellet' && !spriteData['isGhost']);
                collectPowerPellet = (block == 'power-pellet' && !spriteData['isGhost']);
                teleport = block == 'portal';
            }
        }

        return {
            sprite: sprite,
            canMove: canMove,
            center: center,
            direction: dir,
            collectPellet: collectPellet,
            collectPowerPellet: collectPowerPellet,
            moveTo: moveTo,
            teleport: teleport
        }
    }

    function getCenter(sprite) {
        var position = sprite.position();
        var centerY = (position['top']+position['top']+sprite.height())/2;
        var centerX = (position['left']+position['left']+sprite.width())/2;

        return {y: centerY.toFixed(2), x: centerX.toFixed(2)};
    }

    function canTurn(sprite, center) {
        var options = [];
        var x = center['x'];
        var y = center['y'];
        var spriteData = sprite.data('data');
        var atCorner;

        if (getBlockType(gameManager['stageMatrix'][y][x-1]) !== 'border') {
            options.push('left');
        }
        if (getBlockType(gameManager['stageMatrix'][y-1][x]) !== 'border') {
            options.push('up');
        }
        if (getBlockType(gameManager['stageMatrix'][y][x+1]) !== 'border') {
            options.push('right');
        }
        if (getBlockType(gameManager['stageMatrix'][y+1][x]) !== 'border') {
            options.push('down');
        }

        var dir=spriteData['direction'];
        if ((dir == 'left' || dir == 'right') && options.length == 2 && options.indexOf('left') >= 0  && options.indexOf('right') >= 0) {
            atCorner = false;
        } else if ((dir == 'up' || dir == 'down') && options.length == 2 && options.indexOf('up') >= 0  && options.indexOf('down') >= 0) {
            atCorner = false;
        } else {
            atCorner = true;
        }

        return {
            canTurn: options.length > 0,
            options: options,
            atCorner: atCorner
        }
    }

    function getMatrixPos(center) {
       var col = (center['x']-8)/16;
       var row = (center['y']-8)/16;

       return { y: row, x: col }
    }

    function getBlockType(block) {
        var type;

        if (block == 0) {
            type = 'border';
        } else if (block == 1) {
            type = 'pellet';
        } else if (block == 2) {
            type = 'power-pellet';
        } else if (block == 3) {
            type = 'ghost';
        } else if (block == 4) {
            type = 'fruit';
        } else if (block == 5) {
            type = 'portal';
        } else if (block == 6) {
            type = 'empty'
        }

        return type;
    }

    function getKeyName(e) {
        var text = '';

        if (e.which == 37) {
            text = 'left'
        } else if (e.which == 38) {
            text = 'up'
        } else if (e.which == 39) {
            text = 'right'
        } else if (e.which == 40) {
            text = 'down'
        }

        return text;
    }

    function buildStage(stageToBuild) {
        var block;

        for (var i = 0; i < stageToBuild.length; i++) {
            for (var j = 0; j < stageToBuild[i].length; j++) {
                block = getBlockType(stageToBuild[i][j]);
                $('.stage').append('<div class="block block'+i+'-'+j+' '+block+'">block</div>');
            }
        }

        gameManager['stageMatrix'] = stageToBuild; //stageMatrix = canonical matrix
    }

    function positionPacman() {
        var sprite = buildPacman();
        $('.stage').append(sprite);

        var topPos = scaleToGrid(23); //starting row
        var leftPos = scaleToGrid(13.5); //starting col

        sprite.css('top', topPos);
        sprite.css('left', leftPos);
        sprite.css('display', 'block');

        sprite.data('data', pacman);
    }

    function buildPacman() {
        var pacman = $('<div />', {class: 'sprite pacman'});
        pacman.append($('<div />', {class: 'top open semi'}));
        pacman.append($('<div />', {class: 'bottom open semi'}));

        return pacman;
    }

    function buildGhost(name) {
        var ghost = $('<div />', {class: 'sprite ghost '+name});
        ghost.append($('<div />', {class: 'eye left'}));
        ghost.append($('<div />', {class: 'eye right'}));
        ghost.append($('<div />', {class: 'pupil left'}));
        ghost.append($('<div />', {class: 'pupil right'}));
        var mouth;
        ghost.append(mouth = $('<div />', {class: 'mouth'}));
        mouth.append('<div />', {class: 'mouth0'});
        mouth.append('<div />', {class: 'mouth1'});
        mouth.append('<div />', {class: 'mouth0'});
        mouth.append('<div />', {class: 'mouth1'});
        mouth.append('<div />', {class: 'mouth0'});
        mouth.append('<div />', {class: 'mouth1'});
        mouth.append('<div />', {class: 'mouth0'});

        return ghost;
    }

    function positionGhost(ghost) {
        var sprite = buildGhost(ghost['name']);
        console.log(sprite,ghost);

        $('.stage').append(sprite);

        var topPos = scaleToGrid(11); //starting row
        var leftPos = scaleToGrid(13.5); //starting col

        sprite.css('top', topPos);
        sprite.css('left', leftPos);
        sprite.css('display', 'block');

        sprite.data('data', ghost);
    }

    function teleport(sprite, point) {
        var stageMatrix = gameManager['stageMatrix'];

        if (point['x'] == stageMatrix[0].length-1) {
            sprite.css('left', 8);
        } else if (point['x'] == 0) {
            sprite.css('left', (stageMatrix[0].length-1)*16+8);
        }
    }

    function collectPellet(point, isPowerPellet) {
        var stageMatrix = gameManager['stageMatrix'];

        stageMatrix[point['y']][point['x']] = 6;
        var pellet = $('.block'+point['y']+'-'+point['x']);
        
        pellet.addClass('empty');

        if (isPowerPellet) {
            pellet.removeClass('power-pellet');
            gameManager['powerPelletActive'] = true;
            var ghostSprites = $('.ghost');
            
            ghostSprites.addClass('scared');

            var scaredGhostIntervalID;
            setTimeout(function() {
                scaredGhostIntervalID = setInterval(function() {
                    ghostSprites.addClass('flash');
                    setTimeout(function () { ghostSprites.removeClass('flash'); }, 500);
                }, 750);
            }, 2000);
            setTimeout(function() {
                clearInterval(scaredGhostIntervalID);
                gameManager['powerPelletActive'] = false;
                ghostSprites.removeClass('scared');
                inky['shiftDelta'] = 4;
            }, 8000);
        } else {
            pellet.removeClass('pellet');
        }
    }

    function waka() {
        var waka = $('.pacman').data('data')['waka'];

        if (!waka) {
            return false;
        }

        if ($('.pacman .semi.open').length == 0) {
            $('.pacman .semi').addClass('open');
        } else {
            $('.pacman .semi.open').removeClass('open');
        }
    }

    function turnSprite(sprite, dir) {
        var spriteData = sprite.data('data');
        if (!spriteData['isGhost']) {
            var rotation;

            if (dir == 'up') {
                rotation = '270';
            } else if (dir == 'right') {
                rotation = '0';
            } else if (dir == 'down') {
                rotation = '90';
            } else if (dir == 'left') {
                rotation = '180';
            }
            sprite.css('transform', 'rotate('+rotation+'deg)');
        } else {
            sprite.removeClass('dir-left');
            sprite.removeClass('dir-up');
            sprite.removeClass('dir-right');
            sprite.removeClass('dir-down');
            sprite.addClass('dir-'+dir);
        }
    }

    function turnGhost(ghost, dir) {
        ghost.removeClass('dir-right');
        ghost.removeClass('dir-up');
        ghost.removeClass('dir-down');

        if (dir == 'left') {
            //do nothing, the absence of dir-* implies left
        } else if (dir == 'up') {
            ghost.addClass('dir-up');
        } else if (dir == 'right') {
            ghost.addClass('dir-right');
        } else if (dir == 'down') {
            ghost.addClass('dir-down');
        }
    }

    function ghostStepAndScared() {
        var ghost = $('.ghost');

        if (ghost.hasClass('step')) {
            ghost.removeClass('step');
        } else {
            ghost.addClass('step');
        }

        if (ghost.hasClass('scared')) {
            var mouth0 = $('.sprite.ghost .mouth0');
            var mouth1 = $('.sprite.ghost .mouth1');

            mouth0.removeClass('mouth0');
            mouth0.addClass('mouth1');
            mouth1.removeClass('mouth1');
            mouth1.addClass('mouth0');

        }
    }

    function scaleToGrid(n) {
        return n*16;
    }

    function powerPelletPulse() {
        var powerPellets = $('.power-pellet');

        if (powerPellets.hasClass('pulse')) {
            powerPellets.removeClass('pulse');
        } else {
            powerPellets.addClass('pulse');
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
});
