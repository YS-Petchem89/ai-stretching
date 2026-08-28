// 앱 상태 관리
const appState = {
    currentScreen: 'home',
    selectedSport: null,
    selectedDetail: null,
    selectedAreas: [],
    selectedTime: null,
    selectedRoutine: [],
    records: (() => {
        try {
            const stored = localStorage.getItem('stretchRecords');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('기록 로드 실패:', e);
            return [];
        }
    })(),
    currentRoutineIndex: 0,
    isRunning: false,
    isPaused: false,
    timeElapsed: 0,
    routineStartTime: null,
    currentCalendarMonth: new Date()
};

// 부위 선택 검증 후 시간 화면으로 이동
function validateAndGoToTime() {
    if (appState.selectedAreas.length === 0) {
        alert('최소 하나 이상의 부위를 선택해주세요.');
        return;
    }
    goToScreen('time');
}

// 화면 전환 함수
function goToScreen(screenName) {
    const currentScreen = document.getElementById(`screen-${appState.currentScreen}`);
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }

    const newScreen = document.getElementById(`screen-${screenName}`);
    if (newScreen) {
        newScreen.classList.add('active');
        appState.currentScreen = screenName;

        if (screenName === 'sports') {
            initSportsScreen();
        } else if (screenName === 'detail') {
            initDetailScreen();
        } else if (screenName === 'areas') {
            initAreasScreen();
        } else if (screenName === 'records') {
            initRecordsScreen();
        }

        window.scrollTo(0, 0);
    }
}

// ② 스포츠 종목 선택 화면 초기화
function initSportsScreen() {
    const sportsGrid = document.getElementById('sports-grid');
    sportsGrid.innerHTML = '';

    sportsData.forEach(sport => {
        const card = document.createElement('div');
        card.className = 'sport-card';
        card.innerHTML = `
            <div class="sport-icon">${sport.icon}</div>
            <div class="sport-name">${sport.name}</div>
        `;
        card.onclick = () => selectSport(sport.name, card);
        sportsGrid.appendChild(card);
    });
}

function selectSport(sportName, element) {
    document.querySelectorAll('.sport-card').forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
    appState.selectedSport = sportName;
    appState.selectedDetail = null;
    appState.selectedAreas = [];

    setTimeout(() => goToScreen('detail'), 300);
}

// ③ 세부 운동 선택 화면 초기화
function initDetailScreen() {
    const selectedSportEl = document.getElementById('selected-sport');
    selectedSportEl.textContent = `선택한 스포츠: ${appState.selectedSport}`;

    const detailGrid = document.getElementById('detail-grid');
    detailGrid.innerHTML = '';

    const sportData = sportsData.find(s => s.name === appState.selectedSport);
    if (sportData) {
        sportData.details.forEach((detail, index) => {
            const item = document.createElement('div');
            item.className = 'detail-item';
            item.textContent = detail;
            item.onclick = () => selectDetail(detail, item);
            detailGrid.appendChild(item);
        });
    }
}

