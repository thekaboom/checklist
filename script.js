console.clear();


// Initialize Firebase
const config = {
  apiKey: "AIzaSyBOi39p524OJTY8KFo_vPUK0xK_aJX84hE",
  authDomain: "react-store-bc88f.firebaseapp.com",
  databaseURL: "https://react-store-bc88f.firebaseio.com",
  projectId: "react-store-bc88f",
  //storageBucket: "",
  messagingSenderId: "638463324339" };

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true };

db.settings(settings);

const productsRef = db.collection("products");
const statsRef = db.collection("stats");


const app = document.getElementById('app');
const dictionary = {
  'nav_home': {
    'eng': 'Homepage',
    'ua': 'Домашня сторінка' },

  'nav_for_her': {
    'eng': 'For her',
    'ua': 'Для неï' },

  'nav_for_him': {
    'eng': 'For him',
    'ua': 'Для нього' },

  'stitle_for_her': {
    'eng': 'For her',
    'ua': 'Для неï' },

  'stitle_for_him': {
    'eng': 'For him',
    'ua': 'Для нього' },

  'ptitle_home': {
    'eng': 'Shoes for everyone',
    'ua': 'Взуття для кожного' },

  'ptitle_for_her': {
    'eng': 'Best shoes for her',
    'ua': 'Найкраще взуття для неï' },

  'ptitle_for_him': {
    'eng': 'Strongest shoes for him',
    'ua': 'Наймiцнiше взуття для нього' },

  'ptitle_cart': {
    'eng': 'Cart',
    'ua': 'Кошик' },

  'header_description': {
    'eng': 'Description',
    'ua': 'Опис' },

  'header_total': {
    'eng': 'Total',
    'ua': 'Усього' },

  'header_product_not_found': {
    'eng': 'Oh, no!',
    'ua': 'O, нi!' },

  'text_product_not_found': {
    'eng': 'We couldn\'t find such shoes... Maybe try different filters? 🤷‍',
    'ua': 'Ми не змогли знайти таке взуття... Може спробуєте iнщi фiльтри? 🤷‍' },

  'label_shoes_for': {
    'eng': 'Shoes For',
    'ua': 'Взуття Для' },

  'label_brand': {
    'eng': 'Brand',
    'ua': 'Бренд' },

  'label_color': {
    'eng': 'Color',
    'ua': 'Колiр' },

  'action_reset_filters': {
    'eng': 'Reset Filters',
    'ua': 'Скинути Фiльтри' },

  'action_add_to_cart': {
    'eng': 'Add To Cart',
    'ua': 'Додати До Кошика' },

  'action_checkout': {
    'eng': 'Checkout',
    'ua': 'Придбати' },

  'label_lightness_mode': {
    'eng': 'Lightness mode',
    'ua': 'Режим яскравостi' },

  'text_empty_cart': {
    'eng': 'You cart is empty right now.\nClick "Add To Cart" button to start shopping.',
    'ua': 'Ваш кошик зараз попрожнiй.\nТацнiть по кнопцi "Додати До Кошика" щоб розпочати шопитись.' },

  'placeholder_any': {
    'eng': 'Any',
    'ua': 'Будь-що' },

  'placeholder_any_m': {
    'eng': 'Any',
    'ua': 'Будь-який' },

  'placeholder_any_f': {
    'eng': 'Any',
    'ua': 'Будь-якa' },

  'placeholder_any_p': {
    'eng': 'Any',
    'ua': 'Будь-якi' },

  'placeholder_any_n': {
    'eng': 'Any',
    'ua': 'Будь-яке' },

  'placeholder_any_s': {
    'eng': 'Any',
    'ua': 'Будь-чого' } };




const appData = {
  product: {
    fetchIsPending: false,
    fetchIsFulfilled: false,
    fetchIsRejected: false,

    details: {
      fetchIsPending: false,
      fetchIsFulfilled: false,
      fetchIsRejected: false,
      data: {},
      openedURL: '' },


    list: [],
    filters: {
      brands: [],
      categories: [],
      colors: [] },

    appliedFilters: {
      gender: '',
      brand: '',
      category: '',
      color: '' },

    settings: {
      itemsPerPage: 12 },

    errors: {
      fetch: null },

    cart: {
      list: {},
      isEmpty: true } },


  ui: {
    cart: {
      isOpened: false },

    nightModeEnabled: false,
    selectedLang: 'eng',
    langs: ['eng', 'ua'],
    dictionary: dictionary },

  navigation: {
    currentPageSlug: 'home',
    headerLinks: [
    {
      'url': '/home',
      'name': 'nav_home' },

    {
      'url': '/category/women',
      'name': 'nav_for_her' },

    {
      'url': '/category/men',
      'name': 'nav_for_him' }],


    pages: {
      'home': {
        title: 'ptitle_home' },

      'women': {
        title: 'ptitle_for_her' },

      'men': {
        title: 'ptitle_for_him' } } },



  pageData: {} };



const {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  DefaultRoute,
  PropsRoute } =
ReactRouterDOM;
const { withRouter } = ReactRouter;



Array.prototype.compare = arrB => {
  if (!(Array.isArray(this) && Array.isArray(arr))) return false;
  const str = arr => {return JSON.stringify(arr);};

  return str(this) === str(arrB);
};



/* Redux stuff */

const { connect, Provider } = ReactRedux;
const { applyMiddleware, combineReducers, createStore } = Redux;
const ReduxThunk = window.ReduxThunk.default;
const logger = reduxLogger.logger;

