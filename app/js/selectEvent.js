/**
 * Created by Administrator on 2017/3/3.
 */
var $ = require("jquery");
//全选
$(".selectAll").on("click", function () {
    var statu = $(this).is(':checked');
    if (statu) {
        $("input[type='checkbox']:visible:enabled").prop("checked", true); //选取当前页面可见，未失效的商品
    } else {
        $("input[type='checkbox']:visible:enabled").prop("checked", false);
    }
    $(".select").trigger("statuChange");
    changePrice();
});

//店铺选择
$(".selectShop").on("click", function () {
    var statu = $(this).is(':checked');
    var selectList = $(this).parents(".shop").find(".select:visible:enabled");
    if (statu) {
        selectList.prop("checked", true);
        if (isAll()) { //判断是否全选
            $(".selectAll").prop("checked", true);
        }
    } else {
        selectList.prop("checked", false);
        //取消全部勾选状态
        if ($(".selectAll").is(':checked')) {
            $(".selectAll").prop("checked", false);
        }
    }
    selectList.trigger("statuChange");
    changePrice();
});

//单选
$(".select").on("click", function () {
    $(this).trigger("statuChange");
    var statu = $(this).is(':checked');
    if (statu) {
        $(this).prop("checked", true);
        if (isAll()) { //判断是否全选
            $(".selectAll").prop("checked", true);
        }
        if (isAll("shop", this)) { //判断是否商店全选
            $(this).parents(".shop").find(".selectShop").prop("checked", true);
        }
    } else {
        $(this).prop("checked", false);
        //取消全部勾选状态
        if ($(".selectAll").is(':checked')) {
            $(".selectAll").prop("checked", false);
        }
        //取消商店勾选状态
        if ($(this).parents(".shop").find(".selectShop").is(":checked")) {
            $(this).parents(".shop").find(".selectShop").prop("checked", false);
        }
    }
    changePrice();
});


function isAll(shop, select) {
    var statu = true;
    if (shop === "shop") {
        var selectList = $(select).parents(".shop").find(".select");
        selectList.each(function () {
            if (!($(this).is(":checked"))) {
                statu = false;
                return false;
            }
        })
    } else {
        $(".select").each(function () {
            if (!($(this).is(":checked"))) {
                statu = false;
                return false;
            }
        });
    }

    return statu;
}


//总价更改
function changePrice() {
    var select = $(".select:checked");
    var totalPrice = 0;
    var total = 0;
    select.each(function (index, element) {
        var price = parseFloat($(element).parents(".goods").find(".totalPrice").text().trim());
        totalPrice += price;
        total++;
    });
    //价格改变
    $("#countTotalPrice").text(totalPrice.toFixed(2));
    $("input[name='countTotalPrice']").val(totalPrice.toFixed(2)).trigger("change");

    //数量改变
    $("#count").text(total);
}


//监控价格改变
$("input[name='countTotalPrice']").change(function () {
    if ($(this).val() > 0) {
        $(".jiesuan").addClass("jiesuan-active");
    } else {
        $(".jiesuan").removeClass("jiesuan-active");
    }
});

//注册状态改变
$(".select").on("statuChange", function () {
    if ($(this).is(":checked")) {
        $(this).parents(".goods").addClass("bg-yellow");
    } else {
        $(this).parents(".goods").removeClass("bg-yellow");
    }
});


//返回改变价格方法
module.exports = {
    changePrice: changePrice
};
