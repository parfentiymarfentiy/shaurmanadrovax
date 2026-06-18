/* ============================================
   FIREBASE CONFIG
   ============================================ */
const firebaseConfig = {
    apiKey: "AIzaSyCavlaAqKb4APPdvfRHV6pZLNdGpZ-G2No",
    authDomain: "shaurma-na-drovax.firebaseapp.com",
    projectId: "shaurma-na-drovax",
    storageBucket: "shaurma-na-drovax.firebasestorage.app",
    messagingSenderId: "1013289093349",
    appId: "1:1013289093349:web:40524b97b6b08f359f2c0c"
};

/* ============================================
   FIREBASE INITIALIZATION
   ============================================ */
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase успешно инициализирован');
    }
} catch (err) {
    console.error('❌ Ошибка инициализации Firebase:', err);
}

const db = firebase.firestore();

/* ============================================
   DEFAULT MENU DATA
   Используется при первом запуске и при сбросе
   ============================================ */

   /* ═══════════════════════════════════════════════
TELEGRAM — дублирование заказов в Telegram
═══════════════════════════════════════════════ */
const TG_TOKEN = '8958309612:AAH6dRoO3kSUoueS0wM2KsCBtRYH-iOXUvU';
const TG_CHAT_ID = '6669059584';

async function sendOrderToTelegram(order) {
    const time = new Date().toLocaleString('ru-RU', { 
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Europe/Kiev'
    });
    
    const itemsList = order.items.map(i => 
        `  • ${i.name} × ${i.qty} = ${(i.price * i.qty).toLocaleString('uk-UA')} ₴`
    ).join('\n');
    
    const text = [
        `🔥 <b>НОВЫЙ ЗАКАЗ — Шаурма на Дровах</b>`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `📋 <b>Состав заказа:</b>`,
        itemsList,
        ``,
        `💰 <b>Итого: ${order.total.toLocaleString('uk-UA')} ₴</b>`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `👤 <b>Имя:</b> ${order.name}`,
        `📞 <b>Телефон:</b> <a href="tel:${order.phone.replace(/\D/g,'')}">${order.phone}</a>`,
        `📍 <b>Адрес:</b> ${order.address}`,
        order.comment ? `💬 <b>Комментарий:</b> <i>${order.comment}</i>` : null,
        order.prepayRequired ? `💳 <b>Предоплата:</b> ${order.prepayAmount} ₴ (${order.distance})` : null,
        ``,
        `🆔 <b>Номер заказа:</b> #${order.id.toString().slice(-5)}`,
        `🕐 <b>Время:</b> ${time}`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ].filter(Boolean).join('\n');
    
    try {
        const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: text,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }),
        });
        const json = await res.json();
        if (!json.ok) {
            console.warn('❌ TG ошибка:', json.description);
        } else {
            console.log('✅ Заказ отправлен в Telegram');
        }
    } catch (e) {
        console.error('❌ TG fetch error:', e);
    }
}
const DEFAULT_MENU = [
    // ШАУРМА
    {
        id: 1,
        cat: 'shawarma',
        badge: 'hit',
        name: { ru: 'Шаурма Классическая', ua: 'Шаурма Класична' },
        desc: { ru: 'Куриное филе, свежие овощи, фирменный соус, лаваш', ua: 'Куряче філе, свіжі овочі, фірмовий соус, лаваш' },
        price: 120,
        weight: '350г',
        img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80'
    },
    {
        id: 2,
        cat: 'shawarma',
        badge: 'new',
        name: { ru: 'Шаурма Сырная', ua: 'Шаурма Сирна' },
        desc: { ru: 'Двойной сыр моцарелла, курица, овощи, чесночный соус', ua: 'Подвійний сир моцарела, курка, овочі, часниковий соус' },
        price: 145,
        weight: '400г',
        img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80'
    },
    {
        id: 3,
        cat: 'shawarma',
        badge: 'hot',
        name: { ru: 'Шаурма Острая', ua: 'Шаурма Гостра' },
        desc: { ru: 'Острое куриное мясо, халапеньо, соус чили', ua: "Гостре куряче м'ясо, халапеньо, соус чилі" },
        price: 135,
        weight: '350г',
        img: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=600&q=80'
    },
    {
        id: 4,
        cat: 'shawarma',
        badge: 'hit',
        name: { ru: 'Шаурма Мясная XXL', ua: 'Шаурма М\'ясна XXL' },
        desc: { ru: 'Микс говядины и курицы, овощи, сыр, соусы', ua: 'Мікс яловичини та курки, овочі, сир, соуси' },
        price: 175,
        weight: '500г',
        img: 'https://images.unsplash.com/photo-1561651881-dcf008a708a7?w=600&q=80'
    },

    // МЯСО НА ДРОВАХ
    {
        id: 10,
        cat: 'meat',
        badge: 'hit',
        name: { ru: 'Шашлык из свиной шеи', ua: 'Шашлик зі свинячої шиї' },
        desc: { ru: 'Сочная свиная шея на мангале, коржик, лук, соус', ua: 'Соковита свиняча шия на мангалі, коржик, цибуля, соус' },
        price: 190,
        weight: '350/150г',
        img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80'
    },
    {
        id: 11,
        cat: 'meat',
        badge: 'new',
        name: { ru: 'Молодые свиные рёбра', ua: 'Молоді свинячі ребра' },
        desc: { ru: 'Нежные рёбрышки на гриле с медовым соусом', ua: 'Ніжні реберця на грилі з медовим соусом' },
        price: 190,
        weight: '350/150г',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
        id: 12,
        cat: 'meat',
        badge: 'new',
        name: { ru: 'Стейк Томагавк', ua: 'Стейк Томагавк' },
        desc: { ru: 'Премиальная телятина на кости, прожарка medium', ua: 'Преміальна телятина на кістці, прожарка medium' },
        price: 320,
        weight: '300г',
        img: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80'
    },
    {
        id: 13,
        cat: 'meat',
        badge: 'hit',
        name: { ru: 'Шашлык «Наполеон»', ua: 'Шашлик «Наполеон»' },
        desc: { ru: 'Слоёное мясо с салом, коржик, овощи', ua: 'Шарове м\'ясо з салом, коржик, овочі' },
        price: 200,
        weight: '300/150г',
        img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80'
    },
    {
        id: 14,
        cat: 'meat',
        badge: null,
        name: { ru: 'Шашлык из куриного филе', ua: 'Шашлик з курячого філе' },
        desc: { ru: 'Диетическое белое мясо с овощами на гриле', ua: 'Дієтичне біле м\'ясо з овочами на грилі' },
        price: 150,
        weight: '350/150г',
        img: 'https://images.unsplash.com/photo-1532550907401-a500c9a5243a?w=600&q=80'
    },
    {
        id: 15,
        cat: 'meat',
        badge: null,
        name: { ru: 'Шашлык из куриного бедра', ua: 'Шашлик з курячого стегна' },
        desc: { ru: 'Сочное бедро с хрустящей корочкой', ua: 'Соковите стегно з хрусткою скоринкою' },
        price: 150,
        weight: '350/150г',
        img: 'https://images.unsplash.com/photo-1598514982205-f36b968e7b71?w=600&q=80'
    },
    {
        id: 16,
        cat: 'meat',
        badge: 'hot',
        name: { ru: 'Куриные крылышки BBQ', ua: 'Курячі крильця BBQ' },
        desc: { ru: 'Острые крылья в соусе барбекю, 6 штук', ua: 'Гострі крильця в соусі барбекю, 6 штук' },
        price: 135,
        weight: '340/150г',
        img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80'
    },
    {
        id: 17,
        cat: 'meat',
        badge: null,
        name: { ru: 'Люля-кебаб из курицы', ua: 'Люля-кебаб з курки' },
        desc: { ru: 'Рубленое мясо со специями на шпажке', ua: 'Січене м\'ясо зі спеціями на шпажці' },
        price: 140,
        weight: '250/150г',
        img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 18,
        cat: 'meat',
        badge: null,
        name: { ru: 'Люля-кебаб из телятины', ua: 'Люля-кебаб з телятини' },
        desc: { ru: 'Нежная телятина с зеленью и специями', ua: 'Ніжна телятина з зеленню та спеціями' },
        price: 160,
        weight: '250/150г',
        img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80'
    },
    {
        id: 19,
        cat: 'meat',
        badge: 'hit',
        name: { ru: 'Скумбрия на мангале', ua: 'Скумбрія на мангалі' },
        desc: { ru: 'Целая рыба с лимоном и травами на углях', ua: 'Ціла риба з лимоном та травами на вугіллі' },
        price: 270,
        weight: '1 шт',
        img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80'
    },

    // НА МАНГАЛЕ
    {
        id: 30,
        cat: 'grill',
        badge: 'hit',
        name: { ru: 'Хачапури на мангале', ua: 'Хачапурі на мангалі' },
        desc: { ru: 'Горячий хлеб с сыром сулугуни на углях', ua: 'Гарячий хліб із сиром сулугуні на вугіллі' },
        price: 130,
        weight: '250г',
        img: 'https://images.unsplash.com/photo-1574884840779-29cd5936f9ca?w=600&q=80'
    },
    {
        id: 31,
        cat: 'grill',
        badge: null,
        name: { ru: 'Ламаджо в лаваше', ua: 'Ламаджо в лаваші' },
        desc: { ru: 'Армянская лепешка с мясом и овощами', ua: "Вірменська коржик з м'ясом та овочами" },
        price: 150,
        weight: '400г',
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80'
    },
    {
        id: 32,
        cat: 'grill',
        badge: null,
        name: { ru: 'Овощи на гриле', ua: 'Овочі на грилі' },
        desc: { ru: 'Перец, баклажан, томаты, кабачок', ua: 'Перець, баклажан, томати, кабачок' },
        price: 120,
        weight: '250г',
        img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&q=80'
    },
    {
        id: 33,
        cat: 'grill',
        badge: null,
        name: { ru: 'Грибы на гриле', ua: 'Гриби на грилі' },
        desc: { ru: 'Шампиньоны с чесночным маслом', ua: 'Печериці з часниковим маслом' },
        price: 110,
        weight: '250г',
        img: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=600&q=80'
    },

    // ГАРНИРЫ
    {
        id: 40,
        cat: 'sides',
        badge: 'hit',
        name: { ru: 'Картошка с салом', ua: 'Картопля з салом' },
        desc: { ru: 'Запечённая картошка с салом и чесноком', ua: 'Запечена картопля з салом та часником' },
        price: 100,
        weight: '250/50г',
        img: 'https://images.unsplash.com/photo-1590165690336-233375988482?w=600&q=80'
    },
    {
        id: 41,
        cat: 'sides',
        badge: null,
        name: { ru: 'Картофель фри', ua: 'Картопля фрі' },
        desc: { ru: 'Хрустящий картофель с соусом на выбор', ua: 'Хрустка картопля з соусом на вибір' },
        price: 90,
        weight: '150/40г',
        img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80'
    },
    {
        id: 42,
        cat: 'sides',
        badge: null,
        name: { ru: 'Соус чесночный', ua: 'Соус часниковий' },
        desc: { ru: 'Фирменный чесночный соус', ua: 'Фірмовий часниковий соус' },
        price: 25,
        weight: '50г',
        img: 'https://images.unsplash.com/photo-1472476443541-61c597d5730b?w=600&q=80'
    }
];

