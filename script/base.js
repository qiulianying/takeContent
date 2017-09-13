$(window).on("load",function(){

    var search = location.search.replace('?', ''),
        searchArr = search.split('&'),
        urlArg = {};

    //转换为对象
    for (var i = 0; i < searchArr.length; i++) {
        urlArg[searchArr[i].split('=')[0].toLowerCase()] = searchArr[i].split('=')[1];
    }

    console.log(urlArg.sid);


    localStorage.sid = urlArg.sid;
    localStorage.actid = urlArg.actid;
    localStorage.mt = urlArg.mt;      //mt=1 ios  mt=4  android
    localStorage.ver = urlArg.ver;

    //获取奖品公告，这个是独立的
    getTake();
    getPrizeTake();

    /*获取点击次数*/
    getPrizeNumber();

    /*获取分享链接  这个是独立的*/
    getShare();

    /*获取游戏中心地址  这个是独立的*/
    getGameCenter();


    /*加载获取到相应的抽奖内容*/
    getLuckContent();


    var newdraw =new turntableDraw('#drawBtn',{
        share:9,
        speed:"3s",
        velocityCurve:"ease",
        weeks:7,
        callback:function(num) {
            //ajax获取抽奖物品
            getMoney(num);

            /*点击结束后再次调用获取点击次数*/
            getPrizeNumber();

            $("#drawBtn").removeAttr("disabled");
        }
    });

//调用ajax
    $("#drawBtn").click(function(event) {

        $("#drawBtn").attr("disabled","disabled");

        //点击调用ajax
        //获取当前sid
        var sid = localStorage.sid;
        var actid = localStorage.actid;

/*        var sid = "5fbeae1815d3087138438d8567bc93e6";
        var actid = 15;*/

        var timestamp = Date.parse(new Date());
        var nonce = RandomString(10);

        var params = new Array(timestamp, nonce, sid, actid);
        params.sort();

        var signkey = "509f693c1d944f5f88b87d3822d09561";
        var signstr = params.join("") + signkey;
        var sign = md5(signstr);
        var url = "http://huodong.51changdu.com/gameact/getluckdrawcount?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign;

        $.ajax({
            type: "GET",
            url: url,
            dataType:"json",
            success: function(data){

                if(data.Status === 1001){
                    console.log("失败");
                    alert(data.Message);
                    $("#drawBtn").removeAttr("disabled");
                }else if(data.Status === 1002){
                    console.log("服务器异常");
                    alert(data.Message);
                    $("#drawBtn").removeAttr("disabled");
                }else if(data.Status === 9999){
                    console.log("未登录");
                    alert(data.Message);
                    $("#drawBtn").removeAttr("disabled");
                }

                if(data.Data.Count > 0){
                    /*服务器获取抽到什么*/
                    var sid = localStorage.sid;
                    var actid = localStorage.actid;

                    var timestamp = Date.parse(new Date());
                    var nonce = RandomString(10);
                    var params = new Array(timestamp, nonce, sid, actid);
                    params.sort();

                    var signkey = "509f693c1d944f5f88b87d3822d09561";
                    var signstr = params.join("") + signkey;
                    var sign = md5(signstr);
                    var url = "http://huodong.51changdu.com/gameact/luckdraw?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign;

                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType:"json",
                        success: function(data){
                            if(data.Status === 1001){
                                console.log("失败");
                                alert(data.Message);
                                $("#drawBtn").removeAttr("disabled");
                            }else if(data.Status === 1002){
                                console.log("服务器异常");
                                alert(data.Message);
                                $("#drawBtn").removeAttr("disabled");
                            }else if(data.Status === 9999){
                                console.log("未登录");
                                alert(data.Message);
                                $("#drawBtn").removeAttr("disabled");
                            }

                            switch (data.Data.SortIndex){
                                case 1:
                                    /*调用提示语函数*/
                                    break;
                                case 2:
                                    /*调用提示语函数*/
                                    break;
                                case 3:
                                    /*调用提示语函数*/
                                    break;
                                case 4:
                                    /*调用提示语函数*/
                                    break;
                                case 5:
                                    /*调用提示语函数*/
                                    newdraw.goto(2);
                                    break;
                                case 6:
                                    /*调用提示语函数*/
                                    newdraw.goto(3);
                                    break;
                                case 7:
                                    /*调用提示语函数*/
                                    newdraw.goto(9);
                                    break;
                                case 8:
                                    /*调用提示语函数*/
                                    newdraw.goto(7);
                                    break;
                                case 9:
                                    /*调用提示语函数*/
                                    newdraw.goto(4);
                                    break;
                            }
                        },
                        error: function(data){
                        }
                    });
                }else {
                    NullNumber();
                }
            },
            error: function(data){
            }
        });
    });
});
/*获取到需要抽奖的奖品有那些*/
function getLuckContent(){

    var sid = localStorage.sid;
    var actid = localStorage.actid;
    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);
    var top = 50;
    var type = 2;

    var params = new Array(timestamp, nonce, sid, actid,top,type);      //签名
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);            //md5加密
    var url = "http://huodong.51changdu.com/gameact/getluckdrawprizes?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign + "&type=" + type + "&top=" + top;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){

            if(data.Status === 1001){
                console.log("失败");
            }else if(data.Status === 1002){
                console.log("服务器异常");
            }else if(data.Status === 9999){
                console.log("未登录");
            }
            console.log(data.Data);
        },
        error: function(data){
            //alert(data);
        }
    })
}

