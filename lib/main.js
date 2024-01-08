var i = 0;
var set_welcome_msg = null; 
var set_question    = null;

var now = new Date();
var this_year = '';
var next_year = '';
var past      = '';
var future    = '';
var is_year_end_season = false;
var is_new_year_season = false;

set_period_info();
var question_list_for_past = [
    past+' 제 점수는요',
    past+' 영향을 받은 사람',
    past+' 새롭게 만난 사람',
    past+' 최고의 소비',
    past+' 최악의 소비',
    past+'n기억에 남는 에피소드',
    past+' 가장 노력한 부분',
    past+' 처음 한 시도',
    past+' 내가 달성한 것',
    past+' 포기한 게 있다면',
    past+' 가장 감사한 것',
    past+' 계속 미룬 일',
    past+' 행복했던 순간',
    past+' 가장 슬펐던 순간',
    past+'n운이 좋다고 느낀 순간',
    past+' 얻은 깨달음',
    past+' 나에게 있어n가장 큰 변화',
    past+' 지구를 위해n실천한 착한 일',
    past+' 한 좋은 결정',
    past+' 남에게 베푼 친절',
    past+'의 사진',
    past+'의 신세계',
    past+'의 실패',
    past+'의 이별',
    past+'의 문장',
    past+'의 옷',
    past+'의 과일',
    past+'의 음식',
    past+'의 노래',
    past+'의 취미',
    past+'의 장소',
    past+'의 책',
    past+'의 영화',
    past+'의 콘텐츠',
    past+'의 발견',
    past+'의 소확행',
    past+'의n예상치 못한 장애물',
    past+'에도n털어내지 못한 것',
    '이모지로 표현하는n'+this_year+'년',
    '1년 사이n가장 발전한 능력'
];

var question_list_for_future = [
    future+' 이것만큼은n꼭 해내고 싶다!',
    future+' 가장 바라는 운n(재물운, 건강운, 성공운, 애정운)',
    future+'의 위시리스트',
    future+'가 기대되는 이유',
    future+'에n도전하고 싶은 것',
    future+'에 고치고 싶은 습관',
    future+'에n더 함께 하고 싶은 사람',
    past+'에 비해n○○한 사람이 되고 싶다',
    next_year+'년을n키워드로 표현하자면',
    next_year+'년의 나에게n하고 싶은 말',
    '이모지로 표현해보는n'+next_year+'년',
    '가고 싶은 여행지nNo.1'
];
if (is_year_end_season) question_list_for_future.push('1월 1일 처음 들을 곡');

jQuery(document).ready(function() {
    $('#start_btn').hide();
    $('#past_btn').hide(); $('#future_btn').hide();

    document.getElementById('past_btn').innerText   = this_year;
    document.getElementById('future_btn').innerText = next_year;
    get_welcome_msg();
});

function set_period_info()
{
    var now_month = now.getMonth() + 1;
    if (now_month == 11 || now_month == 12) {
        is_year_end_season = true; 
        past = '올해'; future = '내년';
        this_year = now.getFullYear(); next_year = now.getFullYear() + 1;
    } else if (now_month == 1  || now_month == 2) {
        is_new_year_season = true; 
        past = '작년'; future = '올해';
        this_year = now.getFullYear() - 1; next_year = now.getFullYear();
    }
}

function get_welcome_msg() 
{
    var add_msg = '';
    if (is_year_end_season) { 
        add_msg = '> 벌써 한 해를 마무리할 시간입니다.';
    } else if (is_new_year_season) {
        add_msg = '> 새로운 한 해가 밝았습니다.';
    }

    var msg = '> 안녕하세요, 연말연시 질문 봇입니다🤖 '+add_msg+' > 이 시기에 딱 맞는 질문을 드릴게요. > 준비되셨나요?';
    set_welcome_msg = setInterval(function () { typing(msg, 'welcome_msg'); }, 150);
}

function update_question(type) 
{
    i = 0;
    $('#welcome').hide();
    switch (type) {
        case 'past':
            var index    = Math.floor(Math.random() * question_list_for_past.length);
            var question = 'Q)'+question_list_for_past[index];
            question_list_for_past.splice(index, 1);
            question_list_for_past.sort();
            break;
        case 'future':
            var index    = Math.floor(Math.random() * question_list_for_future.length);
            var question = 'Q)'+question_list_for_future[index];
            question_list_for_future.splice(index, 1);
            question_list_for_future.sort();
            break;
        default:
            var question = '질문받고 싶은 년도를n선택해주세요💭';
            break;
    }

    clearInterval(set_welcome_msg);
    clearInterval(set_question);

    var element_id = 'question';
    document.getElementById(element_id).innerHTML = '';
    set_question = setInterval(function () { typing(question, element_id); }, 170);
}

function typing(content, element_id) 
{
    if (i < content.length) {
        let letter = content.charAt(i);
        if (letter == '>') letter = '<br>'+letter; 
        else if (letter == ')') letter = letter+'<br>'; 
        else if (letter == 'n') letter = '<br>';
        document.getElementById(element_id).innerHTML += letter;
        i++;
    } else {
        if (element_id == 'welcome_msg') { 
            $('#start_btn').show();
        } else {
            if (question_list_for_past.length > 0) $('#past_btn').show();
            else $('#past_btn').hide();

            if (question_list_for_future.length > 0) $('#future_btn').show();
            else $('#future_btn').hide();
        }
    }
}
