export interface Word {
  id: string;
  emoji: string;
  korean: string;
  english: string;
}

export interface Category {
  id: string;
  words: Word[];
}

// Romanization types
export type RomanizationType = 'revised' | 'yale' | 'mcr';

export const categories: Category[] = [
  // {
    // id: 'beginner',
    // words: [
    //   // TODO
    // ],
  // },
  {
    id: 'animals',
    words: [
      { id: 'dog', emoji: '🐕', korean: '개', english: 'dog' },
      { id: 'cat', emoji: '🐱', korean: '고양이', english: 'cat' },
      { id: 'black_cat', emoji: '🐈‍⬛', korean: '검은 고양이', english: 'black cat' },
      { id: 'mouse', emoji: '🐭', korean: '쥐', english: 'mouse' },
      { id: 'rat', emoji: '🐀', korean: '쥐', english: 'rat' },
      { id: 'hamster', emoji: '🐹', korean: '햄스터', english: 'hamster' },
      { id: 'rabbit', emoji: '🐇', korean: '토끼', english: 'rabbit' },
      { id: 'fox', emoji: '🦊', korean: '여우', english: 'fox' },
      { id: 'bear', emoji: '🐻', korean: '곰', english: 'bear' },
      { id: 'polar_bear', emoji: '🐻‍❄️', korean: '북극곰', english: 'polar bear' },
      { id: 'panda', emoji: '🐼', korean: '판다', english: 'panda' },
      { id: 'koala', emoji: '🐨', korean: '코알라', english: 'koala' },
      { id: 'tiger', emoji: '🐯' /* '🐅' */, korean: '호랑이', english: 'tiger' },
      { id: 'lion', emoji: '🦁', korean: '사자', english: 'lion' },
      { id: 'cow', emoji: '🐄', korean: '소', english: 'cow' },
      { id: 'ox', emoji: '🐂', korean: '황소', english: 'ox' },
      { id: 'water_buffalo', emoji: '🐃', korean: '물소', english: 'water buffalo' },
      { id: 'pig', emoji: '🐖', korean: '돼지', english: 'pig' },
      { id: 'boar', emoji: '🐗', korean: '멧돼지', english: 'boar' },
      { id: 'monkey', emoji: '🐒', korean: '원숭이', english: 'monkey' },
      { id: 'gorilla', emoji: '🦍', korean: '고릴라', english: 'gorilla' },
      { id: 'orangutan', emoji: '🦧', korean: '오랑우탄', english: 'orangutan' },
      { id: 'chicken', emoji: '🐔', korean: '닭', english: 'chicken' },
      { id: 'rooster', emoji: '🐓', korean: '수탉', english: 'rooster' },
      { id: 'baby_chick', emoji: '🐣', korean: '병아리', english: 'baby chick' },
      { id: 'bird', emoji: '🐦', korean: '새', english: 'bird' },
      { id: 'penguin', emoji: '🐧', korean: '펭귄', english: 'penguin' },
      { id: 'dove', emoji: '🕊️', korean: '비둘기', english: 'dove' },
      { id: 'eagle', emoji: '🦅', korean: '독수리', english: 'eagle' },
      { id: 'duck', emoji: '🦆', korean: '오리', english: 'duck' },
      { id: 'swan', emoji: '🦢', korean: '백조', english: 'swan' },
      { id: 'owl', emoji: '🦉', korean: '부엉이', english: 'owl' },
      { id: 'peacock', emoji: '🦚', korean: '공작', english: 'peacock' },
      { id: 'flamingo', emoji: '🦩', korean: '홍학', english: 'flamingo' },
      { id: 'bat', emoji: '🦇', korean: '박쥐', english: 'bat' },
      { id: 'shark', emoji: '🦈', korean: '상어', english: 'shark' },
      { id: 'dolphin', emoji: '🐬', korean: '돌고래', english: 'dolphin' },
      { id: 'whale', emoji: '🐋', korean: '고래', english: 'whale' },
      { id: 'fish', emoji: '🐟', korean: '물고기', english: 'fish' },
      { id: 'tropical_fish', emoji: '🐠', korean: '열대어', english: 'tropical fish' },
      { id: 'blowfish', emoji: '🐡', korean: '복어', english: 'blowfish' },
      { id: 'octopus', emoji: '🐙', korean: '문어', english: 'octopus' },
      { id: 'shell', emoji: '🐚', korean: '조개껍데기', english: 'shell' },
      { id: 'snail', emoji: '🐌', korean: '달팽이', english: 'snail' },
      { id: 'butterfly', emoji: '🦋', korean: '나비', english: 'butterfly' },
      { id: 'catepillar', emoji: '🐛', korean: '애벌레', english: 'catepillar' },
      { id: 'ant', emoji: '🐜', korean: '개미', english: 'ant' },
      { id: 'bee', emoji: '🐝', korean: '벌', english: 'bee' },
      { id: 'beetle', emoji: '🪲', korean: '딱정벌레', english: 'beetle' },
      { id: 'lady_beetle', emoji: '🐞', korean: '무당벌레', english: 'lady beetle' },
      { id: 'spider', emoji: '🕷️', korean: '거미', english: 'spider' },
      { id: 'scorpion', emoji: '🦂', korean: '전갈', english: 'scorpion' },
      { id: 'crab', emoji: '🦀', korean: '게', english: 'crab' },
      { id: 'lobster', emoji: '🦞', korean: '랍스터', english: 'lobster' },
      { id: 'shrimp', emoji: '🦐', korean: '새우', english: 'shrimp' },
      { id: 'squid', emoji: '🦑', korean: '오징어', english: 'squid' }
    ]
  },
  {
    id: 'jobs',
    words: [
      { id: 'doctor', emoji: '🧑‍⚕️', korean: '의사', english: 'doctor' },
      { id: 'teacher', emoji: '🧑‍🏫', korean: '교사', english: 'teacher' },
      { id: 'scientist', emoji: '🧑‍🔬', korean: '과학자', english: 'scientist' },
      { id: 'artist', emoji: '🧑‍🎨', korean: '예술가', english: 'artist' },
      { id: 'chef', emoji: '🧑‍🍳', korean: '요리사', english: 'chef' },
      { id: 'engineer', emoji: '🧑‍💻', korean: '엔지니어', english: 'engineer' },
      { id: 'firefighter', emoji: '🧑‍🚒', korean: '소방관', english: 'firefighter' },
      { id: 'pilot', emoji: '🧑‍✈️', korean: '조종사', english: 'pilot' },
      { id: 'police_officer', emoji: '🧑‍⚖️', korean: '경찰관', english: 'police officer' },
      { id: 'judge', emoji: '🧑‍⚖️', korean: '판사', english: 'judge' },
      { id: 'farmer', emoji: '🧑‍🌾', korean: '농부', english: 'farmer' },
      { id: 'mechanic', emoji: '🧑‍🔧', korean: '기술자', english: 'mechanic' },
      { id: 'student', emoji: '🧑‍🎓', korean: '학생', english: 'student' },
      { id: 'astronaut', emoji: '🧑‍🚀', korean: '우주비행사', english: 'astronaut' },
      { id: 'singer', emoji: '🧑‍🎤', korean: '가수', english: 'singer' },
      { id: 'detective', emoji: '🕵️', korean: '탐정', english: 'detective' },
      { id: 'construction_worker', emoji: '👷', korean: '건설 노동자', english: 'construction worker' },
      { id: 'factory_worker', emoji: '🧑‍🏭', korean: '공장 노동자', english: 'factory worker' },
      { id: 'office_worker', emoji: '🧑‍💼', korean: '사무원', english: 'office worker' },
      { id: 'caretaker', emoji: '🧑‍🍼', korean: '돌보미', english: 'caretaker' },
      { id: 'dancer', emoji: '💃', korean: '댄서', english: 'dancer' },
      { id: 'soldier', emoji: '🪖', korean: '군인', english: 'soldier' },
      { id: 'business_person', emoji: '👨‍💼', korean: '비즈니스맨', english: 'business person' }
    ]
  },
  {
    id: 'colors',
    words: [
      { id: 'blue', emoji: '🔵', korean: '파란색', english: 'blue' },
      { id: 'green', emoji: '💚', korean: '초록색', english: 'green' },
      { id: 'yellow', emoji: '💛', korean: '노란색', english: 'yellow' },
      { id: 'red', emoji: '❤️', korean: '빨간색', english: 'red' },
      { id: 'purple', emoji: '💜', korean: '보라색', english: 'purple' },
      { id: 'brown', emoji: '🟫', korean: '갈색', english: 'brown' },
      { id: 'pink', emoji: '💗', korean: '분홍색', english: 'pink' },
      { id: 'orange', emoji: '🟧', korean: '주황색', english: 'orange' },
      { id: 'black', emoji: '⚫', korean: '검정색', english: 'black' },
      { id: 'white', emoji: '⚪', korean: '흰색' /* 하얀색 */, english: 'white' }
    ]
  },
  {
    id: 'foods',
    words: [
      { id: 'orange', emoji: '🍊', korean: '귤', english: 'orange' },
      { id: 'honey', emoji: '🍯', korean: '꿀', english: 'honey' },
      { id: 'water', emoji: '💧', korean: '물', english: 'water' },
      { id: 'chestnut', emoji: '🌰', korean: '밤', english: 'chestnut' },
      { id: 'pear', emoji: '🍐', korean: '배', english: 'pear' },
      { id: 'bread', emoji: '🍞', korean: '빵', english: 'bread' },
      { id: 'rice', emoji: '🍚', korean: '쌀', english: 'rice' },
      { id: 'french_fries', emoji: '🍟', korean: '칩', english: 'french fries' },
      { id: 'cupcake', emoji: '🧁', korean: '컵 케이크', english: 'cupcake' },
      { id: 'eggplant', emoji: '🍆', korean: '가지', english: 'eggplant' },
      { id: 'potato', emoji: '🥔', korean: '감자', english: 'potato' },
      { id: 'dango', emoji: '🍡', korean: '경단', english: 'dango' },
      { id: 'meat', emoji: '🍖', korean: '고기', english: 'meat' },
      { id: 'chili', emoji: '🌶️', korean: '고추', english: 'chili' },
      { id: 'ramen', emoji: '🍜', korean: '국수', english: 'ramen' },
      { id: 'green_tea', emoji: '🍵', korean: '녹차', english: 'green tea' },
      { id: 'egg', emoji: '🥚', korean: '달걀' /* 계란 */, english: 'egg' },
      { id: 'carrot', emoji: '🥕', korean: '당근', english: 'carrot' },
      { id: 'doughnut', emoji: '🍩', korean: '도넛', english: 'doughnut' },
      { id: 'strawberry', emoji: '🍓', korean: '딸기', english: 'strawberry' },
      { id: 'peanut', emoji: '🥜', korean: '땅콩', english: 'peanut' },
      { id: 'lemon', emoji: '🍋', korean: '레몬', english: 'lemon' },
      { id: 'garlic', emoji: '🧄', korean: '마늘', english: 'garlic' },
      { id: 'dumpling', emoji: '🥟', korean: '만두', english: 'dumpling' },
      { id: 'mango', emoji: '🥭', korean: '망고', english: 'mango' },
      { id: 'mushroom', emoji: '🍄', korean: '버섯', english: 'mushroom' },
      { id: 'butter', emoji: '🧈', korean: '버터', english: 'butter' },
      { id: 'shaved_ice', emoji: '🍧', korean: '빙수', english: 'shaved ice' },
      { id: 'apple', emoji: '🍎', korean: '사과', english: 'apple' },
      { id: 'candy', emoji: '🍬', korean: '사탕', english: 'candy' },
      { id: 'peach', emoji: '🍑', korean: '살구', english: 'peach' },
      { id: 'lettuce', emoji: '🥬', korean: '상추', english: 'lettuce' },
      { id: 'salt', emoji: '🧂', korean: '소금', english: 'salt' },
      { id: 'watermelon', emoji: '🍉', korean: '수박', english: 'watermelon' },
      { id: 'onion', emoji: '🧅', korean: '양파', english: 'onion' },
      { id: 'oden', emoji: '🍢', korean: '오뎅', english: 'oden' },
      { id: 'cucumber', emoji: '🥒', korean: '오이', english: 'cucumber' },
      { id: 'waffle', emoji: '🧇', korean: '와플', english: 'waffle' },
      { id: 'mooncake', emoji: '🥮', korean: '월병', english: 'mooncake' },
      { id: "juice", korean: "주스", emoji: "🧃", english: "juice" },
      { id: "cherries", korean: "체리", emoji: "🍒", english: "cherries" },
      { id: "sushi", korean: "초밥", emoji: "🍣", english: "sushi" },
      { id: "cheese", korean: "치즈", emoji: "🧀", english: "cheese" },
      { id: "curry", korean: "커리", emoji: "🍛", english: "curry and rice" },
      { id: "coffee", korean: "커피", emoji: "☕", english: "coffee" },
      { id: "gyro", korean: "케밥", emoji: "🥙", english: "gyro" },
      { id: "cake", korean: "케익", emoji: "🍰", english: "cake" },
      { id: "cookie", korean: "쿠키", emoji: "🍪", english: "cookie" },
      { id: "kiwi", korean: "키위", emoji: "🥝", english: "kiwi" },
      { id: "taco", korean: "타코", emoji: "🌮", english: "taco" },
      { id: "popcorn", korean: "팝콘", emoji: "🍿", english: "popcorn" },
      { id: "grapes", korean: "포도", emoji: "🍇", english: "grapes" },
      { id: "pizza", korean: "피자", emoji: "🍕", english: "pizza" },
      { id: "yam", korean: "고구마", emoji: "🍠", english: "yam" },
      { id: "chicken_leg", korean: "닭고기", emoji: "🍗", english: "chicken" },
      { id: "baguette", korean: "바게트", emoji: "🥖", english: "french bread" },
      { id: "banana", korean: "바나나", emoji: "🍌", english: "banana" },
      { id: "bubble_tea", korean: "버블티", emoji: "🧋", english: "bubble tea" },
      { id: "bagel", korean: "베이글", emoji: "🥯", english: "bagel" },
      { id: "bacon", korean: "베이컨", emoji: "🥓", english: "bacon" },
      { id: "burrito", korean: "부리토", emoji: "🌯", english: "burrito" },
      { id: "pretzel", korean: "브레첼", emoji: "🥨", english: "pretzel" },
      { id: "salad", korean: "샐러드", emoji: "🥗", english: "salad" },
      { id: "rice_cracker", korean: "쌀과자", emoji: "🍘", english: "rice cracker" },
      { id: "corn", korean: "옥수수", emoji: "🌽", english: "corn" },
      { id: "chocolate", korean: "초코렛", emoji: "🍫", english: "chocolate" },
      { id: "coconut", korean: "코코넛", emoji: "🥥", english: "coconut" },
      { id: "tomato", korean: "토마토", emoji: "🍅", english: "tomato" },
      { id: "falafel", korean: "팔라펠", emoji: "🧆", english: "falafel" },
      { id: "hot_dog", korean: "핫도그", emoji: "🌭", english: "hot dog" },
      { id: "hamburger", korean: "햄버거", emoji: "🍔", english: "hamburger" },
      { id: "lollipop", korean: "막대사탕", emoji: "🍭", english: "lollipop" },
      { id: "broccoli", korean: "브로콜리", emoji: "🥦", english: "broccoli" },
      { id: "blueberries", korean: "블루베리", emoji: "🫐", english: "blueberries" },
      { id: "fried_shrimp", korean: "새우튀김", emoji: "🍤", english: "fried shrimp" },
      { id: "sandwich", korean: "샌드위치", emoji: "🥪", english: "sandwich" },
      { id: "steak", korean: "스테이크", emoji: "🥩", english: "steak" },
      { id: "spaghetti", korean: "스파게티", emoji: "🍝", english: "spaghetti" },
      { id: "avocado", korean: "아보카도", emoji: "🥑", english: "avocado" },
      { id: "fish_cake", korean: "어육완자", emoji: "🍥", english: "fish cake" },
      { id: "rice_ball", korean: "오니기리", emoji: "🍙", english: "rice ball" },
      { id: "croissant", korean: "크로와상", emoji: "🥐", english: "croissant" },
      { id: "pineapple", korean: "파인애플", emoji: "🍍", english: "pineapple" },
      { id: "pancakes", korean: "펜케이크", emoji: "🥞", english: "pancakes" },
      { id: "fortune_cookie", korean: "포춘쿠키", emoji: "🥠", english: "fortune cookie" },
      { id: "fried_egg", korean: "달걀프라이", emoji: "🍳", english: "fried egg" },
      { id: "birthday_cake", korean: "생일케이크", emoji: "🎂", english: "birthday cake" },
      { id: "ice_cream", korean: "아이스크림", emoji: "🍨", english: "ice cream" }
    ]
  },
  {
    id: 'daily_routines',
    words: [
      { id: 'take_bath', emoji: '🛁', korean: '목욕하다', english: 'take a bath' },
      { id: 'eat_breakfast', emoji: '🍳', korean: '아침 식사를 하다', english: 'eat breakfast' },
      { id: 'brush_teeth', emoji: '🦷', korean: '이를 닦다', english: 'brush teeth' },
      { id: 'wake_up', emoji: '⏰', korean: '일어나다', english: 'wake up' },
      { id: 'go_to_bed', emoji: '🛏️', korean: '잠자러 가다', english: 'go to bed' },
      { id: 'eat_dinner', emoji: '🍽️', korean: '저녁 식사를 하다', english: 'eat dinner' },
      { id: 'eat_lunch', emoji: '🥪', korean: '점심 식사를 하다', english: 'eat lunch' },
      { id: 'go_home', emoji: '🏠', korean: '집에 가다', english: 'go home' },
      { id: 'go_to_school', emoji: '🏫', korean: '학교에 가다', english: 'go to school' }
    ]
  },
  {
    id: 'body_parts',
    words: [
      { id: 'eye', emoji: '👁️', korean: '눈', english: 'eye' },
      { id: 'nose', emoji: '👃', korean: '코', english: 'nose' },
      { id: 'mouth', emoji: '👄', korean: '입', english: 'mouth' },
      { id: 'ear', emoji: '👂', korean: '귀', english: 'ear' },
      { id: 'hand', emoji: '✋', korean: '손', english: 'hand' }
    ]
  },
  {
    id: 'emotions',
    words: [
      { id: 'happy', emoji: '😊', korean: '행복한', english: 'happy' },
      { id: 'sad', emoji: '😢', korean: '슬픈', english: 'sad' },
      { id: 'angry', emoji: '😠', korean: '화난', english: 'angry' },
      { id: 'tired', emoji: '😫', korean: '피곤한', english: 'tired' },
      { id: 'surprised', emoji: '😲', korean: '놀란', english: 'surprised' }
    ]
  },
  {
    id: 'weather',
    words: [
      { id: 'sunny', emoji: '☀️', korean: '맑은', english: 'sunny' },
      { id: 'rainy', emoji: '🌧️', korean: '비오는', english: 'rainy' },
      { id: 'snowy', emoji: '🌨️', korean: '눈오는', english: 'snowy' },
      { id: 'cloudy', emoji: '☁️', korean: '흐린', english: 'cloudy' },
      { id: 'windy', emoji: '🌪️', korean: '바람부는', english: 'windy' }
    ]
  },
  {
    id: 'family',
    words: [
      { id: 'mother', emoji: '👩', korean: '어머니', english: 'mother' },
      { id: 'father', emoji: '👨', korean: '아버지', english: 'father' },
      { id: 'sister', emoji: '👧', korean: '누나', english: 'sister' },
      { id: 'brother', emoji: '👦', korean: '형', english: 'brother' },
      { id: 'grandmother', emoji: '👵', korean: '할머니', english: 'grandmother' },
      { id: 'grandfather', emoji: '👴', korean: '할아버지', english: 'grandfather' }
    ]
  },
  {
    id: 'native_numbers',
    words: [
      { id: 'one', emoji: '1️⃣', korean: '하나', english: 'one' },
      { id: 'two', emoji: '2️⃣', korean: '둘', english: 'two' },
      { id: 'three', emoji: '3️⃣', korean: '셋', english: 'three' },
      { id: 'four', emoji: '4️⃣', korean: '넷', english: 'four' },
      { id: 'five', emoji: '5️⃣', korean: '다섯', english: 'five' },
      { id: 'six', emoji: '6️⃣', korean: '여섯', english: 'six' },
      { id: 'seven', emoji: '7️⃣', korean: '일곱', english: 'seven' },
      { id: 'eight', emoji: '8️⃣', korean: '여덟', english: 'eight' },
      { id: 'nine', emoji: '9️⃣', korean: '아홉', english: 'nine' },
      { id: 'ten', emoji: '🔟', korean: '열', english: 'ten' }
    ]
  },
  {
    id: 'sino_numbers',
    words: [
      { id: 'one', emoji: '1️⃣', korean: '일', english: 'one' },
      { id: 'two', emoji: '2️⃣', korean: '이', english: 'two' },
      { id: 'three', emoji: '3️⃣', korean: '삼', english: 'three' },
      { id: 'four', emoji: '4️⃣', korean: '사', english: 'four' },
      { id: 'five', emoji: '5️⃣', korean: '오', english: 'five' },
      { id: 'six', emoji: '6️⃣', korean: '육', english: 'six' },
      { id: 'seven', emoji: '7️⃣', korean: '칠', english: 'seven' },
      { id: 'eight', emoji: '8️⃣', korean: '발', english: 'eight' },
      { id: 'nine', emoji: '9️⃣', korean: '구', english: 'nine' },
      { id: 'ten', emoji: '🔟', korean: '십', english: 'ten' }
    ]
  },
  {
    id: 'transportation',
    words: [
      { id: 'car', emoji: '🚗', korean: '자동차', english: 'car' },
      { id: 'bus', emoji: '🚌', korean: '버스', english: 'bus' },
      { id: 'train', emoji: '🚂', korean: '기차', english: 'train' },
      { id: 'airplane', emoji: '✈️', korean: '비행기', english: 'airplane' },
      { id: 'bicycle', emoji: '🚲', korean: '자전거', english: 'bicycle' },
      { id: 'taxi', emoji: '🚕', korean: '택시', english: 'taxi' },
      { id: 'ship', emoji: '🚢', korean: '배', english: 'ship' },
      { id: 'boat', emoji: '🚤', korean: '보트', english: 'boat' },
      { id: 'subway', emoji: '🚇', korean: '지하철', english: 'subway' },
      { id: 'train', emoji: '🚂', korean: '기차', english: 'train' },
      { id: 'plane', emoji: '✈️', korean: '비행기', english: 'plane' }
    ]
  },
  {
    id: 'nature',
    words: [
      { id: 'mountain', emoji: '⛰️', korean: '산', english: 'mountain' },
      { id: 'ocean', emoji: '🌊', korean: '바다', english: 'ocean' },
      { id: 'tree', emoji: '🌳', korean: '나무', english: 'tree' },
      { id: 'flower', emoji: '🌸', korean: '꽃', english: 'flower' },
      { id: 'moon', emoji: '🌙', korean: '달', english: 'moon' },
      { id: 'star', emoji: '⭐', korean: '별', english: 'star' }
    ]
  },
  {
    id: 'school',
    words: [
      { id: 'book', emoji: '📚', korean: '책', english: 'book' },
      { id: 'pencil', emoji: '✏️', korean: '연필', english: 'pencil' },
      { id: 'pen', emoji: '🖊️', korean: '펜', english: 'pen' },
      { id: 'notebook', emoji: '📓', korean: '공책', english: 'notebook' },
      { id: 'backpack', emoji: '🎒', korean: '가방', english: 'backpack' },
      { id: 'ruler', emoji: '📏', korean: '자', english: 'ruler' },
      { id: 'scissors', emoji: '✂️', korean: '가위', english: 'scissors' },
      { id: 'calculator', emoji: '🧮', korean: '계산기', english: 'calculator' },
      { id: 'eraser', emoji: '🧽', korean: '지우개', english: 'eraser' },
      { id: 'desk', emoji: '🪑', korean: '책상', english: 'desk' }
    ]
  },
  {
    id: 'sports',
    words: [
      { id: 'soccer', emoji: '⚽', korean: '축구', english: 'soccer' },
      { id: 'baseball', emoji: '⚾', korean: '야구', english: 'baseball' },
      { id: 'basketball', emoji: '🏀', korean: '농구', english: 'basketball' },
      { id: 'tennis', emoji: '🎾', korean: '테니스', english: 'tennis' },
      { id: 'volleyball', emoji: '🏐', korean: '배구', english: 'volleyball' },
      { id: 'swimming', emoji: '🏊', korean: '수영', english: 'swimming' },
      { id: 'running', emoji: '🏃', korean: '달리기', english: 'running' },
      { id: 'cycling', emoji: '🚴', korean: '자전거 타기', english: 'cycling' },
      { id: 'golf', emoji: '⛳', korean: '골프', english: 'golf' },
      { id: 'bowling', emoji: '🎳', korean: '볼링', english: 'bowling' }
    ]
  },
  {
    id: 'places',
    words: [
      { id: 'school', emoji: '🏫', korean: '학교', english: 'school' },
      { id: 'hospital', emoji: '🏥', korean: '병원', english: 'hospital' },
      { id: 'restaurant', emoji: '🍽️', korean: '식당', english: 'restaurant' },
      { id: 'library', emoji: '📚', korean: '도서관', english: 'library' },
      { id: 'park', emoji: '🏞️', korean: '공원', english: 'park' },
      { id: 'market', emoji: '🏪', korean: '시장', english: 'market' },
      { id: 'bank', emoji: '🏦', korean: '은행', english: 'bank' },
      { id: 'post_office', emoji: '📮', korean: '우체국', english: 'post office' },
      { id: 'cinema', emoji: '🎦', korean: '영화관', english: 'cinema' },
      { id: 'cafe', emoji: '☕', korean: '카페', english: 'cafe' }
    ]
  },
  {
    id: 'time',
    words: [

      { id: 'sunrise', emoji: '🌅', korean: '', english: 'sunrise' },
      { id: 'sunset', emoji: '🌇', korean: '노을' /* 일몰 (time) */, english: 'sunset' },
      
    ]
  },
  {
    id: 'hobbies',
    words: [
      { id: 'reading', emoji: '📖', korean: '독서', english: 'reading' },
      { id: 'music', emoji: '🎵', korean: '음악', english: 'music' },
      { id: 'dancing', emoji: '💃', korean: '춤', english: 'dancing' },
      { id: 'painting', emoji: '🎨', korean: '그림', english: 'painting' },
      { id: 'gaming', emoji: '🎮', korean: '게임', english: 'gaming' },
      { id: 'cooking', emoji: '👩‍🍳', korean: '요리', english: 'cooking' },
      { id: 'gardening', emoji: '🌱', korean: '정원 가꾸기', english: 'gardening' },
      { id: 'photography', emoji: '📸', korean: '사진', english: 'photography' },
      { id: 'singing', emoji: '🎤', korean: '노래', english: 'singing' },
      { id: 'writing', emoji: '✍️', korean: '글쓰기', english: 'writing' }
    ]
  }
];

export const getCategoryList = (): string[] => {
  return categories.map(category => category.id);
};

export const getAllWords = (): Word[] => {
  return categories.flatMap(category => category.words);
};

export const getWord = (id: string): Word | undefined => {
  return getAllWords().find(word => word.id === id);
};

// Helper functions for lookups
export const getWordById = (id: string): Word | undefined => {
  for (const category of categories) {
    const word = category.words.find(w => w.id === id);
    if (word) return word;
  }
  return undefined;
};

export const getWordByKorean = (korean: string): Word | undefined => {
  for (const category of categories) {
    const word = category.words.find(w => w.korean === korean);
    if (word) return word;
  }
  return undefined;
};

export const getWordByEmoji = (emoji: string): Word | undefined => {
  for (const category of categories) {
    const word = category.words.find(w => w.emoji === emoji);
    if (word) return word;
  }
  return undefined;
};

export const getWordsByCategory = (categoryId: string): Word[] => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.words : [];
};

// Example romanization function - can be replaced with different implementations
export const getRomanization = (korean: string, type: RomanizationType = 'revised'): string => {
  // This is a placeholder - you'll need to implement or use a library for actual romanization
  // Different types would use different rules (revised, yale, mcr)
  return korean; // Placeholder return
};