function selectDetail(detailName, element) {
    document.querySelectorAll('.detail-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    appState.selectedDetail = detailName;
    appState.selectedAreas = [];

    setTimeout(() => goToScreen('areas'), 300);
}

// ④ 스트레칭 부위 선택 화면 초기화
function initAreasScreen() {
    const areasGrid = document.getElementById('areas-grid');
    areasGrid.innerHTML = '';

    areasData.forEach(area => {
        const btn = document.createElement('button');
        btn.className = 'area-btn';
        btn.innerHTML = `<div>${area.icon}</div><div>${area.name}</div>`;
        btn.onclick = () => toggleArea(area.name, btn);
        areasGrid.appendChild(btn);
    });
}

function toggleArea(areaName, element) {
    const index = appState.selectedAreas.indexOf(areaName);
    if (index > -1) {
        appState.selectedAreas.splice(index, 1);
        element.classList.remove('selected');
    } else {
        appState.selectedAreas.push(areaName);
        element.classList.add('selected');
    }
}

function selectAllAreas() {
    appState.selectedAreas = areasData.map(a => a.name);
    document.querySelectorAll('.area-btn').forEach(btn => btn.classList.add('selected'));
}

function selectRecommendedAreas() {
    appState.selectedAreas = recommendedAreasBySport[appState.selectedSport] || [];
    document.querySelectorAll('.area-btn').forEach((btn, index) => {
        const areaName = areasData[index].name;
        if (appState.selectedAreas.includes(areaName)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

// 운동 이름으로부터 부위 추출
function getAreaFromExerciseName(name) {
    if (name.includes('발목')) return '발목';
    if (name.includes('종아리')) return '종아리';
    if (name.includes('허벅지') || name.includes('대퇴사두근') || name.includes('런지') || name.includes('햄스트링')) return '허벅지';
    if (name.includes('고관절') || name.includes('엉덩이') || name.includes('골반')) return '고관절';
    if (name.includes('허리') || name.includes('중심') || name.includes('척추') || name.includes('회전')) return '허리';
    if (name.includes('어깨') || name.includes('상체')) return '어깨';
    if (name.includes('가슴')) return '가슴';
    if (name.includes('팔') || name.includes('손목')) return '팔';
    return null;
}

// ⑤ 시간 선택
function selectTime(minutes, element) {
    document.querySelectorAll('.time-card').forEach(card => card.classList.remove('selected'));
    // 커스텀 시간 섹션 선택 해제
    const customSection = document.querySelector('.custom-time-section');
    if (customSection) {
        customSection.classList.remove('selected');
    }
    element.classList.add('selected');
    appState.selectedTime = minutes;
    // 커스텀 입력 필드 초기화
    document.getElementById('custom-time-input').value = '';
}

// 커스텀 시간 선택
function selectCustomTime() {
    const customInput = document.getElementById('custom-time-input');
    const customTime = parseInt(customInput.value, 10);
    
    if (!customTime || isNaN(customTime)) {
        alert('유효한 분 단위 숫자를 입력해주세요.');
        return;
    }
    
    if (customTime < 1 || customTime > 60) {
        alert('1분에서 60분 사이의 시간을 입력해주세요.');
        return;
    }
    
    // 모든 time-card 선택 해제
    document.querySelectorAll('.time-card').forEach(card => card.classList.remove('selected'));
    
    // 커스텀 시간 섹션에 선택 상태 추가
    const customSection = document.querySelector('.custom-time-section');
    if (customSection) {
        customSection.classList.add('selected');
    }
    
    appState.selectedTime = customTime;
}

// 엔터 키로도 선택 가능
document.addEventListener('DOMContentLoaded', function() {
    const customInput = document.getElementById('custom-time-input');
    if (customInput) {
        customInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                selectCustomTime();
            }
        });
    }
});

// ⑥ 루틴 보기
function goToRoutine() {
    if (!appState.selectedTime) {
        alert('시간을 선택해주세요.');
        return;
    }

    const sportRoutines = stretchingData[appState.selectedSport];
    let baseRoutine = sportRoutines ? sportRoutines[appState.selectedDetail] : defaultStretchingRoutine;

    // 선택된 부위에 해당하는 운동만 필터링
    if (appState.selectedAreas && appState.selectedAreas.length > 0) {
        baseRoutine = baseRoutine.filter(exercise => {
            const area = getAreaFromExerciseName(exercise.name);
            return area && appState.selectedAreas.includes(area);
        });

        // 필터링 후 운동이 없으면 경고
        if (baseRoutine.length === 0) {
            alert('선택한 부위에 해당하는 운동이 없습니다. 다른 부위를 선택해주세요.');
            return;
        }
    }

    const totalSeconds = appState.selectedTime * 60;
    appState.selectedRoutine = adjustRoutineByTime(baseRoutine, totalSeconds);

    updateRoutineScreen();
    goToScreen('routine');
}

function adjustRoutineByTime(routine, totalSeconds) {
    if (!routine || routine.length === 0) return [];

    const count = Math.min(routine.length, Math.max(3, Math.floor(totalSeconds / 40)));
    const adjustedRoutine = routine.slice(0, count).map((item, index) => ({
        ...item,
        duration: Math.floor(totalSeconds / count)
    }));

    return adjustedRoutine;
}

function updateRoutineScreen() {
    const titleEl = document.getElementById('routine-title');
    const timeEl = document.getElementById('routine-time');
    const listEl = document.getElementById('routine-list');

    titleEl.textContent = `${appState.selectedSport} - ${appState.selectedDetail}`;
    const totalTime = appState.selectedRoutine.reduce((sum, item) => sum + item.duration, 0);
    const minutes = Math.ceil(totalTime / 60);
    timeEl.textContent = `총 시간: ${minutes}분`;

    listEl.innerHTML = '';
    appState.selectedRoutine.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'routine-item';
        const itemSeconds = Math.ceil(item.duration);
        itemEl.innerHTML = `
            <div>
                <div class="routine-order">${index + 1}</div>
            </div>
            <div style="flex: 1; margin-left: 15px;">
                <div>${item.name}</div>
            </div>
            <div style="text-align: right;">
                ${itemSeconds}초
            </div>
        `;
        listEl.appendChild(itemEl);
    });
}