const Actions = {
  ui: {
    filters: {
      set: 'SET_UI_FILTERS' },

    cart: {
      open: 'OPEN_CART',
      close: 'CLOSE_CART' },

    toggleNightMode: 'TOGGLE_NIGHT_MODE',
    setLang: 'SET_LANGUAGE' },

  navigation: {
    to: 'NAVIGATE_TO' },

  product: {
    products: {
      fetch: {
        pending: 'PRODUCT_FETCH_PENDING',
        fulfilled: 'PRODUCT_FETCH_FULFILLED',
        rejected: 'PRODUCT_FETCH_REJECTED',
        store: 'PRODUCT_FETCH_STORE' } },


    details: {
      fetch: {
        pending: 'PRODUCT_DETAILS_FETCH_PENDING',
        fulfilled: 'PRODUCT_DETAILS_FETCH_FULFILLED',
        rejected: 'PRODUCT_DETAILS_FETCH_REJECTED',
        store: 'PRODUCT_DETAILS_FETCH_STORE' },

      set: {
        openedURL: 'PRODUCT_DETAILS_SET_OPENED_URL' },

      unset: {
        openedURL: 'PRODUCT_DETAILS_UNSET_OPENED_URL',
        data: 'PRODUCT_DETAILS_UNSET_DATA' } },


    filter: {
      fetch: {
        pending: 'PRODUCT_FILTER_FETCH_PENDING',
        fulfilled: 'PRODUCT_FILTER_FETCH_FULFILLED',
        rejected: 'PRODUCT_FILTER_FETCH_REJECTED',
        store: 'PRODUCT_FILTER_FETCH_STORE' },

      set: {
        gender: 'PRODUCT_SET_FILTER_GENDER',
        brand: 'PRODUCT_SET_FILTER_BRAND',
        category: 'PRODUCT_SET_FILTER_CATEGORY',
        color: 'PRODUCT_SET_FILTER_COLOR' },

      unset: {
        all: 'PRODUCT_RESET_ALL_FILTERS' } },


    cart: {
      add: {
        product: 'CART_ADD_PRODUCT' },

      remove: {
        product: 'CART_REMOVE_PRODUCT' } } } };







//Everything about ui goes here
const uiReducer = (state = appData.ui, action) => {
  const actions = Actions.ui;

  switch (action.type) {

    case actions.toggleNightMode:
      return {
        ...state,
        nightModeEnabled: !state.nightModeEnabled };

      break;

    case actions.setLang:
      console.log(action.payload, state.ui);
      return {
        ...state,
        selectedLang: action.payload };

      break;

    case actions.cart.open:
      state = { ...state, cart: {
          isOpened: true } };


      return state;
      break;

    case actions.cart.close:
      state = { ...state, cart: {
          isOpened: false } };

      return state;
      break;

    default:
      return state;
      break;}

};

function toggleNightModeAction() {
  return {
    type: Actions.ui.toggleNightMode };

}

function setLangAction(lang) {
  return {
    type: Actions.ui.setLang,
    payload: lang };

}


function openCartAction() {
  return {
    type: Actions.ui.cart.open };

}

function closeCartAction() {
  return {
    type: Actions.ui.cart.close };

}


//Everything about navigation and current page goes here
const navigationReducer = (state = appData.navigation, action) => {
  const actions = Actions.navigation;

  switch (action.type) {
    case actions.to:
      return {
        ...state,
        currentPageSlug: action.payload };

      break;

    default:
      return state;}

};

function navigateAction(pageSlug) {
  return {
    type: Actions.navigation.to,
    payload: pageSlug };

}
// store.dispatch(navigateAction('home'))


const productReducer = (state = appData.product, action) => {
  const actions = Actions.product;

  switch (action.type) {

    //Fetch
    case actions.products.fetch.pending:

      //clear current list
      return {
        ...state,
        list: appData.product.list,
        fetchIsPending: true,
        fetchIsFulfilled: false,
        fetchIsRejected: false };

      break;

    case actions.products.fetch.fulfilled:
      return {
        ...state,
        list: appData.product.list,
        fetchIsPending: false,
        fetchIsFulfilled: true,
        fetchIsRejected: false };

      break;

    case actions.products.fetch.rejected:
      state = {
        ...state,
        list: appData.product.list,
        fetchIsPending: false,
        fetchIsFulfilled: false,
        fetchIsRejected: true };

      state.errors.fetch = action.payload;

      return state;
      break;


    case actions.products.fetch.store:
      return {
        ...state,
        list: action.payload };

      break;




    //ProductDetails
    case actions.details.fetch.pending:
      state = { ...state };

      state.details.data = appData.product.details.data;
      state.details.fetchIsPending = true;
      state.details.fetchIsFulfilled = false;
      state.details.fetchIsRejected = false;

      return state;
      break;

    case actions.details.fetch.fulfilled:
      state = { ...state };

      state.details.data = appData.product.details.data;
      state.details.fetchIsPending = false;
      state.details.fetchIsFulfilled = true;
      state.details.fetchIsRejected = false;

      return state;
      break;

    case actions.details.fetch.rejected:
      state = { ...state };

      state.details.data = appData.product.details.data;
      state.details.fetchIsPending = false;
      state.details.fetchIsFulfilled = false;
      state.details.fetchIsRejected = true;

      return state;
      break;


    case actions.details.fetch.store:
      state = { ...state };

      state.details.data = action.payload;

      return state;
      break;


    case actions.details.set.openedURL:
      state = { ...state };

      state.details.openedURL = action.payload;

      return state;
      break;


    case actions.details.unset.openedURL:
      state = { ...state };

      state.details.openedURL = null;

      return state;
      break;


    case actions.details.unset.data:
      state = { ...state };

      state.details.data = {};

      return state;
      break;




    //Filters
    case actions.filter.fetch.pending:
      //update only if changed, so return current state
      return state;
      break;

    case actions.filter.fetch.fulfilled:
      state = { ...state };

      state.filters.brands = action.payload.brands;
      state.filters.categories = action.payload.categories;
      state.filters.colors = action.payload.colors;

      return state;
      break;

    case actions.filter.fetch.rejected:
      state = { ...state };
      state.errors.fetch = action.payload;

      return state;
      break;

    case actions.filter.set.gender:
      state = { ...state };
      state.appliedFilters.gender = action.payload;

      return state;
      break;

    case actions.filter.set.brand:
      state = { ...state };
      state.appliedFilters.brand = action.payload;

      return state;
      break;

    case actions.filter.set.category:
      state = { ...state };
      state.appliedFilters.category = action.payload;

      return state;
      break;

    case actions.filter.set.color:
      state = { ...state };
      state.appliedFilters.color = action.payload;

      return state;
      break;

    case actions.filter.unset.all:
      state = { ...state };
      state.appliedFilters.color = '';
      state.appliedFilters.category = '';
      state.appliedFilters.brand = '';

      return state;
      break;


    //Cart

    case actions.cart.add.product:
      const { product } = action.payload;
      const { url } = product;

      state = { ...state };
      const list = { ...state.cart.list };

      if (list[url]) {
        list[url].count += 1;
      } else {
        list[url] = {
          ...product,
          count: 1 };

      }

      state.cart.isEmpty = false;
      state.cart.list = list;

      return state;

    default:
      return state;}

};

