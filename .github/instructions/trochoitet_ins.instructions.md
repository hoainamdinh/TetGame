---
description: Describe when these instructions should be loaded
# applyTo: 'Describe when these instructions should be loaded' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.
Prompt: "Act as a Senior Web Developer. Create a Single Page Application (SPA) for an English Club Game titled 'The Tet Cipher Wheel'.

Technical Stack: HTML5, CSS3 (Tailwind CSS preferred), and Vanilla JavaScript.

Core Features:

Game Flow: Support 4 rounds (Scramble, Riddles, Cipher, Lucky Envelope) with a total of 40 questions (use the data provided).

UI/UX: >    - A 'Home' screen to start.

A 'Leaderboard' to track scores for 4 teams.

A 'Timer' (30 seconds per question) with a progress bar.

Interactivity:

Round 1 (Scramble): Display scrambled letters, button to 'Reveal Answer'.

Round 2 (Riddles): Show Hint 1 first, then a button to show Hint 2 (reduce points).

Round 3 (Cipher): Show a mapping table (A=1, B=2...) alongside the code.

Round 4 (Lucky Envelope): Display 10 clickable envelopes with hidden random points.

Effects: >    - Use canvas-confetti library for correct answers.

Smooth animations using Animate.css logic.

Festive theme: Red/Gold colors, falling cherry blossoms (sakura) background.

Data Management: Store the 40 questions in a JSON object for easy editing.

Please provide a clean, responsive, and well-commented code in one file (or separate files if needed)."
1. Ngôn ngữ thiết kế (Design Language)
Bảng màu (Color Palette):

Primary: #D32F2F (Đỏ Tết - mang lại năng lượng).

Secondary: #FFD700 (Vàng Gold - sự thịnh vượng).

Background: #FFF9E3 (Kem nhạt - giúp dịu mắt khi nhìn lâu trên máy chiếu).

Success: #388E3C (Xanh lá cây - màu bánh chưng).

Typography: Sử dụng Font không chân (Sans-serif) như 'Montserrat' hoặc 'Quicksand' để trông hiện đại, thân thiện với lứa tuổi THCS.

Hiệu ứng (Effects):

Confetti: Bắn pháo giấy khi trả lời đúng.

Shake: Rung màn hình khi trả lời sai.

Transition: Hiệu ứng chuyển slide mượt mà giữa 40 câu hỏi.

Sound: Tiếng "Ting" khi đúng và "Buzzer" khi hết giờ.
Dưới đây là "Database" của trò chơi The Tet Cipher Wheel, được chia đều 10 câu cho mỗi vòng.
🟢 Vòng 1: The Double Scramble (Cụm từ xáo trộn)
Luật: Sắp xếp lại các chữ cái để tạo thành cụm từ gồm 2 chữ liên quan đến Tết. Mức độ: Dễ / Nhận biết.
STT	Chữ xáo trộn (Scrambled)	Đáp án (Answer)	Ý nghĩa (Vietnamese)
1	W-E-N / R-A-E-Y	NEW YEAR	Năm mới
2	K-U-C-L-Y / N-E-M-O-Y	LUCKY MONEY	Tiền lì xì
3	D-E-R / V-E-L-O-P-E-N-E	RED ENVELOPE	Bao lì xì
4	M-U-G-N-C / E-K-A-C	CHUNG CAKE	Bánh Chưng
5	O-I-N-L / E-C-N-A-D	LION DANCE	Múa lân
6	I-R-E-F / R-O-W-K-S	FIRE WORKS	Pháo hoa
7	O-O-G-D / U-C-K-L	GOOD LUCK	May mắn
8	E-T-T / O-L-I-D-A-Y-H	TET HOLIDAY	Kỳ nghỉ Tết
9	I-V-E-F / R-U-I-T-S	FIVE FRUITS	Ngũ quả
10	I-S-I-T-V / O-U-S-E-H	VISIT HOUSE	Chúc Tết / Thăm nhà