// ⑦ 루틴 시작
function startRoutine() {
    if (!appState.selectedRoutine || appState.selectedRoutine.length === 0) {
        alert('루틴이 없습니다.');
        return;
    }

    appState.currentRoutineIndex = 0;
    appState.isRunning = true;
    appState.isPaused = false;
    appState.timeElapsed = 0;
    appState.routineStartTime = Date.now();

    goToScreen('detail-stretch');
    updateStretchScreen();
    startTimer();
}

let timerInterval = null;

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!appState.isPaused && appState.isRunning) {
            const currentRoutine = appState.selectedRoutine[appState.currentRoutineIndex];
            if (!currentRoutine) {
                clearInterval(timerInterval);
                return;
            }
            appState.timeElapsed++;

            updateTimerDisplay();

            if (appState.timeElapsed >= currentRoutine.duration) {
                nextStretch();
            }
        }
    }, 1000);
}

// 스트레칭별 이미지 경로
function getStretchingImage(name) {
    const imageMap = {
        '발목 돌리기': './images/발목 돌리기.png',
        '발목 회전': './images/발목 돌리기.png',
        '종아리 스트레칭': './images/종아리 스트레칭.png',
        '종아리 복합 스트레칭': './images/종아리 스트레칭.png',
        '종아리 심화': './images/종아리 스트레칭.png',
        '종아리 & 발': './images/종아리 스트레칭.png',
        '종아리 강화': './images/종아리 스트레칭.png',
        '종아리 고급': './images/종아리 스트레칭.png',
        '런지 스트레칭': './images/런지 스트레칭.png',
        '대퇴 전체 강화': './images/런지 스트레칭.png',
        '고관절 열기': './images/고관절 열기 스트레칭.png',
        '고관절 유연성': './images/고관절 열기 스트레칭.png',
        '고관절 준비': './images/고관절 열기 스트레칭.png',
        '고관절 개방': './images/고관절 열기 스트레칭.png',
        '고관절 완전 개방': './images/고관절 열기 스트레칭.png',
        '허벅지 스트레칭': './images/허벅지 스트레칭.png',
        '허벅지 앞쪽 스트레칭': './images/허벅지 스트레칭.png',
        '대퇴사두근': './images/허벅지 스트레칭.png',
        '대퇴사두근 스트레칭': './images/허벅지 스트레칭.png',
        '대퇴사두근 심화': './images/허벅지 스트레칭.png',
        '발목 강화': './images/발목 강화 스트레칭.png',
        '발목 강화 스트레칭': './images/발목 강화 스트레칭.png',
        '발목 준비': './images/발목 강화 스트레칭.png',
        '발목 준비운동': './images/발목 강화 스트레칭.png'
    };
    return imageMap[name] || null;
}