function setProductsGenderAction(value) {
  const actions = Actions.product.filter;

  return {
    type: actions.set.gender,
    payload: value };

}

function setProductsBrandAction(value) {
  const actions = Actions.product.filter;

  return {
    type: actions.set.brand,
    payload: value };

}

function setProductsCategoryAction(value) {
  const actions = Actions.product.filter;

  return {
    type: actions.set.category,
    payload: value };

}

function setProductsColorAction(value) {
  const actions = Actions.product.filter;

  return {
    type: actions.set.color,
    payload: value };

}


function unsetProductsFilters(value) {
  const actions = Actions.product.filter;

  return {
    type: actions.unset.all,
    payload: value };

}


function startFetchingProductsAction() {
  const actions = Actions.product.products;

  return {
    type: actions.fetch.pending };

}

function storeProductsAction(products) {
  const actions = Actions.product.products;

  return {
    type: actions.fetch.store,
    payload: products };

}

function fetchingProductsFulfilledAction() {
  const actions = Actions.product.products;

  return {
    type: actions.fetch.fulfilled };

}


const fetchProducts = dispatch => {
  const state = store.getState();
  dispatch(startFetchingProductsAction());

  const { appliedFilters } = state.product;

  const genderKey = appliedFilters.gender ? 'gender' : '_';
  const genderQuery = appliedFilters.gender || true;

  const brandKey = appliedFilters.brand ? 'brand' : '_';
  const brandQuery = appliedFilters.brand || true;

  const catKey = appliedFilters.category ? 'category' : '_';
  const catQuery = appliedFilters.category || true;

  const colorKey = appliedFilters.color ? 'color' : '_';
  const colorQuery = appliedFilters.color || true;

  productsRef.
  where(genderKey, '==', genderQuery).
  where(brandKey, '==', brandQuery).
  where(catKey, '==', catQuery).
  where(colorKey, '==', colorQuery)

  // .orderBy('posted')
  .limit(state.product.settings.itemsPerPage).
  get().
  then(querySnapshot => {
    const state = store.getState();
    const products = [];

    querySnapshot.forEach(doc => {
      products.push(doc.data());
    });

    /*
           Note: Prevent usage of deprecated data
                 e.g. when user clicks to fast on
                 different links
        */
    if (state.product.fetchIsPending) {
      dispatch(fetchingProductsFulfilledAction());
      dispatch(storeProductsAction(products));
    }

  }).
  catch(err => {
    console.error(err);
  });
};
//store.dispatch(fetchProducts);





function startFetchingProductDetailsAction() {
  const actions = Actions.product.details;

  return {
    type: actions.fetch.pending };

}

function storeProductDetailsAction(productData) {
  const actions = Actions.product.details;

  return {
    type: actions.fetch.store,
    payload: productData };

}

function storeOpenedProductDetailsAction(openedURL) {
  const actions = Actions.product.details;

  return {
    type: actions.set.openedURL,
    payload: openedURL };

}



function unsetOpenedProductURLAction(openedURL) {
  const actions = Actions.product.details;

  return {
    type: actions.unset.openedURL };

}

function unsetProductDetailsDataAction() {
  const actions = Actions.product.details;

  return {
    type: actions.unset.data };

}

function fetchingProductDetailsFulfilledAction() {
  const actions = Actions.product.details;

  return {
    type: actions.fetch.fulfilled };

}

const fetchProductDetails = dispatch => {
  const state = store.getState();
  dispatch(startFetchingProductDetailsAction());

  const { details } = state.product;

  const urlKey = 'url';
  const urlQuery = details.openedURL;

  productsRef.
  where(urlKey, '==', urlQuery).
  limit(1).
  get().
  then(querySnapshot => {
    const state = store.getState();
    const products = [];

    querySnapshot.forEach(doc => {
      products.push(doc.data());
    });

    const productDetails = products[0];
    console.log(productDetails);

    /*
                                    Note: Prevent usage of deprecated data
                                          e.g. when user clicks to fast on
                                          different links
                                 */
    if (state.product.details.fetchIsPending) {
      dispatch(fetchingProductDetailsFulfilledAction());
      dispatch(storeProductDetailsAction(productDetails));
    }

  }).
  catch(err => {
    console.error(err);
  });
};




function startFetchingFiltersAction() {
  const actions = Actions.product.filter;

  return {
    type: actions.fetch.pending };

}

function storeProductFiltersAction(filters) {
  const actions = Actions.product.filter;

  return {
    type: actions.fetch.fulfilled,
    payload: filters };

}

