var game = new Phaser.Game(440, 580, Phaser.AUTO, '', {
    preload: function(){
        game.load.spritesheet("tiles", "assets/tiles.png", 42, 42);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;

        game.scale.maxWidth = 440;
        game.scale.maxHeight = 580;
    },

    create: function(){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
            isMobile = true;
        game.world.setBounds(-10, -10, 440, 580);
        //game.time.advancedTiming = true;
        game.stage.backgroundColor = "#FFFFFF";
        for(i = 0; i < 10; i++){
            var sp1 = [];
            for(j = 0; j < 10; j++){
                var sp = game.add.sprite(j*42, i*42, 'tiles');
                sp.frame = 10;
                sp1.push(sp);
            }
            grid.push(sp1);
        }

        create_figure();
    },

    update: function(){
        if(kilk_fig == 0){
            create_figure();
            check_end();
        }

        if(game_over == 1){
            game.paused = true;
            //console.log("game_over");
        }
    },

    render: function(){
         //game.debug.text(game.time.fps, 420, 420);
    }
});

function create_figure(){
    for(var i = 0; i < 3; i++){
        while(true){
            var r = rand(0, 9);
            var kilk = 0;
            for(var j = 0; j < 3; j++){
                if(r != fig[j].frame)
                    kilk++;
            }

            if(kilk == 3){
                fig[i].frame = r;
                break;
            }
        }
        while(true){
            var r = rand(0, figures.length-1);
            var kilk = 0;
            for(var j = 0; j < 3; j++){
                if(r != fig[j].nomer)
                    kilk++;
            }

            if(kilk == 3){
                fig[i].nomer = r;
                break;
            }
        }

        fig[i].sprite = game.add.sprite();
        fig[i].sprite.inputEnabled = true;
        fig[i].sprite.input.enableDrag();
        fig[i].sprite.events.onDragStart.add(event_dragstart["event" + (i+1)], this);
        fig[i].sprite.events.onDragStop.add(event_dragstop["event" + (i+1)], this);
        fig[i].sprite.events.onDragUpdate.add(event_dragupdate["event" + (i+1)], this);
        fig[i].w = 42.0*figures[fig[i].nomer][0].length;
        fig[i].h = 42.0*figures[fig[i].nomer].length;

        for(var j = 0; j < figures[fig[i].nomer].length; j++){
            for(var k = 0; k < figures[fig[i].nomer][j].length; k++){
                var temp;
                if(figures[fig[i].nomer][j][k] == 1){
                     temp = game.add.sprite(k*42, j*42, "tiles");
                 }
                else{
                    temp = game.add.sprite(k*42, j*42);
                }
                temp.frame = fig[i].frame;
                fig[i].sprite.addChild(temp);
            }
        }

        fig[i].sprite.scale.x = scale;
        fig[i].sprite.scale.y = scale;
        fig[i].sprite.position.x = (70 + i*140) - (fig[i].w * 0.5) * scale;
        fig[i].sprite.position.y = 500 - (fig[i].h * 0.5) * scale;
        fig[i].del = false;
    }
    kilk_fig = 3;
}

function drag_stop(n){
    var i = Math.round(fig[n].sprite.position.y / 42.0);
    var j = Math.round(fig[n].sprite.position.x / 42.0);

    if(i >= 0 && i < 10 && j >= 0 && j < 10){
        if(put_down(fig[n].nomer, i, j) == true){
            var val = 0;

            for(var k = 0; k < figures[fig[n].nomer].length; k++){
                for(var l = 0; l < figures[fig[n].nomer][0].length; l++){
                    if(figures[fig[n].nomer][k][l] == 1){
                        val++;
                        grid[i+k][j+l].frame = fig[n].frame;
                    }
                }
            }

            score += val;
            undo.xi = i;
            undo.yi = j;
            undo.nomer = fig[n].nomer;
            undo.n = n;
            undo_t = false;
            document.getElementById("value").innerHTML = score;
            fig[n].sprite.destroy();
            fig[n].del = true;
            kilk_fig--;
            check_delete();
            if(kilk_fig > 0)
                check_end();
            return;
        }
    }

    fig[n].sprite.scale.x = scale;
    fig[n].sprite.scale.y = scale;
    fig[n].sprite.position.x = (70 + n*140) - (fig[n].w * 0.5) * scale;
    fig[n].sprite.position.y = 500 - (fig[n].h * 0.5) * scale;
}

function put_down(nomer, i, j){
    for(var k = 0; k < figures[nomer].length; k++){
        for(var l = 0; l < figures[nomer][0].length; l++){
            if(figures[nomer][k][l] == 1){
                if(i+k > 9 || j+l > 9)
                    return false;
                if(grid[i+k][j+l].frame != 10)
                    return false;
            }
        }
    }

    return true;
}

