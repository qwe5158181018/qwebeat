//数据初始化
//生成的时间戳
let a = new Array();
let s = new Array();
let d = new Array();
let j = new Array();
let k = new Array();
let l = new Array();
//键的数组
let ea = new Array();
let es = new Array();
let ed = new Array();
let ej = new Array();
let ek = new Array();
let el = new Array();

let score = 0;
let bpm = 240;//bpm:决定点击频率
let acc = 0;//完成率
let combo = 0;//连击数
let maxcombo = 0;//最大连击数
let qtt = 0;//物量
let speed = 1;//流速
let rest = 20;//空拍间隔
let _nk = 0;
let crtnoteamount = 0;
let noteid = 0;
let perfect = 0;
let good = 0;
let bad = 0;
let miss = 0;
let lasttap = 0;//纵连规避用标记符
var noteborder;
let _nt = 4;//轨道数标记符
var target;

let A;
let S;
let D;
let J;
let K;
let L;
let _avoidDouble;
let _avoidVerhical;
let multhelp;
let autoplay;
let _ifBgp;
let opcdown;
let opcup;
window.onload = function () {
    A = document.getElementById("A");
    S = document.getElementById("S");
    D = document.getElementById("D");
    J = document.getElementById("J");
    K = document.getElementById("K");
    L = document.getElementById("L");
    _avoidDouble = document.getElementById("avoiddouble");
    _avoidVerhical = document.getElementById("verhical");
    multhelp = document.getElementById("multihelp");
    autoplay = document.getElementById("auto");
    _ifBgp = document.getElementById("bgp");
    //隐藏评级
    document.getElementById("rank").style.visibility = "hidden";
    //曲绘（绀海赛高
    bgp();
    //监听键盘点击
    window.addEventListener("keydown", keylistener1, false);
    //监听键盘按下
    opcdown = "0.5";
    window.addEventListener("keypress", keylistener2, false);
    //监听键盘松开
    opcup = "0.7";
    document.getElementById("S").style.backgroundColor = "rgba(0,0,0," + opcup + ")"; document.getElementById("D").style.backgroundColor = "rgba(0,0,0," + opcup + ")"; document.getElementById("J").style.backgroundColor = "rgba(0,0,0," + opcup + ")"; document.getElementById("K").style.backgroundColor = "rgba(0,0,0," + opcup + ")"
    window.addEventListener("keyup", keylistener3, false);
    //四六轨改变
    document.getElementById("nt4").addEventListener("change", function (e) { changetrack(this.value) }, false);
    document.getElementById("nt6").addEventListener("change", function (e) { changetrack(this.value) }, false);
}
function bgp() {
    if (_ifBgp.checked) {
        let bpglib = ["bgp.png", "bpg2.png", "bpg3.png", "bpg4.png", "bpg5.png", "bpg6.png",];
        let bpg = bpglib[Math.floor(Math.random() * 6)];
        document.getElementById("middleside").style.backgroundImage = "url(" + bpg + ")";
    }
    else {
        let b = Math.floor(Math.random() * 256);
        let r = 256 - b;
        let g = Math.floor(Math.random() * 256)
        let a = 1;
        document.getElementById("middleside").style.backgroundImage = "none";
        document.getElementById("middleside").style.backgroundColor = 'rgba(' + r + "," + g + "," + b + ',' + a + ')';
    }
}

//监听键盘点击

function keylistener1(e) {
    if (e.key == "a") {
        if (_nt == 6) {
            tap(document.getElementById("A"))
        }
    }
    if (e.key == "s") {
        tap(document.getElementById("S"))
    }
    if (e.key == "d") {
        tap(document.getElementById("D"))
    }
    if (e.key == "j") {
        tap(document.getElementById("J"))
    }
    if (e.key == "k") {
        tap(document.getElementById("K"))
    }
    if (e.key == "l") {
        if (_nt == 6) {
            tap(document.getElementById("L"))
        }
    }
}
//监听键盘按下

