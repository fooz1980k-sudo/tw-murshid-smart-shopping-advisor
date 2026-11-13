from fields import *
STEP = [(i, f"السؤال {n}") for i, n in [(1, "الأول"), (2, "الثاني"), (3, "الثالث"), (4, "الرابع"), (5, "الخامس"), (6, "السادس")]]
adv = dict(title="مرشد · المستشار الذكي", icon="sicon-magic-wand", name="murshid-advisor", fields=HEAD("المستشار الذكي", "محتار؟ جاوب 3 أسئلة ونختار لك", "") + [
    COLL("questions", "الأسئلة (3 إلى 6)", [T("text", "نص السؤال", mx=90), T("hint", "توضيح صغير", mx=120), SW("multi", "يسمح بأكثر من إجابة")],
         [{"text": "لمين تشتري؟", "hint": "", "multi": False}, {"text": "وش الذوق؟", "hint": "", "multi": False}, {"text": "وش ميزانيتك؟", "hint": "", "multi": False}], mx=6, item="سؤال"),
    COLL("options", "الإجابات وربطها بالمنتجات", [RADIO("step", "تابعة لـ", STEP), T("emoji", "رمز", "✨", ml=False, mx=4), IMG("image", "صورة الإجابة (اختياري)"), T("label", "نص الإجابة", mx=40),
         PROD(label="المنتجات المناسبة لهذه الإجابة", mx=24), T("tags", "كلمات وصفية (اختياري، مفصولة بفواصل)", mx=80), NUM("weight", "وزن الإجابة في الترشيح", 3, 1, 10)], [], mx=36, item="إجابة"),
    SW("force_auto", "🤖 استخدم الاختبار التلقائي من بيانات متجرك (حتى لو أضفت أسئلة)"), NUM("pool", "🤖 عدد المنتجات التي يحللها الاختبار التلقائي", 24, 6, 48),
    ] + SRC("best_selling", 4, 24)[:2] + [SW("personalize", "🧠 فضّل ما يناسب سلوك الزائر عند التعادل", True), SW("hide_oos", "تجاهل النافد", True),
    NUM("results", "عدد النتائج", 4, 1, 8), SW("show_match", "إظهار نسبة التطابق المحسوبة", True), SW("show_reasons", "إظهار «يناسبك لأن…»", True), SW("show_answers", "إظهار ملخص إجاباته", True),
    SW("auto_advance", "انتقال تلقائي بعد الاختيار", True), SW("allow_back", "زر الرجوع", True), RADIO("progress", "مؤشر التقدم", [("bar", "شريط"), ("dots", "نقاط"), ("numbers", "أرقام"), ("none", "بدون")]),
    RADIO("layout", "التخطيط", [("split", "صورة جانبية + أسئلة"), ("card", "بطاقة فقط")]), IMG("side_image", "الصورة الجانبية"), SW("option_images", "إظهار صور الإجابات إن وجدت", True),
    T("result_title", "عنوان النتيجة", "ترشيحاتنا لك ✨", mx=60), TA("result_message", "رسالة النتيجة", "بناءً على اختياراتك، هذي أنسب المنتجات لك:", mx=220),
    SW("add_all", "زر «أضف الكل للسلة»", True), SW("share", "مشاركة النتيجة واتساب", True)] + DESIGN(theme="ivory"))