// 스트레칭별 SVG 이미지 생성 함수 (폴백용 - 간소화)
function getStretchingSVG(name, stepIndex = 0) {
    // 대부분의 스트레칭은 이미지 파일을 사용하므로 기본 SVG만 제공
    return '<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="50" r="20" fill="#667eea"/><line x1="100" y1="70" x2="100" y2="120" stroke="#667eea" stroke-width="3"/><line x1="100" y1="70" x2="70" y2="100" stroke="#667eea" stroke-width="3"/><line x1="100" y1="70" x2="130" y2="100" stroke="#667eea" stroke-width="3"/><line x1="100" y1="120" x2="80" y2="200" stroke="#667eea" stroke-width="3"/><line x1="100" y1="120" x2="120" y2="200" stroke="#667eea" stroke-width="3"/><text x="50" y="240" font-size="14" fill="#667eea">스트레칭 중...</text></svg>';
}

// 스트레칭 정보 확장 함수 (간소화 버전)
function getStretchingDetails(name, description, tip) {
    const details = {
        '발목 돌리기': { benefit: '발목 관절의 유연성 향상, 염좌 예방', steps: ['한쪽 발을 들어올립니다', '시계방향으로 천천히 크게 원을 그립니다', '반시계방향으로 반복합니다', '반대쪽 발도 같은 방식으로 진행합니다'], precaution: '무리한 힘으로 꺾지 마세요.' },
        '발목 회전': { benefit: '발목 관절의 유연성 향상, 염좌 예방', steps: ['한 발씩 발목을 원형으로 천천히 회전합니다', '시계방향으로 10-15회 반복합니다', '반시계방향으로 10-15회 반복합니다', '반대쪽 발도 같은 방식으로 진행합니다'], precaution: '부드럽게 천천히 진행하세요.' },
        '종아리 스트레칭': { benefit: '종아리 근육 유연성 증대, 경련 예방', steps: ['양발을 어깨넓이로 벌립니다', '한쪽 다리를 앞으로 내딛습니다', '뒤쪽 다리의 종아리를 느끼며 천천히 숙입니다', '30초 유지 후 반대쪽도 반복합니다'], precaution: '뒤쪽 발 뒤꿈치가 바닥에 붙도록 유지하세요.' },
        '런지 스트레칭': { benefit: '고관절 유연성 향상, 다리 균형 감각 향상', steps: ['한쪽 다리를 앞으로 내딛습니다', '앞쪽 무릎을 약 90도로 구부립니다', '엉덩이를 아래로 내려 고관절을 스트레칭합니다', '30초 유지 후 반대쪽도 반복합니다'], precaution: '앞쪽 무릎이 발끝보다 앞으로 나가지 않도록 주의하세요.' },
        '고관절 열기': { benefit: '골반 및 고관절 유연성 증대', steps: ['바닥에 앉습니다', '양쪽 무릎을 구부려 발바닥끼리 맞춥니다', '무릎을 양쪽으로 살짝 누르며 골반을 펼칩니다', '30초간 유지합니다'], precaution: '무리한 압박은 피하세요.' },
        '허벅지 스트레칭': { benefit: '대퇴사두근 강화, 다리 유연성 향상', steps: ['서서 한쪽 다리를 뒤로 구부립니다', '손으로 발목을 잡아 엉덩이 쪽으로 당깁니다', '30초 유지 후 반대쪽도 반복합니다', '골반이 기울어지지 않도록 주의합니다'], precaution: '무릎이 옆으로 벌어지지 않도록 주의하세요.' },
        '어깨 회전': { benefit: '어깨 관절 유연성 향상, 목과 어깨 결림 완화', steps: ['양발을 어깨넓이로 벌려 섭니다', '양쪽 어깨를 천천히 뒤쪽으로 크게 회전시킵니다', '10회 반복 후 앞쪽으로도 회전시킵니다', '호흡을 깊게 유지합니다'], precaution: '부드럽고 천천히 진행하세요.' },
        '팔 스트레칭': { benefit: '팔과 어깨 근육 유연성 증대', steps: ['한쪽 팔을 가슴 앞으로 뻗습니다', '반대쪽 팔로 팔꿈치를 가슴 쪽으로 당깁니다', '어깨가 들어올려지지 않도록 주의하며 30초 유지합니다', '반대쪽 팔도 같은 방식으로 진행합니다'], precaution: '과도한 압박을 피하세요.' },
        '손목 회전': { benefit: '손목 관절 유연성 향상, 손 피로 해소', steps: ['양팔을 앞으로 펴거나 옆으로 펼칩니다', '양쪽 손목을 시계방향으로 크게 회전시킵니다', '10-15회 반복 후 반시계방향으로도 회전시킵니다', '각 방향 15초씩 유지합니다'], precaution: '부드럽게 진행하세요.' },
        '가슴 스트레칭': { benefit: '가슴 근육 유연성 증진, 자세 개선, 호흡 개선', steps: ['양팔을 뒤로 깍지끼거나 연결합니다', '양 어깨를 뒤로 천천히 당깁니다', '가슴을 펼치는 느낌으로 30초 유지합니다', '호흡을 깊게 유지하며 자세를 유지합니다'], precaution: '척추를 곧게 펴세요.' },
        '허리 회전': { benefit: '허리 유연성 향상, 척추 건강 증진', steps: ['양발을 어깨넓이로 벌려 섭니다', '양팔을 펼치거나 가슴에 교차시킵니다', '허리를 좌우로 천천히 비틉니다', '각 방향 30초씩 유지합니다'], precaution: '과도한 회전은 피하세요.' },
        '햄스트링': { benefit: '하체 뒤쪽 근육 유연성 증진, 다리 피로 해소', steps: ['앉아서 편안한 자세를 취합니다', '한쪽 다리를 펴고 반대쪽은 구부립니다', '펼친 다리 방향으로 천천히 상체를 숙입니다', '30초 유지 후 반대쪽도 반복합니다'], precaution: '통증이 아닌 당김을 느껴야 합니다.' },
        '목 스트레칭': { benefit: '목 근육 이완, 목 결림 완화', steps: ['편한 자세로 앉습니다', '한쪽 귀를 같은 쪽 어깨로 천천히 기울입니다', '30초 유지합니다', '반대쪽도 같은 방식으로 진행합니다'], precaution: '무리한 압박은 피하세요.' }
    };
    return details[name] || {
        benefit: '근육 유연성 향상 및 부상 예방',
        steps: [description || '천천히 진행합니다', tip || '정상적인 범위 내에서', '최소 30초간 유지합니다', '양쪽을 균등하게 진행합니다'],
        precaution: '통증이 느껴지면 멈추세요.'
    };
}