function keylistener2(e) {
    if (e.key == "a") {
        document.getElementById("A").style.backgroundColor = "rgba(0,0,0," + opcdown + ")"
    }
    if (e.key == "s") {
        document.getElementById("S").style.backgroundColor = "rgba(0,0,0," + opcdown + ")"
    }
    if (e.key == "d") {
        document.getElementById("D").style.backgroundColor = "rgba(0,0,0," + opcdown + ")"
    }
    if (e.key == "j") {
        document.getElementById("J").style.backgroundColor = "rgba(0,0,0," + opcdown + ")"
    }
    if (e.key == "k") {
        document.getElementById("K").style.backgroundColor = "rgba(0,0,0," + opcdown + ")"
    }
    if (e.key == "l") {
        document.getElementById("L").style.backgroundColor = "rgba(0,0,0," + opcdown + ")"
    }
}

function keylistener3(e) {
    if (e.key == "a") {
        document.getElementById("A").style.backgroundColor = "rgba(0,0,0," + opcup + ")"
    }
    if (e.key == "s") {
        document.getElementById("S").style.backgroundColor = "rgba(0,0,0," + opcup + ")"
    }
    if (e.key == "d") {
        document.getElementById("D").style.backgroundColor = "rgba(0,0,0," + opcup + ")"
    }
    if (e.key == "j") {
        document.getElementById("J").style.backgroundColor = "rgba(0,0,0," + opcup + ")"
    }
    if (e.key == "k") {
        document.getElementById("K").style.backgroundColor = "rgba(0,0,0," + opcup + ")"
    }
    if (e.key == "l") {
        document.getElementById("L").style.backgroundColor = "rgba(0,0,0," + opcup + ")"
    }
}
//触摸屏监听（点击在元素属性）
function ontouchstart(e) {
    target = e;
    bemousedown(this);
    tap(e);
    return false;
}
function ontouchend(e) {
    bemouseup(e);
    [A, S, D, J, K, L].forEach(function (e) { bemouseup(this) });
    return false;
}
function bemousedown(e) {
    e.style.backgroundColor = "rgba(0,0,0," + opcdown + ")"
}
function bemouseup(e) {
    e.style.backgroundColor = "rgba(0,0,0," + opcup + ")"
}
//四六轨改变

function changetrack(ntrack) {
    if (ntrack == 4) {
        _nt = 4;
        S.className = "gamefield_4";
        S.style.left = "20%";
        D.className = "gamefield_4";
        D.style.left = "35%";
        J.className = "gamefield_4";
        J.style.left = "50%";
        K.className = "gamefield_4";
        K.style.left = "65%";
        A.style.display = "none";
        L.style.display = "none";
    }
    if (ntrack == 6) {
        _nt = 6;
        A.style.display = "block";
        L.style.display = "block";
        A.className = "gamefield_6";
        A.style.left = "20%";
        S.className = "gamefield_6";
        S.style.left = "30%";
        D.className = "gamefield_6";
        D.style.left = "40%";
        J.className = "gamefield_6";
        J.style.left = "50%";
        K.className = "gamefield_6";
        K.style.left = "60%";
        L.className = "gamefield_6";
        L.style.left = "70%";
    }
}
//总分与物量的关系
function quantitychanging() {
    _qtt = document.getElementById("quantity");
    _fsc = document.getElementById("fullscore");
    _fsc.innerHTML = _qtt.value * 1000;
}