GRP = lambda id, label, item, val: COLL(id, label, [T("emoji", "رمز", "🎁", ml=False, mx=4), T("label", "الاسم", mx=30), PROD(label="المنتجات المناسبة", mx=24)], val, mx=12, item=item)
gift = dict(title="مرشد · محدد الهدايا", icon="sicon-gift", name="murshid-gift", fields=HEAD("محدد الهدايا", "الهدية الصح… بثلاث ضغطات", "") + [
    GRP("recipients", "لمين الهدية؟", "شخص", [{"emoji": "👩", "label": "لها"}, {"emoji": "👨", "label": "له"}, {"emoji": "👵", "label": "للوالدة"}, {"emoji": "🧒", "label": "للأطفال"}]),
    GRP("occasions", "المناسبات", "مناسبة", [{"emoji": "🎂", "label": "عيد ميلاد"}, {"emoji": "💍", "label": "زواج"}, {"emoji": "🎓", "label": "تخرج"}, {"emoji": "🌙", "label": "العيد"}]),
    T("who_label", "عنوان سؤال الشخص", "لمين الهدية؟", mx=40), T("occ_label", "عنوان سؤال المناسبة", "وش المناسبة؟", mx=40), T("budget_label", "عنوان الميزانية", "الميزانية", mx=30),
    SW("include_auto", "🤖 أضف منتجات من المصدر التلقائي للنتائج", True), NUM("pool", "عدد المنتجات التي يحللها", 24, 6, 48)] + SRC("top-rated", 8, 24)[:2] + [
    SW("personalize", "🧠 رتّب حسب سلوك الزائر", True), SW("show_budget", "مؤشر الميزانية (حدوده من أسعارك الفعلية)", True),
    RADIO("sort", "ترتيب النتائج", [("smart", "ذكي"), ("price_asc", "الأقل سعراً"), ("price_desc", "الأعلى سعراً"), ("rating", "الأعلى تقييماً")]),
    NUM("results", "عدد النتائج", 8, 2, 24), NUM("cols", "أعمدة النتائج", 3, 2, 4),
    SW("gift_note", "بطاقة إهداء تُرفق مع المنتج في السلة", True), T("note_title", "عنوان البطاقة", "بطاقة الإهداء", mx=30), T("note_placeholder", "نص إرشادي", "اكتب رسالتك هنا… نرفقها مع الهدية", mx=80),
    NUM("note_max", "أقصى عدد أحرف للرسالة", 160, 40, 400), COLOR("card_color1", "لون البطاقة 1"), COLOR("card_color2", "لون البطاقة 2")] + DESIGN())
chat = dict(title="مرشد · مساعد المحادثة", icon="sicon-chat-bubbles", name="murshid-chat", fields=HEAD("مساعد التسوق", "اسألني عن أي شي في المتجر", "") + [
    T("bot_name", "اسم المساعد", "", mx=30), IMG("avatar", "صورة المساعد"), T("status", "الحالة", "متصل الآن · يرد فوراً", mx=40), TA("greeting", "رسالة الترحيب", "", mx=240),
    COLL("intents", "مواضيع يفهمها المساعد", [T("label", "اسم الموضوع (يظهر كاقتراح)", mx=30), T("keywords", "كلمات مفتاحية (مفصولة بفواصل)", mx=200), TA("reply", "الرد", mx=400),
        PROD(label="منتجات يعرضها مع الرد", mx=12), URL("link", "رابط مع الرد"), T("link_text", "نص الرابط", mx=30)],
        [{"label": "الشحن والتوصيل", "keywords": "شحن, توصيل, متى يوصل, delivery, shipping", "reply": "نوصل لكل مدن المملكة خلال 2-5 أيام عمل 🚚"}, {"label": "الاستبدال والاسترجاع", "keywords": "استرجاع, استبدال, ارجاع, return", "reply": "تقدر تستبدل أو تسترجع خلال 7 أيام من الاستلام بشرط سلامة المنتج."}], mx=30, item="موضوع"),
    SW("search_fallback", "🤖 ابحث في منتجات المتجر الفعلية إذا ما فهم السؤال", True), T("suggestions", "اقتراحات إضافية (مفصولة بفواصل)", "", mx=200), SW("show_suggestions", "إظهار الاقتراحات السريعة", True),
    NUM("max_results", "أقصى عدد منتجات في الرد", 6, 1, 12), NUM("typing_ms", "مدة «يكتب الآن» (ms)", 700, 0, 3000),
    T("whatsapp", "رقم واتساب للتحويل لفريقك", ml=False, mx=20), TA("fallback", "رد عند عدم الفهم", "", mx=200), T("placeholder", "نص خانة الكتابة", "", mx=60),
    RADIO("mode", "طريقة العرض", [("inline", "داخل الصفحة"), ("floating", "زر عائم في الزاوية")]), NUM("height", "ارتفاع نافذة المحادثة (px)", 560, 380, 800)] + SRC("best_selling", 6, 24)[:2] + DESIGN(align="center"))
