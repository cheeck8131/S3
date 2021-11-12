import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import style from "./cart.module.scss";
import logo from "assets/images/logo.png";
import trash from "assets/images/trash.png";
import { Col, Container, Row, Table } from "react-bootstrap";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  return (
    <div className={style.root}>
      <div className={style.top}>
        <img
          alt="logo"
          className={style.logo}
          src={logo}
          onClick={() => dispatch({ type: "CART_SHOW", show: false })}
        />
      </div>

      <div className={style.content}>
        <h4>Shopping Cart</h4>

        <Table className={style.products}>
          <thead className={style.headers}>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Container>
                    <Row>
                      <Col sm={4}>
                        <img
                          alt="product"
                          className={style.icon}
                          src={require(`../../assets${product.image}`).default}
                        />
                      </Col>
                      <Col className={style.center}>
                        {product.brandName} / {product.name}
                      </Col>
                    </Row>
                  </Container>
                </td>
                <td className={style.center}>${product.price}</td>
                <td className={style.center}>
                  <input
                    value={product.amount}
                    type="number"
                    min="1"
                    max="9999"
                    onChange={(e) =>
                      dispatch({
                        type: "CART_UPDATE_PRODUCT_AMOUNT",
                        id: product.id,
                        amount: +e.target.value,
                      })
                    }
                  />
                </td>
                <td className={style.center}>
                  ${(product.amount * product.price).toFixed(2)}
                </td>
                <td className={style.center}>
                  <img
                    alt="delete"
                    className={style.delete}
                    src={trash}
                    onClick={() =>
                      dispatch({ type: "CART_REMOVE_PRODUCT", product })
                    }
                  ></img>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className={style.bottom}>
        <h5>Subtotal: ${cart.products.reduce((total, value) => total + value.amount * value.price, 0)}</h5>
        <div className={style.button}>Checkout</div>
      </div>
    </div>
  );
};

export default Cart;