//开始
function start() {//开始，初始化数据
    bgp();
    a = [];
    s = [];
    d = [];
    j = [];
    k = [];
    l = [];
    ea = [];
    es = [];
    ed = [];
    ej = [];
    ek = [];
    el = [];
    noteid = 0;
    turn = 0;
    crtnoteamount = 0;
    speed = document.getElementById("speed").value;
    bpm = document.getElementById("bpm").value;
    rest = document.getElementById("rest").value;
    qtt = document.getElementById("quantity").value;
    acc = 0;
    score = 0;
    combo = 0;
    maxcombo = 0;
    let whetherbad = 0;
    perfect = 0;
    good = 0;
    bad = 0;
    miss = 0;
    lasttap = -1;
    notecolor = "tap.jpg";
    document.getElementById("perfect").innerHTML = "perfect：0";
    document.getElementById("good").innerHTML = "good：0";
    document.getElementById("miss").innerHTML = "miss：0";
    document.getElementById("bad").innerHTML = "bad：0";
    document.getElementById("combo").style.visibility = "hidden";
    document.getElementById("maxcombo").innerHTML = "最大连击：0";
    document.getElementById("score").innerHTML = score
    document.getElementById('acc').innerHTML = "完成率：0%";
    _nk = document.querySelector('input[name="nk"]:checked').value;
    document.getElementById("start").disabled = true;
    document.getElementById("rank").style.visibility = "hidden";
    document.getElementById("rankingbg").style.visibility = "hidden";
    document.getElementById("csq").style.display = "block";
    document.getElementById("line").style.visibility = "visible";
    document.getElementById("process").style.width = "0";
    document.getElementById("rankingbg").style.height = "0";

    gametimeout = window.setTimeout(gaming, 1000);

}
//结束
function stop() {
    window.clearTimeout(gametimeout);
    document.getElementById("start").disabled = false;
    document.getElementById("csq").style.display = "none";
    let existNotes = document.querySelectorAll(".notes");//括号内为CSS选择器，静态，可以用for循环遍历，getbyclass不行
    for (i of existNotes) {
        if (i.parentNode) {
            i.parentNode.removeChild(i);
        }
    }
}
//生成键
let turn = 0;
function gaming() {
    let notepos = [];//位置
    let notelib = [];
    var notenum;
    //生成notenum
    if (_nk == 4) {
        notelib = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4];
        notenum = notelib[Math.floor(Math.random() * 30)];
    }
    if (_nk == 2) {
        notelib = [1, 1, 1, 1, 2]
        notenum = notelib[Math.floor(Math.random() * 5)];
    }
    if (_nk == 1) {
        notenum = 1;
    }
    //生成positon
    //4轨
    if (_nt == 4) {
        if (notenum == 2) {
            lastnote = -1;
            crtnoteamount += notenum;//总键数增加
            if (_avoidDouble.checked) {//单手双押规避
                notelib = [[1, 3], [1, 4], [2, 4], [2, 3]];
                notepos = notelib[Math.floor(Math.random() * 4)];
            }
            else {
                for (let i = 0; i < notenum; i++) {
                    let t = 1 + Math.floor(Math.random() * 4);
                    if (!notepos.includes(t)) {
                        notepos.push(t);
                    }
                    else {
                        i--;
                    }
                }
            }
        }
        else if (notenum == 1) {
            crtnoteamount += notenum;//总键数增加
            if (_avoidVerhical.checked) {//纵连规避
                notelib = [1, 2, 3, 4];
                notelib.splice(notelib.indexOf(lasttap), 1);
                notepos.push(notelib[Math.floor(Math.random() * notelib.length)]);
                lasttap = notepos[0];
            }
            else {
                notepos.push(1 + Math.floor(Math.random() * 4));
            }
        }
        else {
            lastnote = -1;
            crtnoteamount += notenum;//总键数增加
            for (let i = 0; i < notenum; i++) {
                let t = 1 + Math.floor(Math.random() * 4);
                if (!notepos.includes(t)) {
                    notepos.push(t)
                }
                else {
                    i--
                }
            }
        }

    }
    //6轨
    else if (_nt == 6) {
        if (notenum == 2) {
            lastnote = -1;
            crtnoteamount += notenum;//总键数增加
            if (_avoidDouble.checked) {//单手双押规避
                notelib = [[1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6]];
                notepos = notelib[Math.floor(Math.random() * notelib.length)];
            }
            else {
                for (let i = 0; i < notenum; i++) {
                    let t = 1 + Math.floor(Math.random() * 6);
                    if (!notepos.includes(t)) {
                        notepos.push(t);
                    }
                    else {
                        i--;
                    }
                }
            }
        }
        else if (notenum == 1) {
            crtnoteamount += notenum;//总键数增加
            if (_avoidVerhical.checked) {//纵连规避
                notelib = [1, 2, 3, 4, 5, 6];
                notelib.splice(notelib.indexOf(lasttap), 1);
                notepos.push(notelib[Math.floor(Math.random() * notelib.length)]);
                lasttap = notepos[0];
            }
            else {
                notepos.push(1 + Math.floor(Math.random() * 6));
            }
        }
        else {
            lastnote = -1;
            crtnoteamount += notenum;//总键数增加
            for (let i = 0; i < notenum; i++) {
                let t = 1 + Math.floor(Math.random() * 6);
                if (!notepos.includes(t)) {
                    notepos.push(t)
                }
                else {
                    i--
                }
            }
        }
    }
    //多押辅助处理
    if (multihelp.checked) {
        if (notenum != 1) {
            noteborder = true;
        }
        else {
            noteborder = false;
        }
    }
    else {
        noteborder = false;
    }
    //安放键
    for (let i of notepos) {
        noteid++;
        let _note = document.createElement("span");
        _note.style.backgroundColor = "#38a6ff";
        if (noteborder) {
            _note.style.border = "solid";
            _note.style.borderColor = "#fef200";
            _note.style.borderWidth = "5px";
        }
        _note.className = "notes";
        _note.style.animationDuration = (Math.floor(5000 / speed)).toString() + "ms";
        _note.style.opacity = "1";
        _note.whetherclicked = "false";
        _note.id = noteid.toString();
        if (_nt == 4) {
            _note.style.width = "12%";
            if (i == 1) {
                _note.style.left = "21.5%"
                document.getElementById('S').appendChild(_note);
                s.push(Date.now() + 3125 / speed);
                es.push(noteid);
            }
            if (i == 2) {
                _note.style.left = "36.5%"
                document.getElementById('D').appendChild(_note);
                d.push(Date.now() + 3125 / speed)
                ed.push(noteid);
            }
            if (i == 3) {
                _note.style.left = "51.5%"
                document.getElementById('J').appendChild(_note);
                j.push(Date.now() + 3125 / speed)
                ej.push(noteid);
            }
            if (i == 4) {
                _note.style.left = "66.5%"
                document.getElementById('K').appendChild(_note);
                k.push(Date.now() + 3125 / speed)
                ek.push(noteid);
            }
        }
        else if (_nt == 6) {
            _note.style.width = "9%";
            if (i == 1) {
                _note.style.left = "20.5%"
                document.getElementById('A').appendChild(_note);
                a.push(Date.now() + 3125 / speed);
                ea.push(noteid);
            }
            if (i == 2) {
                _note.style.left = "30.5%"
                document.getElementById('S').appendChild(_note);
                s.push(Date.now() + 3125 / speed);
                es.push(noteid);
            }
            if (i == 3) {
                _note.style.left = "40.5%"
                document.getElementById('D').appendChild(_note);
                d.push(Date.now() + 3125 / speed)
                ed.push(noteid);
            }
            if (i == 4) {
                _note.style.left = "50.5%"
                document.getElementById('J').appendChild(_note);
                j.push(Date.now() + 3125 / speed)
                ej.push(noteid);
            }
            if (i == 5) {
                _note.style.left = "60.5%"
                document.getElementById('K').appendChild(_note);
                k.push(Date.now() + 3125 / speed)
                ek.push(noteid);
            }
            if (i == 6) {
                _note.style.left = "70.5%"
                document.getElementById('L').appendChild(_note);
                l.push(Date.now() + 3125 / speed);
                el.push(noteid);
            }
        }
        //删除键（动画结束后，miss）
        _note.addEventListener("animationend", function () {
            if (this.whetherclicked != "true") {
                this.parentNode.removeChild(this);
                //评级
                ending();
            }
        }, false);
        window.setTimeout(() => {					//miss

            if (_note.whetherclicked != "true") {//是否未点击
                _note.style.opacity = "0.3";//miss特效
                combo = 0;
                document.getElementById("combo").style.visibility = "hidden";//断连击
                miss += 1;//miss计数
                document.getElementById('miss').innerHTML = "miss：" + miss;
                if (_note.parentNode) {//是否以及进行删除
                    if (_note.parentNode.id == 'A') {
                        a.shift();
                        ea.shift();
                    }
                    else if (_note.parentNode.id == 'S') {
                        s.shift();
                        es.shift();
                    }
                    else if (_note.parentNode.id == 'D') {
                        d.shift();
                        ed.shift();
                    }
                    else if (_note.parentNode.id == 'J') {
                        j.shift();
                        ej.shift();
                    }
                    else if (_note.parentNode.id == 'K') {
                        k.shift();
                        ek.shift();
                    }
                    else if (_note.parentNode.id == 'L') {
                        l.shift();
                        el.shift();
                    }

                }
                textse("miss", "LightGray");
            }
        }, (3125 / speed + 160));
        //autoplay
        if (autoplay.checked) {
            window.setTimeout(() => {
                if (_note.parentNode) {
                    tap(_note.parentNode)
                }
            }, 3125 / speed);
        }
    }

    //空拍,下一轮,进度条
    turn++;
    document.getElementById("crtnoteamount").innerHTML = "当前：" + crtnoteamount;
    document.getElementById("process").style.width = (crtnoteamount / qtt) * 60 + "%";
    if (crtnoteamount >= qtt) {
        document.getElementById("quantity").value = crtnoteamount;
        quantitychanging();
        document.getElementById("start").disabled = false;
    }
    else {
        if (turn == rest) {
            turn = 0;
            gametimeout = window.setTimeout(gaming, Math.floor(500))
        }

        else {
            gametimeout = window.setTimeout(gaming, Math.floor(60000 / bpm))
        }
    }
}