/*获取头部公告*/
function getTake(){
    /*sid*/

    var sid = localStorage.sid;
    var actid = localStorage.actid;
    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);
    var top = 50;
    var type = 2;

    var params = new Array(timestamp, nonce, sid, actid,top,type);      //签名
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);            //md5加密
    var url = "http://huodong.51changdu.com/gameact/getlog?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign + "&type=" + type + "&top=" + top;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){

            if(data.Status === 1001){
                console.log("失败");
            }else if(data.Status === 1002){
                console.log("服务器异常");
            }else if(data.Status === 9999){
                console.log("未登录");
            }


            $("#title_con1").text("");

            for(var i=0;i<data.Data.length;i++){
                var industry = data.Data[i].Prompt;

                $("#title_con1").append("<p>"+ industry + "</p>");
            }
        },
        error: function(data){
            //alert(data);
        }
    })
}

/*获取抽奖信息公告*/
function getPrizeTake(){
    /*sid*/
    var sid = localStorage.sid;
    var actid = localStorage.actid;

    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);
    var top = 50;
    var type = 1;

    var params = new Array(timestamp, nonce, sid, actid,top,type);      //签名
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);            //md5加密
    var url = "http://huodong.51changdu.com/gameact/getlog?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign + "&type=" + type + "&top=" + top;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){

            if(data.Status === 1001){
                console.log("失败");
            }else if(data.Status === 1002){
                console.log("服务器异常");
            }else if(data.Status === 9999){
                console.log("未登录");
            }

            for(var i=0;i<data.Data.length;i++){
                var industry = data.Data[i].Prompt;
                $("#con1").append("<li>"+ industry +"</li>");
                $("#con2").append("<li>"+ industry +"</li>");
            }
        },
        error: function(data){
            //alert(data);
        }
    })
}

/*获取分享的链接*/
function getShare(){
    var sid = localStorage.sid;
    var actid = localStorage.actid;
    var mt = localStorage.mt;      //mt=1 ios  mt=4  android

    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);

    var params = new Array(timestamp, nonce, sid, actid,mt);
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);
    var url = "http://huodong.51changdu.com/gameact/getsharelink?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign + "&mt=" + mt;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){
            if(data.Status === 1001){
                console.log("失败");
            }else if(data.Status === 1002){
                console.log("服务器异常");
            }else if(data.Status === 9999){
                console.log("未登录");
            }
            //分享链接
            $("#game_share").attr("href",data.Data.ShareLink);

            //版权信息
            $("#warp_tell_take").text(data.Data.ProductName);
        },
        error: function(data){
            //alert(data.statusText);
        }
    })
}

