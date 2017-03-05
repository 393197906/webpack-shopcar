/**
 * Created by Administrator on 2017/3/4.
 */
//模态框组件
var $ = require("jquery");


//$("body").append(html);


var modelObj = function () {
    var _model;
    var _self = this;
    var _content; //判断 根据content传入的不同 来决定是否新建实例

    //初始化
    function _init(param) {
        var title = param.title || "标题";
        _content = param.content || "内容";
        var content = param.content || "内容";
        var type = param.type || "alert";

        var buttonStr = type === "alert" ? "" : `<p class="mg-top fr">
            <button class="btn btn-color-default yes">确定</button>
            <button class="btn btn-color-green no">取消</button>
        </p>`;
        var html = `
<div class="model">
    <div class="model-content clear">
        <h3>${title}</h3>
        <p>${content}</p>
        ${buttonStr}
    </div>
</div>
`;
        $("body").append(html); //添加节点
        _model = $(".model");

        if (type === "alert") {
            //注册点击消失事件
            _model.on("click", function (e) {
                if ($(e.target).hasClass("model")) {
                    _self.hide();
                }
            });
        }

        return _self;
    }

    //删除
    this.drop = function () {
        _model.remove();
        _model = undefined;
    };

    //暴露初始化
    this.init = function (param) {
        var param = param || {};
        if (_model === undefined) {
            return _init(param);
        } else if (param.content !== _content) {
            this.drop(); //删除
            return _init(param);
        }
        return this;
    };
    //显示
    this.show = function (param) {
        _model.show();
        return this;
    };

    //隐藏
    this.hide = function () {
        _model.hide();
        return this;
    };

    //确认模态框
    this.pop = function (callback) {
        this.show();
        _model.find(".btn").one("click", function () {
            _self.hide();//隐藏model
            var statu = false;
            if ($(this).hasClass("yes")) {
                statu = true;
            }
            callback(statu); //传入对象本身，和状态
            _model.find(".btn").unbind(); //移除事件
            return false;
        });
        return this;
    }
};


//消失
module.exports = new modelObj();