/* ============================================
   DEFAULT LOCATIONS (3 исходные точки)
   ============================================ */
const DEFAULT_LOCATIONS = [
    {
        id: 1,
        tag: { ru: 'Район Котовского', ua: 'Район Котовського' },
        address: { ru: 'ул. Генерала Бочарова, 60', ua: 'вул. Генерала Бочарова, 60' },
        fullAddress: 'Одесса, Генерала Бочарова 60',
        phone: '066-975-00-07',
        hours: '10:00 — 23:00',
        lat: 46.5089,
        lng: 30.7522
    },
    {
        id: 2,
        tag: { ru: 'Черёмушки', ua: 'Черемушки' },
        address: { ru: 'ул. Крымская, 60', ua: 'вул. Кримська, 60' },
        fullAddress: 'Одесса, Крымская 60',
        phone: '073-975-00-07',
        hours: '10:00 — 23:00',
        lat: 46.4571,
        lng: 30.7121
    },
    {
        id: 3,
        tag: { ru: 'Таирово', ua: 'Таїрове' },
        address: { ru: 'пр-т Академика Глушко, 14/3', ua: 'пр-т Академіка Глушка, 14/3' },
        fullAddress: 'Одесса, Академика Глушко 14',
        phone: '096-975-00-07',
        hours: '10:00 — 23:00',
        lat: 46.4372,
        lng: 30.6884
    }
];

/* ============================================
   DEFAULT SETTINGS (настройки доставки)
   ============================================ */
const DEFAULT_SETTINGS = {
    freeRadius: 4,                    // км - радиус бесплатной доставки
    prepayPercent: 15,                // % - процент предоплаты при > радиуса
    minOrder: 0,                      // ₴ - минимальная сумма заказа
    cardNumber: '5168 7427 XXXX XXXX',
    cardName: 'ІВАНОВ ІВАН ІВАНОВИЧ',
    cardBank: 'Monobank',
    prepayMessage: 'Ваш адрес находится дальше зоны бесплатной доставки. Для подтверждения заказа, пожалуйста, переведите предоплату на карту.'
};

/* ============================================
   I18N TRANSLATIONS (RU)
   ============================================ */
