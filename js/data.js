/**
 * ============================================================
 * THE TET CIPHER WHEEL - Game Data
 * ============================================================
 * All 40 questions organized by 4 rounds.
 * Edit this file to change questions, answers, or hints.
 * ============================================================
 */

const GAME_DATA = {
  // ─────────────────────────────────────────────
  // ROUND 1: The Double Scramble (10 questions)
  // Rule: Unscramble letters to form 2-word Tet phrases
  // Points: 10 per correct answer
  // ─────────────────────────────────────────────
  round1: {
    name: "The Double Scramble",
    nameVi: "Cụm từ xáo trộn",
    icon: "🟢",
    color: "#4CAF50",
    description: "Unscramble the letters to form a Tet-related phrase!",
    descriptionVi: "Sắp xếp lại các chữ cái để tạo thành cụm từ liên quan đến Tết!",
    pointsPerQuestion: 10,
    questions: [
      {
        id: 1,
        scrambled: ["W-E-N", "R-A-E-Y"],
        answer: "NEW YEAR",
        meaningVi: "Năm mới"
      },
      {
        id: 2,
        scrambled: ["K-U-C-L-Y", "N-E-M-O-Y"],
        answer: "LUCKY MONEY",
        meaningVi: "Tiền lì xì"
      },
      {
        id: 3,
        scrambled: ["D-E-R", "V-E-L-O-P-E-N-E"],
        answer: "RED ENVELOPE",
        meaningVi: "Bao lì xì"
      },
      {
        id: 4,
        scrambled: ["M-U-G-N-C", "E-K-A-C"],
        answer: "CHUNG CAKE",
        meaningVi: "Bánh Chưng"
      },
      {
        id: 5,
        scrambled: ["O-I-N-L", "E-C-N-A-D"],
        answer: "LION DANCE",
        meaningVi: "Múa lân"
      },
      {
        id: 6,
        scrambled: ["I-R-E-F", "R-O-W-K-S"],
        answer: "FIRE WORKS",
        meaningVi: "Pháo hoa"
      },
      {
        id: 7,
        scrambled: ["O-O-G-D", "U-C-K-L"],
        answer: "GOOD LUCK",
        meaningVi: "May mắn"
      },
      {
        id: 8,
        scrambled: ["E-T-T", "O-L-I-D-A-Y-H"],
        answer: "TET HOLIDAY",
        meaningVi: "Kỳ nghỉ Tết"
      },
      {
        id: 9,
        scrambled: ["I-V-E-F", "R-U-I-T-S"],
        answer: "FIVE FRUITS",
        meaningVi: "Ngũ quả"
      },
      {
        id: 10,
        scrambled: ["I-S-I-T-V", "O-U-S-E-H"],
        answer: "VISIT HOUSE",
        meaningVi: "Chúc Tết / Thăm nhà"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ROUND 2: Tet Visual Riddles (10 questions)
  // Rule: 2 hints per question.
  //   Correct after Hint 1 = 20 pts
  //   Correct after Hint 2 = 10 pts
  // ─────────────────────────────────────────────
  round2: {
    name: "Tet Visual Riddles",
    nameVi: "Câu đố về Tết",
    icon: "🟡",
    color: "#FFC107",
    description: "Guess the Tet tradition from the clues!",
    descriptionVi: "Đoán truyền thống Tết từ các gợi ý!",
    pointsHint1: 20,
    pointsHint2: 10,
    questions: [
      {
        id: 11,
        hint1: "It is a traditional Vietnamese food.",
        hint2: "It is square and green.",
        answer: "Chung Cake",
        meaningVi: "Bánh chưng"
      },
      {
        id: 12,
        hint1: "It is a loud noise and bright light in the sky.",
        hint2: "People watch it at midnight on New Year's Eve.",
        answer: "Fireworks",
        meaningVi: "Pháo hoa"
      },
      {
        id: 13,
        hint1: "It is a small red envelope.",
        hint2: "Children get it and there is money inside.",
        answer: "Lucky Money",
        meaningVi: "Tiền lì xì"
      },
      {
        id: 14,
        hint1: "It is a beautiful flower in the North of Vietnam.",
        hint2: "It is pink.",
        answer: "Peach Blossom",
        meaningVi: "Hoa đào"
      },
      {
        id: 15,
        hint1: "It is a beautiful flower in the South of Vietnam.",
        hint2: "It is yellow.",
        answer: "Apricot Blossom",
        meaningVi: "Hoa mai"
      },
      {
        id: 16,
        hint1: "It is a place with monks and Buddha statues.",
        hint2: "People go here to pray for good luck.",
        answer: "Pagoda",
        meaningVi: "Ngôi chùa"
      },
      {
        id: 17,
        hint1: "It is an animal dance on the street.",
        hint2: "The animal is red and yellow, bringing good luck.",
        answer: "Lion Dance",
        meaningVi: "Múa lân"
      },
      {
        id: 18,
        hint1: "This is a group of people.",
        hint2: "They are your parents, brothers, and sisters.",
        answer: "Family",
        meaningVi: "Gia đình"
      },
      {
        id: 19,
        hint1: "You do this to your house before Tet.",
        hint2: "You use a broom and water to make the house clean.",
        answer: "Clean / Decorate",
        meaningVi: "Dọn dẹp / Trang trí"
      },
      {
        id: 20,
        hint1: "It is a paper on the wall.",
        hint2: "It has days, weeks, and months of the year.",
        answer: "Calendar",
        meaningVi: "Tờ lịch"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ROUND 3: The Secret Cipher (10 questions)
  // Rule: Decode numbers to English letters (A=1, B=2...)
  // Points: 30 per correct answer
  // ─────────────────────────────────────────────
  round3: {
    name: "The Secret Cipher",
    nameVi: "Bức thư mật mã",
    icon: "🟠",
    color: "#FF9800",
    description: "Decode the numbers into English letters!",
    descriptionVi: "Giải mã các con số thành chữ cái tiếng Anh!",
    pointsPerQuestion: 30,
    cipherKey: "A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10, K=11, L=12, M=13, N=14, O=15, P=16, Q=17, R=18, S=19, T=20, U=21, V=22, W=23, X=24, Y=25, Z=26",
    questions: [
      {
        id: 21,
        cipher: [[8,1,16,16,25],[14,5,23],[25,5,1,18]],
        cipherDisplay: "8-1-16-16-25 / 14-5-23 / 25-5-1-18",
        answer: "HAPPY NEW YEAR",
        wordCount: 3,
        meaningVi: "Chúc mừng năm mới"
      },
      {
        id: 22,
        cipher: [[12,21,3,11,25],[18,5,4],[13,15,14,5,25]],
        cipherDisplay: "12-21-3-11-25 / 18-5-4 / 13-15-14-5-25",
        answer: "LUCKY RED MONEY",
        wordCount: 3,
        meaningVi: "Tiền lì xì đỏ may mắn"
      },
      {
        id: 23,
        cipher: [[23,5],[4,5,3,15,18,1,20,5],[8,15,13,5]],
        cipherDisplay: "23-5 / 4-5-3-15-18-1-20-5 / 8-15-13-5",
        answer: "WE DECORATE HOME",
        wordCount: 3,
        meaningVi: "Chúng ta trang trí nhà"
      },
      {
        id: 24,
        cipher: [[23,9,19,8],[25,15,21],[7,15,15,4],[12,21,3,11]],
        cipherDisplay: "23-9-19-8 / 25-15-21 / 7-15-15-4 / 12-21-3-11",
        answer: "WISH YOU GOOD LUCK",
        wordCount: 4,
        meaningVi: "Chúc bạn may mắn"
      },
      {
        id: 25,
        cipher: [[16,5,1,3,8],[1,14,4],[1,16,18,9,3,15,20]],
        cipherDisplay: "16-5-1-3-8 / 1-14-4 / 1-16-18-9-3-15-20",
        answer: "PEACH AND APRICOT",
        wordCount: 3,
        meaningVi: "Hoa đào và hoa mai"
      },
      {
        id: 26,
        cipher: [[6,1,13,9,12,25],[18,5,21,14,9,15,14],[16,1,18,20,25]],
        cipherDisplay: "6-1-13-9-12-25 / 18-5-21-14-9-15-14 / 16-1-18-20-25",
        answer: "FAMILY REUNION PARTY",
        wordCount: 3,
        meaningVi: "Bữa tiệc đoàn tụ gia đình"
      },
      {
        id: 27,
        cipher: [[23,1,20,3,8],[12,9,15,14],[4,1,14,3,5]],
        cipherDisplay: "23-1-20-3-8 / 12-9-15-14 / 4-1-14-3-5",
        answer: "WATCH LION DANCE",
        wordCount: 3,
        meaningVi: "Xem múa lân"
      },
      {
        id: 28,
        cipher: [[13,1,11,5],[1],[11,9,14,4],[23,9,19,8]],
        cipherDisplay: "13-1-11-5 / 1 / 11-9-14-4 / 23-9-19-8",
        answer: "MAKE A KIND WISH",
        wordCount: 4,
        meaningVi: "Gửi một lời chúc tốt đẹp"
      },
      {
        id: 29,
        cipher: [[1],[8,5,1,12,20,8,25],[1,14,4],[8,1,16,16,25],[12,9,6,5]],
        cipherDisplay: "1 / 8-5-1-12-20-8-25 / 1-14-4 / 8-1-16-16-25 / 12-9-6-5",
        answer: "A HEALTHY AND HAPPY LIFE",
        wordCount: 5,
        meaningVi: "Một cuộc sống khỏe mạnh và hạnh phúc"
      },
      {
        id: 30,
        cipher: [[23,5,12,3,15,13,5],[20,15],[22,9,5,20,14,1,13]],
        cipherDisplay: "23-5-12-3-15-13-5 / 20-15 / 22-9-5-20-14-1-13",
        answer: "WELCOME TO VIETNAM",
        wordCount: 3,
        meaningVi: "Chào mừng đến Việt Nam"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ROUND 4: The Lucky Envelope (10 questions)
  // Rule: Mixed questions. Teams pick an envelope,
  //   answer correctly to win random points (10-50).
  //   Option to "Double" the wager.
  // ─────────────────────────────────────────────
  round4: {
    name: "The Lucky Envelope",
    nameVi: "Bao lì xì bí ẩn",
    icon: "🔴",
    color: "#D32F2F",
    description: "Pick an envelope and answer to win hidden points!",
    descriptionVi: "Chọn phong bao lì xì, trả lời đúng nhận điểm bí ẩn!",
    questions: [
      {
        id: 31,
        type: "Fill in",
        typeVi: "Điền từ",
        question: '"Happy New _______!"',
        answer: "Year",
        meaningVi: "Năm"
      },
      {
        id: 32,
        type: "Translate",
        typeVi: "Dịch",
        question: 'How do you say "Đoàn tụ gia đình" in English?',
        answer: "Family reunion",
        meaningVi: "Đoàn tụ gia đình"
      },
      {
        id: 33,
        type: "Multiple Choice",
        typeVi: "Trắc nghiệm",
        question: "What do people usually do on the first day of Tet?",
        options: ["A) Go to school", "B) Visit relatives", "C) Sleep all day"],
        answer: "B",
        answerFull: "Visit relatives",
        meaningVi: "Thăm họ hàng"
      },
      {
        id: 34,
        type: "True/False",
        typeVi: "Đúng/Sai",
        question: "True or False: Tet is always in January.",
        answer: "False",
        meaningVi: "Sai, Tết có thể rơi vào tháng 2 dương lịch"
      },
      {
        id: 35,
        type: "Arrange",
        typeVi: "Sắp xếp câu",
        question: "Arrange these words: you / wish / a / I / Happy New Year.",
        answer: "I wish you a Happy New Year.",
        meaningVi: "Tôi chúc bạn một năm mới hạnh phúc."
      },
      {
        id: 36,
        type: "Knowledge",
        typeVi: "Kiến thức",
        question: "Name 3 animals in the Vietnamese Zodiac in English.",
        answer: "Any 3: Rat, Buffalo, Tiger, Cat, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig",
        acceptedAnswers: ["rat", "buffalo", "tiger", "cat", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"],
        meaningVi: "Kể tên 3 con giáp bằng tiếng Anh"
      },
      {
        id: 37,
        type: "Fill in",
        typeVi: "Điền từ",
        question: 'People usually wear _______ clothes on the first day of Tet. (Hint: starts with "N")',
        answer: "New",
        meaningVi: "Quần áo mới"
      },
      {
        id: 38,
        type: "Opposite",
        typeVi: "Trái nghĩa",
        question: 'What is the opposite of "OLD year"?',
        answer: "NEW year",
        meaningVi: "Năm mới"
      },
      {
        id: 39,
        type: "Math",
        typeVi: "Toán học",
        question: "If you have 2 lucky money envelopes, each has 50,000 VND. How much money do you have in total?",
        answer: "100,000 VND",
        meaningVi: "Một trăm nghìn đồng"
      },
      {
        id: 40,
        type: "Action",
        typeVi: "Thử thách",
        question: 'Sing 1 sentence of a "Happy New Year" song in English.',
        answer: "Judge decides (e.g., 'Happy New Year, Happy New Year...')",
        meaningVi: "Học sinh hát một câu đúng tiếng Anh"
      }
    ]
  }
};

// Team names (editable)
const TEAM_NAMES = ["Team 1 🐉", "Team 2 🦁", "Team 3 🐯", "Team 4 🐍"];

/**
 * ============================================================
 * VISUAL DATA — Emoji + Answer Images for each question
 * ============================================================
 * emoji:  Large emoji shown during question (decoration)
 * image:  Photo URL shown when answer is revealed
 * Images from Unsplash CDN (free & reliable)
 * ============================================================
 */
const QUESTION_VISUALS = {
  // ── Round 1: The Double Scramble ──
  1:  { emoji: "🎆", image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/rockcms/2024-02/240207-lunar-new-year-festival-san-francisco-vl-235p-332c2a.jpg", alt: "New Year fireworks celebration" },
  2:  { emoji: "🧧", image: "https://vietpowertravel.com/data/files/(9)%20Lucky%20money.jpg", alt: "Lucky money red envelopes" },
  3:  { emoji: "🧧", image: "https://rentabikevn.com/wp-content/uploads/2025/01/li-xi-or-lucky-money-in-vietnamese-culture.jpg", alt: "Red envelope tradition" },
  4:  { emoji: "🍚", image: "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/12/cach-lam-banh-chung-tet-thumb.jpg", alt: "Traditional rice cake" },
  5:  { emoji: "🦁", image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/9/9/1091209/BINH1785.jpg", alt: "Lion dance performance" },
  6:  { emoji: "🎇", image: "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/depositphotos61316217xl-1739929774858.jpg", alt: "Fireworks in the night sky" },
  7:  { emoji: "🍀", image: "https://hips.hearstapps.com/hmg-prod/images/lunar-new-year-captions-go-ng-xi-fa-ca-i-2-679a2103edf90.png?resize=980:*", alt: "Good luck clover" },
  8:  { emoji: "🎊", image: "https://img.freepik.com/free-vector/2026-year-horse-vector-new-years-greeting-card-template-with-prancing-horse-silhouette_8130-3212.jpg?semt=ais_hybrid&w=740&q=80", alt: "Festive celebration" },
  9:  { emoji: "🍊", image: "https://tuongviethoasen.vn/application/media/mam-ngu-qua1.jpeg", alt: "Five fruits tray" },
  10: { emoji: "🏠", image: "https://fujifruit.com.vn/wp-content/uploads/2024/01/xong-nha-2023-1.jpg", alt: "Visiting house" },

  // ── Round 2: Tet Visual Riddles ──
  11: { emoji: "🍚", image: "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/12/cach-lam-banh-chung-tet-thumb.jpg", alt: "Chung cake traditional food" },
  12: { emoji: "🎆", image: "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/depositphotos61316217xl-1739929774858.jpg", alt: "Fireworks at midnight" },
  13: { emoji: "🧧", image: "https://vietpowertravel.com/data/files/(9)%20Lucky%20money.jpg", alt: "Lucky money envelopes" },
  14: { emoji: "🌸", image: "https://file.hstatic.net/200000567741/file/oa-dao-ten-khoa-hoc-la-prunus-persica_c87d88dd9f1c4a25bc1d636fedc59e37_grande.png", alt: "Peach blossom pink flowers" },
  15: { emoji: "🌼", image: "https://tiki.vn/blog/wp-content/uploads/2023/12/cay-mai-cach-trong-cham-soc-va-y-nghia-hoa-mai-ngay-tet.jpg", alt: "Yellow apricot blossoms" },
  16: { emoji: "⛩️", image: "https://cdn.xanhsm.com/2024/12/88ba71c5-chua-van-duc-11.jpg", alt: "Buddhist pagoda temple" },
  17: { emoji: "🦁", image: "https://cdn.tgdd.vn/Files/2021/08/22/1377036/mua-lan-su-rong-la-gi-tim-hieu-nguon-goc-y-nghia-6.jpg", alt: "Lion dance on the street" },
  18: { emoji: "👨‍👩‍👧‍👦", image: "https://www.mykingdom.com.vn/cdn/shop/articles/mykingdom-phong-tuc-ngay-tet-nguyen-dan.jpg?v=1686027390", alt: "Happy family together" },
  19: { emoji: "🧹", image: "https://i.ytimg.com/vi/yUKd8X8xBE8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAohS6MBeyNTrhOngCJciAS5Na3aQ", alt: "Cleaning and decorating" },
  20: { emoji: "📅", image: "https://mockups-design.com/wp-content/uploads/2024/09/Tear-off_Calendar_Mockup_1-1.jpg", alt: "Calendar on wall" },

  // ── Round 3: The Secret Cipher ──
  21: { emoji: "🎉", image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/rockcms/2024-02/240207-lunar-new-year-festival-san-francisco-vl-235p-332c2a.jpg", alt: "Happy New Year celebration" },
  22: { emoji: "🧧", image: "https://vietpowertravel.com/data/files/(9)%20Lucky%20money.jpg", alt: "Lucky red money envelopes" },
  23: { emoji: "🏠", image: "https://dantra.vn/uploads/san-pham/vat-lieu-may-tre/manh-do/manh-do-2.jpg", alt: "Decorating home for Tet" },
  24: { emoji: "🍀", image: "https://hips.hearstapps.com/hmg-prod/images/lunar-new-year-captions-go-ng-xi-fa-ca-i-2-679a2103edf90.png?resize=980:*", alt: "Wish you good luck" },
  25: { emoji: "🌸", image: "https://file.hstatic.net/200000567741/file/oa-dao-ten-khoa-hoc-la-prunus-persica_c87d88dd9f1c4a25bc1d636fedc59e37_grande.png", alt: "Peach and apricot blossoms" },
  26: { emoji: "👨‍👩‍👧‍👦", image: "https://www.mykingdom.com.vn/cdn/shop/articles/mykingdom-phong-tuc-ngay-tet-nguyen-dan.jpg?v=1686027390", alt: "Family reunion party" },
  27: { emoji: "🦁", image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/9/9/1091209/BINH1785.jpg", alt: "Watch lion dance" },
  28: { emoji: "🌟", image: "https://hips.hearstapps.com/hmg-prod/images/lunar-new-year-captions-go-ng-xi-fa-ca-i-2-679a2103edf90.png?resize=980:*", alt: "Make a kind wish" },
  29: { emoji: "💪", image: "https://behapyhealthy.com/wp-content/uploads/2025/09/new-health-foto-900x450-1.png", alt: "A healthy and happy life" },
  30: { emoji: "", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png", alt: "Welcome to Vietnam" },

  // ── Round 4: The Lucky Envelope ──
  31: { emoji: "🎆", image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/rockcms/2024-02/240207-lunar-new-year-festival-san-francisco-vl-235p-332c2a.jpg", alt: "Happy New Year" },
  32: { emoji: "👨‍👩‍👧‍👦", image: "https://www.mykingdom.com.vn/cdn/shop/articles/mykingdom-phong-tuc-ngay-tet-nguyen-dan.jpg?v=1686027390", alt: "Family reunion" },
  33: { emoji: "🏠", image: "https://fujifruit.com.vn/wp-content/uploads/2024/01/xong-nha-2023-1.jpg", alt: "Visit relatives" },
  34: { emoji: "📅", image: "https://mockups-design.com/wp-content/uploads/2024/09/Tear-off_Calendar_Mockup_1-1.jpg", alt: "Tet timing" },
  35: { emoji: "💌", image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/rockcms/2024-02/240207-lunar-new-year-festival-san-francisco-vl-235p-332c2a.jpg", alt: "New Year wishes" },
  36: { emoji: "🐉", image: "https://tuvi12congiap.com/wp-content/uploads/2025/09/12-con-giap.jpg", alt: "Vietnamese zodiac dragon" },
  37: { emoji: "👔", image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/rockcms/2024-02/240207-lunar-new-year-festival-san-francisco-vl-235p-332c2a.jpg", alt: "New clothes" },
  38: { emoji: "🎊", image: "https://img.freepik.com/free-vector/2026-year-horse-vector-new-years-greeting-card-template-with-prancing-horse-silhouette_8130-3212.jpg?semt=ais_hybrid&w=740&q=80", alt: "New year celebration" },
  39: { emoji: "💰", image: "https://vuatiente.vn/files/sanpham/1156/1/jpg/100k-seri-13456789.jpg", alt: "Lucky money" },
  40: { emoji: "🎤", image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/rockcms/2024-02/240207-lunar-new-year-festival-san-francisco-vl-235p-332c2a.jpg", alt: "Singing Happy New Year" }
};
