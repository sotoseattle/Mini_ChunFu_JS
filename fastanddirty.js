var allowed= ['0', '○', '〇', 'Ｏ', '零', '1', '１', '一', '壹', '幺', '2', '２', '二', '兩', '貳', '两', '贰', '3', '３', '三', '參', '叁', '叄', '4', '４', '四', '肆', '5', '５', '五', '伍', '6', '６', '六', '陸', '陆', '7', '７', '七', '柒', '8', '８', '八', '捌', '9', '９', '九', '玖', '拾', '呀', '十', '佰', '百', '仟', '千', '億', '亿', '萬', '万', '廿', '念', '卅', '卌', '皕', '點', '点', '.', '、', ',', '負', '负', '-', '京', '兆', '亿', '万', '千', '百', '十']

XTN_Standardize = [["[○〇Ｏ零]", '0'], ["[１一壹幺]", '1'], ["[２二兩貳两贰]", '2'], ["[３三參叁叄]", '3'], ["[４四肆]", '4'], 
  ["[５五伍]", '5'], ["[６六陸陆]", '6'], ["[７七柒]", '7'], ["[８八捌]", '8'], ["[９九玖]", '9'], 
  ["[拾呀]", '十'], ["佰", '百'], ["仟", '千'],['億', '亿'], ['萬', "万"],["[廿念]", '2十'],["卅", '3十'], ["卌", '4十'], ["皕", '2百'],
  ["[點点]", '.'], ["、", ','], ["[負负]", '-']];

XT_Multipliers= {"京":Math.pow(10,16), "兆":Math.pow(10,12), "亿":Math.pow(10,8), "万":10000, "千":1000, "百":100, "十":10};

var server= {
  
  standarize: function(numb){
    $.each(XTN_Standardize, function(index, value) {
      var key = new RegExp("("+value[0]+")");
      var cycle = true
      while (cycle){
        var matches = key.exec(numb);
        if (matches!=null){numb= numb.replace(matches[0], value[1]);
        }else{cycle = false}
      };
    });
    if (XT_Multipliers[numb[0]]!=undefined){numb= "1"+numb;}
    numb = numb.replace(/,/g, "")
    return numb
  },
  
  pivot: function(str){
    var s={}
    $.each(XT_Multipliers, function(a, b) {
      var rg = new RegExp("^(.*)"+a+"(.*)");
      var m= rg.exec(str);
      if (m!=null){s['l']= m[1];s['r']= m[2];s['m']= b;s['c']= a;return false
      } else {s['l']=str}
    });
    return s
  },
  
  compute_number: function(str){
    var s, tr, tl
    var oj= server.pivot(str);
    if (oj['m']==null){
      str = str.replace(/,/g, "")
      if ($.isNumeric(str)){s= Number(str);} else {s=null}
    }else{
      if (oj['r']!=''){
        if (/^[1-9][0-9]*$/.exec(oj['r'])!=undefined && /\./.exec(oj['l'])==undefined && (oj['c']!="十")){
          if (oj['l']=="0"){tl=0} else {tl= server.compute_number(oj['l'])};
          if (tl==0){s = oj['r']}
          else{s= Number(tl+"."+oj['r'])*oj['m'];}
        }else{
          tr = server.compute_number(oj['r'])
          if (oj['l']=="0"){tl= 0;}
          else{
            tl = server.compute_number(oj['l'])
            if (tl==0){tl= oj['m']}
            else{tl= tl*oj['m']}
          }
          s = tl + tr
        }
      }else if (oj['l']!=''){
        var temp= server.compute_number(oj['l'])
        s = temp*oj['m']
      }else{s = oj['m']}
    }
    return s
  },
  
  computa: function(st){
    numb= st.trim();
    tabulous= "<table id='tabulous'><tbody><tr><td id='top'><span id='topnumber'>"+numb+"</span></td></tr>"
    numb= server.compute_number(server.standarize(numb))
    tabulous += "<tr><td id='bottom' class='summary'><span>"+numb+"</span></td></tr></tbody></table>"
    return tabulous
  }
};