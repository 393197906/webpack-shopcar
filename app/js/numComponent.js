/**
 * Created by Administrator on 2017/3/3.
 */
var $ = require("jquery");
var selectChange = require("./selectEvent");
//num

//改变商品价格
function changePrice(obj) {
    var price = parseFloat($(obj).parents(".goods").find(".price").text().trim());
    var num = $(obj).siblings("input").val();
    var totalPrice =  (price * num).toFixed(2);
    $(obj).parents(".goods").find(".totalPrice").text(totalPrice);
}

$(".num-btn").click(function () {
    var value = parseInt($(this).siblings("input").val());
    if ($(this).hasClass("plus")) {
        $(this).siblings("input").val(++value);
        $(this).siblings(".minus").removeClass("disable").text("-");
    } else if ($(this).hasClass("disable")) {
    } else {
        $(this).siblings("input").val(--value);
        if (value <= 1) {
            $(this).addClass("disable").text("");
        }
    }
    changePrice(this);
    selectChange.changePrice(); //改变总价格
});