function check_end(){
    for(var i = 0; i < 3; i++){
        if(fig[i].del == false){
            for(var k = 0; k < 10; k++){
                for(var l = 0; l < 10; l++){
                    if(put_down(fig[i].nomer, k, l) == true)
                        return;
                }
            }
        }
    }

    bar = game.add.graphics();
    bar.beginFill(0x000000, 0.4);
    bar.drawRect(-10, 140, 450, 100);
    var style = { font: "bold 60px Arial", fill: "#FF0000", boundsAlignH: "center", boundsAlignV: "middle" };
    text = game.add.text(0, 0, "Game Over", style);
    text.setTextBounds(-10, -10, 440, 400);

    game_over = 1;
}

function check_delete(){
    var row = [];
    var col = [];

    for(i = 0; i < 10; i++){
        var t1 = 0, t2 = 0;
        for(j = 0; j < 10; j++){
            if(grid[i][j].frame == 10)
                break;
            if(grid[i][j].frame < 10)
                t1++;
        }

        for(j = 0; j < 10; j++){
            if(grid[j][i].frame == 10)
                break;
            if(grid[j][i].frame < 10)
                t2++;
        }

        if(t1 == 10)
            row.push(i);
        if(t2 == 10)
            col.push(i);
    }

    score += row.length * 10 + col.length * 10;
    document.getElementById("value").innerHTML = score;

    undo.res = []
    undo.fr = []

    for(i = 0; i < row.length; i++){
        for(j = 0; j < 10; j++){
            undo.res.push([row[i], j]);
            undo.fr.push(grid[row[i]][j].frame);
            grid[row[i]][j].frame = 10;
        }
    }

    for(i = 0; i < col.length; i++){
        for(j = 0; j < 10; j++){
            undo.res.push([j, col[i]]);
            undo.fr.push(grid[j][col[i]].frame);
            grid[j][col[i]].frame = 10;
        }
    }
}

function restart(){
    if(game_over == 1){
        text.destroy();
        bar.destroy();
    }
    game_over = 0;
    fig[0].sprite.destroy();
    fig[1].sprite.destroy();
    fig[2].sprite.destroy();
    game.paused = false;
    create_figure()
    kilk_fig = 3;
    check_end();


    for(i = 0; i < 10; i++){
        for(j = 0; j < 10; j++){
            grid[i][j].frame = 10;
        }
    }
}

function func_undo(){
    if(game_over == 1 || undo_t == true)
        return;

    while(true){
        var r = rand(0, 9);
        var kilk = 0;
        for(var j = 0; j < 3; j++){
            if(r != fig[j].frame)
                kilk++;
        }

        if(kilk == 3){
            fig[undo.n].frame = r;
            break;
        }
    }
    while(true){
        var r = rand(0, figures.length-1);
        var kilk = 0;
        for(var j = 0; j < 3; j++){
            if(r != fig[j].nomer)
                kilk++;
        }

        if(kilk == 3){
            fig[undo.n].nomer = r;
            break;
        }
    }

    if(kilk_fig == 3){
        fig[undo.n].sprite.destroy();
        kilk_fig--;
    }

    fig[undo.n].sprite = game.add.sprite();
    fig[undo.n].sprite.inputEnabled = true;
    fig[undo.n].sprite.input.enableDrag();
    fig[undo.n].sprite.events.onDragStart.add(event_dragstart["event" + (undo.n+1)], this);
    fig[undo.n].sprite.events.onDragStop.add(event_dragstop["event" + (undo.n+1)], this);
    fig[undo.n].sprite.events.onDragUpdate.add(event_dragupdate["event" + (undo.n+1)], this);
    fig[undo.n].w = 42.0*figures[fig[undo.n].nomer][0].length;
    fig[undo.n].h = 42.0*figures[fig[undo.n].nomer].length;

    for(var j = 0; j < figures[fig[undo.n].nomer].length; j++){
        for(var k = 0; k < figures[fig[undo.n].nomer][j].length; k++){
            var temp;
            if(figures[fig[undo.n].nomer][j][k] == 1){
                 temp = game.add.sprite(k*42, j*42, "tiles");
            }
            else{
                temp = game.add.sprite(k*42, j*42);
            }
            temp.frame = fig[undo.n].frame;
            fig[undo.n].sprite.addChild(temp);
        }
    }

    fig[undo.n].del = false;
    fig[undo.n].sprite.scale.x = scale;
    fig[undo.n].sprite.scale.y = scale;
    fig[undo.n].sprite.position.x = (70 + undo.n*140) - (fig[undo.n].w * 0.5) * scale;
    fig[undo.n].sprite.position.y = 500 - (fig[undo.n].h * 0.5) * scale;

    kilk_fig++;

    for(var j = 0; j < undo.res.length; j++){
        grid[undo.res[j][0]][undo.res[j][1]].frame = undo.fr[j];
    }

    var jj = undo.res.length;
    for(var j = 0; j < figures[undo.nomer].length; j++){
        for(var k = 0; k < figures[undo.nomer][j].length; k++){
            if(figures[undo.nomer][j][k] == 1){
                 grid[undo.xi+j][undo.yi+k].frame = 10;
                 jj++;
            }
        }
    }

    score -= jj;
    document.getElementById("value").innerHTML = score;
    undo_t = true;
}

