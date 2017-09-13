$(window).on("load",function(){

    var search = location.search.replace('?', ''),
        searchArr = search.split('&'),
        urlArg = {};

    //ת��Ϊ����
    for (var i = 0; i < searchArr.length; i++) {
        urlArg[searchArr[i].split('=')[0].toLowerCase()] = searchArr[i].split('=')[1];
    }

    console.log(urlArg.sid);


    localStorage.sid = urlArg.sid;
    localStorage.actid = urlArg.actid;
    localStorage.mt = urlArg.mt;      //mt=1 ios  mt=4  android
    localStorage.ver = urlArg.ver;

    //��ȡ��Ʒ���棬����Ƕ�����
    getTake();
    getPrizeTake();

    /*��ȡ�������*/
    getPrizeNumber();

    /*��ȡ��������  ����Ƕ�����*/
    getShare();

    /*��ȡ��Ϸ���ĵ�ַ  ����Ƕ�����*/
    getGameCenter();


    /*���ػ�ȡ����Ӧ�ĳ齱����*/
    getLuckContent();


    var newdraw =new turntableDraw('#drawBtn',{
        share:9,
        speed:"3s",
        velocityCurve:"ease",
        weeks:7,
        callback:function(num) {
            //ajax��ȡ�齱��Ʒ
            getMoney(num);

            /*����������ٴε��û�ȡ�������*/
            getPrizeNumber();

            $("#drawBtn").removeAttr("disabled");
        }
    });

//����ajax
    $("#drawBtn").click(function(event) {

        $("#drawBtn").attr("disabled","disabled");

        //�������ajax
        //��ȡ��ǰsid
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
                    console.log("ʧ��");
                    alert(data.Message);
                    $("#drawBtn").removeAttr("disabled");
                }else if(data.Status === 1002){
                    console.log("�������쳣");
                    alert(data.Message);
                    $("#drawBtn").removeAttr("disabled");
                }else if(data.Status === 9999){
                    console.log("δ��¼");
                    alert(data.Message);
                    $("#drawBtn").removeAttr("disabled");
                }

                if(data.Data.Count > 0){
                    /*��������ȡ�鵽ʲô*/
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
                                console.log("ʧ��");
                                alert(data.Message);
                                $("#drawBtn").removeAttr("disabled");
                            }else if(data.Status === 1002){
                                console.log("�������쳣");
                                alert(data.Message);
                                $("#drawBtn").removeAttr("disabled");
                            }else if(data.Status === 9999){
                                console.log("δ��¼");
                                alert(data.Message);
                                $("#drawBtn").removeAttr("disabled");
                            }

                            switch (data.Data.SortIndex){
                                case 1:
                                    /*������ʾ�ﺯ��*/
                                    break;
                                case 2:
                                    /*������ʾ�ﺯ��*/
                                    break;
                                case 3:
                                    /*������ʾ�ﺯ��*/
                                    break;
                                case 4:
                                    /*������ʾ�ﺯ��*/
                                    break;
                                case 5:
                                    /*������ʾ�ﺯ��*/
                                    newdraw.goto(2);
                                    break;
                                case 6:
                                    /*������ʾ�ﺯ��*/
                                    newdraw.goto(3);
                                    break;
                                case 7:
                                    /*������ʾ�ﺯ��*/
                                    newdraw.goto(9);
                                    break;
                                case 8:
                                    /*������ʾ�ﺯ��*/
                                    newdraw.goto(7);
                                    break;
                                case 9:
                                    /*������ʾ�ﺯ��*/
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
/*��ȡ����Ҫ�齱�Ľ�Ʒ����Щ*/
function getLuckContent(){

    var sid = localStorage.sid;
    var actid = localStorage.actid;
    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);
    var top = 50;
    var type = 2;

    var params = new Array(timestamp, nonce, sid, actid,top,type);      //ǩ��
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);            //md5����
    var url = "http://huodong.51changdu.com/gameact/getluckdrawprizes?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign + "&type=" + type + "&top=" + top;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){

            if(data.Status === 1001){
                console.log("ʧ��");
            }else if(data.Status === 1002){
                console.log("�������쳣");
            }else if(data.Status === 9999){
                console.log("δ��¼");
            }
            console.log(data.Data);
        },
        error: function(data){
            //alert(data);
        }
    })
}

