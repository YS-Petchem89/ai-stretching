// 스포츠 종목 데이터
const sportsData = [
    { name: '농구', icon: '🏀', details: ['일반 농구(게임)', '슛 연습 / 점프 위주', '드리블 / 스피드 위주', '하체 근력 훈련', '기타'] },
    { name: '야구', icon: '⚾', details: ['투수 연습', '타격 연습', '수비 위주', '하체 근력 훈련', '기타'] },
    { name: '축구', icon: '⚽', details: ['풀 게임', '슈팅 연습', '패싱 위주', '하체 근력 훈련', '기타'] },
    { name: '배구', icon: '🏐', details: ['풀 게임', '스파이크 연습', '레시브 위주', '상체 근력 훈련', '기타'] },
    { name: '테니스', icon: '🎾', details: ['풀 경기', '서브 연습', '포핸드/백핸드 위주', '상체 근력 훈련', '기타'] },
    { name: '배드민턴', icon: '🏸', details: ['풀 경기', '스매시 연습', '클리어 위주', '상체 근력 훈련', '기타'] },
    { name: '수영', icon: '🏊', details: ['자유형', '배영', '평영', '접영', '기타'] },
    { name: '러닝', icon: '🏃', details: ['장거리 러닝', '단거리 스프린트', '언덕 러닝', '트레드밀', '기타'] },
    { name: '등산', icon: '⛰️', details: ['가벼운 등산', '중급 난이도', '고급 난이도', '정상 공략', '기타'] },
    { name: '웨이트', icon: '🏋️', details: ['상체 운동', '하체 운동', '전신 운동', '근력 훈련', '기타'] }
];

// 스트레칭 부위 데이터
const areasData = [
    { name: '발목', icon: '🦶' },
    { name: '종아리', icon: '🦵' },
    { name: '허벅지', icon: '🦵' },
    { name: '고관절', icon: '🦴' },
    { name: '허리', icon: '🪦' },
    { name: '어깨', icon: '💪' },
    { name: '가슴', icon: '💗' },
    { name: '팔', icon: '💪' }
];

// 스포츠별 권장 부위
const recommendedAreasBySport = {
    '농구': ['발목', '종아리', '허벅지', '고관절', '허리'],
    '야구': ['어깨', '팔', '허리', '고관절', '종아리'],
    '축구': ['발목', '종아리', '허벅지', '고관절', '허리'],
    '배구': ['어깨', '팔', '가슴', '허리', '발목'],
    '테니스': ['어깨', '팔', '손목', '허리', '다리'],
    '배드민턴': ['어깨', '팔', '허리', '다리', '발목'],
    '수영': ['어깨', '팔', '가슴', '허리', '다리'],
    '러닝': ['종아리', '허벅지', '고관절', '허리', '발목'],
    '등산': ['종아리', '허벅지', '고관절', '허리', '어깨'],
    '웨이트': ['어깨', '팔', '가슴', '허리', '다리']
};