const I18N = {
    ru: {
        // Preloader
        preloader: 'Разжигаем мангал...',
        
        // Logo
        logoMain: 'ШАУРМА НА ДРОВАХ',
        logoSub: '& МЯСО НА ДРОВАХ',
        
        // Navigation
        navMenu: 'Меню',
        navLocations: 'Адреса',
        navDelivery: 'Доставка',
        navContacts: 'Контакты',
        
        // Hero
        heroBadge: 'Работаем с 2018 года',
        heroTitle1: 'Самая сочная',
        heroTitle2: 'ШАУРМА',
        heroTitle3: 'в Одессе',
        heroSubtitle: 'Готовим на дровах и углях. Доставим горячую шаурму и мясо с мангала к вашей двери за 40 минут.',
        heroCta: 'Смотреть меню',
        heroCta2: 'Наши точки',
        heroStat1: 'точки в Одессе',
        heroStat2: 'доставка',
        heroStat3: 'рейтинг',
        heroScroll: 'Листайте вниз',
        
        // Locations
        locEyebrow: 'Наши точки',
        locTitle: 'Где нас найти',
        locDesc: 'Сеть шаурмичных в разных районах Одессы',
        locHours: '10:00 — 23:00',
        locRoute: 'Проложить маршрут',
        
        // Menu
        menuEyebrow: 'Меню',
        menuTitle: 'Готовим на огне',
        menuDesc: 'Сочное мясо на мангале, фирменная шаурма и авторские блюда',
        filterAll: 'Всё меню',
        filterShawarma: 'Шаурма',
        filterMeat: 'Мясо на дровах',
        filterGrill: 'На мангале',
        filterSides: 'Гарниры',
        
        // Delivery
        deliveryEyebrow: 'Доставка',
        deliveryTitle: 'По всей Одессе',
        deliveryText: 'Привезём горячую шаурму и мясо с мангала прямо к вашей двери. Работаем без выходных, принимаем оплату наличными или картой.',
        perk1Title: '40-60 минут',
        perk1Text: 'Среднее время доставки',
        perk2Title: 'Бесплатно от 500 ₴',
        perk2Text: 'В пределах города',
        perk3Title: 'Наличные или карта',
        perk3Text: 'Любой удобный способ',
        deliveryHot: 'Всегда горячее',
        
        // Cart
        cartTitle: 'Ваш заказ',
        cartEmpty: 'Корзина пока пуста',
        cartBrowse: 'Выбрать блюда',
        cartItems: 'Позиций:',
        cartTotal: 'Итого:',
        cartCheckout: 'Оформить заказ',
        
        // Checkout
        checkoutTitle: 'Оформление заказа',
        checkoutSub: 'Заполните данные для доставки по Одессе',
        fieldName: 'Ваше имя',
        fieldPhone: 'Телефон',
        fieldAddress: 'Адрес доставки',
        fieldComment: 'Комментарий',
        checkoutSubmit: 'Подтвердить заказ',
        checkoutSum: 'К оплате',
        
        // Success
        successTitle: 'Спасибо за заказ!',
        successText: 'Оператор перезвонит вам в ближайшее время для подтверждения.',
        successClose: 'Отлично',
        
        // Admin
        adminTitle: 'Панель администратора',
        adminExport: 'Экспорт JSON',
        adminClear: 'Очистить',
        adminClose: 'Закрыть',
        adminLogout: 'Выйти',
        
        // Admin tabs
        tabOrders: 'Заказы',
        tabMenu: 'Меню',
        tabLocations: 'Точки',
        tabSettings: 'Настройки',
        
        // Admin stats
        adminStatOrders: 'Всего заказов',
        adminStatRevenue: 'Выручка',
        adminStatAvg: 'Средний чек',
        adminStatNew: 'Новых',
        
        // Admin table
        thId: '№',
        thTime: 'Время',
        thClient: 'Клиент',
        thPhone: 'Телефон',
        thAddress: 'Адрес',
        thItems: 'Состав',
        thSum: 'Сумма',
        thStatus: 'Статус',
        adminEmpty: 'Заказов пока нет',
        statusNew: 'Новый',
        statusDone: 'Выполнен',
        actionDone: 'Выполнить',
        actionDelete: 'Удалить',
        
        // Footer
        footerTag: 'Сеть шаурмичных и мангала в Одессе',
        footerContacts: 'Контакты',
        footerHours: 'Режим работы',
        footerSocial: 'Мы в соцсетях',
        footerWork: 'Ежедневно',
        footerDelivery: 'Доставка по всей Одессе',
        
        // Toasts
        toastAdded: 'Добавлено в корзину',
        
        // Form errors
        errName: 'Введите имя (минимум 2 символа)',
        errPhone: 'Введите корректный номер',
        errAddress: 'Укажите адрес доставки',
        
        // Password modal
        pwdTitle: 'Доступ ограничен',
        pwdSub: 'Введите пароль для входа в панель администратора',
        pwdSubmit: 'Войти',
        pwdError: 'Неверный пароль. Попробуйте ещё раз.',
        
        // Admin messages
        logoutConfirm: 'Выйти из панели администратора?',
        logoutSuccess: 'Вы вышли из системы',
        clearConfirm: 'Удалить все заказы?',
        
        // Product CRUD
        productAdd: 'Добавить товар',
        productEdit: 'Редактировать',
        productSave: 'Сохранить товар',
        productAddTitle: 'Добавить новый товар',
        productEditTitle: 'Редактировать товар',
        productSub: 'Заполните данные блюда',
        productSaved: 'Товар сохранён',
        productDeleted: 'Товар удалён',
        menuReset: 'Сбросить к дефолтному',
        menuResetConfirm: 'Сбросить меню к заводским настройкам? Все изменения будут потеряны.',
        menuResetDone: 'Меню сброшено',
        productDeleteConfirm: 'Удалить этот товар?',
        
        // Categories
        catShawarma: 'Шаурма',
        catMeat: 'Мясо на дровах',
        catGrill: 'На мангале',
        catSides: 'Гарниры',
        
        // Validation
        productRequiredFields: 'Заполните обязательные поля (название RU/UA и цена)',
        imageUploadError: 'Ошибка загрузки изображения',
        
        // Prepay modal
        prepayTitle: 'Требуется предоплата',
        prepayAmount: 'Сумма предоплаты:',
        prepayCardLabel: 'Номер карты:',
        prepayConfirmed: 'Я оплатил, подтвердить заказ',
        prepayCancel: 'Отменить',
        distanceKm: 'км от ближайшей точки',
        
        // Location CRUD
        locationSaved: 'Точка сохранена',
        locationDeleted: 'Точка удалена',
        locationDeleteConfirm: 'Удалить эту точку?',
        
        // Settings
        settingsSaved: 'Настройки сохранены',
        
        // Geocoding
        geocodeSuccess: 'Координаты определены!',
        geocodeError: 'Не удалось определить адрес',
        geocodeLoading: 'Определяем координаты...',
        
        // Currency
        currency: '₴'
    },
    
    ua: {
        // Preloader
        preloader: 'Розпалюємо мангал...',
        
        // Logo
        logoMain: 'ШАУРМА НА ДРОВАХ',
        logoSub: "& М'ЯСО НА ДРОВАХ",
        
        // Navigation
        navMenu: 'Меню',
        navLocations: 'Адреси',
        navDelivery: 'Доставка',
        navContacts: 'Контакти',
        
        // Hero
        heroBadge: 'Працюємо з 2018 року',
        heroTitle1: 'Найсоковитіша',
        heroTitle2: 'ШАУРМА',
        heroTitle3: 'в Одесі',
        heroSubtitle: "Готуємо на дровах та вугіллі. Доставимо гарячу шаурму та м'ясо з мангалу до ваших дверей за 40 хвилин.",
        heroCta: 'Дивитися меню',
        heroCta2: 'Наші точки',
        heroStat1: 'точки в Одесі',
        heroStat2: 'доставка',
        heroStat3: 'рейтинг',
        heroScroll: 'Гортайте вниз',
        
        // Locations
        locEyebrow: 'Наші точки',
        locTitle: 'Де нас знайти',
        locDesc: 'Мережа шаурмичних в різних районах Одеси',
        locHours: '10:00 — 23:00',
        locRoute: 'Прокласти маршрут',
        
        // Menu
        menuEyebrow: 'Меню',
        menuTitle: 'Готуємо на вогні',
        menuDesc: "Соковите м'ясо на мангалі, фірмова шаурма та авторські страви",
        filterAll: 'Все меню',
        filterShawarma: 'Шаурма',
        filterMeat: "М'ясо на дровах",
        filterGrill: 'На мангалі',
        filterSides: 'Гарніри',
        
        // Delivery
        deliveryEyebrow: 'Доставка',
        deliveryTitle: 'По всій Одесі',
        deliveryText: "Привеземо гарячу шаурму та м'ясо з мангалу просто до ваших дверей. Працюємо без вихідних, приймаємо оплату готівкою або карткою.",
        perk1Title: '40-60 хвилин',
        perk1Text: 'Середній час доставки',
        perk2Title: 'Безкоштовно від 500 ₴',
        perk2Text: 'В межах міста',
        perk3Title: 'Готівка або картка',
        perk3Text: 'Будь-який зручний спосіб',
        deliveryHot: 'Завжди гаряче',
        
        // Cart
        cartTitle: 'Ваше замовлення',
        cartEmpty: 'Кошик поки порожній',
        cartBrowse: 'Вибрати страви',
        cartItems: 'Позицій:',
        cartTotal: 'Разом:',
        cartCheckout: 'Оформити замовлення',
        
        // Checkout
        checkoutTitle: 'Оформлення замовлення',
        checkoutSub: 'Заповніть дані для доставки по Одесі',
        fieldName: "Ваше ім'я",
        fieldPhone: 'Телефон',
        fieldAddress: 'Адреса доставки',
        fieldComment: 'Коментар',
        checkoutSubmit: 'Підтвердити замовлення',
        checkoutSum: 'До сплати',
        
        // Success
        successTitle: 'Дякуємо за замовлення!',
        successText: 'Оператор зателефонує вам найближчим часом для підтвердження.',
        successClose: 'Чудово',
        
        // Admin
        adminTitle: 'Панель адміністратора',
        adminExport: 'Експорт JSON',
        adminClear: 'Очистити',
        adminClose: 'Закрити',
        adminLogout: 'Вийти',
        
        // Admin tabs
        tabOrders: 'Замовлення',
        tabMenu: 'Меню',
        tabLocations: 'Точки',
        tabSettings: 'Налаштування',
        
        // Admin stats
        adminStatOrders: 'Всього замовлень',
        adminStatRevenue: 'Виручка',
        adminStatAvg: 'Середній чек',
        adminStatNew: 'Нових',
        
        // Admin table
        thId: '№',
        thTime: 'Час',
        thClient: 'Клієнт',
        thPhone: 'Телефон',
        thAddress: 'Адреса',
        thItems: 'Склад',
        thSum: 'Сума',
        thStatus: 'Статус',
        adminEmpty: 'Замовлень поки немає',
        statusNew: 'Новий',
        statusDone: 'Виконано',
        actionDone: 'Виконати',
        actionDelete: 'Видалити',
        
        // Footer
        footerTag: 'Мережа шаурмичних та мангалу в Одесі',
        footerContacts: 'Контакти',
        footerHours: 'Графік роботи',
        footerSocial: 'Ми в соцмережах',
        footerWork: 'Щодня',
        footerDelivery: 'Доставка по всій Одесі',
        
        // Toasts
        toastAdded: 'Додано в кошик',
        
        // Form errors
        errName: "Введіть ім'я (мінімум 2 символи)",
        errPhone: 'Введіть коректний номер',
        errAddress: 'Вкажіть адресу доставки',
        
        // Password modal
        pwdTitle: 'Доступ обмежено',
        pwdSub: 'Введіть пароль для входу в панель адміністратора',
        pwdSubmit: 'Увійти',
        pwdError: 'Невірний пароль. Спробуйте ще раз.',
        
        // Admin messages
        logoutConfirm: 'Вийти з панелі адміністратора?',
        logoutSuccess: 'Ви вийшли з системи',
        clearConfirm: 'Видалити всі замовлення?',
        
        // Product CRUD
        productAdd: 'Додати товар',
        productEdit: 'Редагувати',
        productSave: 'Зберегти товар',
        productAddTitle: 'Додати новий товар',
        productEditTitle: 'Редагувати товар',
        productSub: 'Заповніть дані страви',
        productSaved: 'Товар збережено',
        productDeleted: 'Товар видалено',
        menuReset: 'Скинути до типового',
        menuResetConfirm: 'Скинути меню до заводських налаштувань? Всі зміни будуть втрачені.',
        menuResetDone: 'Меню скинуто',
        productDeleteConfirm: 'Видалити цей товар?',
        
        // Categories
        catShawarma: 'Шаурма',
        catMeat: "М'ясо на дровах",
        catGrill: 'На мангалі',
        catSides: 'Гарніри',
        
        // Validation
        productRequiredFields: "Заповніть обов'язкові поля (назва RU/UA і ціна)",
        imageUploadError: 'Помилка завантаження зображення',
        
        // Prepay modal
        prepayTitle: 'Потрібна передоплата',
        prepayAmount: 'Сума передоплати:',
        prepayCardLabel: 'Номер картки:',
        prepayConfirmed: 'Я сплатив, підтвердити замовлення',
        prepayCancel: 'Скасувати',
        distanceKm: 'км від найближчої точки',
        
        // Location CRUD
        locationSaved: 'Точку збережено',
        locationDeleted: 'Точку видалено',
        locationDeleteConfirm: 'Видалити цю точку?',
        
        // Settings
        settingsSaved: 'Налаштування збережено',
        
        // Geocoding
        geocodeSuccess: 'Координати визначено!',
        geocodeError: 'Не вдалося визначити адресу',
        geocodeLoading: 'Визначаємо координати...',
        
        // Currency
        currency: '₴'
    }
};

/* ============================================
   BADGE & CATEGORY LABELS MAPPINGS
   ============================================ */
const BADGE_LABELS = {
    hit: { ru: 'Хит', ua: 'Хіт' },
    new: { ru: 'Новинка', ua: 'Новинка' },
    hot: { ru: 'Остро', ua: 'Гостро' }
};

const CAT_LABELS = {
    shawarma: 'catShawarma',
    meat: 'catMeat',
    grill: 'catGrill',
    sides: 'catSides'
};

/* ============================================
   APPLICATION STATE
   ============================================ */
const State = {
    lang: localStorage.getItem('sh_lang') || 'ru',
    cart: JSON.parse(localStorage.getItem('sh_cart') || '[]'),
    orders: [],
    menu: [],
    locations: [],
    settings: {...DEFAULT_SETTINGS},
    filter: 'all',
    tempImage: '',
    unsubMenu: null,
    unsubOrders: null,
    unsubLocations: null,
    unsubSettings: null,
    lastOrderTime: Date.now(),
    isAdminViewing: false
};

/* ============================================
   HELPER FUNCTIONS
   ============================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const saveCart = () => {
    localStorage.setItem('sh_cart', JSON.stringify(State.cart));
    localStorage.setItem('sh_lang', State.lang);
};

const t = key => I18N[State.lang][key] || key;
const money = n => `${n.toLocaleString('ru-RU')} ${t('currency')}`;

function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    $('#toastMsg').textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 2500);
}

function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
}

/* ============================================
   FIREBASE - MENU INITIALIZATION
   ============================================ */
