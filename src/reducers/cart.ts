type Product = {
  id: number;
  amount: number;
  image: string;
  price: number;
  brandName: string;
  name: string;
};

type CartActions = [
  {
    type: "CART_ADD_PRODUCT";
    product: Product;
  },
  {
    type: "CART_REMOVE_PRODUCT";
    product: Product;
  },
  {
    type: "CART_SHOW";
    show: boolean;
  },
  {
    type: "CART_UPDATE_PRODUCT_AMOUNT";
    id: number;
    amount: number;
  }
];

interface ICartState {
  products: Product[];
  showCart: boolean;
}

const initial: ICartState = {
  products: [],
  showCart: false,
};

const reducer = (
  state = initial,
  action: ArrayElements<CartActions>
): ICartState => {
  switch (action.type) {
    case "CART_ADD_PRODUCT": {
      const products = [...state.products];

      let product = products.find((x) => x.id === action.product.id);
      if (product) {
        product.amount++;
      } else {
        products.push(action.product);
      }

      return {
        ...state,
        products,
      };
    }

    case "CART_REMOVE_PRODUCT": {
      const products = [...state.products];
      const product = products.find((x) => x.id === action.product.id);

      if (!product) return state;

      product.amount -= action.product.amount;
      if (product.amount <= 0) {
        products.splice(products.indexOf(product), 1);
      }

      return {
        ...state,
        products,
      };
    }

    case "CART_SHOW": {
      return {
        ...state,
        showCart: action.show,
      };
    }

    case "CART_UPDATE_PRODUCT_AMOUNT": {
      const products = [...state.products];

      const product = products.find((x) => x.id === action.id);
      if (!product) return state;

      product.amount = action.amount;

      return {
        ...state,
        products,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
