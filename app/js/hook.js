/**
 * Created by Administrator on 2017/3/3.
 */
var $ = require("jquery");
var selectChange = require("./selectEvent");
var model = require("./modelComponent");//引入模态框组件
require('animate.css'); // 引入动画样式

//移除函数
function remove(self, goods, event, animate, time) {
    var animate = animate || "fadeOutRightBig";  //移除动画
    var time = time || 500;  //移除动画时间
    self.trigger(event, function (statu, msg) {
        if (statu === true) {
            goods.addClass("animated " + animate);
            setTimeout(function () {
                if (--(goods.parents(".shop").find(".goods").length) === 0) { //删除商店
                    goods.parents(".shop").remove();
                }
                goods.next('hr').hide();//移除下划线
                goods.remove();
                selectChange.changePrice(); //更改价格
            }, time);
            //goods.animate({
            //    height:0
            //},250,function(){
            //    if(--($(this).parents(".shop").find(".goods").length)===0){
            //        $(this).parents(".shop").remove();
            //    }
            //    $(this).next('hr').hide();//移除下划线
            //    $(this).remove();
            //    selectChange.changePrice(); //更改价格
            //});
        } else {
            model.init({title: "系统错误", content: msg}).pop();
        }
    });
}

//失效商品点击事件
$(".select:disabled").parents(".goods").on("click", function () {
    var _self = this;
    model.init({
        title: "失效商品",
        content: "这件商品已经失效了,是否清除？",
        type: "confirm"
    }).pop(function (statu) {
        if (statu) {
            remove($(_self).find(".delete"), $(_self), "deleteClick"); //执行移除
        } else {
            $(_self).removeClass("bg-yellow");
        }
    });
    return false;
});

//删除
$(".delete").on("click", function () {
    var goods = $(this).parents(".goods");
    goods.addClass("bg-yellow");

    var _self = this;
    //初始化模态框
    model.init({
        title: "确认删除",
        content: "确定要删除吗？",
        type: "confirm"
    }).pop(function (statu) {
        if (statu) {
            remove($(_self), goods, "deleteClick"); //执行移除
        } else {
            if (!(goods.find(".select").is(":checked"))) {
                goods.removeClass("bg-yellow");
            }
        }
    });
});

//加入收藏夹
$(".collection").on("click", function () {
    var goods = $(this).parents(".goods");
    var _self = this;
    goods.addClass("bg-yellow");
    //初始化模态框
    model.init({
        title: "确认加入收藏夹",
        content: "确定要加入收藏夹吗？",
        type: "confirm"
    }).pop(function (statu) {
        if (statu) {
            alert(statu);
            remove($(_self), goods, "collecClick", "zoomOutDown", 800); //执行移除
        } else {
            alert(statu);
            if (!(goods.find(".select").is(":checked"))) {
                goods.removeClass("bg-yellow");
            }
        }
    });
});

//删除全部
$("#deleteAll").on("click", function () {
    var selectList = $(".select:checked");
    if (selectList.length <= 0) {
        model.init({
            title: "提示",
            content: "请选择要删除的商品"
        }).pop();
        return;
    }
    //初始化模态框
    model.init({
        title: "确认删除",
        content: "确定要删除吗？",
        type: "confirm"
    }).pop(function (statu) {
        var time = 0;
        if (statu) {
            selectList.each(function () {
                var goods = $(this).parents(".goods");
                var del = goods.find(".delete");
                setTimeout(function () {
                    remove(del, goods, "deleteClick"); //执行移除
                }, time += 300);
            });
        }
    });

});

//清除失效商品
$("#clearInvalid").on("click", function () {
    var selectList = $(".select:disabled");
    if(selectList.length<=0){
        model.init({
            title: "提示",
            content: "没有失效商品"
        }).pop();
        return;
    }
    //初始化模态框
    model.init({
        title: "清除失效商品",
        content: "确定要清除吗？",
        type: "confirm"
    }).pop(function (statu) {
        var time = 0;
        if (statu) {
            selectList.each(function () {
                var goods = $(this).parents(".goods");
                var del = goods.find(".delete");
                setTimeout(function () {
                    remove(del, goods, "deleteClick"); //执行移除
                }, time += 300);
            });
        }
    });

});


//收藏全部
$("#collectionAll").on("click", function () {

    var selectList = $(".select:checked");
    if (selectList.length <= 0) {
        model.init({
            title: "提示",
            content: "请选择要收藏的商品"
        }).pop();
        return;
    }
    //初始化模态框
    model.init({
        title: "确认移入收藏夹",
        content: "确定要移入收藏夹吗？",
        type: "confirm"
    }).pop(function (statu) {
        if (statu) {
            var time = 0;
            selectList.each(function () {
                var goods = $(this).parents(".goods");
                var collection = goods.find(".collection");
                setTimeout(function () {
                    remove(collection, goods, "collecClick", "zoomOutDown", 1000); //执行收藏
                }, time += 300);
            });
        }
    });

});

window.$ = $;
window.jquery = $;
window.shopCar = $;