async function initMenu() {
    try {
        const snapshot = await db.collection('menu').get();
        
        // Если коллекция пустая — заливаем дефолтное меню
        if (snapshot.empty) {
            console.log('📦 Меню пустое, загружаю дефолтное...');
            const batch = db.batch();
            DEFAULT_MENU.forEach(item => {
                const ref = db.collection('menu').doc(String(item.id));
                batch.set(ref, item);
            });
            await batch.commit();
            console.log(`✅ Загружено ${DEFAULT_MENU.length} товаров`);
        }
    } catch (err) {
        console.error('❌ Ошибка инициализации меню:', err);
    }
    
    // Слушаем изменения меню в реальном времени
    State.unsubMenu = db.collection('menu').onSnapshot(
        snapshot => {
            console.log(`📡 Получено ${snapshot.docs.length} товаров из Firebase`);
            State.menu = snapshot.docs.map(doc => ({
                id: parseInt(doc.id),
                ...doc.data()
            })).sort((a, b) => a.id - b.id);
            
            renderMenu();
            renderCart();
            if (State.isAdminViewing) renderAdminMenu();
        },
        err => {
            console.error('❌ Ошибка listener меню:', err);
        }
    );
}

/* ============================================
   FIREBASE - ORDERS INITIALIZATION
   ============================================ */
async function initOrders() {
    State.lastOrderTime = Date.now();
    
    State.unsubOrders = db.collection('orders')
        .orderBy('id', 'desc')
        .onSnapshot(
            snapshot => {
                const previousIds = new Set(State.orders.map(o => o.id));
                const wasEmpty = State.orders.length === 0;
                
                State.orders = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    _docId: doc.id
                }));
                
                console.log(`📡 Получено ${State.orders.length} заказов`);
                renderAdmin();
                
                // Детекция новых заказов
                if (!wasEmpty && State.isAdminViewing) {
                    State.orders.forEach(o => {
                        if (!previousIds.has(o.id) && o.id > State.lastOrderTime) {
                            playNewOrderSound();
                            toast('🔔 Новый заказ #' + o.id.toString().slice(-5));
                        }
                    });
                }
                
                State.lastOrderTime = Math.max(
                    State.lastOrderTime,
                    ...State.orders.map(o => o.id),
                    Date.now() - 60000
                );
            },
            err => {
                console.error('❌ Ошибка listener заказов:', err);
            }
        );
}

/* ============================================
   FIREBASE - LOCATIONS INITIALIZATION
   ============================================ */
async function initLocations() {
    try {
        const snapshot = await db.collection('locations').get();
        
        // Если коллекция пустая — заливаем дефолтные точки
        if (snapshot.empty) {
            console.log('📍 Точки пустые, загружаю дефолтные...');
            const batch = db.batch();
            DEFAULT_LOCATIONS.forEach(loc => {
                const ref = db.collection('locations').doc(String(loc.id));
                batch.set(ref, loc);
            });
            await batch.commit();
            console.log(`✅ Загружено ${DEFAULT_LOCATIONS.length} точек`);
        }
    } catch (err) {
        console.error('❌ Ошибка инициализации локаций:', err);
    }
    
    // Слушаем изменения локаций в реальном времени
    State.unsubLocations = db.collection('locations').onSnapshot(
        snapshot => {
            console.log(`📡 Получено ${snapshot.docs.length} локаций из Firebase`);
            State.locations = snapshot.docs.map(doc => ({
                id: parseInt(doc.id),
                ...doc.data()
            })).sort((a, b) => a.id - b.id);
            
            renderLocations();
            updateFooterPhones();
            if (State.isAdminViewing) renderAdminLocations();
        },
        err => {
            console.error('❌ Ошибка listener локаций:', err);
        }
    );
}

/* ============================================
   FIREBASE - SETTINGS INITIALIZATION
   ============================================ */
async function initSettings() {
    try {
        const doc = await db.collection('settings').doc('delivery').get();
        
        if (!doc.exists) {
            console.log('⚙️ Настройки пустые, загружаю дефолтные...');
            await db.collection('settings').doc('delivery').set(DEFAULT_SETTINGS);
            State.settings = {...DEFAULT_SETTINGS};
        } else {
            State.settings = {...DEFAULT_SETTINGS, ...doc.data()};
        }
        console.log('✅ Настройки загружены');
    } catch (err) {
        console.error('❌ Ошибка инициализации настроек:', err);
        State.settings = {...DEFAULT_SETTINGS};
    }
    
    // Слушаем изменения настроек в реальном времени
    State.unsubSettings = db.collection('settings').doc('delivery').onSnapshot(
        doc => {
            if (doc.exists) {
                State.settings = {...DEFAULT_SETTINGS, ...doc.data()};
                if (State.isAdminViewing) renderSettingsForm();
            }
        },
        err => {
            console.error('❌ Ошибка listener настроек:', err);
        }
    );
}

/* ============================================
   SOUND NOTIFICATION FOR NEW ORDERS
   ============================================ */
function playNewOrderSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99]; // C, E, G аккорд
        
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3);
            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.3);
        });
    } catch (e) {
        console.warn('Audio not supported:', e);
    }
}

/* ============================================
   I18N APPLY
   ============================================ */
function applyLang() {
    document.documentElement.lang = State.lang;
    
    $$('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[State.lang][key] !== undefined) {
            el.textContent = I18N[State.lang][key];
        }
    });
    
    const langText = $('.lang-toggle__text');
    if (langText) langText.textContent = State.lang === 'ru' ? 'UA' : 'RU';
    
    renderMenu();
    renderCart();
    renderLocations();
    
    if (State.isAdminViewing) {
        renderAdmin();
        renderAdminMenu();
        renderAdminLocations();
    }
}

/* ============================================
   RENDER MENU (FRONT)
   ============================================ */
function renderMenu() {
    const grid = $('#menuGrid');
    if (!grid) return;
    
    const items = State.filter === 'all' 
        ? State.menu 
        : State.menu.filter(p => p.cat === State.filter);
    
    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--c-text-3)">
            ${State.lang === 'ru' ? 'Загрузка меню...' : 'Завантаження меню...'}
        </div>`;
        return;
    }
    
    grid.innerHTML = items.map((p, i) => {
        const badgeHtml = p.badge 
            ? `<span class="product__badge product__badge--${p.badge}">${BADGE_LABELS[p.badge][State.lang]}</span>` 
            : '';
        const imgSrc = p.img || 'https://placehold.co/600x450/1a1a1a/ff4d1a?text=No+Image';
        const desc = (p.desc && p.desc[State.lang]) || '';
        
        return `
            <article class="product" style="animation-delay:${i * .04}s">
                <div class="product__img">
                    ${badgeHtml}
                    <img src="${imgSrc}" 
                         alt="${escapeHtml(p.name[State.lang])} — доставка Одесса" 
                         loading="lazy"
                         onerror="this.src='https://placehold.co/600x450/1a1a1a/ff4d1a?text=No+Image'">
                </div>
                <div class="product__body">
                    <div class="product__head">
                        <h3 class="product__name">${escapeHtml(p.name[State.lang])}</h3>
                        <span class="product__weight">${escapeHtml(p.weight || '')}</span>
                    </div>
                    <p class="product__desc">${escapeHtml(desc)}</p>
                    <div class="product__foot">
                        <span class="product__price">${money(p.price)}</span>
                        <button class="add-btn" data-add="${p.id}" aria-label="В корзину">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

/* ============================================
   RENDER LOCATIONS (FRONT)
   ============================================ */
function renderLocations() {
    const list = $('#locationsList');
    if (!list) return;
    
    if (State.locations.length === 0) {
        list.innerHTML = `<li style="text-align:center;padding:60px;color:var(--c-text-3)">
            ${State.lang === 'ru' ? 'Загрузка...' : 'Завантаження...'}
        </li>`;
        return;
    }
    
    list.innerHTML = State.locations.map(loc => `
        <li class="location-card" itemscope itemtype="https://schema.org/Place">
            <div class="location-card__marker-wrap">
                <div class="location-card__marker-big">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="location-card__tag">${escapeHtml(loc.tag[State.lang])}</div>
            </div>
            <div class="location-card__body">
                <h3 class="location-card__title" itemprop="name">
                    <span>${escapeHtml(loc.address[State.lang])}</span>
                </h3>
                <ul class="location-card__info">
                    <li>
                        <i class="fa-regular fa-clock"></i>
                        <span>${escapeHtml(loc.hours || '10:00 — 23:00')}</span>
                    </li>
                    ${loc.phone ? `<li><i class="fa-solid fa-phone"></i><a href="tel:${loc.phone.replace(/[^+\d]/g, '')}">${escapeHtml(loc.phone)}</a></li>` : ''}
                </ul>
                <a href="https://maps.google.com/?q=${encodeURIComponent(loc.fullAddress)}" 
                   target="_blank" 
                   rel="noopener" 
                   class="location-card__cta">
                    <span>${t('locRoute')}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </li>
    `).join('');
}

/* ============================================
   UPDATE FOOTER PHONES (из локаций)
   ============================================ */
function updateFooterPhones() {
    const ul = $('#footerPhones');
    if (!ul || !State.locations.length) return;
    
    const phones = [...new Set(State.locations.filter(l => l.phone).map(l => l.phone))];
    ul.innerHTML = phones.map(p => 
        `<li><i class="fa-solid fa-phone"></i><a href="tel:${p.replace(/[^+\d]/g, '')}">${escapeHtml(p)}</a></li>`
    ).join('');
}

/* ============================================
   CART FUNCTIONS
   ============================================ */
function addToCart(id) {
    const item = State.menu.find(p => p.id === id);
    if (!item) return;
    
    const existing = State.cart.find(c => c.id === id);
    if (existing) existing.qty++;
    else State.cart.push({ id, qty: 1 });
    
    saveCart();
    renderCart();
    pulseBadge();
    toast(`${item.name[State.lang]} — ${t('toastAdded')}`);
}