/*获取游戏中心的地址*/
function getGameCenter(){
    //var actid = GetQueryString("actid");
    var actid = localStorage.actid;
    var ver = localStorage.ver;
    var sid = localStorage.sid;
    var mt = localStorage.mt;      //mt=1 ios  mt=4  android

    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);

    var params = new Array(timestamp, nonce,actid,sid,mt,ver);
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);
    var url = "http://huodong.51changdu.com/gameact/getgamecenterurl?timestamp=" + timestamp + "&nonce=" + nonce + "&actid=" + actid + "&sid=" + sid + "&sign=" + sign + "&mt=" + mt + "&ver=" + ver;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){
            if(data.Status === 1001){
                console.log("失败");
            }else if(data.Status === 1002){
                console.log("服务器异常");
            }else if(data.Status === 9999){
                console.log("未登录");
            }
            //分享链接
            //$("#game_center").attr("href",data.Data.GameCenterUrl);
            var href = data.Data.GameCenterUrl;
            //直接使用绑定事件
            $("#game_center").bind("click",function(){
                JumpLink(href);
            })

        },
        error: function(data){
            //alert(data.statusText);
        }
    })
}

/*获取抽奖次数*/
function getPrizeNumber(){
    /*sid*/
    var sid = localStorage.sid;
    var actid = localStorage.actid;

    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);

    var lastNumber_content = $("#lastNumber_content");

    var params = new Array(timestamp, nonce, sid, actid);
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);
    var url = "http://huodong.51changdu.com/gameact/getluckdrawcount?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){
            if(data.Status === 1001){
                console.log("失败");
                lastNumber_content.text(0);
            }else if(data.Status === 1002){
                console.log("服务器异常");
                lastNumber_content.text(0);
            }else if(data.Status === 9999){
                console.log("未登录");
                lastNumber_content.text(0);
            }
            lastNumber_content.text(data.Data.Count);
        },
        error: function(data){
            lastNumber_content.text(0);
        }
    })
}

/*获取幸运抽奖的奖品*/
function getMoney(num){
    callbackA(num);
}

//输出获取的东西，这里通过ind判断第几个来进行控制输出
function callbackA(ind,data) {

    var warp_prompt = $("#warp_prompt");
    var mask = $("#mask");

    switch (ind){
        case 1:
            /*调用提示语函数*/
            break;
        case 2:
            /*调用提示语函数*/
            break;
        case 3:
            /*输出提示信息*/
            warp_prompt.show().find("#warp_prompt_content").text("再来一波，惊喜在后面！");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 4:
            /*输出提示信息*/
            warp_prompt.show().find("#warp_prompt_content").text("恭喜获得20礼券，还有更多大奖哦！");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 5:
            /*调用提示语函数*/
            break;
        case 6:
            /*调用提示语函数*/
            break;
        case 7:
            /*输出提示信息*/
            warp_prompt.show().find("#warp_prompt_content").text("10礼券请笑纳！多充多中哦~");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 8:
            /*调用提示语函数*/
            break;
        case 9:
            /*输出提示信息*/
            warp_prompt.show().find("#warp_prompt_content").text("人品爆发，50礼券送你！");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 10:
            /*调用提示语函数*/
            break;
    }
}

/*抽奖次数为0提醒*/
function NullNumber(){
    var warp_prompt = $("#warp_prompt");
    var mask = $("#mask");
    warp_prompt.show().find("#warp_prompt_content").text("您当前抽奖次数不足");

    mask.show();

    mask.on("click",function(){
        $(this).hide();
        warp_prompt.hide();
    });

    $("#drawBtn").removeAttr("disabled");
}

/*计算随机数*/
function RandomString(len) {
    len = len || 32;
    var $chars = 'abcdefhijkmnprstwxyz0123456789';
    var maxPos = $chars.length;
    var nonce = '';
    for (i = 0; i < len; i++) {
        nonce += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return nonce;
}

/*获取当前链接的参数值*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/*调用的链接判断方法*/
function JumpLink(url) {
    var isLowVer = true;
    var mt = GetQueryString("mt");
    var ver = GetQueryString("ver");

    if (( mt == "1" && ver >= "104") || (mt == "4" && ver >= "102"))
    {
        isLowVer = false;
    }

    if (isLowVer)
    {
        //$("#loadMsgShow").removeClass("dbnone");
        //$("#loadMsg").html("当前版本过低，请升级至最新版本!");
        alert("当前版本过低，请升级至最新版本!");
        $(".pop-close").on('click', function () {
            $(this).parents('.pop-wrapper').addClass("dbnone");
        });
        return;
    }
    window.location.href = url;     //这个是当当前页面转到url
}