var event_dragupdate = {
    event1: function(){
        var dx1 = ((fig[0].sprite.position.x + fig[0].w*0.5) - game.input.x);
        var dy1 = ((fig[0].sprite.position.y + fig[0].h*0.5) - game.input.y);
        fig[0].sprite.position.x -= dx1;
        if(isMobile == false){
            fig[0].sprite.position.y -= dy1;// + fig[0].h*0.5 + 50;
        }
        else {
            fig[0].sprite.position.y -= dy1 + fig[0].h*0.5 + 50;
        }
    },
    event2: function(){
        var dx2 = ((fig[1].sprite.position.x + fig[1].w*0.5) - game.input.x);
        var dy2 = ((fig[1].sprite.position.y + fig[1].h*0.5) - game.input.y);
        fig[1].sprite.position.x -= dx2;
        if(isMobile == false){
            fig[1].sprite.position.y -= dy2;// + fig[1].h*0.5 + 50;
        }
        else {
            fig[1].sprite.position.y -= dy2 + fig[1].h*0.5 + 50;
        }
    },
    event3: function(){
        var dx3 = ((fig[2].sprite.position.x + fig[2].w*0.5) - game.input.x);
        var dy3 = ((fig[2].sprite.position.y + fig[2].h*0.5) - game.input.y);
        fig[2].sprite.position.x -= dx3;
        if(isMobile == false){
            fig[2].sprite.position.y -= dy3;// + fig[2].h*0.5 + 50;
        }
        else {
            fig[2].sprite.position.y -= dy3 + fig[2].h*0.5 + 50;
        }
    }
}
var event_dragstart = {
    event1: function(){
        fig[0].sprite.scale.x = 1;
        fig[0].sprite.scale.y = 1;
    },
    event2: function(){
        fig[1].sprite.scale.x = 1;
        fig[1].sprite.scale.y = 1;
    },
    event3: function(){
        fig[2].sprite.scale.x = 1;
        fig[2].sprite.scale.y = 1;
    }
}
var event_dragstop = {
    event1: function(){
        drag_stop(0);
    },
    event2: function(){
        drag_stop(1);
    },
    event3: function(){
        drag_stop(2);
    }
}

var isMobile = false;
var undo_t = false;
var undo = new class_undo();
var score = 0;
var text, bar;
var game_over = 0;
var kilk_fig = 0;
var figures = [[[1]],
    [[1], [1]],
    [[1, 1]],

    [[1], [1], [1]],
    [[1, 1, 1]],

    [[1, 1], [1, 1]],

    [[1], [1], [1], [1]],
    [[1, 1, 1, 1]],

    [[1], [1], [1], [1], [1]],
    [[1, 1, 1, 1, 1]],

    [[1, 1, 1], [1, 1, 1], [1, 1, 1]],

    [[1, 1], [1, 0]],
    [[1, 1], [0, 1]],
    [[0, 1], [1, 1]],
    [[1, 0], [1, 1]],

    [[1, 1, 1],[1, 0, 0],[1, 0, 0]],
    [[1, 1, 1],[0, 0, 1],[0, 0, 1]],
    [[0, 0, 1],[0, 0, 1],[1, 1, 1]],
    [[1, 0, 0],[1, 0, 0],[1, 1, 1]],];
function figure(){
    this.sprite = 0;
    this.frame = -1;
    this.nomer = -1;
    this.w = 0;
    this.h = 0;
    this.del = false;
}
function class_undo(){
    this.nomer = -1;
    this.xi = -1;
    this.yi = -1;
    this.res = [];
    this.fr = [];
    this.n = -1;
}
var fig = [new figure(), new figure(), new figure()];
var grid = [];
var scale = 0.6;

function rand(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