function renderStepsVisualization(routine) {
    const container = document.getElementById('steps-visualization');
    if (!container) return;
    
    // 이미지 파일이 있는지 확인
    const imagePath = getStretchingImage(routine.name);
    
    if (imagePath) {
        // 이미지 파일이 있으면 이미지 표시
        container.innerHTML = '';
        container.style.display = 'block';
        container.style.textAlign = 'center';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = routine.name;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = '12px';
        img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        
        container.appendChild(img);
    } else {
        // 이미지가 없으면 SVG로 폴백
        const details = getStretchingDetails(routine.name, routine.description, routine.tip);
        const steps = details.steps || [routine.description];
        
        container.innerHTML = '';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = steps.length > 2 ? 'repeat(2, 1fr)' : `repeat(${steps.length}, 1fr)`;
        container.style.gap = '12px';
        
        steps.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step-box';
            
            const svg = getStretchingSVG(routine.name, index);
            
            stepDiv.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-svg">${svg}</div>
                <p class="step-desc">${step}</p>
            `;
            container.appendChild(stepDiv);
        });
    }
}

function updateStretchScreen() {
    const routine = appState.selectedRoutine[appState.currentRoutineIndex];
    if (!routine) {
        finishRoutine();
        return;
    }

    const progressInfo = document.getElementById('progress-info');
    if (progressInfo) {
        progressInfo.textContent = `${appState.currentRoutineIndex + 1} / ${appState.selectedRoutine.length}`;
    }

    document.getElementById('stretch-name').textContent = routine.name;
    const stretchDescEl = document.getElementById('stretch-description');
    if (stretchDescEl) stretchDescEl.textContent = routine.description;
    const stretchTipEl = document.getElementById('stretch-tip');
    if (stretchTipEl) stretchTipEl.textContent = routine.tip;

    const details = getStretchingDetails(routine.name, routine.description, routine.tip);
    const stretchBenefitEl = document.getElementById('stretch-benefit');
    if (stretchBenefitEl) stretchBenefitEl.textContent = details.benefit;
    const stretchPrecautionEl = document.getElementById('stretch-precaution');
    if (stretchPrecautionEl) stretchPrecautionEl.textContent = details.precaution;

    renderStepsVisualization(routine);

    const stepsList = document.getElementById('stretch-steps-list');
    if (stepsList) {
        stepsList.innerHTML = '';
        details.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            stepsList.appendChild(li);
        });
    }

    appState.timeElapsed = 0;
    updateTimerDisplay();

    const progressPercent = ((appState.currentRoutineIndex + 1) / appState.selectedRoutine.length) * 100;
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = progressPercent + '%';
}

function updateTimerDisplay() {
    const routine = appState.selectedRoutine[appState.currentRoutineIndex];
    if (!routine) return;
    const remaining = Math.max(0, routine.duration - appState.timeElapsed);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const timeDisplay = document.getElementById('remaining-time');
    if (timeDisplay) timeDisplay.textContent = timeStr;
}

function nextStretch() {
    appState.currentRoutineIndex++;
    if (appState.currentRoutineIndex >= appState.selectedRoutine.length) {
        if (timerInterval) clearInterval(timerInterval);
        finishRoutine();
    } else {
        updateStretchScreen();
    }
}

function prevStretch() {
    if (appState.currentRoutineIndex > 0) {
        appState.currentRoutineIndex--;
        updateStretchScreen();
    }
}

function togglePause() {
    const btn = document.getElementById('pause-btn');
    appState.isPaused = !appState.isPaused;
    btn.textContent = appState.isPaused ? '재개' : '일시정지';
}

function exitRoutine() {
    if (confirm('루틴을 종료하시겠습니까?')) {
        if (timerInterval) clearInterval(timerInterval);
        appState.isRunning = false;
        goToScreen('routine');
    }
}

// 루틴 완료
function finishRoutine() {
    if (timerInterval) clearInterval(timerInterval);
    appState.isRunning = false;

    const totalTime = appState.selectedRoutine.reduce((sum, item) => sum + item.duration, 0);
    const minutes = Math.ceil(totalTime / 60);
    const baseTime = new Date().getTime();
    const record = {
        date: new Date().toLocaleString('ko-KR'),
        sport: appState.selectedSport,
        routine: appState.selectedDetail,
        duration: minutes,
        timestamp: baseTime  // 고정된 2027년 8월 27일을 기준으로
    };

    appState.records.push(record);
    localStorage.setItem('stretchRecords', JSON.stringify(appState.records));

    const completeSportEl = document.getElementById('complete-sport');
    if (completeSportEl) completeSportEl.textContent = appState.selectedSport;
    
    const completeRoutineEl = document.getElementById('complete-routine');
    if (completeRoutineEl) completeRoutineEl.textContent = appState.selectedDetail;
    
    const completeTimeEl = document.getElementById('complete-time');
    if (completeTimeEl) completeTimeEl.textContent = `${minutes}분`;
    
    const completeDateEl = document.getElementById('complete-datetime');
    if (completeDateEl) completeDateEl.textContent = record.date;

    goToScreen('complete');
}

// 기록 화면
function initRecordsScreen() {
    updateRecordDisplay('weekly');
}

function switchRecordTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    updateRecordDisplay(tab);
}

function updateRecordDisplay(tab) {
    console.log('[updateRecordDisplay] 호출됨. tab:', tab);
    console.log('[updateRecordDisplay] appState.records.length:', appState.records.length);
    
    const recordList = document.getElementById('record-list');
    const calendarContainer = document.getElementById('calendar-container');
    
    if (!recordList || !calendarContainer) {
        console.error('[updateRecordDisplay] 필수 요소를 찾을 수 없습니다');
        return;
    }
    
    // 탭에 따라 표시/숨김 처리
    if (tab === 'calendar') {
        recordList.style.display = 'none';
        calendarContainer.style.display = 'block';
        const statsElement = document.querySelector('.record-stats');
        if (statsElement) {
            statsElement.style.display = 'none';
        }
        renderCalendar();
        return;
    }
    
    // 주간/월간/연간 탭 처리
    recordList.style.display = 'flex';
    calendarContainer.style.display = 'none';
    const statsElement = document.querySelector('.record-stats');
    if (statsElement) {
        statsElement.style.display = 'grid';
    }
    
    let filteredRecords = [];
    const now = new Date().getTime();
    console.log('[updateRecordDisplay] now:', now);

    if (tab === 'weekly') {
        const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
        console.log('[updateRecordDisplay] weekAgo:', weekAgo);
        filteredRecords = appState.records.filter(r => {
            const match = r.timestamp >= weekAgo && r.timestamp <= now;
            console.log('[updateRecordDisplay] 필터링:', r.sport, 'timestamp:', r.timestamp, 'match:', match);
            return match;
        });
    } else if (tab === 'monthly') {
        const monthAgo = now - 30 * 24 * 60 * 60 * 1000;
        console.log('[updateRecordDisplay] monthAgo:', monthAgo);
        filteredRecords = appState.records.filter(r => {
            return r.timestamp >= monthAgo && r.timestamp <= now;
        });
    } else if (tab === 'yearly') {
        console.log('[updateRecordDisplay] yearly 탭 - 모든 기록 표시');
        filteredRecords = appState.records;
    } else {
        console.warn('[updateRecordDisplay] 알 수 없는 탭:', tab);
        filteredRecords = appState.records;
    }

    const totalCount = filteredRecords.length;
    const totalTime = filteredRecords.reduce((sum, r) => sum + (r.duration || 0), 0);
    
    console.log('[updateRecordDisplay] 필터링 결과: count:', totalCount, 'time:', totalTime);

    const statCountEl = document.getElementById('stat-count');
    const statTimeEl = document.getElementById('stat-time');
    
    if (statCountEl) {
        statCountEl.textContent = totalCount;
        console.log('[updateRecordDisplay] stat-count 업데이트:', totalCount);
    } else {
        console.error('[updateRecordDisplay] stat-count 요소를 찾을 수 없습니다');
    }
    
    if (statTimeEl) {
        statTimeEl.textContent = totalTime + '분';
        console.log('[updateRecordDisplay] stat-time 업데이트:', totalTime + '분');
    } else {
        console.error('[updateRecordDisplay] stat-time 요소를 찾을 수 없습니다');
    }

    recordList.innerHTML = '';

    filteredRecords.slice().reverse().forEach(record => {
        const item = document.createElement('div');
        item.className = 'record-item';
        item.innerHTML = `
            <div class="record-item-left">
                <div class="record-item-name">${record.sport} - ${record.routine}</div>
                <div class="record-item-date">${record.date}</div>
            </div>
            <div class="record-item-time">${record.duration}분</div>
        `;
        recordList.appendChild(item);
    });
}

// 캘린더 렌더링 함수
function renderCalendar() {
    const month = appState.currentCalendarMonth.getMonth();
    const year = appState.currentCalendarMonth.getFullYear();
    
    // 제목 업데이트
    const titleElement = document.getElementById('calendar-title');
    titleElement.textContent = `${year}년 ${month + 1}월`;
    
    // 월의 첫 날과 마지막 날 계산
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // 날짜 데이터 생성
    const daysContainer = document.getElementById('calendar-days');
    daysContainer.innerHTML = '';
    
    // 운동 기록을 날짜 기준으로 그룹화
    const recordsByDate = {};
    appState.records.forEach(record => {
        // date 필드 형식: "2026. 8. 27. 오후 12:03:28"
        const dateMatch = record.date.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
        if (dateMatch) {
            const year = dateMatch[1];
            const month = String(dateMatch[2]).padStart(2, '0');
            const day = String(dateMatch[3]).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            recordsByDate[dateStr] = (recordsByDate[dateStr] || 0) + 1;
        }
    });
    
    let currentDate = new Date(startDate);
    for (let i = 0; i < 42; i++) { // 6주 = 42일
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // 날짜 문자열 생성 (로컬 시간대 기준)
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        
        const isCurrentMonth = currentDate.getMonth() === month;
        const todayDate = new Date();
        const todayStr = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
        const isToday = dateStr === todayStr;
        const hasRecord = recordsByDate[dateStr] > 0;
        
        if (!isCurrentMonth) dayElement.classList.add('other-month');
        if (isToday) dayElement.classList.add('today');
        if (hasRecord) dayElement.classList.add('has-record');
        
        const recordCount = recordsByDate[dateStr] || 0;
        dayElement.innerHTML = `
            <div class="calendar-day-number">${currentDate.getDate()}</div>
            ${recordCount > 0 ? `<div class="calendar-day-count">✓ ${recordCount}</div>` : '<div class="calendar-day-count"></div>'}
        `;
        
        daysContainer.appendChild(dayElement);
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

// 이전 달 보기
function prevMonth() {
    appState.currentCalendarMonth.setMonth(appState.currentCalendarMonth.getMonth() - 1);
    renderCalendar();
}

// 다음 달 보기
function nextMonth() {
    appState.currentCalendarMonth.setMonth(appState.currentCalendarMonth.getMonth() + 1);
    renderCalendar();
}

// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
    console.log('앱이 로드되었습니다.');
    
    // 버그 수정: 26일의 테스트 데이터 제거
    const stored = localStorage.getItem('stretchRecords');
    if (stored) {
        try {
            let records = JSON.parse(stored);
            const beforeCount = records.length;
            // 26일 데이터 필터링 제거 (테스트 데이터 버그)
            records = records.filter(r => {
                // 날짜 형식: "2027. 8. 26. 오전/오후 12:00:00" 형태의 26일 데이터 제거
                const dateMatch = r.date.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
                if (dateMatch) {
                    const day = parseInt(dateMatch[3]);
                    return day !== 26; // 26일이 아닌 것만 유지
                }
                return true;
            });
            
            if (records.length !== beforeCount) {
                console.log(`26일 데이터 ${beforeCount - records.length}개 제거됨`);
                localStorage.setItem('stretchRecords', JSON.stringify(records));
                appState.records = records;
                
                // 현재 화면이 records라면 업데이트
                if (appState.currentScreen === 'records') {
                    initRecordsScreen();
                }
            }
        } catch (e) {
            console.error('레코드 정리 중 오류:', e);
        }
    }
});