const fetchProductFilters = dispatch => {
  const state = store.getState();

  dispatch(startFetchingFiltersAction());

  const { appliedFilters } = state.product;

  statsRef.
  doc('options').
  get().
  then(documentSnapshot => {
    const filters = documentSnapshot.data();
    console.log(filters);
    dispatch(storeProductFiltersAction(filters));
  }).
  catch(err => {
    console.error(err);
  });
};
//store.dispatch(fetchProductFilters);



function addProductToCart(product) {
  const actions = Actions.product.cart;

  return {
    type: actions.add.product,
    payload: {
      product: product } };


}



const reducers = combineReducers({
  ui: uiReducer,
  navigation: navigationReducer,
  product: productReducer });



const initialState = {
  someval: 1 };


const middleware = applyMiddleware(ReduxThunk, logger);
const store = createStore(reducers, appData, middleware);



store.subscribe(() => {
});



const Icon = ({ name }) => React.createElement("i", { className: "icon material-icons" }, name);

class Dictionary extends React.Component {
  handleText(str) {
    return str.replace(/\\n/gm, '<br/>');
  }

  render() {
    const { lang, dictionary, tag } = this.props;
    console.log('))))', lang, dictionary, tag);
    return dictionary[tag] ?
    this.handleText(dictionary[tag][lang]) :
    '';
  }}
;
const Dict = connect((state, ownProps) => {
  return {
    lang: state.ui.selectedLang,
    dictionary: state.ui.dictionary,
    tag: ownProps.tag };

})(Dictionary);


class TextItem extends React.Component {
  handleText(str) {
    return str.replace(/\\n/gm, '<br/>');
  }

  getText() {
    const { lang, dictionary, tag } = this.props;
    return dictionary[tag] ?
    this.handleText(dictionary[tag][lang]) :
    '';
  }

  render() {
    return (
      React.createElement("span", { className: "text" }, this.getText()));

  }}
;
const Text = connect((state, ownProps) => {
  return {
    lang: state.ui.selectedLang,
    dictionary: state.ui.dictionary,
    tag: ownProps.tag };

})(TextItem);


const HeaderNavigationLink = props => {
  return (
    React.createElement(NavLink, {
      className: "link",
      to: props.link.url,
      activeClassName: "active-link" },

    props.link.name));


};

const HeaderNavigationLinkWR = withRouter(HeaderNavigationLink);


class HeaderNavigation extends React.Component {
  render() {
    const links = this.props.headerLinks.map(link => {
      return (
        React.createElement(NavLink, {
          className: "link",
          to: link.url,
          key: link.url,
          activeClassName: "active-link" },

        React.createElement(Text, { tag: link.name })));


    });

    return (
      React.createElement("ul", { className: "header-navigation" },
      links));


  }}


const HeaderNavigationContainer = connect(state => {
  return {
    headerLinks: state.navigation.headerLinks };

})(withRouter(HeaderNavigation));


function countItemsInCart(items = {}) {
  let count = 0;
  for (var url in items) {
    if (items.hasOwnProperty(url)) {
      count += items[url].count;
    }
  }

  return count;
}


function countPriceOfItemsInCart(items = {}) {
  let price = 0;
  let currency = '';

  for (var url in items) {
    if (items.hasOwnProperty(url)) {
      const item = items[url];
      price += item.count * item.price;
      currency = item.price_currency;
    }
  }

  return prettifyCurrency(currency) + prettifyPrice(Math.round(price * 100) / 100);
}

const CartIcon = props => {
  const count = countItemsInCart(props.list);
  const counterDefaultClass = "counter bold";
  const counterActiveClass = count > 0 ? "active" : "";
  const counterClass = [
  counterDefaultClass,
  counterActiveClass].
  join(" ");


  return (
    React.createElement("div", { className: "cart-icon", onClick: props.onClick },
    React.createElement(Icon, { name: "shopping_basket" }),
    React.createElement("span", { className: counterClass },
    count)));



};

const CartItem = props => {
  return (
    React.createElement("div", { className: "product item" },
    React.createElement(ProductImage, { product: props.data }),
    React.createElement("div", { className: "details" },
    React.createElement("div", { className: "name bold" },
    props.data.name),

    React.createElement("div", { className: "price" },
    prettifyCurrency(props.data.price_currency),
    prettifyPrice(props.data.price))),


    React.createElement("div", { className: "count" },
    props.data.count)));




};


const CartEmpty = props => {
  return (
    React.createElement("div", { className: "empty" },
    React.createElement(Icon, { name: "shopping_cart" }),
    React.createElement("p", { className: "hint text" },
    React.createElement(Text, { tag: 'text_empty_cart' }))));



};

class Cart extends React.Component {
  renderCartItems() {
    const { list } = this.props.product.cart;
    let items = [];

    for (let itemKey in list) {
      if (list.hasOwnProperty(itemKey)) {
        items.push(React.createElement(CartItem, { key: itemKey, data: list[itemKey] }));
      }
    }

    return items;
  }

  renderActiveCart() {
    const { cart } = this.props.product;
    return (
      React.createElement("div", { className: "cart-content" },
      React.createElement("div", { className: "list" },
      this.renderCartItems()),

      React.createElement("div", { className: "total" },
      React.createElement("span", { className: "text bold" },
      React.createElement(Text, { tag: 'header_total' })),

      React.createElement("span", { className: "amount bold" },
      countPriceOfItemsInCart(cart.list))),


      React.createElement("div", { className: "actions-wrapper" },
      React.createElement("button", { className: "btn red wide" },
      React.createElement(Text, { tag: 'action_checkout' })))));




  }

  renderContent() {
    const { cart } = this.props.product;

    return cart.isEmpty ?
    React.createElement(CartEmpty, null) :
    this.renderActiveCart();
  }

  render() {
    return (
      React.createElement("div", { className: "cart" },
      React.createElement("div", { className: "cart-topbar" },
      React.createElement("a", { href: "javascript:;", className: "btn" },
      React.createElement("i", { className: "icon material-icons" }, "close")),

      React.createElement("h3", { className: "cart-title" },
      React.createElement("i", { className: "icon material-icons" }, "shopping_basket"),
      React.createElement(Text, { tag: "ptitle_cart" }))),


      this.renderContent()));


  }}