function updateQuantity(id, delta) {
    const item = State.cart.find(c => c.id === id);
    if (!item) return;
    
    item.qty += delta;
    if (item.qty <= 0) State.cart = State.cart.filter(c => c.id !== id);
    
    saveCart();
    renderCart();
}

function removeFromCart(id) {
    State.cart = State.cart.filter(c => c.id !== id);
    saveCart();
    renderCart();
}

function getCartTotal() {
    return State.cart.reduce((sum, c) => {
        const item = State.menu.find(p => p.id === c.id);
        return sum + (item ? item.price * c.qty : 0);
    }, 0);
}

function getCartCount() {
    return State.cart.reduce((s, c) => s + c.qty, 0);
}

function renderCart() {
    const body = $('#cartBody');
    const foot = $('#cartFoot');
    const badge = $('#cartBadge');
    if (!body || !foot || !badge) return;
    
    const count = getCartCount();
    badge.textContent = count;

    if (State.cart.length === 0) {
        body.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>${t('cartEmpty')}</p>
                <button class="btn btn--primary" data-close-cart>${t('cartBrowse')}</button>
            </div>`;
        foot.style.display = 'none';
        return;
    }

    body.innerHTML = State.cart.map(c => {
        const item = State.menu.find(p => p.id === c.id);
        if (!item) return '';
        const imgSrc = item.img || 'https://placehold.co/80x80/1a1a1a/ff4d1a?text=?';
        
        return `
            <div class="cart-item">
                <div class="cart-item__img">
                    <img src="${imgSrc}" alt="${escapeHtml(item.name[State.lang])}" 
                         onerror="this.src='https://placehold.co/80x80/1a1a1a/ff4d1a?text=?'">
                </div>
                <div class="cart-item__info">
                    <div class="cart-item__name">${escapeHtml(item.name[State.lang])}</div>
                    <div class="cart-item__price">${money(item.price * c.qty)}</div>
                </div>
                <div class="cart-item__actions">
                    <button class="cart-item__remove" data-remove="${c.id}" aria-label="Удалить">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="qty">
                        <button data-qty="${c.id}" data-delta="-1">−</button>
                        <span>${c.qty}</span>
                        <button data-qty="${c.id}" data-delta="1">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    foot.style.display = 'flex';
    $('#cartItemsCount').textContent = count;
    $('#cartTotal').textContent = money(getCartTotal());
}

function pulseBadge() {
    const b = $('#cartBadge');
    if (!b) return;
    b.classList.remove('pulse');
    void b.offsetWidth;
    b.classList.add('pulse');
}

/* ============================================
   CHECKOUT FUNCTIONS
   ============================================ */
function openCheckout() {
    if (State.cart.length === 0) return;
    closeCart();
    fillCheckoutSummary();
    openModal('#checkoutModal');
}

function fillCheckoutSummary() {
    const el = $('#checkoutSummary');
    if (!el) return;
    
    const total = getCartTotal();
    const rows = State.cart.map(c => {
        const item = State.menu.find(p => p.id === c.id);
        if (!item) return '';
        return `<div class="checkout-summary__row">
            <span>${escapeHtml(item.name[State.lang])} × ${c.qty}</span>
            <span>${money(item.price * c.qty)}</span>
        </div>`;
    }).join('');
    
    el.innerHTML = rows + `
        <div class="checkout-summary__row">
            <span>${t('checkoutSum')}</span>
            <span>${money(total)}</span>
        </div>`;
}

async function submitOrder(e) {
    e.preventDefault();
    if (!validateForm()) return;
    
    const submitBtn = $('#submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Проверка адреса...';
    
    const orderData = {
        id: Date.now(),
        time: new Date().toLocaleString(State.lang === 'ru' ? 'ru-RU' : 'uk-UA', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }),
        name: $('#fName').value.trim(),
        phone: $('#fPhone').value.trim(),
        address: $('#fAddress').value.trim(),
        comment: $('#fComment').value.trim(),
        items: State.cart.map(c => {
            const item = State.menu.find(p => p.id === c.id);
            return { id: c.id, name: item.name[State.lang], price: item.price, qty: c.qty };
        }),
        total: getCartTotal(),
        status: 'new',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        // Проверяем нужна ли предоплата
        const prepayCheck = await checkPrepayRequired(orderData.address, orderData.total);
        
        if (prepayCheck.required) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-check"></i><span>${t('checkoutSubmit')}</span>`;
            
            showPrepayModal(prepayCheck, orderData, async () => {
                orderData.prepayRequired = true;
                orderData.prepayAmount = prepayCheck.prepayAmount;
                orderData.nearestLocation = prepayCheck.nearestLocation?.address?.[State.lang];
                orderData.distance = prepayCheck.distance + ' км';
                await saveOrderToFirebase(orderData);
            });
            return;
        }
        
        await saveOrderToFirebase(orderData);
    } catch (err) {
        console.error('Ошибка:', err);
        toast('Ошибка при отправке');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i><span>${t('checkoutSubmit')}</span>`;
    }
}

async function saveOrderToFirebase(order) {
    const submitBtn = $('#submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Отправка...';
    
    try {
        // 1. Сохраняем в Firebase
        await db.collection('orders').doc(String(order.id)).set(order);
        
        // 2. ДУБЛИРУЕМ В TELEGRAM
        await sendOrderToTelegram(order);
        
        // 3. Очищаем корзину
        State.cart = [];
        saveCart();

        // 4. Показываем успех
        closeModal('#checkoutModal');
        $('#successOrderId').textContent = order.id.toString().slice(-5);
        openModal('#successModal');
        $('#checkoutForm').reset();
        renderCart();
        
    } catch (err) {
        console.error('Ошибка сохранения заказа:', err);
        toast('Ошибка при отправке');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i><span>${t('checkoutSubmit')}</span>`;
    }
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function validateForm() {
    let ok = true;
    $$('.checkout-form .field').forEach(f => f.classList.remove('error'));
    $$('.checkout-form .field__error').forEach(e => e.textContent = '');

    const name = $('#fName').value.trim();
    if (name.length < 2) { markError('name', t('errName')); ok = false; }

    const phone = $('#fPhone').value.replace(/\D/g, '');
    if (phone.length !== 12) { markError('phone', t('errPhone')); ok = false; }

    const address = $('#fAddress').value.trim();
    if (address.length < 5) { markError('address', t('errAddress')); ok = false; }

    return ok;
}

function markError(field, msg) {
    const input = $(`#f${field.charAt(0).toUpperCase() + field.slice(1)}`);
    if (input) input.closest('.field').classList.add('error');
    const err = $(`[data-error="${field}"]`);
    if (err) err.textContent = msg;
}

/* ============================================
   PHONE MASK
   ============================================ */
function phoneMask(e) {
    const input = e.target;
    const key = e.key;
    
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(key)) {
        if (key === 'Backspace') setTimeout(() => formatPhoneValue(input), 0);
        return;
    }
    
    if (!/^\d$/.test(key)) {
        e.preventDefault();
        return;
    }
    
    setTimeout(() => formatPhoneValue(input), 0);
}

function formatPhoneValue(input) {
    let digits = input.value.replace(/\D/g, '');
    
    if (!digits) {
        input.value = '+380 ';
        return;
    }
    
    if (!digits.startsWith('380')) {
        if (digits.startsWith('80')) digits = '3' + digits;
        else if (digits.startsWith('0')) digits = '38' + digits;
        else digits = '380' + digits;
    }
    
    digits = digits.slice(0, 12);
    
    let formatted = '+380 ';
    if (digits.length > 3) formatted += digits.slice(3, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 8);
    if (digits.length > 8) formatted += ' ' + digits.slice(8, 10);
    if (digits.length > 10) formatted += ' ' + digits.slice(10, 12);
    
    input.value = formatted;
}

/* ============================================
   HAVERSINE FORMULA (расстояние между точками)
   ============================================ */
function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371; // Радиус Земли в км
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 +
              Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
              Math.sin(dLng/2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

/* ============================================
   GEOCODING (адрес → координаты)
   ============================================ */
async function geocodeClientAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Одесса, Украина')}&limit=1`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
    } catch (err) {
        console.error('Geocode error:', err);
    }
    return null;
}

/* ============================================
   GET MINIMUM DISTANCE TO LOCATIONS
   ============================================ */
function getMinDistanceToLocations(clientLat, clientLng) {
    if (!State.locations.length) return { distance: Infinity, location: null };
    
    let min = Infinity;
    let nearest = null;
    
    State.locations.forEach(loc => {
        if (loc.lat && loc.lng) {
            const dist = haversine(clientLat, clientLng, loc.lat, loc.lng);
            if (dist < min) {
                min = dist;
                nearest = loc;
            }
        }
    });
    
    return { distance: min, location: nearest };
}

/* ============================================
   CHECK PREPAY REQUIRED
   ============================================ */
async function checkPrepayRequired(address, total) {
    if (State.settings.prepayPercent <= 0) return { required: false };
    
    const coords = await geocodeClientAddress(address);
    if (!coords) return { required: false, error: true };
    
    const { distance, location } = getMinDistanceToLocations(coords.lat, coords.lng);
    
    if (distance > State.settings.freeRadius) {
        const prepayAmount = Math.round(total * State.settings.prepayPercent / 100);
        return {
            required: true,
            distance: distance.toFixed(1),
            nearestLocation: location,
            prepayAmount
        };
    }
    
    return { required: false, distance: distance.toFixed(1), nearestLocation: location };
}

/* ============================================
   SHOW PREPAY MODAL
   ============================================ */
