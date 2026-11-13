// Sample data only (demo store «دار الريحان»).
localStorage.removeItem('tw_smart_mem_v1'); sessionStorage.clear();
const sel = (v) => [{ value: v, label: v, key: v }];
const sr = (el) => el.shadowRoot;
const click = (el, s, i = 0) => sr(el).querySelectorAll(s)[i]?.click();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
window.__cfg = {
  'murshid-advisor': { config: { side_image: 'img/hero3.jpg', results: 4 }, act: async (el) => { click(el, '.o', 1); await wait(400); click(el, '.o', 0); click(el, '.o', 1); await wait(100); click(el, '.nav .btn:not(.ghost)'); await wait(400); click(el, '.o', 1); await wait(500); } },
  'murshid-gift': { config: { recipients: [{ emoji: '👩', label: 'لها', products: [{ value: 110 }, { value: 104 }, { value: 109 }, { value: 111 }, { value: 101 }] }, { emoji: '👨', label: 'له', products: [{ value: 106 }, { value: 102 }, { value: 103 }] }, { emoji: '👵', label: 'للوالدة', products: [{ value: 103 }, { value: 108 }, { value: 112 }] }],
      occasions: [{ emoji: '🎂', label: 'عيد ميلاد', products: [{ value: 110 }, { value: 101 }, { value: 104 }, { value: 111 }] }, { emoji: '🌙', label: 'العيد', products: [{ value: 102 }, { value: 103 }, { value: 110 }] }], include_auto: false, cols: 3 },
    act: async (el) => { click(el, '.side .chip', 0); await wait(200); const ta = sr(el).querySelector('textarea'); ta.value = 'كل عام وأنتِ بخير يا أغلى الناس 🤍'; ta.dispatchEvent(new Event('input')); } },
  'murshid-chat': { config: { bot_name: 'ريحانة', whatsapp: '966500000000', intents: [{ label: 'الشحن والتوصيل', keywords: 'شحن, توصيل', reply: 'نوصل لكل مدن المملكة خلال 2-5 أيام عمل 🚚' }], typing_ms: 200, height: 600 },
    act: async (el) => { const i = sr(el).querySelector('input'); i.value = 'أبي هدية تحت 300'; i.dispatchEvent(new Event('input')); sr(el).querySelector('form').requestSubmit(); await wait(700); } },
  'murshid-size': { config: { chart: [['S', 145, 155, 40, 52, '52'], ['M', 152, 160, 50, 62, '54'], ['L', 158, 166, 60, 72, '56'], ['XL', 164, 172, 70, 85, '58'], ['XXL', 168, 185, 82, 110, '60']].map(([size, h_min, h_max, w_min, w_max, length]) => ({ size, h_min, h_max, w_min, w_max, length })), length_label: 'طول العباية', default_h: 163, default_w: 66, link: '#' },
    act: async (el) => { click(el, '.f > .btn'); } },
  'murshid-plan': { config: { needs: [{ emoji: '💧', label: 'ترطيب', desc: 'بشرة جافة أو مشدودة', tip: 'استخدمه بعد الاستحمام مباشرة', products: [{ value: 112 }, { value: 107 }, { value: 109 }] }, { emoji: '✨', label: 'نضارة', desc: 'إشراقة وتوحيد لون', tip: 'مرتين يومياً صباحاً ومساءً', products: [{ value: 109 }, { value: 112 }] }, { emoji: '🌿', label: 'عناية بالشعر', desc: 'تقصف أو جفاف', tip: 'على أطراف الشعر قبل النوم', products: [{ value: 105 }] }, { emoji: '🎁', label: 'تغليف هدية', desc: 'لو بتهديها', products: [{ value: 108 }] }] },
    act: async (el) => { click(el, '.n', 0); await wait(100); click(el, '.n', 1); await wait(100); click(el, '.n', 2); } },
};