const CartContainer = connect(state => state)(Cart);


class Header extends React.Component {
  onCartIconClick() {
    const { dispatch, ui } = this.props;
    const { isOpened } = ui.cart;

    if (isOpened) {
      dispatch(closeCartAction());
    } else {
      dispatch(openCartAction());
    }

  }

  render() {
    const { list } = this.props.product.cart;
    return (
      React.createElement("header", { className: "header" },
      React.createElement(HeaderNavigationContainer, null),
      React.createElement(CartIcon, { list: list, onClick: this.onCartIconClick.bind(this) })));


  }}


const HeaderContainer = connect(
state => {
  return state;
})(
Header);


class Selector extends React.Component {
  render() {
    let options = this.props.list.map((item, i) => {
      return (
        React.createElement("option", {
          key: i,
          value: item.url },

        item.name));


    });

    //insert placehodler option
    if (!this.props.disableDefault) {
      options.unshift(React.createElement("option", { key: 'default', value: "" }, React.createElement(Dict, { tag: this.props.placeholder || "placeholder_any" })));
    }


    return (
      React.createElement("div", null,
      React.createElement("label", { htmlFor: this.props.id },
      React.createElement(Text, { tag: this.props.label })),

      React.createElement("select", {
        id: this.props.id,
        name: this.props.name,
        onChange: this.props.onChange,
        value: this.props.selected },

      options)));



  }}


class Toggler extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  renderIcon(name) {
    return React.createElement(Icon, { name: name });
  }

  renderIconOn() {
    return this.state.iconOn ?
    this.renderIcon(this.state.iconOn) :
    null;
  }

  renderIconOff() {
    return this.state.iconOn ?
    this.renderIcon(this.state.iconOff) :
    null;
  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({isChecked: nextProps.isChecked});
  // }

  renderIndicator() {
    return (
      React.createElement("div", { className: "indicator" },
      React.createElement("div", { className: "state on" },
      this.renderIconOn()),

      React.createElement("div", { className: "state off" },
      this.renderIconOff())));



  }

  handleChange() {
    this.setState({ isChecked: !this.state.isChecked });
    if (this.state.onChange) {this.state.onChange();}
  }

  renderCheckbox() {
    const { name, onChange, isChecked } = this.state;

    return (
      React.createElement("input", {
        type: "checkbox",
        name: name,
        onChange: this.handleChange.bind(this),
        checked: isChecked ? 'true' : '' }));


  }

  renderLabel() {
    const { label } = this.state;

    return label ?

    React.createElement("div", { className: "label" },
    React.createElement(Text, { tag: label })) :


    null;
  }

  bakeClassName() {
    const { name, onChange, isChecked, label } = this.state;
    const mainClass = "toggler";
    const labelClass = label ? "with-label" : "";

    return [mainClass, labelClass].join(" ");
  }

  render() {
    const className = this.bakeClassName();

    return (
      React.createElement("div", { className: className },
      this.renderCheckbox(),

      React.createElement("div", { className: "view" },
      this.renderLabel(),

      React.createElement("div", { className: "body" },
      React.createElement("div", { className: "fill" }),
      this.renderIndicator()))));





  }}
;


const NightModeToggler = props => {
  const { dispatch } = props;
  const label = "label_lightness_mode";

  return (
    React.createElement(Toggler, {
      name: "night-mode",
      iconOn: "brightness_3",
      iconOff: "brightness_7",
      label: label,
      onChange: () => {dispatch(toggleNightModeAction());},
      isChecked: props.ui.nightModeEnabled }));


};
const NightModeTogglerContainer = connect(state => state)(NightModeToggler);



class TabberOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      isSelected: this.props.selectedTab === this.props.value };

  }

  componentWillReceiveProps(newProps) {
    if (this.props.selectedTab != newProps.selectedTab) {
      this.setState({
        selectedTab: newProps.selectedTab,
        isSelected: newProps.selectedTab === newProps.value });

    }
  }

  handleClick() {
    const { onSelect, value } = this.state;
    onSelect(value);
  }

  bakeClassName() {
    const { isSelected } = this.state;

    const mainClass = "item";
    const selectedClass = isSelected ? 'selected' : '';

    return [mainClass, selectedClass].join(" ");
  }

  render() {
    return (
      React.createElement("div", {
        className: this.bakeClassName(),
        onClick: this.handleClick.bind(this) },

      this.state.children));


  }}
;

class Tabber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      selectedTab: this.props.default || null };

  }

  handleSelect(value) {
    const { onSelect } = this.state;
    this.setState({ selectedTab: value });

    if (onSelect) onSelect(value);
  }

  renderOptions() {
    const { selectedTab, children } = this.state;

    return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onSelect: this.handleSelect.bind(this),
      selectedTab: selectedTab }));


  }

  render() {
    return (
      React.createElement("div", { className: "tabber" },

      this.renderOptions()));



  }}




class LanguageTabber extends React.Component {
  handleSelect(lang) {
    const { dispatch } = this.props;

    dispatch(setLangAction(lang));
  }

  render() {
    return (
      React.createElement(Tabber, { default: this.props.ui.selectedLang, className: "lang", onSelect: this.handleSelect.bind(this) },
      React.createElement(TabberOption, { value: "ua" },
      React.createElement("span", { className: "flag-icon flag-icon-ua" })),

      React.createElement(TabberOption, { value: "eng" },
      React.createElement("span", { className: "flag-icon flag-icon-us" }))));



  }}

const LangTabber = connect(state => state)(LanguageTabber);