🟡 Vòng 2: Tet Visual Riddles
Luật: Quản trò đọc lần lượt 2 gợi ý. Đội đoán đúng sau Hint 1 được 20 điểm, sau Hint 2 được 10 điểm.
STT	Hint 1 (Gợi ý 1)	Hint 2 (Gợi ý 2)	Đáp án (Answer)
11	It is a traditional Vietnamese food.	It is square and green.	Chung Cake (Bánh chưng)
12	It is a loud noise and bright light in the sky.	People watch it at midnight on New Year's Eve.	Fireworks (Pháo hoa)
13	It is a small red envelope.	Children get it and there is money inside.	Lucky Money (Tiền lì xì)
14	It is a beautiful flower in the North of Vietnam.	It is pink.	Peach blossom (Hoa đào)
15	It is a beautiful flower in the South of Vietnam.	It is yellow.	Apricot blossom (Hoa mai)
16	It is a place with monks and Buddha statues.	People go here to pray for good luck.	Pagoda (Ngôi chùa)
17	It is an animal dance on the street.	The animal is red and yellow, bringing good luck.	Lion dance (Múa lân)
18	This is a group of people.	They are your parents, brothers, and sisters.	Family (Gia đình)
19	You do this to your house before Tet.	You use a broom and water to make the house clean.	Clean / Decorate (Dọn dẹp/Trang trí)
20	It is a paper on the wall.	It has days, weeks, and months of the year.	Calendar (Tờ lịch)

🟠 Vòng 3: The Secret Cipher (Bức thư mật mã)
Luật: Giải mã các con số thành chữ cái tiếng Anh dựa trên bảng chữ cái (A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10, K=11, L=12, M=13, N=14, O=15, P=16, Q=17, R=18, S=19, T=20, U=21, V=22, W=23, X=24, Y=25, Z=26). (30 điểm/câu)

STT	Mã số (Cipher)	Đáp án (Answer)	Ý nghĩa (Vietnamese)
21	20 - 5 - 20	TET	Tết
22	7 - 15 - 15 - 4	GOOD	Tốt lành
23	25 - 5 - 1 - 18	YEAR	Năm
24	14 - 5 - 23	NEW	Mới
25	18 - 5 - 4	RED	Màu đỏ (Màu may mắn)
26	8 - 15 - 13 - 5	HOME	Ngôi nhà / Quê nhà
27	23 - 9 - 19 - 8	WISH	Lời chúc / Ước nguyện
28	20 - 18 - 5 - 5	TREE	Cái cây (Cây nêu/Cây quất)
29	12 - 21 - 3 - 11	LUCK	Sự may mắn
30	6 - 15 - 15 - 4	FOOD	Thức ăn

🔴 Vòng 4: The Lucky Envelope (Bao lì xì bí ẩn)
Luật: Các câu hỏi hỗn hợp. Các đội chọn phong bao lì xì, trả lời đúng nhận số điểm ngẫu nhiên (từ 10-50 điểm) được giấu trong bao. Có thể cược "Double" điểm.
STT	Dạng câu hỏi	Nội dung câu hỏi (Question)	Đáp án (Answer)
31	Điền từ (Fill in)	"Happy New _______!"	Year
32	Dịch (Translate)	How do you say "Đoàn tụ gia đình" in English?	Family reunion
33	Trắc nghiệm	What do people usually do on the first day of Tet? 
A) Go to school 
B) Visit relatives 
C) Sleep all day	B (Visit relatives - Thăm họ hàng)
34	Đúng/Sai (T/F)	True or False: Tet is always in January.	False (Sai, Tết có thể rơi vào tháng 2 dương lịch)
35	Sắp xếp câu	Arrange these words: you / wish / a / I / Happy New Year.	I wish you a Happy New Year.
36	Kiến thức	Name 3 animals in the Vietnamese Zodiac in English. (Kể tên 3 con giáp bằng tiếng Anh)	Bất kỳ 3 con: Rat, Buffalo, Tiger, Cat, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig.
37	Điền từ (Fill in)	People usually wear _______ clothes on the first day of Tet. (Gợi ý: starts with "N")	New (Quần áo mới)
38	Trái nghĩa (Opposite)	What is the opposite of "OLD year"?	NEW year
39	Toán học (Math)	If you have 2 lucky money envelopes, each has 50,000 VND. How much money do you have in total?	One hundred thousand (100,000) VND
40	Thử thách (Action)	Sing 1 sentence of a "Happy New Year" song in English.	(Học sinh hát một câu đúng tiếng Anh, VD: "Happy New Year, Happy New Year...")