function ending() {//结束后的处理

    if (crtnoteamount == qtt && document.getElementsByClassName("notes").length == 0) {
        document.getElementById("combo").style.visibility = "hidden";
        document.getElementById("csq").style.visibility = "hidden";
        document.getElementById("line").style.visibility = "hidden";
        let _rank = document.getElementById("rank");
        if (acc == 100) {
            _rank.innerHTML = "Ex+";
            _rank.style.color = "gold";
        }
        else if (maxcombo == crtnoteamount) {
            _rank.innerHTML = "SSS";
            _rank.style.color = "#ef21d7";
        }
        else if (acc >= 95) {
            _rank.innerHTML = "S";
            _rank.style.color = "#f42335";
        }
        else if (acc >= 90) {
            _rank.innerHTML = "AAA";
            _rank.style.color = "#ed8414";
        }
        else if (acc >= 80) {
            _rank.innerHTML = "A";
            _rank.style.color = "#f27979";
        }
        else if (acc >= 70) {
            _rank.innerHTML = "B";
            _rank.style.color = "white";
        }
        else if (acc >= 60) {
            _rank.innerHTML = "C";
            _rank.style.color = "white";
        }
        else {
            _rank.innerHTML = "F";
            _rank.style.color = "white";
        }
        let _rankbg = document.getElementById("rankingbg");
        _rank.style.animationName = "none";
        _rankbg.style.animationName = "none";
        void _rank.offsetWidth;
        void _rankbg.offsetWidth;
        _rank.style.visibility = "visible";
        _rankbg.style.visibility = "visible";
        _rank.style.zIndex = 999;
        _rankbg.style.zIndex = 998;
        _rank.style.animationName = "rank";
        _rankbg.style.animationName = "rankingbg";
    }
}