// 스트레칭 동작 데이터
const stretchingData = {
    '농구': {
        '일반 농구(게임)': [
            { name: '발목 돌리기', duration: 30, description: '한쪽 발을 들어 시계방향, 반시계방향으로 천천히 돌립니다.', tip: '움직임을 크고 천천히 해주세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '양발을 어깨넓이로 벌리고 한쪽 다리를 앞으로 내딛어 종아리를 스트레칭합니다.', tip: '뒤쪽 발 뒤꿈치가 떨어지지 않도록 주의하세요.' },
            { name: '런지 스트레칭', duration: 40, description: '한쪽 다리를 앞으로 내딛고 무릎을 구부려 고관절을 스트레칭합니다.', tip: '무릎이 발끝보다 앞으로 나가지 않도록 주의하세요.' },
            { name: '고관절 열기', duration: 40, description: '양쪽 무릎을 구부리고 발바닥을 맞추며 무릎을 아래로 누릅니다.', tip: '골반을 꼿꼿이 세우고 진행하세요.' },
            { name: '허벅지 스트레칭', duration: 40, description: '한쪽 다리를 뒤로 구부려 손으로 잡아 대퇴사두근을 스트레칭합니다.', tip: '무릎이 옆으로 벌어지지 않도록 주의하세요.' }
        ],
        '슛 연습 / 점프 위주': [
            { name: '발목 강화', duration: 30, description: '양쪽 발의 내측과 외측을 번갈아가며 스트레칭합니다.', tip: '천천히 움직여주세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '벽에 손을 대고 한쪽 다리를 뒤로 뻗어 종아리를 스트레칭합니다.', tip: '등이 굽지 않도록 주의하세요.' },
            { name: '대퇴사두근 스트레칭', duration: 40, description: '서서 한쪽 다리를 뒤로 구부려 발목을 잡습니다.', tip: '골반이 기울어지지 않도록 주의하세요.' },
            { name: '엉덩이 스트레칭', duration: 40, description: '누워 한쪽 무릎을 가슴 쪽으로 당깁니다.', tip: '등이 바닥에서 떨어지지 않도록 하세요.' },
            { name: '허리 스트레칭', duration: 40, description: '양발을 어깨넓이로 벌리고 천천히 몸을 앞으로 숙입니다.', tip: '무릎을 가볍게 구부린 상태를 유지하세요.' }
        ],
        '드리블 / 스피드 위주': [
            { name: '발목 준비운동', duration: 30, description: '양쪽 발을 번갈아가며 위아래로 움직입니다.', tip: '리드미컬하게 움직여주세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '계단 모서리에 발가락을 걸고 종아리를 스트레칭합니다.', tip: '안정성을 위해 손잡이를 잡으세요.' },
            { name: '골반 유연성', duration: 40, description: '양쪽 다리를 크게 벌려 앞으로 숙입니다.', tip: '무리하지 마세요.' },
            { name: '고관절 스트레칭', duration: 40, description: '누워 한쪽 무릎을 반대쪽 가슴으로 당깁니다.', tip: '등이 바닥에 붙어있도록 하세요.' },
            { name: '전신 스트레칭', duration: 40, description: '양팔을 올려 기지개를 켭니다.', tip: '깊고 천천히 숨을 쉬세요.' }
        ],
        '하체 근력 훈련': [
            { name: '발목 스트레칭', duration: 30, description: '양쪽 발의 아래위를 번갈아가며 스트레칭합니다.', tip: '균형을 잡기 위해 벽을 잡으세요.' },
            { name: '종아리 복합 스트레칭', duration: 40, description: '벽과 마주 보고 종아리를 여러 각도로 스트레칭합니다.', tip: '양쪽 모두 동일한 시간을 유지하세요.' },
            { name: '햄스트링 스트레칭', duration: 40, description: '한쪽 다리를 들어 손으로 당깁니다.', tip: '무릎을 완전히 펴지 마세요.' },
            { name: '고관절 외전', duration: 40, description: '옆으로 누워 위쪽 다리를 위로 올립니다.', tip: '천천히 움직여주세요.' },
            { name: '허리 중심 스트레칭', duration: 40, description: '옆으로 누워 상체를 비틉니다.', tip: '호흡을 깊게 하세요.' }
        ],
        '기타': [
            { name: '전신 준비 스트레칭', duration: 30, description: '기본적인 동적 스트레칭을 진행합니다.', tip: '천천히 시작하세요.' },
            { name: '종아리 & 발목', duration: 40, description: '종아리와 발목을 함께 스트레칭합니다.', tip: '양쪽 모두 균등하게 진행하세요.' },
            { name: '다리 전체 스트레칭', duration: 40, description: '앉아서 다리 전체를 스트레칭합니다.', tip: '통증이 느껴지면 멈추세요.' },
            { name: '허리 회전', duration: 40, description: '앉아서 허리를 좌우로 비틉니다.', tip: '서서히 범위를 확대하세요.' },
            { name: '마무리 스트레칭', duration: 40, description: '전신을 이완시키는 스트레칭입니다.', tip: '깊은 호흡과 함께 진행하세요.' }
        ]
    },
    '축구': {
        '풀 게임': [
            { name: '발목 회전', duration: 30, description: '한 발씩 발목을 원형으로 돌립니다.', tip: '큰 동작으로 천천히 돌려주세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '벽에 손을 대고 종아리를 스트레칭합니다.', tip: '발뒤꿈치가 떨어지지 않도록 하세요.' },
            { name: '런지 스트레칭', duration: 40, description: '한쪽 다리를 앞으로 내딛어 고관절을 스트레칭합니다.', tip: '전체 무게를 고르게 분산하세요.' },
            { name: '허벅지 앞쪽 스트레칭', duration: 40, description: '서서 한쪽 다리를 뒤로 당겨 대퇴사두근을 스트레칭합니다.', tip: '균형을 잡기 위해 벽을 잡으세요.' },
            { name: '허리 회전 스트레칭', duration: 40, description: '양발을 어깨넓이로 벌리고 허리를 비틉니다.', tip: '부드럽고 천천히 움직이세요.' }
        ],
        '슈팅 연습': [
            { name: '발목 강화', duration: 30, description: '양쪽 발을 안쪽, 바깥쪽으로 번갈아 스트레칭합니다.', tip: '천천히 움직여주세요.' },
            { name: '종아리 복합 스트레칭', duration: 40, description: '앉아서 발가락을 잡아 종아리를 스트레칭합니다.', tip: '등이 구부러지지 않도록 하세요.' },
            { name: '고관절 유연성', duration: 40, description: '누워 한쪽 무릎을 가슴으로 당깁니다.', tip: '반대쪽 다리는 펴진 상태를 유지하세요.' },
            { name: '고관절 외전', duration: 40, description: '바닥에 앉아 양쪽 발바닥을 맞춥니다.', tip: '골반을 중립으로 유지하세요.' },
            { name: '허리 스트레칭', duration: 40, description: '누워 양쪽 무릎을 한쪽으로 넘깁니다.', tip: '양쪽을 균등하게 스트레칭하세요.' }
        ],
        '패싱 위주': [
            { name: '발목 준비', duration: 30, description: '발목을 작은 원형으로 움직입니다.', tip: '양쪽 모두 진행하세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '한쪽 다리를 앞으로 내딛어 종아리를 스트레칭합니다.', tip: '몸을 흔들지 마세요.' },
            { name: '대퇴사두근', duration: 40, description: '옆으로 누워 위쪽 다리를 뒤로 당깁니다.', tip: '척추가 비틀어지지 않도록 하세요.' },
            { name: '햄스트링', duration: 40, description: '앉아서 한쪽 다리를 펴고 앞으로 숙입니다.', tip: '무릎을 완전히 펴세요.' },
            { name: '전체 이완', duration: 40, description: '누워 심호흡하며 전신을 이완합니다.', tip: '편안한 자세를 유지하세요.' }
        ],
        '하체 근력 훈련': [
            { name: '발목 강화 스트레칭', duration: 30, description: '발가락을 여러 방향으로 스트레칭합니다.', tip: '느린 속도로 진행하세요.' },
            { name: '종아리 심화 스트레칭', duration: 40, description: '계단에서 발뒤꿈치를 낮춰 스트레칭합니다.', tip: '안전을 위해 손잡이를 잡으세요.' },
            { name: '둔부 스트레칭', duration: 40, description: '누워 한쪽 무릎을 반대쪽으로 당깁니다.', tip: '등이 바닥에 붙어있도록 하세요.' },
            { name: '고관절 개방', duration: 40, description: '앉아서 한쪽 무릎을 바깥쪽으로 넘깁니다.', tip: '무리하지 마세요.' },
            { name: '허리 안정화', duration: 40, description: '누워 양쪽 무릎을 가슴으로 당깁니다.', tip: '깊은 호흡을 유지하세요.' }
        ],
        '기타': [
            { name: '기본 발목 스트레칭', duration: 30, description: '발목 전체를 스트레칭합니다.', tip: '균형 있게 진행하세요.' },
            { name: '종아리 & 발 스트레칭', duration: 40, description: '종아리와 발을 함께 스트레칭합니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '다리 전체', duration: 40, description: '앞뒤 다리를 모두 스트레칭합니다.', tip: '통증이 느껴지면 멈추세요.' },
            { name: '골반 & 허리', duration: 40, description: '골반과 허리를 함께 스트레칭합니다.', tip: '부드러운 동작을 유지하세요.' },
            { name: '마무리', duration: 40, description: '전신을 이완하는 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ]
    },
    '야구': {
        '투수 연습': [
            { name: '어깨 회전', duration: 30, description: '양쪽 어깨를 원형으로 크게 돌립니다.', tip: '앞뒤로 천천히 움직여주세요.' },
            { name: '팔 스트레칭', duration: 40, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '양팔 모두 균등하게 진행하세요.' },
            { name: '회전근개 스트레칭', duration: 40, description: '팔을 뒤로 교차하여 어깨 후면을 스트레칭합니다.', tip: '호흡을 유지하세요.' },
            { name: '팔꿈치 유연성', duration: 40, description: '팔을 구부려 팔꿈치 관절을 부드럽게 움직입니다.', tip: '과도한 압박은 피하세요.' },
            { name: '상체 회전', duration: 40, description: '양팔을 펼쳐 상체를 좌우로 비틉니다.', tip: '하체는 고정하세요.' }
        ],
        '타격 연습': [
            { name: '발목 준비', duration: 30, description: '발목을 원형으로 크게 움직입니다.', tip: '양쪽 모두 진행하세요.' },
            { name: '다리 회전', duration: 40, description: '한쪽 다리를 들어 고관절을 원형으로 회전시킵니다.', tip: '균형을 잡기 위해 벽을 사용하세요.' },
            { name: '고관절 유연성', duration: 40, description: '양쪽 무릎을 구부리고 발바닥을 맞춘 후 무릎을 아래로 누릅니다.', tip: '골반을 곧게 세우세요.' },
            { name: '허리 회전', duration: 40, description: '양발을 어깨넓이로 벌리고 허리를 좌우로 비틉니다.', tip: '부드럽고 천천히 진행하세요.' },
            { name: '복부 코어', duration: 40, description: '누워 양쪽 무릎을 한쪽으로 넘깁니다.', tip: '양쪽을 균등하게 진행하세요.' }
        ],
        '수비 위주': [
            { name: '전신 준비', duration: 30, description: '기본적인 동적 스트레칭으로 전신을 준비합니다.', tip: '천천히 시작하세요.' },
            { name: '다리 민첩성', duration: 40, description: '양다리를 넓게 벌려 옆으로 흔듭니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '무릎 유연성', duration: 40, description: '한쪽 무릎을 구부려 가슴 쪽으로 당깁니다.', tip: '양쪽을 같은 시간 진행하세요.' },
            { name: '어깨 민첩성', duration: 40, description: '어깨를 빠르게 위아래로 움직입니다.', tip: '빠른 속도로 진행하세요.' },
            { name: '전신 이완', duration: 40, description: '심호흡하며 전신을 편안하게 이완합니다.', tip: '깊은 호흡을 유지하세요.' }
        ],
        '하체 근력 훈련': [
            { name: '발목 강화', duration: 30, description: '발가락을 여러 방향으로 스트레칭합니다.', tip: '느린 속도로 진행하세요.' },
            { name: '종아리 심화', duration: 40, description: '계단에서 발뒤꿈치를 낮춰 스트레칭합니다.', tip: '안전을 위해 손잡이를 잡으세요.' },
            { name: '대퇴사두근 강화', duration: 40, description: '한쪽 다리를 뒤로 구부려 깊게 스트레칭합니다.', tip: '무리하지 마세요.' },
            { name: '햄스트링 심화', duration: 40, description: '앉아 한쪽 다리를 펴고 몸을 앞으로 숙입니다.', tip: '등이 구부러지지 않도록 하세요.' },
            { name: '고관절 개방', duration: 40, description: '누워 한쪽 무릎을 반대쪽 어깨로 당깁니다.', tip: '등이 바닥에 붙어있도록 하세요.' }
        ],
        '기타': [
            { name: '투수 기본', duration: 30, description: '투수의 기본 준비 스트레칭입니다.', tip: '천천히 시작하세요.' },
            { name: '타자 기본', duration: 40, description: '타자의 기본 준비 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '수비수 기본', duration: 40, description: '수비수의 기본 준비 스트레칭입니다.', tip: '무리하지 마세요.' },
            { name: '전신 정렬', duration: 40, description: '신체 정렬을 확인하는 스트레칭입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '마무리 이완', duration: 40, description: '경기 후 이완 스트레칭입니다.', tip: '편안한 자세를 유지하세요.' }
        ]
    },
    '배구': {
        '풀 게임': [
            { name: '발목 준비', duration: 30, description: '발목을 원형으로 크게 움직입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '벽에 손을 대고 종아리를 스트레칭합니다.', tip: '발뒤꿈치가 떨어지지 않도록 하세요.' },
            { name: '고관절 준비', duration: 40, description: '양쪽 무릎을 구부리고 발바닥을 맞춘 후 무릎을 아래로 누릅니다.', tip: '골반을 중립으로 유지하세요.' },
            { name: '어깨 회전', duration: 40, description: '양쪽 어깨를 원형으로 크게 돌립니다.', tip: '앞뒤로 천천히 움직여주세요.' },
            { name: '허리 안정화', duration: 40, description: '누워 양쪽 무릎을 가슴으로 당깁니다.', tip: '깊은 호흡을 유지하세요.' }
        ],
        '스파이크 연습': [
            { name: '어깨 스트레칭', duration: 30, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '양팔 모두 진행하세요.' },
            { name: '삼각근 스트레칭', duration: 40, description: '팔을 교차하여 어깨 뒤를 스트레칭합니다.', tip: '부드럽게 압박을 유지하세요.' },
            { name: '팔 앞쪽', duration: 40, description: '한쪽 팔을 머리 위로 올려 팔 안쪽을 스트레칭합니다.', tip: '척추가 기울어지지 않도록 하세요.' },
            { name: '회전근개', duration: 40, description: '팔을 뒤로 교차하여 어깨 후면을 깊게 스트레칭합니다.', tip: '호흡을 유지하세요.' },
            { name: '상체 열기', duration: 40, description: '양팔을 뒤로 연결하고 가슴을 펼칩니다.', tip: '무리하지 않게 부드럽게 진행하세요.' }
        ],
        '레시브 위주': [
            { name: '다리 유연성', duration: 30, description: '양다리를 넓게 벌려 옆으로 흔듭니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '허리 회전', duration: 40, description: '앉아서 허리를 좌우로 부드럽게 비틉니다.', tip: '과하게 회전하지 마세요.' },
            { name: '고관절 개방', duration: 40, description: '바닥에 앉아 양쪽 발바닥을 맞춥니다.', tip: '골반을 중립으로 유지하세요.' },
            { name: '햄스트링', duration: 40, description: '앉아 한쪽 다리를 펴고 앞으로 숙입니다.', tip: '무릎을 완전히 펴세요.' },
            { name: '척추 안정화', duration: 40, description: '누워 양쪽 무릎을 한쪽으로 넘깁니다.', tip: '양쪽을 균등하게 스트레칭하세요.' }
        ],
        '상체 근력 훈련': [
            { name: '팔 전체', duration: 30, description: '양팔을 여러 방향으로 스트레칭합니다.', tip: '천천히 움직여주세요.' },
            { name: '이두근 & 삼두근', duration: 40, description: '팔을 구부려 팔 근육을 스트레칭합니다.', tip: '양팔 모두 진행하세요.' },
            { name: '전완근 스트레칭', duration: 40, description: '손가락을 뒤로 꺾어 전완근을 스트레칭합니다.', tip: '양쪽을 같은 시간 유지하세요.' },
            { name: '가슴 열기', duration: 40, description: '가슴을 펼치는 스트레칭입니다.', tip: '부드러운 동작을 유지하세요.' },
            { name: '상체 마무리', duration: 40, description: '상체 전체를 이완하는 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ],
        '기타': [
            { name: '전신 준비', duration: 30, description: '배구의 기본 전신 준비 스트레칭입니다.', tip: '천천히 시작하세요.' },
            { name: '점프 준비', duration: 40, description: '점프를 위한 하체 준비 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '팔 민첩성', duration: 40, description: '빠른 반응을 위한 팔 스트레칭입니다.', tip: '무리하지 마세요.' },
            { name: '다리 강화', duration: 40, description: '다리의 전체 근육을 강화하는 스트레칭입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '마무리 이완', duration: 40, description: '경기 후 전신 이완 스트레칭입니다.', tip: '편안한 자세를 유지하세요.' }
        ]
    },
    '배드민턴': {
        '풀 경기': [
            { name: '손목 회전', duration: 30, description: '양쪽 손목을 원형으로 돌립니다.', tip: '시계방향과 반시계방향 모두 진행하세요.' },
            { name: '팔 스트레칭', duration: 40, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '어깨가 들어올려지지 않도록 하세요.' },
            { name: '어깨 회전', duration: 40, description: '양쪽 어깨를 원형으로 크게 돌립니다.', tip: '앞뒤로 천천히 움직여주세요.' },
            { name: '다리 준비', duration: 40, description: '발목과 종아리를 함께 준비합니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '전신 이완', duration: 40, description: '심호흡하며 전신을 편안하게 이완합니다.', tip: '깊은 호흡을 유지하세요.' }
        ],
        '스매시 연습': [
            { name: '어깨 스트레칭', duration: 30, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '양팔 모두 진행하세요.' },
            { name: '손목 강화', duration: 40, description: '손목을 여러 방향으로 움직입니다.', tip: '천천히 가동범위를 확대하세요.' },
            { name: '팔 앞쪽', duration: 40, description: '한쪽 팔을 머리 위로 올려 팔 안쪽을 스트레칭합니다.', tip: '척추가 기울어지지 않도록 하세요.' },
            { name: '전완근', duration: 40, description: '손가락을 뒤로 꺾어 전완근을 스트레칭합니다.', tip: '양쪽을 같은 시간 유지하세요.' },
            { name: '상체 회전', duration: 40, description: '양팔을 펼쳐 상체를 좌우로 비틉니다.', tip: '하체는 고정하세요.' }
        ],
        '클리어 위주': [
            { name: '팔 민첩성', duration: 30, description: '양팔을 빠르게 위아래로 움직입니다.', tip: '리듬감 있게 진행하세요.' },
            { name: '어깨 후면', duration: 40, description: '팔을 교차하여 어깨 뒤를 스트레칭합니다.', tip: '부드럽게 압박을 유지하세요.' },
            { name: '다리 유연성', duration: 40, description: '양다리를 넓게 벌려 옆으로 흔듭니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '허리 안정화', duration: 40, description: '허리를 안정화시키는 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '전신 활성화', duration: 40, description: '전신을 동적으로 스트레칭합니다.', tip: '에너지 있게 진행하세요.' }
        ],
        '상체 근력 훈련': [
            { name: '손목 유연성', duration: 30, description: '손목을 전후좌우로 스트레칭합니다.', tip: '각 방향 15초씩 진행하세요.' },
            { name: '팔 전체', duration: 40, description: '팔 전체를 스트레칭합니다.', tip: '천천히 움직여주세요.' },
            { name: '삼각근 심화', duration: 40, description: '팔을 교차하여 삼각근 깊숙이를 스트레칭합니다.', tip: '호흡을 유지하세요.' },
            { name: '가슴 열기', duration: 40, description: '양팔을 뒤로 연결하고 가슴을 펼칩니다.', tip: '무리하지 않게 부드럽게 진행하세요.' },
            { name: '상체 마무리', duration: 40, description: '상체 전체를 이완하는 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ],
        '기타': [
            { name: '손목 준비', duration: 30, description: '배드민턴의 기본 손목 스트레칭입니다.', tip: '모든 방향을 균등하게 진행하세요.' },
            { name: '팔 기본', duration: 40, description: '팔의 기본 스트레칭입니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '어깨 & 팔', duration: 40, description: '어깨와 팔을 함께 스트레칭합니다.', tip: '통증이 느껴지면 멈추세요.' },
            { name: '다리 기본', duration: 40, description: '다리의 기본 스트레칭입니다.', tip: '부드러운 동작을 유지하세요.' },
            { name: '마무리 이완', duration: 40, description: '경기 후 이완 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ]
    },
    '수영': {
        '자유형': [
            { name: '어깨 회전', duration: 30, description: '양쪽 어깨를 원형으로 크게 돌립니다.', tip: '앞뒤로 천천히 움직여주세요.' },
            { name: '팔 스트레칭', duration: 40, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '양팔 모두 균등하게 진행하세요.' },
            { name: '삼각근 스트레칭', duration: 40, description: '팔을 교차하여 어깨 뒤를 스트레칭합니다.', tip: '부드럽게 압박을 유지하세요.' },
            { name: '다리 준비', duration: 40, description: '발목과 고관절을 준비하는 스트레칭입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '고관절 유연성', duration: 40, description: '고관절을 여러 방향으로 움직입니다.', tip: '큰 범위로 진행하세요.' }
        ],
        '배영': [
            { name: '등 스트레칭', duration: 30, description: '양팔을 앞으로 모아 등의 상부를 스트레칭합니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '가슴 열기', duration: 40, description: '양팔을 뒤로 연결하고 가슴을 펼칩니다.', tip: '척추를 곧게 펴세요.' },
            { name: '어깨 후면', duration: 40, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '어깨가 들어올려지지 않도록 하세요.' },
            { name: '팔 유연성', duration: 40, description: '양팔을 여러 방향으로 스트레칭합니다.', tip: '천천히 움직여주세요.' },
            { name: '척추 안정화', duration: 40, description: '누워 양쪽 무릎을 한쪽으로 넘깁니다.', tip: '양쪽을 균등하게 스트레칭하세요.' }
        ],
        '평영': [
            { name: '고관절 개방', duration: 30, description: '바닥에 앉아 양쪽 발바닥을 맞춘 후 무릎을 아래로 누릅니다.', tip: '골반을 중립으로 유지하세요.' },
            { name: '가슴 스트레칭', duration: 40, description: '양팔을 뒤로 깍지끼고 가슴을 펼칩니다.', tip: '척추를 곧게 펴세요.' },
            { name: '팔 앞쪽', duration: 40, description: '한쪽 팔을 머리 위로 올려 팔 안쪽을 스트레칭합니다.', tip: '척추가 기울어지지 않도록 하세요.' },
            { name: '다리 유연성', duration: 40, description: '양다리를 넓게 벌려 옆으로 흔듭니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '전신 이완', duration: 40, description: '심호흡하며 전신을 편안하게 이완합니다.', tip: '깊은 호흡을 유지하세요.' }
        ],
        '접영': [
            { name: '어깨 스트레칭', duration: 30, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '양팔 모두 진행하세요.' },
            { name: '팔 전체', duration: 40, description: '양팔을 위로 올려 옆으로 스트레칭합니다.', tip: '척추를 곧게 유지하세요.' },
            { name: '복부 스트레칭', duration: 40, description: '누워 양팔을 위로 뻗습니다.', tip: '목이 과도하게 구부러지지 않도록 하세요.' },
            { name: '회전근개', duration: 40, description: '팔을 뒤로 교차하여 어깨 후면을 깊게 스트레칭합니다.', tip: '호흡을 유지하세요.' },
            { name: '가슴 열기', duration: 40, description: '양팔을 뒤로 연결하고 가슴을 펼칩니다.', tip: '무리하지 않게 부드럽게 진행하세요.' }
        ],
        '기타': [
            { name: '전신 준비', duration: 30, description: '수영의 기본 전신 준비 스트레칭입니다.', tip: '천천히 시작하세요.' },
            { name: '어깨 기본', duration: 40, description: '어깨의 기본 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '팔 기본', duration: 40, description: '팔의 기본 스트레칭입니다.', tip: '무리하지 마세요.' },
            { name: '다리 기본', duration: 40, description: '다리의 기본 스트레칭입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '마무리 이완', duration: 40, description: '수영 후 전신 이완 스트레칭입니다.', tip: '편안한 자세를 유지하세요.' }
        ]
    },
    '등산': {
        '가벼운 등산': [
            { name: '발목 준비', duration: 30, description: '발목을 원형으로 크게 움직입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '벽에 손을 대고 종아리를 스트레칭합니다.', tip: '발뒤꿈치가 바닥에 붙도록 하세요.' },
            { name: '고관절 준비', duration: 40, description: '양쪽 무릎을 구부리고 발바닥을 맞춘 후 무릎을 아래로 누릅니다.', tip: '골반을 곧게 세우세요.' },
            { name: '허리 안정화', duration: 40, description: '허리를 안정화시키는 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '어깨 준비', duration: 40, description: '양쪽 어깨를 원형으로 크게 돌립니다.', tip: '앞뒤로 천천히 움직여주세요.' }
        ],
        '중급 난이도': [
            { name: '발목 집중', duration: 30, description: '발목 전체를 강화하는 스트레칭입니다.', tip: '천천히 진행하세요.' },
            { name: '종아리 심화', duration: 40, description: '계단에서 발뒤꿈치를 아래로 내려 스트레칭합니다.', tip: '안전을 위해 손잡이를 잡으세요.' },
            { name: '대퇴사두근 심화', duration: 40, description: '한쪽 무릎을 구부려 대퇴사두근을 깊게 스트레칭합니다.', tip: '무리하지 마세요.' },
            { name: '둔부 & 고관절', duration: 40, description: '둔부와 고관절을 함께 스트레칭합니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '허리 회전', duration: 40, description: '앉아서 허리를 좌우로 부드럽게 비틉니다.', tip: '과하게 회전하지 마세요.' }
        ],
        '고급 난이도': [
            { name: '발목 고급', duration: 30, description: '발목의 고급 유연성 스트레칭입니다.', tip: '느린 속도로 진행하세요.' },
            { name: '종아리 고급', duration: 40, description: '여러 방식의 종아리 깊은 스트레칭입니다.', tip: '양쪽을 같은 시간 유지하세요.' },
            { name: '대퇴 전체 강화', duration: 40, description: '다리 앞뒤 전체를 강화하는 스트레칭입니다.', tip: '통증이 느껴지면 멈추세요.' },
            { name: '고관절 완전 개방', duration: 40, description: '고관절을 최대한 개방하는 스트레칭입니다.', tip: '부드러운 동작을 유지하세요.' },
            { name: '척추 유연성', duration: 40, description: '척추의 유연성을 높이는 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ],
        '정상 공략': [
            { name: '전신 활성화', duration: 30, description: '정상 도달을 위한 전신 활성화 스트레칭입니다.', tip: '에너지 있게 진행하세요.' },
            { name: '다리 강화', duration: 40, description: '다리의 전체 근육을 강화하는 스트레칭입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '코어 안정화', duration: 40, description: '코어 근육을 안정화시키는 스트레칭입니다.', tip: '무리하지 마세요.' },
            { name: '어깨 & 등', duration: 40, description: '어깨와 등을 함께 스트레칭합니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '전신 준비', duration: 40, description: '정상 도달 준비의 최종 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' }
        ],
        '기타': [
            { name: '등산 기본 준비', duration: 30, description: '등산의 기본 준비 스트레칭입니다.', tip: '천천히 시작하세요.' },
            { name: '다리 기본', duration: 40, description: '다리의 기본 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '고관절 기본', duration: 40, description: '고관절의 기본 스트레칭입니다.', tip: '무리하지 마세요.' },
            { name: '허리 기본', duration: 40, description: '허리의 기본 스트레칭입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '마무리 이완', duration: 40, description: '등산 후 전신 이완 스트레칭입니다.', tip: '편안한 자세를 유지하세요.' }
        ]
    },
    '테니스': {
        '풀 경기': [
            { name: '손목 회전', duration: 30, description: '양쪽 손목을 원형으로 돌립니다.', tip: '시계방향과 반시계방향 모두 진행하세요.' },
            { name: '팔 스트레칭', duration: 40, description: '한쪽 팔을 가슴 앞으로 당깁니다.', tip: '어깨가 들어올려지지 않도록 하세요.' },
            { name: '어깨 스트레칭', duration: 40, description: '양팔을 뒤로 연결하고 가슴을 펼칩니다.', tip: '무리하지 않게 부드럽게 진행하세요.' },
            { name: '허리 회전', duration: 40, description: '서서 허리를 좌우로 비틉니다.', tip: '하체는 고정하고 상체만 비틀어주세요.' },
            { name: '다리 스트레칭', duration: 40, description: '한쪽 다리를 앞으로 내딛어 스트레칭합니다.', tip: '균형을 잡기 위해 벽을 이용하세요.' }
        ],
        '서브 연습': [
            { name: '손목 강화', duration: 30, description: '손목을 여러 방향으로 움직입니다.', tip: '천천히 가동범위를 확대하세요.' },
            { name: '팔 앞쪽 스트레칭', duration: 40, description: '한쪽 팔을 머리 위로 올려 팔 안쪽을 스트레칭합니다.', tip: '척추가 기울어지지 않도록 하세요.' },
            { name: '어깨 후면', duration: 40, description: '팔을 교차하여 어깨 뒤를 스트레칭합니다.', tip: '부드럽게 압박을 유지하세요.' },
            { name: '삼각근 스트레칭', duration: 40, description: '팔을 안쪽으로 당겨 삼각근을 스트레칭합니다.', tip: '호흡을 깊게 하세요.' },
            { name: '전신 이완', duration: 40, description: '양팔을 들어 기지개를 켭니다.', tip: '천천히 시간을 가지세요.' }
        ],
        '포핸드/백핸드': [
            { name: '손목 유연성', duration: 30, description: '손목을 전후좌우로 스트레칭합니다.', tip: '각 방향 15초씩 진행하세요.' },
            { name: '전완근 스트레칭', duration: 40, description: '손가락을 뒤로 꺾어 전완근을 스트레칭합니다.', tip: '양쪽 모두 진행하세요.' },
            { name: '이두근 & 삼두근', duration: 40, description: '팔을 여러 방향으로 스트레칭합니다.', tip: '천천히 움직여주세요.' },
            { name: '어깨 전체', duration: 40, description: '어깨를 여러 각도로 스트레칭합니다.', tip: '무리하지 않게 진행하세요.' },
            { name: '상체 이완', duration: 40, description: '허리를 비틀며 상체를 이완합니다.', tip: '양쪽을 균등하게 진행하세요.' }
        ],
        '상체 근력 훈련': [
            { name: '손목 강화 스트레칭', duration: 30, description: '손목의 세 방향을 모두 스트레칭합니다.', tip: '느린 속도로 진행하세요.' },
            { name: '전완근 심화', duration: 40, description: '손바닥을 위아래로 향하게 하여 스트레칭합니다.', tip: '양팔을 같은 시간 유지하세요.' },
            { name: '상완이두근', duration: 40, description: '팔을 뒤로 구부려 이두근을 스트레칭합니다.', tip: '척추가 기울어지지 않도록 하세요.' },
            { name: '삼각근 심화', duration: 40, description: '팔을 교차하여 삼각근 깊숙이를 스트레칭합니다.', tip: '호흡을 유지하세요.' },
            { name: '상체 마무리', duration: 40, description: '양팔을 올려 전신을 이완합니다.', tip: '깊은 호흡과 함께하세요.' }
        ],
        '기타': [
            { name: '손목 준비', duration: 30, description: '손목의 기본적인 스트레칭입니다.', tip: '모든 방향을 균등하게 진행하세요.' },
            { name: '팔 전체', duration: 40, description: '팔 전체를 스트레칭합니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '어깨 & 팔', duration: 40, description: '어깨와 팔을 함께 스트레칭합니다.', tip: '통증이 느껴지면 멈추세요.' },
            { name: '가슴 열기', duration: 40, description: '가슴을 펼치는 스트레칭입니다.', tip: '부드러운 동작을 유지하세요.' },
            { name: '상체 마무리', duration: 40, description: '상체 전체를 이완하는 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ]
    },
    '러닝': {
        '장거리 러닝': [
            { name: '발목 준비', duration: 30, description: '발목을 원형으로 크게 움직입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '벽에 손을 대고 종아리를 스트레칭합니다.', tip: '발뒤꿈치가 바닥에 붙도록 하세요.' },
            { name: '햄스트링', duration: 40, description: '앉아 한쪽 다리를 펴고 앞으로 숙입니다.', tip: '무릎을 완전히 펴세요.' },
            { name: '대퇴사두근', duration: 40, description: '서서 한쪽 다리를 뒤로 당깁니다.', tip: '골반이 기울어지지 않도록 하세요.' },
            { name: '고관절 스트레칭', duration: 40, description: '누워 한쪽 무릎을 가슴으로 당깁니다.', tip: '등이 바닥에서 떨어지지 않도록 하세요.' }
        ],
        '단거리 스프린트': [
            { name: '발목 강화', duration: 30, description: '발목을 작은 원형으로 움직입니다.', tip: '빠르게 에너지를 모으세요.' },
            { name: '종아리 복합', duration: 40, description: '양쪽 다리의 종아리를 연속으로 스트레칭합니다.', tip: '리듬감 있게 진행하세요.' },
            { name: '대퇴 전체', duration: 40, description: '다리 앞뒤를 모두 스트레칭합니다.', tip: '동적인 움직임을 유지하세요.' },
            { name: '골반 유연성', duration: 40, description: '골반을 여러 방향으로 움직입니다.', tip: '큰 범위로 진행하세요.' },
            { name: '전신 활성화', duration: 40, description: '전신을 동적으로 스트레칭합니다.', tip: '에너지 있게 진행하세요.' }
        ],
        '언덕 러닝': [
            { name: '발목 집중', duration: 30, description: '발목 전체를 강화하는 스트레칭입니다.', tip: '천천히 진행하세요.' },
            { name: '종아리 심화', duration: 40, description: '계단에서 발뒤꿈치를 아래로 내려 스트레칭합니다.', tip: '안전을 위해 손잡이를 잡으세요.' },
            { name: '대퇴사두근 심화', duration: 40, description: '한쪽 무릎을 구부려 대퇴사두근을 깊게 스트레칭합니다.', tip: '무리하지 마세요.' },
            { name: '둔부 & 고관절', duration: 40, description: '둔부와 고관절을 함께 스트레칭합니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '허리 안정화', duration: 40, description: '허리를 안정화시키는 스트레칭입니다.', tip: '깊은 호흡을 유지하세요.' }
        ],
        '트레드밀': [
            { name: '발목 준비', duration: 30, description: '트레드밀에서의 발목 스트레칭입니다.', tip: '균형 있게 진행하세요.' },
            { name: '종아리 & 발', duration: 40, description: '종아리와 발을 함께 스트레칭합니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '다리 전체', duration: 40, description: '다리 전체를 스트레칭합니다.', tip: '통증이 느껴지면 멈추세요.' },
            { name: '허리 & 둔부', duration: 40, description: '허리와 둔부를 함께 스트레칭합니다.', tip: '부드러운 동작을 유지하세요.' },
            { name: '전신 이완', duration: 40, description: '전신을 이완하는 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ],
        '기타': [
            { name: '기본 발목', duration: 30, description: '기본적인 발목 스트레칭입니다.', tip: '모든 방향을 균등하게 진행하세요.' },
            { name: '종아리 & 발 기본', duration: 40, description: '종아리와 발의 기본 스트레칭입니다.', tip: '천천히 진행하세요.' },
            { name: '다리 기본', duration: 40, description: '다리의 기본 스트레칭입니다.', tip: '리드미컬하게 진행하세요.' },
            { name: '허리 기본', duration: 40, description: '허리의 기본 스트레칭입니다.', tip: '부드러운 동작을 유지하세요.' },
            { name: '마무리', duration: 40, description: '전신을 이완하는 마무리 스트레칭입니다.', tip: '깊은 호흡과 함께하세요.' }
        ]
    },
    '웨이트': {
        '상체 운동': [
            { name: '어깨 회전', duration: 30, description: '어깨를 천천히 앞뒤로 회전시킵니다.', tip: '큰 동작으로 움직여주세요.' },
            { name: '가슴 스트레칭', duration: 40, description: '양팔을 뒤로 깍지끼고 가슴을 펼칩니다.', tip: '척추를 곧게 펴세요.' },
            { name: '삼두근 스트레칭', duration: 40, description: '한팔을 뒤로 구부려 반대쪽 손으로 팔꿈치를 잡습니다.', tip: '양팔 모두 진행하세요.' },
            { name: '이두근 스트레칭', duration: 40, description: '양팔을 앞으로 모아 가슴을 향해 당깁니다.', tip: '호흡을 유지하세요.' },
            { name: '어깨 이완', duration: 40, description: '목을 천천히 한쪽으로 기울입니다.', tip: '무리한 압박은 피하세요.' }
        ],
        '하체 운동': [
            { name: '발목 회전', duration: 30, description: '한 발씩 발목을 원형으로 돌립니다.', tip: '큰 동작으로 천천히 돌려주세요.' },
            { name: '종아리 스트레칭', duration: 40, description: '벽에 손을 대고 한쪽 다리를 뒤로 뻗어 종아리를 스트레칭합니다.', tip: '발뒤꿈치가 떨어지지 않도록 하세요.' },
            { name: '대퇴사두근 스트레칭', duration: 40, description: '서서 한쪽 다리를 뒤로 구부려 발목을 잡습니다.', tip: '골반이 기울어지지 않도록 주의하세요.' },
            { name: '햄스트링 스트레칭', duration: 40, description: '앉아서 한쪽 다리를 펴고 앞으로 숙입니다.', tip: '무릎을 완전히 펴세요.' },
            { name: '고관절 스트레칭', duration: 40, description: '누워 한쪽 무릎을 가슴으로 당깁니다.', tip: '등이 바닥에 붙어있도록 하세요.' }
        ],
        '전신 운동': [
            { name: '목 스트레칭', duration: 30, description: '목을 천천히 좌우로 기울입니다.', tip: '무리한 압박은 피하세요.' },
            { name: '어깨 & 등', duration: 40, description: '양팔을 앞으로 모아 등의 상부를 스트레칭합니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '허리 비틀기', duration: 40, description: '앉아서 허리를 좌우로 부드럽게 비틉니다.', tip: '과하게 회전하지 마세요.' },
            { name: '다리 스트레칭', duration: 40, description: '누워 양쪽 무릎을 한쪽으로 넘깁니다.', tip: '양쪽을 균등하게 스트레칭하세요.' },
            { name: '전신 이완', duration: 40, description: '누워 심호흡하며 전신을 이완합니다.', tip: '편안한 자세를 유지하세요.' }
        ],
        '근력 훈련': [
            { name: '어깨 관절 가동성', duration: 30, description: '팔을 원형으로 크게 회전시킵니다.', tip: '앞뒤로 천천히 움직여주세요.' },
            { name: '팔 전체 스트레칭', duration: 40, description: '양팔을 위로 올려 옆으로 스트레칭합니다.', tip: '척추를 곧게 유지하세요.' },
            { name: '복부 스트레칭', duration: 40, description: '누워 양팔을 위로 뻗습니다.', tip: '목이 과도하게 구부러지지 않도록 하세요.' },
            { name: '고관절 유연성', duration: 40, description: '바닥에 앉아 양쪽 발바닥을 맞춥니다.', tip: '골반을 중립으로 유지하세요.' },
            { name: '종아리 강화', duration: 40, description: '한쪽 다리를 들어 종아리 근육을 스트레칭합니다.', tip: '균형을 잡기 위해 손을 사용하세요.' }
        ],
        '기타': [
            { name: '전신 준비 스트레칭', duration: 30, description: '기본적인 동적 스트레칭을 진행합니다.', tip: '천천히 시작하세요.' },
            { name: '유연성 향상', duration: 40, description: '신체의 주요 부위를 스트레칭합니다.', tip: '깊은 호흡을 유지하세요.' },
            { name: '근력 보조 스트레칭', duration: 40, description: '근력 운동 후 근육을 이완시킵니다.', tip: '무리하지 마세요.' },
            { name: '관절 안정성', duration: 40, description: '모든 주요 관절을 천천히 움직입니다.', tip: '양쪽을 균등하게 진행하세요.' },
            { name: '마무리 이완', duration: 40, description: '운동을 마무리하는 이완 스트레칭입니다.', tip: '편안한 자세를 유지하세요.' }
        ]
    }
};

// 스포츠별 스트레칭 기본값 설정 (데이터가 없는 경우)
const defaultStretchingRoutine = [
    { name: '기본 스트레칭 1', duration: 30, description: '기본적인 동적 스트레칭입니다.', tip: '천천히 시작하세요.' },
    { name: '기본 스트레칭 2', duration: 40, description: '신체의 주요 부위를 스트레칭합니다.', tip: '깊은 호흡을 유지하세요.' },
    { name: '기본 스트레칭 3', duration: 40, description: '유연성 향상 스트레칭입니다.', tip: '무리하지 마세요.' },
    { name: '기본 스트레칭 4', duration: 40, description: '근력 강화 스트레칭입니다.', tip: '양쪽을 균등하게 진행하세요.' },
    { name: '기본 스트레칭 5', duration: 40, description: '이완 스트레칭입니다.', tip: '편안한 자세를 유지하세요.' }
];
