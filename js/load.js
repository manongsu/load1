
/*获取屏幕的高度*/
var window_height = $(window).height();
/*将.main的高度设置成屏幕的高度*/
$(".main").css("height",window_height);
/*将列表块的高度 = 屏幕的高度 - 头部的高度 - 底部的高度*/
var ul_height = window_height - $("header").height() - $("footer").height();
$(".li_wrap").css("height",ul_height);


var main = $(".main")[0];
var scroll_top = $(".li_wrap").scrollTop();/*列表块的滚动条高度*/
var scroll_height = $(".li_wrap")[0].scrollHeight;/*全部高度*/
var client_height = ul_height;/*列表块的可视区域高度*/
var start_y;/*按下时触摸点的纵坐标*/
var differ = 0;/*坐标差*/


/*下拉的动作
* down_scroll_top--列表块的滚动条高度
* differ--下拉的距离
* action
* */
function down_touch(down_scroll_top,down_differ,action) {
    if(down_scroll_top==0){
        if(action == "move"){
            $(".main").css("transform","translate(0px, "+ down_differ +"px) scale(1) translateZ(0px)");
            if(down_differ>36){
                $(".refresh p").eq(1).css("display","block").siblings("p").css("display","none");
            }
            event.preventDefault();
        }else if(action == "end"){
            if (down_differ < 36) {
                $(".main").css("transform", "translate(0px,0px) scale(1) translateZ(0px)");
                $(".refresh p").eq(0).css("display", "block").siblings("p").css("display", "none");
            } else {
                $(".main").css("transform", "translate(0px,36px) scale(1) translateZ(0px)");
                $(".refresh p").eq(2).css("display", "block").siblings("p").css("display", "none");

            }
        }
    }
}
function top_touch(top_scroll_top,top_differ,action) {
    if(top_scroll_top == (scroll_height-client_height)) {
        if (action == "move") {
            $(".main").css("transform", "translate(0px, " + top_differ + "px) scale(1) translateZ(0px)");
            if (top_differ < -36) {
                $(".load p").eq(1).css("display", "block").siblings("p").css("display", "none");
            }
            event.preventDefault();
        } else if (action == "end") {
            if (top_differ > -36) {
                $(".main").css("transform", "translate(0px,0px) scale(1) translateZ(0px)");
                $(".load p").eq(0).css("display", "block").siblings("p").css("display", "none");
            } else {
                $(".main").css("transform", "translate(0px,-36px) scale(1) translateZ(0px)");
                $(".load p").eq(2).css("display", "block").siblings("p").css("display", "none");
            }
        }
    }
}
/*按下*/
main.addEventListener('touchstart', function(event) {
    start_y = event.touches[0].pageY;/*按下时触摸点的纵坐标*/
});

/*按下并移动*/
main.addEventListener('touchmove', function(event) {
    /*实时获取列表块的滚动条高度*/
    scroll_top = $(".li_wrap").scrollTop();
    /*滑动时触摸点的纵坐标*/
    var move_y = event.touches[0].pageY;
    differ = move_y - start_y;
    /*下拉*/
    if(differ > 0){
        down_touch(scroll_top,differ,"move");
    }else if(differ < 0){
        /*上拉*/
        top_touch(scroll_top,differ,"move");
    }
});

/*移开*/
main.addEventListener('touchend', function(event) {
    /*下拉*/
    if(differ > 0){
        down_touch(scroll_top,differ,"end");
    }else if(differ < 0){
        /*上拉*/
        top_touch(scroll_top,differ,"end");
    }
});