/*��ȡͷ������*/
function getTake(){
    /*sid*/

    var sid = localStorage.sid;
    var actid = localStorage.actid;
    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);
    var top = 50;
    var type = 2;

    var params = new Array(timestamp, nonce, sid, actid,top,type);      //ǩ��
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);            //md5����
    var url = "http://huodong.51changdu.com/gameact/getlog?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign + "&type=" + type + "&top=" + top;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){

            if(data.Status === 1001){
                console.log("ʧ��");
            }else if(data.Status === 1002){
                console.log("�������쳣");
            }else if(data.Status === 9999){
                console.log("δ��¼");
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

/*��ȡ�齱��Ϣ����*/
function getPrizeTake(){
    /*sid*/
    var sid = localStorage.sid;
    var actid = localStorage.actid;

    var timestamp = Date.parse(new Date());
    var nonce = RandomString(10);
    var top = 50;
    var type = 1;

    var params = new Array(timestamp, nonce, sid, actid,top,type);      //ǩ��
    params.sort();

    var signkey = "509f693c1d944f5f88b87d3822d09561";
    var signstr = params.join("") + signkey;
    var sign = md5(signstr);            //md5����
    var url = "http://huodong.51changdu.com/gameact/getlog?timestamp=" + timestamp + "&nonce=" + nonce + "&sid=" + sid + "&actid=" + actid + "&sign=" + sign + "&type=" + type + "&top=" + top;

    $.ajax({
        type: "GET",
        url: url,
        dataType:"json",
        success: function(data){

            if(data.Status === 1001){
                console.log("ʧ��");
            }else if(data.Status === 1002){
                console.log("�������쳣");
            }else if(data.Status === 9999){
                console.log("δ��¼");
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

/*��ȡ���������*/
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
                console.log("ʧ��");
            }else if(data.Status === 1002){
                console.log("�������쳣");
            }else if(data.Status === 9999){
                console.log("δ��¼");
            }
            //��������
            $("#game_share").attr("href",data.Data.ShareLink);

            //��Ȩ��Ϣ
            $("#warp_tell_take").text(data.Data.ProductName);
        },
        error: function(data){
            //alert(data.statusText);
        }
    })
}

/*��ȡ��Ϸ���ĵĵ�ַ*/
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
                console.log("ʧ��");
            }else if(data.Status === 1002){
                console.log("�������쳣");
            }else if(data.Status === 9999){
                console.log("δ��¼");
            }
            //��������
            //$("#game_center").attr("href",data.Data.GameCenterUrl);
            var href = data.Data.GameCenterUrl;
            //ֱ��ʹ�ð��¼�
            $("#game_center").bind("click",function(){
                JumpLink(href);
            })

        },
        error: function(data){
            //alert(data.statusText);
        }
    })
}

/*��ȡ�齱����*/
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
                console.log("ʧ��");
                lastNumber_content.text(0);
            }else if(data.Status === 1002){
                console.log("�������쳣");
                lastNumber_content.text(0);
            }else if(data.Status === 9999){
                console.log("δ��¼");
                lastNumber_content.text(0);
            }
            lastNumber_content.text(data.Data.Count);
        },
        error: function(data){
            lastNumber_content.text(0);
        }
    })
}

/*��ȡ���˳齱�Ľ�Ʒ*/
function getMoney(num){
    callbackA(num);
}

//�����ȡ�Ķ���������ͨ��ind�жϵڼ��������п������
function callbackA(ind,data) {

    var warp_prompt = $("#warp_prompt");
    var mask = $("#mask");

    switch (ind){
        case 1:
            /*������ʾ�ﺯ��*/
            break;
        case 2:
            /*������ʾ�ﺯ��*/
            break;
        case 3:
            /*�����ʾ��Ϣ*/
            warp_prompt.show().find("#warp_prompt_content").text("����һ������ϲ�ں��棡");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 4:
            /*�����ʾ��Ϣ*/
            warp_prompt.show().find("#warp_prompt_content").text("��ϲ���20��ȯ�����и����Ŷ��");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 5:
            /*������ʾ�ﺯ��*/
            break;
        case 6:
            /*������ʾ�ﺯ��*/
            break;
        case 7:
            /*�����ʾ��Ϣ*/
            warp_prompt.show().find("#warp_prompt_content").text("10��ȯ��Ц�ɣ�������Ŷ~");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 8:
            /*������ʾ�ﺯ��*/
            break;
        case 9:
            /*�����ʾ��Ϣ*/
            warp_prompt.show().find("#warp_prompt_content").text("��Ʒ������50��ȯ���㣡");
            mask.show();
            mask.on("click",function(){
                $(this).hide();
                warp_prompt.hide();
            });
            break;
        case 10:
            /*������ʾ�ﺯ��*/
            break;
    }
}

/*�齱����Ϊ0����*/
function NullNumber(){
    var warp_prompt = $("#warp_prompt");
    var mask = $("#mask");
    warp_prompt.show().find("#warp_prompt_content").text("����ǰ�齱��������");

    mask.show();

    mask.on("click",function(){
        $(this).hide();
        warp_prompt.hide();
    });

    $("#drawBtn").removeAttr("disabled");
}

/*���������*/
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

/*��ȡ��ǰ���ӵĲ���ֵ*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/*���õ������жϷ���*/
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
        //$("#loadMsg").html("��ǰ�汾���ͣ������������°汾!");
        alert("��ǰ�汾���ͣ������������°汾!");
        $(".pop-close").on('click', function () {
            $(this).parents('.pop-wrapper').addClass("dbnone");
        });
        return;
    }
    window.location.href = url;     //����ǵ���ǰҳ��ת��url
}