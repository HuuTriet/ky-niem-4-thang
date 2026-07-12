/* ============================================================================
   💛 CONFIG — CHỖ DUY NHẤT TRIẾT CẦN CHỈNH SỬA 💛
   ----------------------------------------------------------------------------
   Toàn bộ nội dung web (tên, ngày yêu, nhạc, các CHƯƠNG câu chuyện, ảnh,
   video, quiz, thư, cây thông) đều nằm ở đây.
   Trong lời văn cứ để {{HER_NAME}} / {{HIS_NAME}} — web tự thay bằng tên bên dưới.
   ============================================================================ */

window.CONFIG = {

  /* ---------- 1) TÊN ---------- */
  herName: "Quỳnh Trâm",
  hisName: "Triết",
  herNick: "Trâm",
  hisNick: "anh",

  /* ---------- 2) NGÀY BẮT ĐẦU YÊU ---------- */
  startDate: "2026-03-13",

  /* ---------- 3) NHẠC NỀN ---------- */
  // Bài của tụi mình: "Old Love" — Yuji & Putri Dahlia.
  // Triết tải file mp3 rồi bỏ vào assets/music/ với đúng tên bên dưới.
  musicFile: "assets/music/old-love.mp3", // ⬅️ thả file vào là nhạc tự chạy
  musicTitle: "Old Love — Yuji & Putri Dahlia",
  musicVolume: 0.55,

  /* Lyrics BÁM THEO NHẠC (LRC — canh giờ sẵn từng câu, khớp official audio).
     Nhạc chạy tới đâu lời hiện tới đó; nhạc dừng thì lời dừng.
     Muốn sửa/canh lại: [phút:giây.xx] rồi tới lời hát. */
  lyricsLrc: `
[00:19.25] When you were here, the stars disappear
[00:24.25] Nothing can outshine the dress that you wear
[00:29.13] We should be dancing 'cause girl you look stunning
[00:34.48] Let's spend the night together 'til reach the morning
[00:39.34] Up and above, never enough
[00:44.49] I wanna hold your hand and show what is love
[00:49.62] When you are smiling and when you are laughing
[00:54.84] We should keep dancing to treasure the feelings
[00:59.68] Like it's the old love (it's the old love)
[01:04.95] This is the way that we both wanna feel
[01:09.73] Under the moonlight we made our first kiss
[01:14.93] 'Cause this is the moment that you made me feel
[01:19.98] Like it's the old love (it's the old love)
[01:25.05] Come on and hold me, I want you right here
[01:30.15] Stay close to me, so you don't feel the fear
[01:35.27] I'll never let go 'cause I'm just right here
[01:40.42] When I'm with you, it's like déjà vu
[01:45.21] I realize that dreams really come true
[01:50.51] We keep on talking for the moment we live in
[01:55.34] Let's keep drinking 'til the moon disappear
[02:00.56] You are the one, the one that I want
[02:05.72] The one that will stay by my side 'til I'm gone
[02:10.73] The love of my life and I'll sacrifice
[02:15.84] Just for the moment we last long forever
[02:20.61] Like it's the old love (it's the old love)
[02:26.17] This is the way that we both wanna feel
[02:31.02] Under the moonlight we made our first kiss
[02:36.13] 'Cause this is the moment that you made me feel
[02:41.23] Like it's the old love
[02:46.48] Come on and hold me, I want you right here
[02:51.25] Stay close to me, so you don't feel the fear
[02:56.59] I'll never let go 'cause I'm just right here
[03:01.54] Like it's the old love
[03:05.86]
[03:21.89] It's the old love
[03:27.47] This is the way that we both wanna feel
[03:31.98] Under the moonlight we made our first kiss
[03:36.98] 'Cause this is the moment that you made me feel
[03:42.10] Like it's the old love
[03:45.49]
`,

  /* ---------- 4) MÀN MỞ ĐẦU ---------- */
  gate: {
    kicker: "Gửi {{HER_NAME}}",
    title: "Có một câu chuyện anh muốn kể em nghe.",
    button: "Bắt đầu ♪",
    hint: "Bật loa để nghe nhạc",
    // Màn khoá: đếm ngược tới đúng 0:00 ngày kỉ niệm rồi trang mới mở.
    // (Muốn xem trước, thêm ?xem vào cuối link. Muốn tắt màn khoá: xoá dòng unlockAt.)
    unlockAt: "2026-07-13T00:00:00+07:00",
    lockKicker: "13.07.2026 — tròn bốn tháng",
    lockTitle: "Có một câu chuyện đang đợi em ở đây.",
    lockHint: "Đúng 0:00 đêm nay trang sẽ tự mở — em quay lại nhé.",
  },

  /* ---------- 5) HERO (video chạy nền) ---------- */
  hero: {
    video: "assets/videos/phim-2.mp4",       // video nhẹ, tự chạy lặp làm nền
    fallbackPhoto: "assets/photos/10.jpg",   // dùng khi video chưa tải xong
    kicker: "13.03.2026 — hôm nay",
    title: "Bốn tháng của chúng mình",
    subtitle: "Một câu chuyện bắt đầu từ chuyến tình nguyện Đông Xuân của Đại học Kinh tế.",
  },
  counterLabel: "…và mình vẫn đang đếm tiếp, mỗi ngày.",

  /* ---------- Dòng CẢM ƠN chạy ngang ở chương cuối ---------- */
  thanks: [
    "Cảm ơn Trung Hiếu",
    "Cảm ơn Thục Nhi",
    "Cảm ơn CLB Guitar DUE",
    "Cảm ơn trường Đại học Kinh tế",
    "Cảm ơn thành phố Vinh, Nghệ An",
    "Cảm ơn ba Sơn, mẹ Tâm",
  ],

  /* ---------- 6) CÂU CHUYỆN — CÁC CHƯƠNG ---------- */
  story: [
    {
      type: "scene", photo: "assets/photos/28.jpg", align: "left", focus: "48% 26%",
      chapter: "Chương một", date: "Mùa đông",
      title: "Đêm mùa đông mình quen nhau",
      text: "Chiến dịch của Đại học Kinh tế, những ngày cuối năm. Anh đến chỉ mong góp một chút sức mình, chẳng mong cầu gì hơn. Vậy mà giữa những ngày lạnh và bận rộn ấy, anh bắt đầu để ý đến một cô gái — là em. Chuyến đi kết thúc, mọi thứ trở lại như cũ, chỉ có anh là khác đi: làm gì, ở đâu, anh cũng thấy mình nghĩ tới em.",
    },
    {
      type: "keepsake", photo: "assets/photos/24.jpg",
      chapter: "Chương hai",
      title: "Tấm hình anh giữ riêng",
      text: "Trước khi mình quen nhau, anh đã lưu tấm hình này. Không phải vì dòng chữ trên đó, mà vì người trong hình. Ngày ấy anh tự nhủ: phải cố gắng, để một ngày được đứng cạnh người này một cách đàng hoàng.",
      note: "— và anh vẫn đang cố gắng, mỗi ngày.",
    },
    {
      type: "scene", photo: "assets/photos/11.jpg", align: "right", focus: "50% 46%",
      chapter: "Chương ba", date: "13.03.2026",
      title: "Ngày em đồng ý",
      text: "Không pháo hoa, không kịch bản. Chỉ là hai đứa, một câu hỏi thật lòng, và một cái gật đầu. Từ hôm đó anh hiểu một điều giản dị: trong lòng anh, chỉ cần có em là đủ.",
    },
    {
      type: "moments",
      chapter: "Chương bốn",
      title: "100k cá viên lộn xộn",
      text: "Hoá ra điều anh quý nhất không phải là những dịp đặc biệt, mà là những ngày rất đỗi bình thường có em — kiểu 100k cá viên ăn lộn xộn cũng thành kỉ niệm.",
      photos: [
        { src: "assets/photos/12.jpg", cap: "Em xinh 🌷" },
        { src: "assets/photos/19.jpg", cap: "Em cắt móng tay cho anh — và khỏ anh hoài vì cái tật xấu này" },
        { src: "assets/photos/20.jpg", cap: "Hai bạn nhỏ đáng yêu trong cùng một khung hình" },
        { src: "assets/photos/15.jpg", cap: "Sinh nhật đầu tiên của em có anh bên cạnh" },
        { src: "assets/photos/16.jpg", cap: "Sinh nhật — có bánh, có hoa, có em" },
        { src: "assets/photos/25.jpg", cap: "Bữa tối sinh nhật anh — có bánh MU và có em" },
        { src: "assets/photos/09.jpg", cap: "Buổi tối đổi quà của hai đứa" },
        { src: "assets/photos/26.jpg", cap: "Quà 100 ngày em tặng — “chúc bạn tiếp tục iu thưn tui nhá”" },
        { src: "assets/photos/27.jpg", cap: "Buổi tối chạy xe vòng vòng, em và bé sứa bóng bay" },
        { src: "assets/photos/14.jpg", cap: "Đi dạoo cùng nhau" },
        { src: "assets/photos/13.jpg", cap: "Ngắm thành phố về đêm" },
        { src: "assets/photos/08.jpg", cap: "Nhẫn đôi của hai đứa" },
      ],
    },
    {
      type: "scene", photo: "assets/photos/03.jpg", align: "right", fit: "contain",
      chapter: "Chương năm", date: "Chuyến đi xa đầu tiên",
      title: "Huế",
      text: "Mình mang theo áo đôi, một chiếc nón lá quai hồng, và rất nhiều lần bấm máy. Huế đẹp — nhưng trong ảnh của anh, em lúc nào cũng rõ nét hơn cảnh.",
    },
    {
      type: "strip",
      photos: [
        { src: "assets/photos/05.jpg", cap: "Trước Ngọ Môn" },
        { src: "assets/photos/01.jpg", cap: "Nụ cười của em" },
        { src: "assets/photos/22.jpg", cap: "Tấm gương cổ trong Đại Nội" },
        { src: "assets/photos/02.jpg", cap: "Áo đôi giữa lòng Huế" },
        { src: "assets/photos/21.jpg", cap: "Quán matcha ở Huế" },
        { src: "assets/photos/23.jpg", cap: "Chiếc nón lá quai hồng" },
        { src: "assets/photos/04.jpg", cap: "Trước cổng Quốc Học" },
      ],
    },
    {
      type: "scene", photo: "assets/photos/07.jpg", align: "center", fit: "contain",
      chapter: "Chương sáu", date: "Một buổi tối",
      title: "Hội An",
      text: "Đèn lồng, hoa giấy, và em. Có những tấm ảnh bị nhoè — vì anh mải đi theo em hơn là đứng yên mà chụp. Nhưng anh không tiếc: kỉ niệm không cần nét, chỉ cần thật.",
    },
  ],

  /* ---------- 7) THƯỚC PHIM (tự chạy khi cuộn tới) ---------- */
  film: {
    video: "assets/videos/phim-1.mp4",
    chapter: "Chương bảy",
    title: "Lời hứa xem pháo hoa",
    text: "Anh từng hứa sẽ cùng em xem pháo hoa. Và hôm ấy, mình đã đứng cạnh nhau dưới bầu trời rực sáng — một lời hứa nhỏ, được giữ trọn.",
  },

  /* ---------- 8) THƯ ---------- */
  letterChapter: "Chương tám",
  letterTitle: "Lá thư anh viết cho em",
  letter:
`Gửi {{HER_NAME}},

Có những điều anh ít khi nói ra, nên hôm nay anh muốn viết lại cẩn thận một lần.

Mọi thứ bắt đầu từ chuyến tình nguyện Đông Xuân của Đại học Kinh tế. Ở đó anh có dịp thấy em, rồi quen em. Anh không nghĩ một chuyến đi ngắn lại có thể thay đổi nhiều thứ đến vậy.

Bốn tháng qua, em cho anh nhiều trải nghiệm và cảm xúc mà anh chưa từng có. Em nhường nhịn anh, quan tâm anh từng chút, kiên nhẫn giúp anh bỏ dần những tật xấu. Em đã thay đổi con người anh — điều đó anh nhìn thấy rõ ở chính mình. Và càng đi cùng em, anh càng hiểu một điều giản dị: trong lòng anh, chỉ cần có em là đủ.

Anh không hứa điều gì to tát. Anh chỉ hứa sẽ nghiêm túc với em và với chuyện của hai đứa, sẽ lắng nghe em nhiều hơn, và cố gắng mỗi ngày để xứng đáng với sự dịu dàng em dành cho anh.

Cảm ơn em vì bốn tháng vừa rồi. Mong là mình còn đi cùng nhau thật lâu.

Yêu em.`,
  letterSign: "", // không ký tên — thư đã khép lại bằng "Yêu em."

  /* ---------- 9) QUIZ ---------- */
  quizChapter: "Chương chín",
  quizTitle: "Mình hiểu nhau tới đâu?",
  quiz: [
    { q: "Mình biết đến nhau từ đâu?",
      options: ["Ở căng tin trường", "Chuyến tình nguyện Đông Xuân của Đại học Kinh tế", "Trong một quán cà phê", "Do bạn chung giới thiệu"],
      answer: 1, reaction: "Đúng rồi. Chuyến đi đó là khởi đầu của tất cả." },
    { q: "Mình quen biết nhau vào mùa nào trong năm?",
      options: ["Mùa xuân", "Mùa hạ", "Mùa thu", "Mùa đông"],
      answer: 3, reaction: "Mùa đông năm ấy, vì có em, thành mùa đáng nhớ nhất." },
    { q: "Ai là người bắt chuyện trước?",
      options: ["{{HIS_NAME}}", "{{HER_NAME}}", "Cả hai cùng lúc", "Do người khác giới thiệu"],
      answer: 0, reaction: "May là hôm đó anh đủ can đảm." }, // ⬅️ SỬA nếu người bắt chuyện trước là Trâm
    { q: "Mình yêu nhau được bao lâu rồi?",
      options: ["2 tháng", "3 tháng", "Tròn 4 tháng", "Nửa năm"],
      answer: 2, reaction: "Tròn 4 tháng. Cảm ơn em đã ở bên anh." },
    { q: "Có một tấm hình của em mà anh giữ riêng — anh giữ nó từ khi nào?",
      options: ["Từ trước khi mình quen nhau", "Từ buổi hẹn đầu tiên", "Từ ngày mình yêu nhau", "Mới lưu tuần trước"],
      answer: 0, reaction: "Từ lúc chưa quen, anh đã lấy em làm mục tiêu để mình cố gắng." },
    { q: "Cặp đôi mình có 'tín vật' gì?",
      options: ["Vòng tay đôi", "Nhẫn đôi", "Áo đôi", "Dép đôi"],
      answer: 1, reaction: "Tín vật nhỏ, nhưng nghiêm túc." },
    { q: "Điều {{HIS_NAME}} nhớ nhất ở lần đầu gặp {{HER_NAME}} là gì?",
      options: ["Nụ cười của em", "Ánh mắt của em", "Cách em nhiệt tình với mọi người", "Tất cả những điều trên"],
      answer: 3, reaction: "Từ hôm đó anh đã thấy em đặc biệt." },
    { q: "Biệt danh anh hay gọi em là gì?",
      options: ["Bé", "Vợ", "Người thương", "Biệt danh riêng của mình"], // ⬅️ SỬA cho đúng biệt danh thật
      answer: 3, reaction: "Gọi quen rồi, không đổi được nữa." },
    { type: "date", q: "Mình chính thức yêu nhau vào ngày nào? Em nhập thử xem.",
      d: 13, m: 3, y: 2026,
      reaction: "13.03.2026 — ngày em đồng ý.",
      reactionWrong: "Là 13.03.2026 — thôi, ngày này để anh nhớ thay cho cả hai cũng được." },
  ],
  quizPerfect: "Đúng hết. Đúng là hiểu nhau thật.",
  quizDefault: "Không sao — mình còn nhiều thời gian để hiểu nhau thêm.",

  /* ---------- 10) LÝ DO (hiện thành dòng chạy trong chương cuối) ---------- */
  reasons: [
    "Em tốt bụng thật lòng — anh thấy điều đó ngay từ chuyến tình nguyện Đông Xuân.",
    "Nụ cười của em làm những ngày mệt mỏi nhẹ đi rất nhiều.",
    "Em nhường nhịn anh, kể cả những lúc anh sai.",
    "Em quan tâm anh từ những điều nhỏ nhất.",
    "Em kiên nhẫn giúp anh bỏ dần tật xấu, làm anh thành người tốt hơn.",
    "Từ trước khi quen, anh đã lấy em làm mục tiêu để cố gắng.",
    "Đi với em, chuyện gì bình thường cũng thành kỉ niệm.",
    "Và vì suốt bốn tháng qua, mỗi ngày em đều chọn ở lại.",
  ],

  /* ---------- 11) CÂY THÔNG LỜI CHÚC ---------- */
  wishtree: {
    chapter: "Chương mười",
    title: "Cây thông yêu thương",
    text: "Chuyện của mình bắt đầu từ chiến dịch Đông Xuân — nên ở đây có một cây thông. Cây này của riêng hai đứa: mỗi dịp đáng nhớ, mình lại cùng nhau treo lên một lời chúc.",
    passcode: "1303", // mật mã để treo lời chúc — chỉ hai đứa biết (đổi tuỳ ý)
    firebase: {
      apiKey: "AIzaSyA81E1I0eWEwXRqy2sUP2rdw4tr9lGZ9bE",
      authDomain: "anniversary4th.firebaseapp.com",
      projectId: "anniversary4th",
      storageBucket: "anniversary4th.firebasestorage.app",
      messagingSenderId: "466607430803",
      appId: "1:466607430803:web:e4d9454b33c66a198d0166",
    },
    thanksMessage: "Lời chúc của bạn đã được treo lên cây. Cảm ơn bạn nhiều! 🎄",
    // Mốc "khai trương": chỉ hiện các lời chúc gửi TỪ thời điểm này trở đi.
    // (Ẩn mấy quả châu thử nghiệm cũ; muốn hiện lại thì để 0.)
    launchTs: 1783844400000,
  },

  /* ---------- 12) CHƯƠNG CUỐI ---------- */
  finale: {
    photo: "assets/photos/10.jpg",
    chapter: "Chương cuối",
    title: "Cảm ơn em, vì đã là em",
    message:
`Trang này rồi sẽ cũ, nhưng điều anh muốn nói thì không.

Cảm ơn em vì đã xuất hiện vào đúng mùa đông năm ấy — lúc anh không ngờ tới nhất. Cảm ơn em vì bốn tháng vừa qua: không dài, nhưng đủ để anh biết mình muốn cùng em đi tiếp những mùa sau.

Nếu được ước một điều dưới bầu trời này, anh không ước gì to tát. Anh chỉ ước những gì mình đang có — em, và những ngày sắp tới của hai đứa — cứ thế mà bền lâu.

Tròn bốn tháng. Đi tiếp cùng anh nhé.`,
    sign: "Yêu em — {{HIS_NAME}}",
    button: "Thả một chiếc tim cho tụi mình",
  },
};
