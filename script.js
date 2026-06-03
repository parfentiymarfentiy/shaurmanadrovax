/* ============================================
   DATA
   ============================================ */
const MENU = [
    // ШАУРМА
    { id: 1, cat: 'shawarma', badge: 'hit',
      name: { ru: 'Шаурма Классическая', ua: 'Шаурма Класична' },
      desc: { ru: 'Куриное филе, свежие овощи, фирменный соус, лаваш', ua: 'Куряче філе, свіжі овочі, фірмовий соус, лаваш' },
      price: 120, weight: '350г',
      img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80' },
    { id: 2, cat: 'shawarma', badge: 'new',
      name: { ru: 'Шаурма Сырная', ua: 'Шаурма Сирна' },
      desc: { ru: 'Двойной сыр моцарелла, курица, овощи, чесночный соус', ua: 'Подвійний сир моцарела, курка, овочі, часниковий соус' },
      price: 145, weight: '400г',
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80' },
    { id: 3, cat: 'shawarma', badge: 'hot',
      name: { ru: 'Шаурма Острая', ua: 'Шаурма Гостра' },
      desc: { ru: 'Острое куриное мясо, халапеньо, соус чили', ua: "Гостре куряче м'ясо, халапеньо, соус чилі" },
      price: 135, weight: '350г',
      img: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=600&q=80' },
    { id: 4, cat: 'shawarma', badge: 'hit',
      name: { ru: 'Шаурма Мясная XXL', ua: 'Шаурма М\'ясна XXL' },
      desc: { ru: 'Микс говядины и курицы, овощи, сыр, соусы', ua: 'Мікс яловичини та курки, овочі, сир, соуси' },
      price: 175, weight: '500г',
      img: 'https://img.postershop.me/12726/f94f30cb-d0b6-479f-b163-350af22c4e96_image.png' },

    // МЯСО НА ДРОВАХ
    { id: 10, cat: 'meat', badge: 'hit',
      name: { ru: 'Шашлык из свиной шеи', ua: 'Шашлик зі свинячої шиї' },
      desc: { ru: 'Сочная свиная шея на мангале, коржик, лук, соус', ua: 'Соковита свиняча шия на мангалі, коржик, цибуля, соус' },
      price: 190, weight: '350/150г',
      img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80' },
    { id: 11, cat: 'meat', badge: 'new',
      name: { ru: 'Молодые свиные рёбра', ua: 'Молоді свинячі ребра' },
      desc: { ru: 'Нежные рёбрышки на гриле с медовым соусом', ua: 'Ніжні реберця на грилі з медовим соусом' },
      price: 190, weight: '350/150г',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
    { id: 12, cat: 'meat', badge: 'new',
      name: { ru: 'Стейк Томагавк', ua: 'Стейк Томагавк' },
      desc: { ru: 'Премиальная телятина на кости, прожарка medium', ua: 'Преміальна телятина на кістці, прожарка medium' },
      price: 320, weight: '300г',
      img: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80' },
    { id: 13, cat: 'meat', badge: 'hit',
      name: { ru: 'Шашлык «Наполеон»', ua: 'Шашлик «Наполеон»' },
      desc: { ru: 'Слоёное мясо с салом, коржик, овощи', ua: 'Шарове м\'ясо з салом, коржик, овочі' },
      price: 200, weight: '300/150г',
      img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80' },
    { id: 14, cat: 'meat',
      name: { ru: 'Шашлык из куриного филе', ua: 'Шашлик з курячого філе' },
      desc: { ru: 'Диетическое белое мясо с овощами на гриле', ua: 'Дієтичне біле м\'ясо з овочами на грилі' },
      price: 150, weight: '350/150г',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPCJLVrq_5EX1Mygj_QGksaH7LG5VRJYsyAQ&s' },
    { id: 15, cat: 'meat',
      name: { ru: 'Шашлык из куриного бедра', ua: 'Шашлик з курячого стегна' },
      desc: { ru: 'Сочное бедро с хрустящей корочкой', ua: 'Соковите стегно з хрусткою скоринкою' },
      price: 150, weight: '350/150г',
      img: 'https://static.1000.menu/img/content-v2/2e/20/48084/shashlyk-iz-kurinyx-bedryshek_1684846439_0_max.jpg' },
    { id: 16, cat: 'meat', badge: 'hot',
      name: { ru: 'Куриные крылышки BBQ', ua: 'Курячі крильця BBQ' },
      desc: { ru: 'Острые крылья в соусе барбекю, 6 штук', ua: 'Гострі крильця в соусі барбекю, 6 штук' },
      price: 135, weight: '340/150г',
      img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80' },
    { id: 17, cat: 'meat',
      name: { ru: 'Люля-кебаб из курицы', ua: 'Люля-кебаб з курки' },
      desc: { ru: 'Рубленое мясо со специями на шпажке', ua: 'Січене м\'ясо зі спеціями на шпажці' },
      price: 140, weight: '250/150г',
      img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80' },
    { id: 18, cat: 'meat',
      name: { ru: 'Люля-кебаб из телятины', ua: 'Люля-кебаб з телятини' },
      desc: { ru: 'Нежная телятина с зеленью и специями', ua: 'Ніжна телятина з зеленню та спеціями' },
      price: 160, weight: '250/150г',
      img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80' },
    { id: 19, cat: 'meat', badge: 'hit',
      name: { ru: 'Скумбрия на мангале', ua: 'Скумбрія на мангалі' },
      desc: { ru: 'Целая рыба с лимоном и травами на углях', ua: 'Ціла риба з лимоном та травами на вугіллі' },
      price: 270, weight: '1 шт',
      img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80' },

    // НА МАНГАЛЕ
    { id: 30, cat: 'grill', badge: 'hit',
      name: { ru: 'Хачапури на мангале', ua: 'Хачапурі на мангалі' },
      desc: { ru: 'Горячий хлеб с сыром сулугуни на углях', ua: 'Гарячий хліб із сиром сулугуні на вугіллі' },
      price: 130, weight: '250г',
      img: 'https://www.magazin-shashlyka.com.ua/image/cache/catalog/Product/xacapuri-na-mangale-1-600x400.jpg' },
    { id: 31, cat: 'grill',
      name: { ru: 'Ламаджо в лаваше', ua: 'Ламаджо в лаваші' },
      desc: { ru: 'Армянская лепешка с мясом и овощами', ua: "Вірменська коржик з м'ясом та овочами" },
      price: 150, weight: '400г',
      img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
    { id: 32, cat: 'grill',
      name: { ru: 'Овощи на гриле', ua: 'Овочі на грилі' },
      desc: { ru: 'Перец, баклажан, томаты, кабачок', ua: 'Перець, баклажан, томати, кабачок' },
      price: 120, weight: '250г',
      img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&q=80' },
    { id: 33, cat: 'grill',
      name: { ru: 'Грибы на гриле', ua: 'Гриби на грилі' },
      desc: { ru: 'Шампиньоны с чесночным маслом', ua: 'Печериці з часниковим маслом' },
      price: 110, weight: '250г',
      img: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=600&q=80' },

    // ГАРНИРЫ
    { id: 40, cat: 'sides', badge: 'hit',
      name: { ru: 'Картошка с салом', ua: 'Картопля з салом' },
      desc: { ru: 'Запечённая картошка с салом и чесноком', ua: 'Запечена картопля з салом та часником' },
      price: 100, weight: '250/50г',
      img: 'https://i.ytimg.com/vi/8xb3O3ivTlM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBO-zMABuoFzJCu8_yURpFIVoPcRw' },
    { id: 41, cat: 'sides',
      name: { ru: 'Картофель фри', ua: 'Картопля фрі' },
      desc: { ru: 'Хрустящий картофель с соусом на выбор', ua: 'Хрустка картопля з соусом на вибір' },
      price: 90, weight: '150/40г',
      img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80' },
    { id: 42, cat: 'sides',
      name: { ru: 'Соус чесночный', ua: 'Соус часниковий' },
      desc: { ru: 'Фирменный чесночный соус', ua: 'Фірмовий часниковий соус' },
      price: 25, weight: '50г',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPvcGWJbO1SVkRHGUPrd-HquZ0lHzIE3bIWQ&s' },
];

const I18N = {
    ru: {
        preloader: 'Разжигаем мангал...',
        logoMain: 'ШАУРМА НА ДРОВАХ', logoSub: '& МЯСО НА ДРОВАХ',
        navMenu: 'Меню', navLocations: 'Адреса', navDelivery: 'Доставка', navContacts: 'Контакты',
        heroBadge: 'Работаем с 2018 года',
        heroTitle1: 'Самая сочная', heroTitle2: 'ШАУРМА', heroTitle3: 'в Одессе',
        heroSubtitle: 'Готовим на дровах и углях. Доставим горячую шаурму и мясо с мангала к вашей двери за 40 минут.',
        heroCta: 'Смотреть меню', heroCta2: 'Наши точки',
        heroStat1: 'точки в Одессе', heroStat2: 'доставка', heroStat3: 'рейтинг',
        heroScroll: 'Листайте вниз',
        locEyebrow: 'Наши точки', locTitle: 'Где нас найти',
        locDesc: 'Три уютные точки в разных районах Одессы',
        loc1Tag: 'Район Котовского', loc1Title: 'ул. Генерала Бочарова, 60',
        loc2Tag: 'Черёмушки', loc2Title: 'ул. Крымская, 60',
        loc3Tag: 'Таирово', loc3Title: 'пр-т Академика Глушко, 14/3',
        locHours: '10:00 — 22:30', locRoute: 'Проложить маршрут',
        menuEyebrow: 'Меню', menuTitle: 'Готовим на огне',
        menuDesc: 'Сочное мясо на мангале, фирменная шаурма и авторские блюда',
        filterAll: 'Всё меню', filterShawarma: 'Шаурма', filterMeat: 'Мясо на дровах',
        filterGrill: 'На мангале', filterSides: 'Гарниры',
        deliveryEyebrow: 'Доставка', deliveryTitle: 'По всей Одессе',
        deliveryText: 'Привезём горячую шаурму и мясо с мангала прямо к вашей двери. Работаем без выходных, принимаем оплату наличными или картой.',
        perk1Title: '40-60 минут', perk1Text: 'Среднее время доставки',
        perk2Title: 'Бесплатно от 500 ₴', perk2Text: 'В пределах города',
        perk3Title: 'Наличные или карта', perk3Text: 'Любой удобный способ',
        deliveryHot: 'Всегда горячее',
        cartTitle: 'Ваш заказ', cartEmpty: 'Корзина пока пуста', cartBrowse: 'Выбрать блюда',
        cartItems: 'Позиций:', cartTotal: 'Итого:', cartCheckout: 'Оформить заказ',
        checkoutTitle: 'Оформление заказа', checkoutSub: 'Заполните данные для доставки по Одессе',
        fieldName: 'Ваше имя', fieldPhone: 'Телефон', fieldAddress: 'Адрес доставки', fieldComment: 'Комментарий',
        checkoutSubmit: 'Подтвердить заказ', checkoutSum: 'К оплате',
        successTitle: 'Спасибо за заказ!', successText: 'Оператор перезвонит вам в ближайшее время для подтверждения.',
        successClose: 'Отлично',
        adminTitle: 'Панель администратора', adminExport: 'Экспорт JSON', adminClear: 'Очистить', adminClose: 'Закрыть',
        adminLogout: 'Выйти',
        adminStatOrders: 'Всего заказов', adminStatRevenue: 'Выручка', adminStatAvg: 'Средний чек', adminStatNew: 'Новых',
        thId: '№', thTime: 'Время', thClient: 'Клиент', thPhone: 'Телефон', thAddress: 'Адрес',
        thItems: 'Состав', thSum: 'Сумма', thStatus: 'Статус', adminEmpty: 'Заказов пока нет',
        statusNew: 'Новый', statusDone: 'Выполнен', actionDone: 'Выполнить', actionDelete: 'Удалить',
        footerTag: 'Сеть шаурмичных и мангала в Одессе',
        footerContacts: 'Контакты', footerHours: 'Режим работы', footerSocial: 'Мы в соцсетях',
        footerWork: 'Ежедневно', footerDelivery: 'Доставка по всей Одессе',
        toastAdded: 'Добавлено в корзину',
        errName: 'Введите имя (минимум 2 символа)', errPhone: 'Введите корректный номер', errAddress: 'Укажите адрес доставки',
        badgeHit: 'Хит', badgeNew: 'Новинка', badgeHot: 'Остро',
        pwdTitle: 'Доступ ограничен',
        pwdSub: 'Введите пароль для входа в панель администратора',
        pwdSubmit: 'Войти',
        pwdError: 'Неверный пароль. Попробуйте ещё раз.',
        logoutConfirm: 'Выйти из панели администратора?',
        logoutSuccess: 'Вы вышли из системы',
        clearConfirm: 'Удалить все заказы?',
        currency: '₴',
    },
    ua: {
        preloader: 'Розпалюємо мангал...',
        logoMain: 'ШАУРМА НА ДРОВАХ', logoSub: "& М'ЯСО НА ДРОВАХ",
        navMenu: 'Меню', navLocations: 'Адреси', navDelivery: 'Доставка', navContacts: 'Контакти',
        heroBadge: 'Працюємо з 2018 року',
        heroTitle1: 'Найсоковитіша', heroTitle2: 'ШАУРМА', heroTitle3: 'в Одесі',
        heroSubtitle: 'Готуємо на дровах та вугіллі. Доставимо гарячу шаурму та м\'ясо з мангалу до ваших дверей за 40 хвилин.',
        heroCta: 'Дивитися меню', heroCta2: 'Наші точки',
        heroStat1: 'точки в Одесі', heroStat2: 'доставка', heroStat3: 'рейтинг',
        heroScroll: 'Гортайте вниз',
        locEyebrow: 'Наші точки', locTitle: 'Де нас знайти',
        locDesc: 'Три затишні точки в різних районах Одеси',
        loc1Tag: 'Район Котовського', loc1Title: 'вул. Генерала Бочарова, 60',
        loc2Tag: 'Черемушки', loc2Title: 'вул. Кримська, 60',
        loc3Tag: 'Таїрове', loc3Title: 'пр-т Академіка Глушка, 14/3',
        locHours: '10:00 — 22:30', locRoute: 'Прокласти маршрут',
        menuEyebrow: 'Меню', menuTitle: 'Готуємо на вогні',
        menuDesc: "Соковите м'ясо на мангалі, фірмова шаурма та авторські страви",
        filterAll: 'Все меню', filterShawarma: 'Шаурма', filterMeat: "М'ясо на дровах",
        filterGrill: 'На мангалі', filterSides: 'Гарніри',
        deliveryEyebrow: 'Доставка', deliveryTitle: 'По всій Одесі',
        deliveryText: "Привеземо гарячу шаурму та м'ясо з мангалу просто до ваших дверей. Працюємо без вихідних, приймаємо оплату готівкою або карткою.",
        perk1Title: '40-60 хвилин', perk1Text: 'Середній час доставки',
        perk2Title: 'Безкоштовно від 500 ₴', perk2Text: 'В межах міста',
        perk3Title: 'Готівка або картка', perk3Text: 'Будь-який зручний спосіб',
        deliveryHot: 'Завжди гаряче',
        cartTitle: 'Ваше замовлення', cartEmpty: 'Кошик поки порожній', cartBrowse: 'Вибрати страви',
        cartItems: 'Позицій:', cartTotal: 'Разом:', cartCheckout: 'Оформити замовлення',
        checkoutTitle: 'Оформлення замовлення', checkoutSub: 'Заповніть дані для доставки по Одесі',
        fieldName: "Ваше ім'я", fieldPhone: 'Телефон', fieldAddress: 'Адреса доставки', fieldComment: 'Коментар',
        checkoutSubmit: 'Підтвердити замовлення', checkoutSum: 'До сплати',
        successTitle: 'Дякуємо за замовлення!', successText: 'Оператор зателефонує вам найближчим часом для підтвердження.',
        successClose: 'Чудово',
        adminTitle: 'Панель адміністратора', adminExport: 'Експорт JSON', adminClear: 'Очистити', adminClose: 'Закрити',
        adminLogout: 'Вийти',
        adminStatOrders: 'Всього замовлень', adminStatRevenue: 'Виручка', adminStatAvg: 'Середній чек', adminStatNew: 'Нових',
        thId: '№', thTime: 'Час', thClient: 'Клієнт', thPhone: 'Телефон', thAddress: 'Адреса',
        thItems: 'Склад', thSum: 'Сума', thStatus: 'Статус', adminEmpty: 'Замовлень поки немає',
        statusNew: 'Новий', statusDone: 'Виконано', actionDone: 'Виконати', actionDelete: 'Видалити',
        footerTag: 'Мережа шаурмичних та мангалу в Одесі',
        footerContacts: 'Контакти', footerHours: 'Графік роботи', footerSocial: 'Ми в соцмережах',
        footerWork: 'Щодня', footerDelivery: 'Доставка по всій Одесі',
        toastAdded: 'Додано в кошик',
        errName: "Введіть ім'я (мінімум 2 символи)", errPhone: 'Введіть коректний номер', errAddress: 'Вкажіть адресу доставки',
        badgeHit: 'Хіт', badgeNew: 'Новинка', badgeHot: 'Гостро',
        pwdTitle: 'Доступ обмежено',
        pwdSub: 'Введіть пароль для входу в панель адміністратора',
        pwdSubmit: 'Увійти',
        pwdError: 'Невірний пароль. Спробуйте ще раз.',
        logoutConfirm: 'Вийти з панелі адміністратора?',
        logoutSuccess: 'Ви вийшли з системи',
        clearConfirm: 'Видалити всі замовлення?',
        currency: '₴',
    }
};

const BADGE_LABELS = {
    hit: { ru: 'Хит', ua: 'Хіт' },
    new: { ru: 'Новинка', ua: 'Новинка' },
    hot: { ru: 'Остро', ua: 'Гостро' }
};

/* ============================================
   STATE
   ============================================ */
const State = {
    lang: localStorage.getItem('sh_lang') || 'ru',
    cart: JSON.parse(localStorage.getItem('sh_cart') || '[]'),
    orders: JSON.parse(localStorage.getItem('sh_orders') || '[]'),
    filter: 'all'
};

/* ============================================
   HELPERS
   ============================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const save = () => {
    localStorage.setItem('sh_cart', JSON.stringify(State.cart));
    localStorage.setItem('sh_orders', JSON.stringify(State.orders));
    localStorage.setItem('sh_lang', State.lang);
};
const t = key => I18N[State.lang][key] || key;
const money = n => `${n.toLocaleString('ru-RU')} ${t('currency')}`;

function toast(msg) {
    const el = $('#toast');
    $('#toastMsg').textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 2500);
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
    $('.lang-toggle__text').textContent = State.lang === 'ru' ? 'UA' : 'RU';
    renderMenu();
    renderCart();
    renderAdmin();
}

/* ============================================
   MENU RENDER
   ============================================ */
function renderMenu() {
    const grid = $('#menuGrid');
    const items = State.filter === 'all' ? MENU : MENU.filter(p => p.cat === State.filter);
    
    grid.innerHTML = items.map((p, i) => {
        const badgeHtml = p.badge 
            ? `<span class="product__badge product__badge--${p.badge}">${BADGE_LABELS[p.badge][State.lang]}</span>` 
            : '';
        return `
            <article class="product" style="animation-delay:${i * .04}s">
                <div class="product__img">
                    ${badgeHtml}
                    <img src="${p.img}" alt="${t('menuEyebrow')}: ${p.name[State.lang]} в Одессе — доставка Шаурмы" loading="lazy">
                </div>
                <div class="product__body">
                    <div class="product__head">
                        <h3 class="product__name">${p.name[State.lang]}</h3>
                        <span class="product__weight">${p.weight}</span>
                    </div>
                    <p class="product__desc">${p.desc[State.lang]}</p>
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
   CART
   ============================================ */
function addToCart(id) {
    const item = MENU.find(p => p.id === id);
    if (!item) return;
    const existing = State.cart.find(c => c.id === id);
    if (existing) existing.qty++;
    else State.cart.push({ id, qty: 1 });
    save();
    renderCart();
    pulseBadge();
    toast(`${item.name[State.lang]} — ${t('toastAdded')}`);
}

function updateQty(id, delta) {
    const item = State.cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) State.cart = State.cart.filter(c => c.id !== id);
    save();
    renderCart();
}

function removeFromCart(id) {
    State.cart = State.cart.filter(c => c.id !== id);
    save();
    renderCart();
}

function getCartTotal() {
    return State.cart.reduce((sum, c) => {
        const item = MENU.find(p => p.id === c.id);
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
        const item = MENU.find(p => p.id === c.id);
        if (!item) return '';
        return `
            <div class="cart-item">
                <div class="cart-item__img">
                    <img src="${item.img}" alt="${item.name[State.lang]}">
                </div>
                <div class="cart-item__info">
                    <div class="cart-item__name">${item.name[State.lang]}</div>
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
    b.classList.remove('pulse');
    void b.offsetWidth;
    b.classList.add('pulse');
}

/* ============================================
   CHECKOUT
   ============================================ */
function openCheckout() {
    if (State.cart.length === 0) return;
    closeCart();
    fillCheckoutSummary();
    openModal('#checkoutModal');
}

function fillCheckoutSummary() {
    const el = $('#checkoutSummary');
    const total = getCartTotal();
    const rows = State.cart.map(c => {
        const item = MENU.find(p => p.id === c.id);
        return `<div class="checkout-summary__row">
            <span>${item.name[State.lang]} × ${c.qty}</span>
            <span>${money(item.price * c.qty)}</span>
        </div>`;
    }).join('');
    el.innerHTML = rows + `
        <div class="checkout-summary__row">
            <span>${t('checkoutSum')}</span>
            <span>${money(total)}</span>
        </div>`;
}

function submitOrder(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const order = {
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
            const item = MENU.find(p => p.id === c.id);
            return { id: c.id, name: item.name[State.lang], price: item.price, qty: c.qty };
        }),
        total: getCartTotal(),
        status: 'new'
    };

    State.orders.unshift(order);
    State.cart = [];
    save();

    closeModal('#checkoutModal');
    $('#successOrderId').textContent = order.id.toString().slice(-5);
    openModal('#successModal');
    $('#checkoutForm').reset();
    renderCart();
    renderAdmin();
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function validateForm() {
    let ok = true;
    $$('.field').forEach(f => f.classList.remove('error'));
    $$('.field__error').forEach(e => e.textContent = '');

    const name = $('#fName').value.trim();
    if (name.length < 2) {
        markError('name', t('errName'));
        ok = false;
    }

    const phone = $('#fPhone').value.replace(/\D/g, '');
    if (phone.length !== 12) {
        markError('phone', t('errPhone'));
        ok = false;
    }

    const address = $('#fAddress').value.trim();
    if (address.length < 5) {
        markError('address', t('errAddress'));
        ok = false;
    }

    return ok;
}

function markError(field, msg) {
    const input = $(`#f${field.charAt(0).toUpperCase()+field.slice(1)}`);
    if (input) input.closest('.field').classList.add('error');
    const err = $(`[data-error="${field}"]`);
    if (err) err.textContent = msg;
}

function phoneMask(e) {
    const input = e.target;
    const key = e.key;
    
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(key)) {
        if (key === 'Backspace') {
            setTimeout(() => formatPhoneValue(input), 0);
        }
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

function phoneFocus(e) {
    if (!e.target.value) e.target.value = '+380 ';
}

function phoneBlur(e) {
    if (e.target.value === '+380 ' || e.target.value.replace(/\D/g, '').length <= 3) {
        e.target.value = '';
    }
}

/* ============================================
   ADMIN (С ПАРОЛЕМ)
   ============================================ */
const ADMIN_PASSWORD = 'shaurma8na1drovax2';
const AUTH_KEY = 'sh_admin_auth';

function isAdminAuthed() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
}

function setAdminAuthed() {
    sessionStorage.setItem(AUTH_KEY, 'true');
}

function clearAdminAuth() {
    sessionStorage.removeItem(AUTH_KEY);
}

function renderAdmin() {
    const tbody = $('#adminTableBody');
    const total = State.orders.length;
    const revenue = State.orders.reduce((s, o) => s + o.total, 0);
    const newCount = State.orders.filter(o => o.status === 'new').length;

    $('#statOrders').textContent = total;
    $('#statRevenue').textContent = money(revenue);
    $('#statAvg').textContent = money(total ? Math.round(revenue / total) : 0);
    $('#statNew').textContent = newCount;

    if (total === 0) {
        tbody.innerHTML = `<tr class="admin-table__empty"><td colspan="9">${t('adminEmpty')}</td></tr>`;
        return;
    }

    tbody.innerHTML = State.orders.map(o => {
        const statusClass = o.status === 'new' ? 'new' : 'done';
        const statusText = o.status === 'new' ? t('statusNew') : t('statusDone');
        const itemsList = o.items.map(i => `${i.name} × ${i.qty}`).join('<br>');
        return `
            <tr>
                <td><strong>#${o.id.toString().slice(-5)}</strong></td>
                <td>${o.time}</td>
                <td>${escapeHtml(o.name)}</td>
                <td><a href="tel:${o.phone}">${o.phone}</a></td>
                <td>${escapeHtml(o.address)}${o.comment ? `<br><small style="color:var(--c-text-3)">${escapeHtml(o.comment)}</small>` : ''}</td>
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

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function markDone(id) {
    const o = State.orders.find(x => x.id === id);
    if (o) o.status = 'done';
    save();
    renderAdmin();
}

function deleteOrder(id) {
    State.orders = State.orders.filter(x => x.id !== id);
    save();
    renderAdmin();
}

function clearOrders() {
    if (!confirm(t('clearConfirm'))) return;
    State.orders = [];
    save();
    renderAdmin();
}

function exportOrders() {
    const blob = new Blob([JSON.stringify(State.orders, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `orders_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}

function openAdmin() {
    if (isAdminAuthed()) {
        showAdminPanel();
    } else {
        openModal('#passwordModal');
        setTimeout(() => {
            const input = $('#pwdInput');
            input.focus();
            input.select();
        }, 300);
    }
}

function showAdminPanel() {
    $('#adminPanel').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderAdmin();
}

function closeAdmin() {
    $('#adminPanel').classList.remove('open');
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

/* ============================================
   MODALS / DRAWERS
   ============================================ */
function openModal(sel) {
    const m = $(sel);
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function closeModal(sel) {
    const m = $(sel);
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
function openCart() {
    $('#cartDrawer').classList.add('open');
    $('#cartDrawer').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    $('#cartDrawer').classList.remove('open');
    $('#cartDrawer').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
function openMobile() {
    $('#mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMobile() {
    $('#mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
}

/* ============================================
   SCROLL HEADER
   ============================================ */
function handleScroll() {
    const h = $('#header');
    if (window.scrollY > 30) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    applyLang();

    // Preloader
    setTimeout(() => $('#preloader').classList.add('hidden'), 800);

    // Language toggle
    $('#langToggle').addEventListener('click', () => {
        State.lang = State.lang === 'ru' ? 'ua' : 'ru';
        save();
        applyLang();
    });

    // Header scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile menu
    $('#burger').addEventListener('click', openMobile);
    $('#mobileClose').addEventListener('click', closeMobile);
    $('#mobileMenu .mobile-menu__backdrop').addEventListener('click', closeMobile);
    $$('#mobileMenu .mobile-menu__nav a').forEach(a => a.addEventListener('click', closeMobile));

    // Menu filters
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

    // Add to cart
    $('#menuGrid').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-add]');
        if (btn) addToCart(+btn.dataset.add);
    });

    // Cart drawer
    $('#cartTrigger').addEventListener('click', openCart);
    $('#cartDrawer').addEventListener('click', (e) => {
        if (e.target.dataset.closeCart !== undefined || e.target.classList.contains('cart-drawer__backdrop')) {
            closeCart();
        }
    });
    $('#cartBody').addEventListener('click', (e) => {
        const qty = e.target.closest('[data-qty]');
        if (qty) updateQuantity(+qty.dataset.qty, +qty.dataset.delta);
        const rm = e.target.closest('[data-remove]');
        if (rm) removeFromCart(+rm.dataset.remove);
    });

    // Checkout
    $('#checkoutBtn').addEventListener('click', openCheckout);
    
    // Modals close
    document.addEventListener('click', (e) => {
        if (e.target.dataset.closeModal !== undefined || e.target.classList.contains('modal__backdrop')) {
            $$('.modal.open').forEach(m => closeModal('#' + m.id));
        }
    });

    // Form
    $('#checkoutForm').addEventListener('submit', submitOrder);
    const phoneInput = $('#fPhone');
    phoneInput.addEventListener('keydown', phoneMask);
    phoneInput.addEventListener('focus', phoneFocus);
    phoneInput.addEventListener('blur', phoneBlur);
    phoneInput.addEventListener('input', (e) => {
        setTimeout(() => formatPhoneValue(e.target), 0);
    });

    // Escape closes everything
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

    // Admin
    $('#footerAdminTrigger').addEventListener('click', openAdmin);
    $('#adminClose').addEventListener('click', closeAdmin);
    $('#adminLogout').addEventListener('click', logoutAdmin);
    $('#adminExport').addEventListener('click', exportOrders);
    $('#adminClear').addEventListener('click', clearOrders);
    $('#adminTableBody').addEventListener('click', (e) => {
        const done = e.target.closest('[data-admin-done]');
        if (done) markDone(+done.dataset.adminDone);
        const del = e.target.closest('[data-admin-del]');
        if (del) deleteOrder(+del.dataset.adminDel);
    });

    // Password modal
    $('#passwordForm').addEventListener('submit', handlePasswordSubmit);
    $('#pwdInput').addEventListener('input', () => {
        $('#pwdError').textContent = '';
        $('#pwdInput').closest('.field').classList.remove('shake');
    });

    // Hash #admin
    if (location.hash === '#admin') openAdmin();
    window.addEventListener('hashchange', () => {
        if (location.hash === '#admin') openAdmin();
    });

    handleScroll();
});