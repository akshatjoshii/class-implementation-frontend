class Component {
    constructor(renderHook) {
        this.hook = document.getElementById(renderHook);
    }
    createRootElement(tag, classNames ='', attributes =[]) {
        this.el = document.createElement(tag);
        this.el.className = classNames;
        if(attributes && attributes.length >0) {
           attributes.forEach((attribute) => {
               this.el.setAttribute(attribute.name, attribute.value)
           })
        }
        this.hook.append(this.el);
        return this.el;
    }
}
class Attribute {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class Product {
    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ProductItem extends Component{
    constructor(product, id) {
        super(id);
        this.product = product;
        this.render();
    }
    addToCart() {
        console.log(this.product);
        App.addToCart(this.product);
    }
    render() {
        const productEl = this.createRootElement('li', 'product-item');
        productEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
        `;
        const addToCartBtn = productEl.querySelector('button');
        addToCartBtn.addEventListener('click', this.addToCart.bind(this));
        return productEl;
    }
}
class ProductList extends Component{
    products = [
        new Product(
            'A Pillow',
            'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
            'A soft pillow!',
            19.99
        ),
        new Product(
            'A Carpet',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
            'A carpet which you might like - or not.',
            89.99
        )
    ];

    constructor(hookId) {
        super(hookId);
        this.render();
    }

    render() {
        const prodList = this.createRootElement('ul',
            'product-list',
            [
            {name: 'id', value: 'p-list'}
            ]);
        for (const prod of this.products) {
            const productItem = new ProductItem(prod, prodList.id);
        }
        return prodList;
    }

}

class ShoppingCart extends Component{
    items = [];
    constructor(hookId) {
        super(hookId);
        this.render();
    }
    setTotalWorth(product) {
        this.items.push(product);
        const totalPrice = this.items.reduce((acc, curr, arr) => {
           return  acc + curr.price;
        }, 0);
        this.totalWorth.innerHTML = 'Total: \$'+totalPrice;
    }
    render() {
      const cartEl = this.createRootElement('section', 'cart');
      cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
      this.totalWorth = cartEl.querySelector('h2');
      return cartEl;
    }
}

class Shop {
    constructor() {
        this.render();
    }
    render() {
        this.shoppingCart = new ShoppingCart('app');
        new ProductList('app');
    }
}
class App {
    static cart;
    static addToCart(product) {
        this.cart.setTotalWorth(product)
    }
    static init() {
        const shop = new Shop();
        this.cart = shop.shoppingCart;
    }
}

App.init();
