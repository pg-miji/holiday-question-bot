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
    past+' 나에게 영향을 미친 사람',
    past+' 새롭게 만난 사람',
    past+' 최고의 소비',
    past+' 최악의 소비',
    past+' 기억에 남는 에피소드',
    past+' 가장 노력한 부분',
    past+' 처음 시도해본 것',
    past+' 내가 달성한 것',
    past+' 가장 감사한 것',
    past+' 가장 행복했던 순간',
    past+' 가장 슬펐던 순간',
    past+' 얻은 깨달음',
    past+' 예상치 못한 장애물',
    past+' 운이 좋다고 느낀 일',
    past+' 계속 미룬 것',
    past+' 나에게 있어 가장 큰 변화',
    past+'의 사진',
    past+'의 신세계',
    past+'의 실패',
    past+'의 아쉬움',
    past+'의 이별',
    past+'의 문장',
    past+'의 옷',
    past+'의 과일',
    past+'의 음식',
    past+'의 노래',
    past+'의 취미',
    past+'의 좋은 결정',
    past+'의 장소',
    past+'의 책',
    past+'의 영화',
    past+'의 콘텐츠',
    past+'의 포기',
    past+'의 발견',
    past+'의 소확행',
    past+'의 이모지 5개',
    past+'에 평점을 매긴다면',
    past+'에도 털어내지 못한 것',
    '1년 사이 가장 발전한 능력'
];

var question_list_for_future = [
    future+' 꼭 해내고 싶은 목표',
    future+'의 위시리스트',
    future+'에 기대되는 점',
    future+'에 도전하고 싶은 것',
    future+'에 고치고 싶은 것',
    future+'에 시간을 더 많이 보내고 싶은 사람',
    next_year+'년을 키워드로 표현하자면',
    next_year+'년의 나에게 하고 싶은 말',
    '새해에 가고 싶은 여행지'
];
if (is_year_end_season) question_list_for_future.push('1월 1일 처음 들을 곡')

jQuery(document).ready(function() {
    $('#start_btn').hide();
    $('#past_btn').hide(); $('#future_btn').hide();

    document.getElementById('past_btn').innerText = this_year;
    document.getElementById('future_btn').innerText = next_year;
    get_welcome_msg();
});

function set_period_info()
{
    if (now.getMonth() == 11 || now.getMonth() == 12) {
        is_year_end_season = true; 
        past = '올해'; future = '내년';
        this_year = now.getFullYear(); next_year = now.getFullYear() + 1;
    } else if (now.getMonth() == 1  || now.getMonth() == 2) {
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

    var msg = '> 안녕하세요. 연말연시 질문 봇입니다. '+add_msg+' > 이 시기에 딱 맞는 질문을 드릴게요. > 준비되셨나요?';
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
            var question = '질문받고 싶은 년도를 선택해주세요.';
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