function showPrepayModal(prepayData, orderData, onSuccess) {
    $('#prepayDistance').textContent = 
        `📍 ${prepayData.distance} ${t('distanceKm')} (${prepayData.nearestLocation?.address?.[State.lang] || 'ближайшей точки'})`;
    $('#prepayMessage').textContent = State.settings.prepayMessage;
    $('#prepayAmountValue').textContent = money(prepayData.prepayAmount);
    $('#prepayCardNum').textContent = State.settings.cardNumber;
    $('#prepayCardHolder').textContent = State.settings.cardName ? `👤 ${State.settings.cardName}` : '';
    $('#prepayCardBank').textContent = State.settings.cardBank ? `🏦 ${State.settings.cardBank}` : '';
    
    // Кнопка копирования карты
    const copyBtn = $('#copyCardBtn');
    const newCopyBtn = copyBtn.cloneNode(true);
    copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
    newCopyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(State.settings.cardNumber.replace(/\s/g, ''));
            newCopyBtn.classList.add('copied');
            newCopyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                newCopyBtn.classList.remove('copied');
                newCopyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            }, 2000);
        } catch (e) {}
    });
    
    // Кнопка подтверждения
    const confirmBtn = $('#prepayConfirmed');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    newConfirmBtn.addEventListener('click', () => {
        closeModal('#prepayModal');
        onSuccess();
    });
    
    openModal('#prepayModal');
}

/* ============================================
   ADMIN AUTH
   ============================================ */
const ADMIN_PASSWORD = 'shaurma8na1drovax2';
const AUTH_KEY = 'sh_admin_auth';

const isAdminAuthed = () => sessionStorage.getItem(AUTH_KEY) === 'true';
const setAdminAuthed = () => sessionStorage.setItem(AUTH_KEY, 'true');
const clearAdminAuth = () => sessionStorage.removeItem(AUTH_KEY);

/* ============================================
   ADMIN - ORDERS RENDER
   ============================================ */
function renderAdmin() {
    const tbody = $('#adminTableBody');
    if (!tbody) return;
    
    const total = State.orders.length;
    const revenue = State.orders.reduce((s, o) => s + o.total, 0);
    const newCount = State.orders.filter(o => o.status === 'new').length;

    if ($('#statOrders')) $('#statOrders').textContent = total;
    if ($('#statRevenue')) $('#statRevenue').textContent = money(revenue);
    if ($('#statAvg')) $('#statAvg').textContent = money(total ? Math.round(revenue / total) : 0);
    if ($('#statNew')) $('#statNew').textContent = newCount;
    if ($('#tabOrdersBadge')) $('#tabOrdersBadge').textContent = newCount;

    if (total === 0) {
        tbody.innerHTML = `<tr class="admin-table__empty"><td colspan="9">${t('adminEmpty')}</td></tr>`;
        return;
    }

    tbody.innerHTML = State.orders.map(o => {
        const statusClass = o.status === 'new' ? 'new' : 'done';
        const statusText = o.status === 'new' ? t('statusNew') : t('statusDone');
        const itemsList = (o.items || []).map(i => `${escapeHtml(i.name)} × ${i.qty}`).join('<br>');
        
        return `
            <tr>
                <td><strong>#${o.id.toString().slice(-5)}</strong></td>
                <td>${escapeHtml(o.time)}</td>
                <td>${escapeHtml(o.name)}</td>
                <td><a href="tel:${o.phone}">${escapeHtml(o.phone)}</a></td>
                <td>
                    ${escapeHtml(o.address)}
                    ${o.distance ? `<br><small style="color:var(--c-warn)">📍 ${o.distance}</small>` : ''}
                    ${o.prepayRequired ? `<br><small style="color:var(--c-ok)">💳 Предоплата ${money(o.prepayAmount)}</small>` : ''}
                    ${o.comment ? `<br><small style="color:var(--c-text-3)">${escapeHtml(o.comment)}</small>` : ''}
                </td>
                <td style="font-size:12px;line-height:1.5">${itemsList}</td>
                <td><strong style="color:var(--c-fire-2)">${money(o.total)}</strong></td>
                <td><span class="admin-status admin-status--${statusClass}">${statusText}</span></td>
                <td>
                    ${o.status === 'new' ? `<button class="admin-action" data-admin-done="${o.id}">${t('actionDone')}</button>` : ''}
                    <button class="admin-action admin-action--delete" data-admin-del="${o.id}">${t('actionDelete')}</button>
                </td>
            </tr>
        `;
    }).join('');
}

/* ============================================
   ADMIN - MENU RENDER
   ============================================ */