class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      selected: this.props.selected || "" };

  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.list.compare(nextProps.list)) {
      this.setState({ list: nextProps.list });
    }
  }

  handleColorSelect(e) {
    const colorURL = e.target.getAttribute('value') || '';
    this.setState({ selected: colorURL });

    if (this.state.onChange) this.state.onChange(colorURL);
  }


  renderColorItem(color, key) {
    const { selected } = this.state;
    const value = !color ? "" : color.url;
    const colorType = !color && 'white' ||
    color.url === 'gray' && 'bluish-gray' ||
    color.url;
    const mainClass = 'item color';
    const noneClass = !color ? 'none' : '';
    const colorClass = `bg-${colorType}-bordered`;
    const selectedClass = selected === value ? 'selected' : '';
    const activeClass = selected != value ? 'active' : '';
    const itemClass = [mainClass, noneClass, colorClass, selectedClass, activeClass].join(' ');

    return (
      React.createElement("div", {
        key: key,
        className: itemClass,
        value: value,
        onClick: this.handleColorSelect.bind(this) }));


  }

  renderLabel() {
    const { label } = this.state;
    return label ? React.createElement("label", { className: "label" }, React.createElement(Text, { tag: label })) : null;
  }

  renderItems() {
    let list = this.state.list.map((color, key) => {
      return this.renderColorItem(color, key);
    });
    list.unshift(this.renderColorItem(null, Math.random()));
    return list;
  }

  render() {
    return (
      React.createElement("div", {
        id: this.state.id || null,
        className: "colorpicker" },

      this.renderLabel(),
      React.createElement("div", { className: "list" },
      this.renderItems())));



  }}




class SideA extends React.Component {

  navToBySelector(path) {
    const { dispatch, history, location } = this.props;
    if (location.pathname === path) {
      dispatch(fetchProducts);
    } else {
      history.push(path);
    }
  }

  handleSectorChange() {
    const { history, appliedFilters } = this.props;

    switch (appliedFilters.gender) {
      case "male":
        this.navToBySelector('/category/men');
        break;
      case "female":
        this.navToBySelector('/category/women');
        break;
      default:
        this.navToBySelector('/home');
        break;}


  }

  handleBrandChange(event) {
    const { dispatch } = this.props;
    const brandFilter = event.target.value;

    dispatch(setProductsBrandAction(brandFilter));
    this.handleSectorChange();
    // dispatch(fetchProducts);
  }

  handleCategoryChange(event) {
    const { dispatch } = this.props;
    const catFilter = event.target.value;

    dispatch(setProductsCategoryAction(catFilter));
    this.handleSectorChange();
    // dispatch(fetchProducts);
  }

  handleColorChange(colorURL) {
    const { dispatch } = this.props;
    const colorFilter = colorURL;

    console.log('change');

    dispatch(setProductsColorAction(colorFilter));
    // dispatch(fetchProducts);
    this.handleSectorChange();
  }

  handleResetButtonClick() {
    const { dispatch } = this.props;

    dispatch(unsetProductsFilters());
    // dispatch(fetchProducts);
    this.handleSectorChange();
  }

  renderBrands() {
    const selected = this.props.selectedBrand;
    return (
      React.createElement(Selector, {
        id: "side-brand",
        label: "label_brand",
        name: "brand",
        placeholder: "placeholder_any_m",
        list: this.props.brands,
        selected: selected,
        onChange: this.handleBrandChange.bind(this),
        disableDefault: false }));


  }

  renderCategories() {
    const selected = this.props.selectedCategory;
    return (
      React.createElement(Selector, {
        id: "side-category",
        label: "label_shoes_for",
        name: "category",
        placeholder: "placeholder_any_s",
        list: this.props.categories,
        selected: selected,
        onChange: this.handleCategoryChange.bind(this),
        disableDefault: false }));


  }

  renderColors() {
    const selected = this.props.selectedColor;
    return (
      React.createElement(ColorPicker, {
        id: "side-color",
        label: "label_color",
        list: this.props.colors,
        selected: selected,
        onChange: this.handleColorChange.bind(this) })

      // <Selector
      //   id="side-color"
      //   label="label_color"
      //   placeholder="placeholder_any_m"
      //   name="color"
      //   list={this.props.colors}
      //   selected={selected}
      //   onChange={this.handleColorChange.bind(this)}
      //   disableDefault={false}
      // />
    );
  }

  renderResetButton() {
    const { ui } = this.props;

    const btnMainClass = "btn";
    const btnType = "wide";
    const btnColor = "white";
    const btbClass = [btnMainClass, btnType, btnColor].join(" ");

    return (
      React.createElement("button", {
        className: btbClass,
        onClick: this.handleResetButtonClick.bind(this) },

      React.createElement(Icon, { name: "replay" }),
      React.createElement(Text, { tag: "action_reset_filters" })));


  }

  toggleNightMode() {
    const { dispatch } = this.props;

    dispatch(toggleNightModeAction());
  }

  renderNightModeToggler() {
    const { ui } = this.props;

    return (
      React.createElement(Toggler, {
        iconOn: "brightness_3",
        iconOff: "brightness_7",
        onChange: this.toggleNightMode.bind(this),
        setAsChecked: this.props.ui.nightModeEnabled }));


  }


  componentDidMount() {
    this.props.dispatch(fetchProductFilters);
  }




  render() {
    return (
      React.createElement("aside", { id: "a-side", className: "a-side" },
      this.renderCategories(),
      React.createElement("br", null),
      this.renderBrands(),
      React.createElement("br", null),
      this.renderColors(),
      React.createElement("br", null),
      this.renderResetButton(),

      React.createElement("div", { className: "page-actions" },
      React.createElement(NightModeTogglerContainer, null),
      React.createElement("br", null),
      React.createElement(LangTabber, null))));



  }}


