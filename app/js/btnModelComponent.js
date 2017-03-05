/**
 * Created by Administrator on 2017/3/3.
 */
var $ = require("jquery");

$(".btn-model span").hover(function () {
    $(this).text("▼");
    $(this).parent().find(".btn-model-content").show();
}, function () {
    $(this).text("▲");
    $(this).parent().find(".btn-model-content").hide();
});