function renderAdminMenu() {
    const grid = $('#adminMenuGrid');
    if (!grid) return;
    
    if (State.menu.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--c-text-3)">
            ${State.lang === 'ru' ? 'Меню пусто. Добавьте первый товар.' : 'Меню порожнє. Додайте перший товар.'}
        </div>`;
        return;
    }
    
    grid.innerHTML = State.menu.map(p => {
        const badgeHtml = p.badge 
            ? `<span class="admin-product__badge product__badge--${p.badge}">${BADGE_LABELS[p.badge][State.lang]}</span>` 
            : '';
        const catKey = CAT_LABELS[p.cat] || p.cat;
        const catLabel = t(catKey);
        const imgHtml = p.img 
            ? `<img src="${p.img}" alt="${escapeHtml(p.name[State.lang])}" onerror="this.parentElement.innerHTML='<div class=\\'admin-product__img-placeholder\\'><i class=\\'fa-solid fa-image\\'></i></div>'">` 
            : `<div class="admin-product__img-placeholder"><i class="fa-solid fa-image"></i></div>`;
        
        return `
            <div class="admin-product">
                <div class="admin-product__img">
                    ${imgHtml}
                    ${badgeHtml}
                    <span class="admin-product__cat">${escapeHtml(catLabel)}</span>
                </div>
                <div class="admin-product__body">
                    <div class="admin-product__name">${escapeHtml(p.name[State.lang])}</div>
                    <div class="admin-product__meta">${escapeHtml(p.weight || '—')}</div>
                    <div class="admin-product__price">${money(p.price)}</div>
                    <div class="admin-product__actions">
                        <button class="btn btn--ghost btn--sm" data-edit-product="${p.id}">
                            <i class="fa-solid fa-pen"></i> ${t('productEdit')}
                        </button>
                        <button class="btn btn--ghost btn--sm" data-delete-product="${p.id}" style="color:var(--c-err);border-color:rgba(239,68,68,.3)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/* ============================================
   ADMIN - LOCATIONS RENDER
   ============================================ */
function renderAdminLocations() {
    const grid = $('#adminLocationsGrid');
    if (!grid) return;
    
    if (State.locations.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--c-text-3)">
            ${State.lang === 'ru' ? 'Меню пусто. Добавьте первую точку.' : 'Меню порожнє. Додайте першу точку.'}
        </div>`;
        return;
    }
    
    grid.innerHTML = State.locations.map(loc => `
        <div class="admin-location">
            <div class="admin-location__head">
                <div class="admin-location__icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="admin-location__info">
                    <div class="admin-location__district">${escapeHtml(loc.tag[State.lang])}</div>
                    <div class="admin-location__address">${escapeHtml(loc.address[State.lang])}</div>
                </div>
            </div>
            <div class="admin-location__body">
                ${loc.phone ? `<div class="admin-location__row"><i class="fa-solid fa-phone"></i>${escapeHtml(loc.phone)}</div>` : ''}
                <div class="admin-location__row"><i class="fa-regular fa-clock"></i>${escapeHtml(loc.hours || '—')}</div>
                <div class="admin-location__coords">📍 ${loc.lat}, ${loc.lng}</div>
            </div>
            <div class="admin-location__actions">
                <button class="btn btn--ghost btn--sm" data-edit-location="${loc.id}">
                    <i class="fa-solid fa-pen"></i> Редактировать
                </button>
                <button class="btn btn--ghost btn--sm" data-delete-location="${loc.id}" style="color:var(--c-err);border-color:rgba(239,68,68,.3)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

/* ============================================
   ADMIN - SETTINGS FORM RENDER
   ============================================ */
function renderSettingsForm() {
    if (!$('#settingsForm')) return;
    $('#settingRadius').value = State.settings.freeRadius;
    $('#settingPercent').value = State.settings.prepayPercent;
    $('#settingMinOrder').value = State.settings.minOrder;
    $('#settingCardNumber').value = State.settings.cardNumber;
    $('#settingCardName').value = State.settings.cardName;
    $('#settingCardBank').value = State.settings.cardBank;
    $('#settingPrepayMessage').value = State.settings.prepayMessage;
}

/* ============================================
   ADMIN - PRODUCT CRUD
   ============================================ */
function openProductModal(id = null) {
    const modal = $('#productModal');
    const title = $('#productModalTitle');
    const form = $('#productForm');
    if (!modal || !form) return;
    
    form.reset();
    State.tempImage = '';
    $('#imagePreview').style.display = 'none';
    $('#imagePlaceholder').style.display = 'block';
    $('#productImageFile').value = '';
    $('#productImageUrl').value = '';
    
    if (id === null) {
        title.textContent = t('productAddTitle');
        $('#productId').value = '';
    } else {
        const p = State.menu.find(x => x.id === id);
        if (!p) return;
        title.textContent = t('productEditTitle');
        $('#productId').value = p.id;
        $('#productNameRu').value = p.name.ru || '';
        $('#productNameUa').value = p.name.ua || '';
        $('#productDescRu').value = (p.desc && p.desc.ru) || '';
        $('#productDescUa').value = (p.desc && p.desc.ua) || '';
        $('#productCategory').value = p.cat || 'shawarma';
        $('#productPrice').value = p.price || 0;
        $('#productWeight').value = p.weight || '';
        $('#productBadge').value = p.badge || '';
        
        if (p.img) {
            State.tempImage = p.img;
            $('#imagePreviewImg').src = p.img;
            $('#imagePreview').style.display = 'block';
            $('#imagePlaceholder').style.display = 'none';
            
            if (!p.img.startsWith('data:')) {
                $('#productImageUrl').value = p.img;
                State.tempImage = '';
            }
        }
    }
    openModal('#productModal');
}

async function saveProduct(e) {
    e.preventDefault();
    const id = $('#productId').value;
    const nameRu = $('#productNameRu').value.trim();
    const nameUa = $('#productNameUa').value.trim();
    const price = parseInt($('#productPrice').value, 10);
    
    if (!nameRu || !nameUa || isNaN(price) || price < 0) {
        toast(t('productRequiredFields'));
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    
    let finalImg = State.tempImage;
    if (!finalImg) {
        const urlVal = $('#productImageUrl').value.trim();
        if (urlVal) finalImg = urlVal;
    }
    
    const productData = {
        name: { ru: nameRu, ua: nameUa },
        desc: { 
            ru: $('#productDescRu').value.trim(), 
            ua: $('#productDescUa').value.trim() 
        },
        cat: $('#productCategory').value,
        price: price,
        weight: $('#productWeight').value.trim(),
        badge: $('#productBadge').value || null,
        img: finalImg || ''
    };
    
    try {
        if (id) {
            await db.collection('menu').doc(String(id)).update(productData);
        } else {
            const newId = State.menu.length ? Math.max(...State.menu.map(p => p.id)) + 1 : 1;
            await db.collection('menu').doc(String(newId)).set({ id: newId, ...productData });
        }
        
        closeModal('#productModal');
        toast(t('productSaved'));
    } catch (err) {
        console.error('Ошибка сохранения:', err);
        toast(State.lang === 'ru' ? 'Ошибка сохранения' : 'Помилка збереження');
    } finally {
        submitBtn.disabled = false;
    }
}

async function deleteProduct(id) {
    if (!confirm(t('productDeleteConfirm'))) return;
    try {
        await db.collection('menu').doc(String(id)).delete();
        State.cart = State.cart.filter(c => c.id !== id);
        saveCart();
        renderCart();
        toast(t('productDeleted'));
    } catch (err) {
        console.error('Ошибка удаления:', err);
    }
}

async function resetMenuToDefault() {
    if (!confirm(t('menuResetConfirm'))) return;
    try {
        const snapshot = await db.collection('menu').get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        DEFAULT_MENU.forEach(item => {
            batch.set(db.collection('menu').doc(String(item.id)), item);
        });
        await batch.commit();
        toast(t('menuResetDone'));
    } catch (err) {
        console.error('Ошибка сброса:', err);
    }
}

/* ============================================
   ADMIN - LOCATIONS CRUD
   ============================================ */
function openLocationModal(id = null) {
    const modal = $('#locationModal');
    const title = $('#locationModalTitle');
    const form = $('#locationForm');
    if (!modal || !form) return;
    
    form.reset();
    
    if (id === null) {
        title.textContent = 'Добавить точку';
        $('#locationId').value = '';
    } else {
        const loc = State.locations.find(x => x.id === id);
        if (!loc) return;
        title.textContent = 'Редактировать точку';
        $('#locationId').value = loc.id;
        $('#locTagRu').value = loc.tag.ru || '';
        $('#locTagUa').value = loc.tag.ua || '';
        $('#locAddressRu').value = loc.address.ru || '';
        $('#locAddressUa').value = loc.address.ua || '';
        $('#locFullAddress').value = loc.fullAddress || '';
        $('#locPhone').value = loc.phone || '';
        $('#locHours').value = loc.hours || '';
        $('#locLat').value = loc.lat || '';
        $('#locLng').value = loc.lng || '';
    }
    openModal('#locationModal');
}

async function saveLocation(e) {
    e.preventDefault();
    const id = $('#locationId').value;
    const tagRu = $('#locTagRu').value.trim();
    const tagUa = $('#locTagUa').value.trim();
    const addressRu = $('#locAddressRu').value.trim();
    const addressUa = $('#locAddressUa').value.trim();
    const fullAddress = $('#locFullAddress').value.trim();
    const lat = parseFloat($('#locLat').value);
    const lng = parseFloat($('#locLng').value);
    
    if (!tagRu || !tagUa || !addressRu || !addressUa || !fullAddress) {
        toast('Заполните все обязательные поля');
        return;
    }
    if (isNaN(lat) || isNaN(lng)) {
        toast('Укажите координаты или определите автоматически');
        return;
    }
    
    const data = {
        tag: { ru: tagRu, ua: tagUa },
        address: { ru: addressRu, ua: addressUa },
        fullAddress,
        phone: $('#locPhone').value.trim(),
        hours: $('#locHours').value.trim(),
        lat, lng
    };
    
    try {
        if (id) {
            await db.collection('locations').doc(String(id)).update(data);
        } else {
            const newId = State.locations.length ? Math.max(...State.locations.map(l => l.id)) + 1 : 1;
            await db.collection('locations').doc(String(newId)).set({ id: newId, ...data });
        }
        closeModal('#locationModal');
        toast(t('locationSaved'));
    } catch (err) {
        console.error('Ошибка сохранения:', err);
        toast('Ошибка сохранения');
    }
}

async function deleteLocation(id) {
    if (!confirm(t('locationDeleteConfirm'))) return;
    try {
        await db.collection('locations').doc(String(id)).delete();
        toast(t('locationDeleted'));
    } catch (err) {
        console.error('Ошибка удаления:', err);
    }
}

async function resetLocations() {
    if (!confirm('Сбросить точки к исходным? Все изменения будут потеряны.')) return;
    try {
        const snapshot = await db.collection('locations').get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        DEFAULT_LOCATIONS.forEach(loc => {
            batch.set(db.collection('locations').doc(String(loc.id)), loc);
        });
        await batch.commit();
        toast('Точки сброшены');
    } catch (err) {
        console.error('Ошибка сброса:', err);
    }
}

async function geocodeAddress() {
    const address = $('#locFullAddress').value.trim();
    if (!address) {
        toast('Введите полный адрес');
        return;
    }
    
    const btn = $('#geocodeBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${t('geocodeLoading')}`;
    btn.disabled = true;
    
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Украина')}&limit=1`;
        const res = await fetch(url, {
            headers: { 'Accept-Language': State.lang }
        });
        const data = await res.json();
        
        if (data && data.length > 0) {
            $('#locLat').value = parseFloat(data[0].lat).toFixed(6);
            $('#locLng').value = parseFloat(data[0].lon).toFixed(6);
            toast(t('geocodeSuccess'));
        } else {
            toast(t('geocodeError'));
        }
    } catch (err) {
        console.error(err);
        toast(t('geocodeError'));
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

/* ============================================
   ADMIN - SETTINGS SAVE
   ============================================ */
async function saveSettings(e) {
    e.preventDefault();
    try {
        const data = {
            freeRadius: parseFloat($('#settingRadius').value) || 4,
            prepayPercent: parseInt($('#settingPercent').value) || 15,
            minOrder: parseInt($('#settingMinOrder').value) || 0,
            cardNumber: $('#settingCardNumber').value.trim(),
            cardName: $('#settingCardName').value.trim(),
            cardBank: $('#settingCardBank').value.trim(),
            prepayMessage: $('#settingPrepayMessage').value.trim()
        };
        await db.collection('settings').doc('delivery').set(data);
        toast(t('settingsSaved'));
    } catch (err) {
        console.error(err);
        toast('Ошибка сохранения');
    }
}

/* ============================================
   IMAGE UPLOAD + COMPRESSION
   ============================================ */
function compressImage(file, maxWidth = 800, quality = 0.75) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('Not an image'));
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let w = img.width, h = img.height;
                if (w > maxWidth) {
                    h = (maxWidth / w) * h;
                    w = maxWidth;
                }
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function handleImageUpload(file) {
    try {
        const compressed = await compressImage(file);
        State.tempImage = compressed;
        $('#imagePreviewImg').src = compressed;
        $('#imagePreview').style.display = 'block';
        $('#imagePlaceholder').style.display = 'none';
        $('#productImageUrl').value = '';
    } catch (err) {
        toast(t('imageUploadError'));
        console.error(err);
    }
}

function clearTempImage() {
    State.tempImage = '';
    $('#imagePreview').style.display = 'none';
    $('#imagePlaceholder').style.display = 'block';
    $('#imagePreviewImg').src = '';
    $('#productImageFile').value = '';
}

/* ============================================
   MODALS / DRAWERS
   ============================================ */
function openModal(sel) {
    const m = $(sel);
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal(sel) {
    const m = $(sel);
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function openCart() {
    const d = $('#cartDrawer');
    if (!d) return;
    d.classList.add('open');
    d.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const d = $('#cartDrawer');
    if (!d) return;
    d.classList.remove('open');
    d.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function openAdmin() {
    if (isAdminAuthed()) {
        showAdminPanel();
    } else {
        openModal('#passwordModal');
        setTimeout(() => {
            const input = $('#pwdInput');
            if (input) {
                input.focus();
                input.select();
            }
        }, 300);
    }
}

function showAdminPanel() {
    const panel = $('#adminPanel');
    if (!panel) return;
    panel.classList.add('open');
    State.isAdminViewing = true;
    document.body.style.overflow = 'hidden';
    renderAdmin();
    renderAdminMenu();
    renderAdminLocations();
    renderSettingsForm();
}

function closeAdmin() {
    const panel = $('#adminPanel');
    if (!panel) return;
    panel.classList.remove('open');
    State.isAdminViewing = false;
    document.body.style.overflow = '';
}

function logoutAdmin() {
    if (!confirm(t('logoutConfirm'))) return;
    clearAdminAuth();
    closeAdmin();
    toast(t('logoutSuccess'));
}

function handlePasswordSubmit(e) {
    e.preventDefault();
    const input = $('#pwdInput');
    const errEl = $('#pwdError');
    const field = input.closest('.field');
    const value = input.value;

    field.classList.remove('shake');
    errEl.textContent = '';

    if (value === ADMIN_PASSWORD) {
        setAdminAuthed();
        closeModal('#passwordModal');
        input.value = '';
        setTimeout(showAdminPanel, 300);
    } else {
        errEl.textContent = t('pwdError');
        void field.offsetWidth;
        field.classList.add('shake');
        input.select();
    }
}

function openMobile() {
    $('#mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobile() {
    $('#mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
}

function switchAdminTab(tab) {
    $$('.admin-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    $$('.admin__tab-content').forEach(c => c.classList.toggle('active', c.dataset.tabContent === tab));
}

function handleScroll() {
    const h = $('#header');
    if (!h) return;
    if (window.scrollY > 30) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
}

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', async () => {
    applyLang();

    // Loader пока грузится меню
    const menuGrid = $('#menuGrid');
    if (menuGrid) {
        menuGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--c-text-3)">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:32px;color:var(--c-fire)"></i>
            <p style="margin-top:16px">${State.lang === 'ru' ? 'Загружаем меню...' : 'Завантажуємо меню...'}</p>
        </div>`;
    }

    // Инициализация Firebase коллекций
    await initMenu();
    await initOrders();
    await initLocations();
    await initSettings();

    // Скрываем прелоадер
    setTimeout(() => {
        const pl = $('#preloader');
        if (pl) pl.classList.add('hidden');
    }, 500);

    // Переключатель языка
    const langToggle = $('#langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            State.lang = State.lang === 'ru' ? 'ua' : 'ru';
            saveCart();
            applyLang();
        });
    }

    // Скролл хедера
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Мобильное меню
    const burger = $('#burger');
    if (burger) burger.addEventListener('click', openMobile);
    const mobileClose = $('#mobileClose');
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    const mobileBackdrop = $('#mobileMenu .mobile-menu__backdrop');
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);
    $$('#mobileMenu .mobile-menu__nav a').forEach(a => a.addEventListener('click', closeMobile));

    // Фильтры меню
    $$('.filter').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.filter').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            State.filter = btn.dataset.filter;
            renderMenu();
        });
    });

    // Добавление в корзину (делегирование)
    if (menuGrid) {
        menuGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-add]');
            if (btn) addToCart(+btn.dataset.add);
        });
    }

    // Корзина
    const cartTrigger = $('#cartTrigger');
    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    const cartDrawer = $('#cartDrawer');
    if (cartDrawer) {
        cartDrawer.addEventListener('click', (e) => {
            if (e.target.dataset.closeCart !== undefined || e.target.classList.contains('cart-drawer__backdrop')) {
                closeCart();
            }
        });
    }
    const cartBody = $('#cartBody');
    if (cartBody) {
        cartBody.addEventListener('click', (e) => {
            const qty = e.target.closest('[data-qty]');
            if (qty) updateQuantity(+qty.dataset.qty, +qty.dataset.delta);
            const rm = e.target.closest('[data-remove]');
            if (rm) removeFromCart(+rm.dataset.remove);
        });
    }

    // Checkout
    const checkoutBtn = $('#checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);

    // Закрытие модалок
    document.addEventListener('click', (e) => {
        if (e.target.dataset.closeModal !== undefined || e.target.classList.contains('modal__backdrop')) {
            $$('.modal.open').forEach(m => closeModal('#' + m.id));
        }
    });

    // Форма заказа
    const checkoutForm = $('#checkoutForm');
    if (checkoutForm) checkoutForm.addEventListener('submit', submitOrder);
    const phoneInput = $('#fPhone');
    if (phoneInput) {
        phoneInput.addEventListener('keydown', phoneMask);
        phoneInput.addEventListener('focus', (e) => {
            if (!e.target.value) e.target.value = '+380 ';
        });
        phoneInput.addEventListener('blur', (e) => {
            if (e.target.value.replace(/\D/g, '').length <= 3) e.target.value = '';
        });
    }

    // Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            $$('.modal.open').forEach(m => closeModal('#' + m.id));
            closeCart();
            closeMobile();
            closeAdmin();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            openAdmin();
        }
    });

    // Админ-панель
    const footerAdminTrigger = $('#footerAdminTrigger');
    if (footerAdminTrigger) footerAdminTrigger.addEventListener('click', openAdmin);
    const adminClose = $('#adminClose');
    if (adminClose) adminClose.addEventListener('click', closeAdmin);
    const adminLogout = $('#adminLogout');
    if (adminLogout) adminLogout.addEventListener('click', logoutAdmin);

    // Экспорт заказов
    const adminExport = $('#adminExport');
    if (adminExport) {
        adminExport.addEventListener('click', () => {
            const data = State.orders.map(o => {
                const { _docId, createdAt, ...rest } = o;
                return rest;
            });
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `orders_${new Date().toISOString().slice(0,10)}.json`;
            a.click();
            URL.revokeObjectURL(a.href);
        });
    }

    // Очистка заказов
    const adminClear = $('#adminClear');
    if (adminClear) {
        adminClear.addEventListener('click', async () => {
            if (!confirm(t('clearConfirm'))) return;
            try {
                const snapshot = await db.collection('orders').get();
                const batch = db.batch();
                snapshot.docs.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
            } catch (err) {
                console.error(err);
            }
        });
    }

    // Действия с заказами в админке
    const adminTableBody = $('#adminTableBody');
    if (adminTableBody) {
        adminTableBody.addEventListener('click', async (e) => {
            const done = e.target.closest('[data-admin-done]');
            if (done) {
                try {
                    await db.collection('orders').doc(String(done.dataset.adminDone)).update({ status: 'done' });
                } catch (err) {
                    console.error(err);
                }
            }
            const del = e.target.closest('[data-admin-del]');
            if (del) {
                try {
                    await db.collection('orders').doc(String(del.dataset.adminDel)).delete();
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    // Вкладки админки
    $$('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => switchAdminTab(tab.dataset.tab));
    });

    // CRUD товаров
    const addProductBtn = $('#addProductBtn');
    if (addProductBtn) addProductBtn.addEventListener('click', () => openProductModal(null));
    const resetMenuBtn = $('#resetMenuBtn');
    if (resetMenuBtn) resetMenuBtn.addEventListener('click', resetMenuToDefault);
    const adminMenuGrid = $('#adminMenuGrid');
    if (adminMenuGrid) {
        adminMenuGrid.addEventListener('click', (e) => {
            const edit = e.target.closest('[data-edit-product]');
            if (edit) openProductModal(+edit.dataset.editProduct);
            const del = e.target.closest('[data-delete-product]');
            if (del) deleteProduct(+del.dataset.deleteProduct);
        });
    }

    // Форма товара
    const productForm = $('#productForm');
    if (productForm) productForm.addEventListener('submit', saveProduct);
    const imageUpload = $('#imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('click', (e) => {
            if (e.target.closest('.image-upload__remove')) return;
            $('#productImageFile').click();
        });
    }
    const productImageFile = $('#productImageFile');
    if (productImageFile) {
        productImageFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload(file);
        });
    }
    const imageRemove = $('#imageRemove');
    if (imageRemove) {
        imageRemove.addEventListener('click', (e) => {
            e.stopPropagation();
            clearTempImage();
        });
    }

    // CRUD локаций (НОВОЕ)
    const addLocationBtn = $('#addLocationBtn');
    if (addLocationBtn) addLocationBtn.addEventListener('click', () => openLocationModal(null));
    const resetLocationsBtn = $('#resetLocationsBtn');
    if (resetLocationsBtn) resetLocationsBtn.addEventListener('click', resetLocations);
    const adminLocationsGrid = $('#adminLocationsGrid');
    if (adminLocationsGrid) {
        adminLocationsGrid.addEventListener('click', (e) => {
            const edit = e.target.closest('[data-edit-location]');
            if (edit) openLocationModal(+edit.dataset.editLocation);
            const del = e.target.closest('[data-delete-location]');
            if (del) deleteLocation(+del.dataset.deleteLocation);
        });
    }

    // Форма локации
    const locationForm = $('#locationForm');
    if (locationForm) locationForm.addEventListener('submit', saveLocation);
    const geocodeBtn = $('#geocodeBtn');
    if (geocodeBtn) geocodeBtn.addEventListener('click', geocodeAddress);

    // Форма настроек
    const settingsForm = $('#settingsForm');
    if (settingsForm) settingsForm.addEventListener('submit', saveSettings);

    // Форма пароля
    const passwordForm = $('#passwordForm');
    if (passwordForm) passwordForm.addEventListener('submit', handlePasswordSubmit);
    const pwdInput = $('#pwdInput');
    if (pwdInput) {
        pwdInput.addEventListener('input', () => {
            const errEl = $('#pwdError');
            if (errEl) errEl.textContent = '';
            pwdInput.closest('.field').classList.remove('shake');
        });
    }

    // Hash #admin
    if (location.hash === '#admin') openAdmin();
    window.addEventListener('hashchange', () => {
        if (location.hash === '#admin') openAdmin();
    });

    handleScroll();
});

// Очистка listener при закрытии страницы
window.addEventListener('beforeunload', () => {
    if (State.unsubMenu) State.unsubMenu();
    if (State.unsubOrders) State.unsubOrders();
    if (State.unsubLocations) State.unsubLocations();
    if (State.unsubSettings) State.unsubSettings();
});