//当元素被点击	
function tap(e) {
    let taptime = Date.now();
    var notetime;//tap所在队列的时间戳数组
    var tappednotes;//tap所在队列的元素数组
    let whetherbad = 0;
    if (e.id == 'A') {
        notetime = a;
        tappednotes = ea;
    }
    else if (e.id == 'S') {
        notetime = s;
        tappednotes = es;
    }
    else if (e.id == 'D') {
        notetime = d;
        tappednotes = ed;
    }
    else if (e.id == 'J') {
        notetime = j;
        tappednotes = ej;
    }
    else if (e.id == 'K') {
        notetime = k;
        tappednotes = ek;
    }
    else if (e.id == 'L') {
        notetime = l;
        tappednotes = el;
    }
    if (notetime.length > 0) {
        let tappednote = document.getElementById(tappednotes[0]);
        timediff = Math.abs(taptime - notetime[0]);
        if (timediff > 160 && timediff <= 240 && taptime < notetime[0])//bad
        {
            notetime.shift();
            tappednotes.shift();
            tappednote.style.backgroundColor = "#e49e9e";
            tappednote.style.borderColor = "#e49e9e";
            whetherbad = 1;

            bad += 1;//bad计数
            document.getElementById('bad').innerHTML = "bad：" + bad;
            //特效处理
            clickinganmation(tappednote);
            //文字特效处理
            textse("bad", "#e49e9e");
        }
        if (timediff <= 160 && timediff > 80) {//good
            notetime.shift();//删除时间戳
            tappednotes.shift();//从元素列表删除
            tappednote.style.backgroundColor = "#8dc0ff";//特效颜色
            tappednote.style.borderColor = "#8dc0ff";
            score += 687;//分数增加
            combo += 1;//combo增加
            good += 1;//good计数
            document.getElementById('good').innerHTML = "good：" + good;
            whetherbad = 0;//下文处理连击的判断符号

            clickinganmation(tappednote);

            textse("good", "#8dc0ff");
        }
        else if (timediff <= 80) {//perfect
            notetime.shift();
            tappednotes.shift();
            tappednote.style.backgroundColor = "#ffca18";//特效颜色
            tappednote.style.borderColor = "#ffca18";
            score += 1000;
            combo += 1;
            perfect += 1;//perfect计数
            document.getElementById('perfect').innerHTML = "perfect：" + perfect;
            whetherbad = 0;
            clickinganmation(tappednote);

            textse("Perfect", "gold");
        }
        //处理combo
        if (whetherbad == 0) {
            //音效处理
            let _ifAudio = document.getElementById("audio");
            if (_ifAudio.checked) {
                let _audio = new Audio("tap.mp3");
                _audio.currentTime = 0.03;
                _audio.play();
            }
            if (combo > maxcombo) {
                maxcombo = combo;
                document.getElementById("maxcombo").innerHTML = "最大连击：" + maxcombo;
            }
            if (combo >= 3) {
                document.getElementById("combo").innerHTML = combo.toString();
                document.getElementById("combo").style.visibility = "visible";
            }
        }
        else {
            combo = 0;
            document.getElementById("combo").style.visibility = "hidden";
        }
        //acc处理
        document.getElementById("score").innerHTML = score;
        qtt = document.getElementById("quantity").value;
        acc = (score / qtt / 10).toFixed(2);
        document.getElementById('acc').innerHTML = "完成率：" + (score / qtt / 10).toFixed(2) + "%";
        //将新的队列回赋值给全局变量
        if (e.id == 'A') {
            ea = tappednotes;
            a = notetime;
        }
        else if (e.id == 'S') {
            es = tappednotes;
            s = notetime;
        }
        else if (e.id == 'D') {
            ed = tappednotes;
            d = notetime;
        }
        else if (e.id == 'J') {
            ej = tappednotes;
            j = notetime;
        }
        else if (e.id == 'K') {
            ek = tappednotes;
            k = notetime;
        }
        else if (e.id == 'L') {
            el = tappednotes;
            l = notetime;
        }
    }
}
function textse(t, c) {
    let textcsq = document.getElementById("csq");
    textcsq.innerHTML = t;
    textcsq.style.color = c;
    textcsq.style.animationName = "none";
    void textcsq.offsetWidth;
    textcsq.style.animationName = "text";
    textcsq.style.visibility = "visible";
}
function clickinganmation(tappednote) {//点击动画处理
    let tpnotestyle = getComputedStyle(tappednote);//获取元素计算CSS属性
    tappednote.style.animationPlayState = "paused";

    tappednote.whetherclicked = "true";//为元素自定义属性

    tappednote.style.top = tpnotestyle.top;
    tappednote.style.animationDuration = "300ms";
    if (_nt == 4) {
        tappednote.style.animationName = "clicked_4";
    }
    else if (_nt == 6) {
        tappednote.style.animationName = "clicked_6";
    }

    tappednote.addEventListener("animationend", function () {
        this.parentNode.removeChild(this);//删除元素
        ending();
    }, false);
    tappednote.style.animationPlayState = "running";
}