const SideAContainer = connect(state => {
  const { filters, appliedFilters } = state.product;
  return {
    appliedFilters: appliedFilters,
    selectedBrand: appliedFilters.brand,
    brands: filters.brands,
    selectedCategory: appliedFilters.category,
    categories: filters.categories,
    selectedColor: appliedFilters.color,
    colors: filters.colors,
    ui: state.ui };

})(withRouter(SideA));


const ProductImage = props => {
  const { product } = props;
  const styles = {
    backgroundImage: `url('${product.image}')` };

  return (
    React.createElement("div", { className: "image", style: styles }));

};


function prettifyCurrency(currencyName) {
  if (currencyName && currencyName.toLowerCase() === 'usd') {
    return '$';
  } else {
    return '';
  }
};

function prettifyPrice(price = '') {
  return price.toString().indexOf('.') > -1 ? price : price + '.00';
}

const ProductPricePlaceholder = () => {
  return (
    React.createElement("div", { className: "price placeholder" },
    React.createElement("div", { className: "item text" })));


};

const ProductPrice = props => {
  const prettyCurrency = prettifyCurrency(props.currency);
  const prettyPrice = prettifyPrice(props.price);
  const price = prettyCurrency + prettyPrice;

  return (
    React.createElement("span", { className: "price bold" },
    " ",

    props.old_price &&
    React.createElement("span", { className: "old-price" },
    prettyCurrency,
    props.old_price,
    " "),



    price));


};


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  renderDiscount() {
    const product = this.state.data;
    if (!product.old_price) {return;}

    const percents = Math.floor(100 / product.old_price * product.price) + '%';

    return (
      React.createElement("div", { className: "discount" },
      '-',
      percents,
      ' Off!'));



  }

  renderProduct() {
    const product = this.state.data;

    return (
      React.createElement("div", { className: "product-content" },
      this.renderDiscount(),

      React.createElement(ProductImage, { product: product }),
      React.createElement("div", { className: "details" },
      React.createElement("span", { className: "name bold" },
      product.name),


      React.createElement(ProductPrice, { price: product.price, currency: product.price_currency }))));




  }

  render() {
    const product = this.state.data;
    const productURL = `/product/${product.url}`;

    return (
      React.createElement("li", { className: "product" },
      React.createElement(NavLink, {
        className: "no-decoration",
        to: productURL,
        activeClassName: "active-link" },

      this.renderProduct())));



  }}

;


class ProductPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      React.createElement("li", { className: "product placeholder" },
      React.createElement("div", { className: "image" })));


  }}




class Products extends React.Component {
  renderItem(product, index) {
    return React.createElement(Product, { key: index, data: product });
  }

  renderPlaceholder(data, index) {
    return React.createElement(ProductPlaceholder, { key: index });
  }

  renderProductsList() {
    const { product } = this.props;

    return product.fetchIsFulfilled && product.list.length > 0 ?
    product.list.map(this.renderItem) :
    null;
  }

  renderPlaceholderList() {
    const { product } = this.props;
    const itemsPerPage = product.settings.itemsPerPage;

    return product.fetchIsPending ?
    Array.from({ length: itemsPerPage }).map(this.renderPlaceholder) :
    null;
  }

  renderEmptyList() {
    const { product } = this.props;

    return product.fetchIsFulfilled && product.list.length === 0 ?

    React.createElement("div", { className: "informer" },
    React.createElement("h3", { className: "title" },
    React.createElement(Text, { tag: "header_product_not_found" })),

    React.createElement("div", { className: "text" },
    React.createElement(Text, { tag: "text_product_not_found" }))) :



    null;
  }

  render() {
    const { product } = this.props;

    return (
      React.createElement("div", { className: "products-wrapper", "data-filter": product.appliedFilters.gender },
      React.createElement("ul", { className: "products" },
      this.renderProductsList(),
      this.renderPlaceholderList(),
      this.renderEmptyList()),

      React.createElement("div", { className: "clearfix" })));


  }}


const ProductsContainer = connect(
state => {
  return { product: state.product };
})(
Products);


class ProductsView extends React.Component {
  renderCart() {
    const cart = this.props.cart;

    return cart.isOpened ?
    React.createElement(CartContainer, null) :
    null;
  }

  render() {
    const cart = this.props.cart;
    const pageDefaultClass = "page";
    const cartOpenedClass = cart.isOpened ? "cart-is-opened" : "";
    const pageClass = [
    pageDefaultClass,
    cartOpenedClass].
    join(" ");
    return (
      React.createElement("div", { id: "homepage", className: pageClass },
      React.createElement(SideAContainer, null),
      React.createElement("div", { className: "content" },
      React.createElement("h1", { className: "title" },
      React.createElement(Text, { tag: this.props.pageData.title })),


      React.createElement(ProductsContainer, null)),

      this.renderCart()));


  }}



const ProductsViewContainer = connect(state => {
  return {
    pageData: state.navigation.pages[state.navigation.currentPageSlug],
    cart: state.ui.cart };

})(ProductsView);


const ProductDescriptionPlaceholder = props => {
  const linesSize = props.lines || 5;
  const placeholderLines = Array.from(Array(linesSize).keys()).map((l, i) => {
    return React.createElement("div", { className: "item text", key: i });
  });

  return (
    React.createElement("div", { className: "description placeholder" },
    placeholderLines));


};


const ProductDescription = ({ description = "" }) => {
  const descriptionHTML = description.split('\\n').map((item, key) => {
    return React.createElement("span", { key: key }, item, React.createElement("br", null));
  });

  return (
    React.createElement("div", { className: "description" },
    descriptionHTML));


};

const ProductTitlePlaceholder = props => {
  return (
    React.createElement("div", { className: "title placeholder" },
    React.createElement("div", { className: "item text" })));


};


const ProductTitle = props => {
  return (
    React.createElement("h1", { className: "title" },
    props.title));


};