CH = [{"size": s, "h_min": a, "h_max": b, "w_min": c, "w_max": d, "length": l} for s, a, b, c, d, l in [("S", 145, 155, 40, 52, "52"), ("M", 152, 160, 50, 62, "54"), ("L", 158, 166, 60, 72, "56"), ("XL", 164, 172, 70, 85, "58"), ("XXL", 168, 185, 82, 110, "60")]]
size = dict(title="مرشد · مستشار المقاس", icon="sicon-ruler", name="murshid-size", fields=HEAD("مستشار المقاس", "مقاسك الصح من أول مرة", "") + [
    COLL("chart", "جدول المقاسات (من متجرك)", [T("size", "المقاس", ml=False, mx=10), INT("h_min", "الطول من (سم)"), INT("h_max", "الطول إلى (سم)"), INT("w_min", "الوزن من (كجم)"), INT("w_max", "الوزن إلى (كجم)"),
        T("length", "الطول المناسب للقطعة (اختياري، مثل 56)", ml=False, mx=20), T("note", "ملاحظة لهذا المقاس", mx=120)], CH, mx=12, item="مقاس"),
    T("length_label", "اسم عمود الطول", "طول العباية", mx=30), NUM("weight_importance", "🧠 أهمية الوزن مقابل الطول (%)", 60, 0, 100), SW("ask_fit", "اسأل عن القصّة (ضيقة/عادية/واسعة)", True),
    SW("show_confidence", "إظهار دقة الترشيح", True), SW("show_table", "إظهار جدول المقاسات", True), SW("remember", "🧠 تذكّر مقاس الزائر لزيارته القادمة", True),
    NUM("h_from", "أقل طول في المؤشر", 140, 100, 170), NUM("h_to", "أعلى طول في المؤشر", 195, 160, 220), NUM("w_from", "أقل وزن", 40, 20, 80), NUM("w_to", "أعلى وزن", 130, 70, 200),
    NUM("default_h", "الطول الافتراضي", 160, 100, 220), NUM("default_w", "الوزن الافتراضي", 62, 20, 200), TA("footer", "ملاحظة عامة أسفل النتيجة", "", mx=200), T("button", "نص الزر", "تسوّق مقاسك", mx=30), URL("link", "رابط الزر")] + DESIGN())
plan = dict(title="مرشد · خطتك خطوة بخطوة", icon="sicon-list", name="murshid-plan", fields=HEAD("خطتك", "وش تحتاج؟ نرتّبها لك خطوة بخطوة", "") + [
    COLL("needs", "الاحتياجات", [T("emoji", "رمز", "✨", ml=False, mx=4), T("label", "الاحتياج", mx=40), T("desc", "وصف قصير", mx=90), T("tip", "نصيحة تظهر مع المنتج", mx=140), PROD(label="المنتجات التي تلبيه", mx=24)],
         [{"emoji": "💧", "label": "ترطيب", "desc": "بشرة جافة أو مشدودة"}, {"emoji": "✨", "label": "نضارة", "desc": "إشراقة وتوحيد لون"}, {"emoji": "🌿", "label": "عناية بالشعر", "desc": "تقصف أو جفاف"}], mx=16, item="احتياج"),
    NUM("per_need", "عدد المنتجات لكل احتياج", 2, 1, 5), SW("preselect_first", "اختيار أول احتياج تلقائياً"), SW("show_covers", "إظهار الاحتياجات التي يغطيها كل منتج", True), SW("show_tips", "إظهار النصائح", True),
    TA("empty_text", "نص قبل الاختيار", "", mx=160), T("button", "نص زر الإضافة", "أضف الخطة كاملة للسلة", mx=40)] + SRC("best_selling", 8, 24)[:2] + [SW("hide_oos", "تجاهل النافد", True)] + DESIGN(theme="ivory"))
build("tw-murshid", repo="tw-murshid-smart-shopping-advisor", {"ar": "مُرشِد — مستشار التسوق الذكي", "en": "Murshid — Smart Shopping Advisor"},
      {"ar": "5 مستشارين أذكياء: اختبار يرشّح من منتجاتك ويشرح السبب (ويبني نفسه تلقائياً من أسعار ومبيعات وأقسام متجرك)، محدد هدايا بميزانية وبطاقة إهداء، مساعد محادثة يفهم الميزانية والعروض ويبحث في منتجاتك الفعلية، مستشار مقاس من جدولك، وخطة احتياجات خطوة بخطوة.",
       "en": "5 smart advisors: a quiz that scores your real products and explains why (and builds itself from your prices, sales and categories), a gift finder with budget and gift card, a chat assistant that understands budgets and searches your catalogue, a size advisor from your chart, and a needs-based shopping plan."},
      [adv, gift, chat, size, plan])
