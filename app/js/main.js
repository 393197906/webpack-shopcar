/**
 * Created by Administrator on 2017/3/2 0002.
 */
require('../css/app.less'); // 引入样式
require('animate.css'); // 引入动画样式
require("./modelComponent");//注册模态框组件
require("./numComponent"); //注册数量价格方法
require("./btnModelComponent"); //注册按钮Model
var select = require("./selectEvent"); //注册select
require("./hook"); //注册hook

//$(".select").prop("checked",true);
//if(localStorage.num %2 ==0){
//    $("#deleteAll").trigger("click");
//}else{
//    $("#collectionAll").trigger("click");
//}
//setTimeout(function(){
//    location.reload();
//},12000);
////location.reload();
//localStorage.num++;


$(".carNav li").click(function (e) {
    e.stopPropagation();
    //触发取消所有勾选，并重新计算价格
    $("input[type='checkbox']").prop("checked", false);
    $(".goods").removeClass("bg-yellow");
    select.changePrice();

    var index = $(this).index();
    var left = parseInt($(".red-line").css("left"));
    var width = parseInt($(".red-line").css("width"));
    $(".red-line").animate({left: index * width + "px"}, 300);
    var arr = ['', "降价", "失效"];
    filter(arr[index]);
    return false;

});

//过滤
function filter(str) {
    var count = 0;
    var goods = $(".goods");
    goods.each(function () {
        var type = $(this).find(".goodsType").text().trim();
        if (str === "") {
            $(this).show().next("hr").show();
            count++;
            return true;
        }
        if (type !== str) {
            $(this).hide().next("hr").hide();
        } else {
            $(this).show().next("hr").show();
            count++;
        }
    });

    goodsShow(count);

}

//显示空购物车
function goodsShow(count) {
    if (count <= 0) {
        $("#goodsList").hide();
        $("#goodsNone").show();
    } else {
        $("#goodsList").show();
        $("#goodsNone").hide();
    }
}

//加载完成触发
$(".carNav li").eq(0).trigger("click");