const ProductBuyButtonPlaceholder = props => {
  return (
    React.createElement("div", { className: "button placeholder" },
    React.createElement("div", { className: "item text" })));


};


class ProductDetails extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const productURL = this.props.openedURL;

    dispatch(storeOpenedProductDetailsAction(productURL));
    dispatch(fetchProductDetails);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(unsetOpenedProductURLAction());
    dispatch(unsetProductDetailsDataAction());
  }

  renderPrice() {
    const productData = this.props.product.details.data;

    return this.props.product.details.fetchIsPending ?
    React.createElement(ProductPricePlaceholder, null) :

    React.createElement(ProductPrice, {
      price: productData.price,
      currency: productData.price_currency,
      old_price: productData.old_price });



  }

  renderDescription() {
    const details = this.props.product.details;

    return details.fetchIsPending ?
    React.createElement(ProductDescriptionPlaceholder, { lines: 5 }) :
    React.createElement(ProductDescription, { description: details.data.description });

  }

  renderTitle() {
    const details = this.props.product.details;

    return details.fetchIsPending ?
    React.createElement(ProductTitlePlaceholder, null) :
    React.createElement(ProductTitle, { title: details.data.name });
  }

  handleButtonClick() {
    const { dispatch } = this.props;
    const productData = this.props.product.details.data;

    dispatch(addProductToCart(productData));
  }

  renderCart() {
    const cart = this.props.ui.cart;

    return cart.isOpened ?
    React.createElement(CartContainer, null) :
    null;
  }

  renderButton() {
    const details = this.props.product.details;

    return details.fetchIsPending ?
    React.createElement(ProductBuyButtonPlaceholder, null) :

    React.createElement("button", {
      className: "btn red",
      onClick: this.handleButtonClick.bind(this) },

    React.createElement(Text, { tag: "action_add_to_cart" }));


  }

  renderGender() {
    const details = this.props.product.details;
    const productData = details.data;
    const genderText = 'stitle_for_' + (

    productData.gender === 'male' && 'him' ||
    productData.gender === 'female' && 'her' ||
    'everyone');

    return details.fetchIsPending ?

    React.createElement("div", { className: "gender placeholder" },
    React.createElement("span", { className: "item text" })) :


    React.createElement("span", { className: "gender" },
    React.createElement(Text, { tag: genderText }));

  }

  render() {
    const productData = this.props.product.details.data;
    const cart = this.props.ui.cart;
    const pageDefaultClass = "page product product-details";
    const cartOpenedClass = cart.isOpened ? "cart-is-opened" : "";
    const genderClass = `product-${productData.gender}`;
    const pageClass = [
    pageDefaultClass,
    cartOpenedClass,
    genderClass].
    join(" ");

    return (
      React.createElement("div", { id: "details", className: pageClass },

      React.createElement(SideAContainer, null),

      React.createElement("div", { className: "content" },
      React.createElement("div", { className: "media" },
      React.createElement(ProductImage, { product: productData })),


      React.createElement("div", { className: "details" },
      React.createElement("div", { className: "title-wrapper" },
      this.renderTitle()),


      React.createElement("div", { className: "gender-wrapper" },
      this.renderGender()),


      React.createElement("div", { className: "price-wrapper" },
      this.renderPrice()),


      React.createElement("div", { className: "description-wrapper" },
      React.createElement("div", { className: "subtitle" },
      React.createElement("span", { className: "text bold" },
      React.createElement(Text, { tag: "header_description" }))),


      this.renderDescription()),


      React.createElement("div", { className: "actions-wrapper" },
      this.renderButton()))),





      this.renderCart()));



  }}


const ProductDetailsContainer = connect(store => store)(ProductDetails);


class Homepage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(navigateAction('home'));
    dispatch(setProductsGenderAction(''));
    dispatch(fetchProducts);
  }

  render() {
    return (
      React.createElement(ProductsViewContainer, null));

  }}
;
const HomepageContainer = connect(store => store)(Homepage);


class WomenPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(navigateAction('women'));
    dispatch(setProductsGenderAction('female'));
    dispatch(fetchProducts);

  }

  render() {
    return (
      React.createElement(ProductsViewContainer, null));

  }}
;
const WomenPageContainer = connect(store => store)(WomenPage);

class MenPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(navigateAction('men'));
    dispatch(setProductsGenderAction('male'));
    dispatch(fetchProducts);
  }

  render() {
    return (
      React.createElement(ProductsViewContainer, null));

  }}
;
const MenPageContainer = connect(store => store)(MenPage);




class Roster extends React.Component {
  render() {
    return (
      React.createElement(Switch, null,
      React.createElement(Route, {
        exact: true, path: "/home",
        render:
        () => {
          return React.createElement(HomepageContainer, null);
        } }),



      React.createElement(Route, {
        exact: true, path: "/category/women",
        render:
        () => {
          return React.createElement(WomenPageContainer, null);
        } }),



      React.createElement(Route, {
        exact: true, path: "/category/men",
        render:
        () => {
          return React.createElement(MenPageContainer, null);
        } }),



      React.createElement(Route, {
        path: "/product/:product_url",
        render:
        data => {
          const openedURL = data.match.params.product_url;
          return React.createElement(ProductDetailsContainer, { openedURL: openedURL });
        } }),




      React.createElement(Redirect, { from: "/", to: "/home" })));



  }}



class App extends React.Component {
  render() {
    const innerClass = "app-inner";
    const nightModeClass = this.props.ui.nightModeEnabled ? "night-mode" : "";
    const appClassName = [innerClass, nightModeClass].join(" ");

    return (
      React.createElement(BrowserRouter, null,
      React.createElement("div", { className: appClassName },
      React.createElement(HeaderContainer, null),
      React.createElement(Roster, null))));



  }}


const AppContainer = connect(state => state)(App);



ReactDOM.render(

React.createElement(Provider, { store: store },
React.createElement(AppContainer, null)),



app);