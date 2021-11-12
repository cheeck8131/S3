import style from "./main.module.scss";
import cls from "classnames";
import { Container, Row, Col } from "react-bootstrap";

import brands from "../../assets/brands.json";
import products from "../../assets/products.json";

import logo from "assets/images/logo.png";
import cartImg from "assets/images/cart.png";
import more from "assets/images/more.png";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

import Cart from "../cart";

type RegularPrice = {
  currency: string;
  value: number;
};

const getPrice = (regularPrice: RegularPrice) => {
  if (regularPrice.currency === "USD") {
    return `$${regularPrice.value.toFixed(2)}`;
  } else {
    return "";
  }
};

const Main = () => {
  const dispatch = useAppDispatch();

  const [focusedBrand, setFocusedBrand] = useState(-1);
  const cart = useAppSelector((state) => state.cart);

  if (cart.showCart) {
    return <Cart />;
  }

  return (
    <div className={style.root}>
      <div className={style.topPanel}>
        <img alt="logo" className={style.logo} src={logo}></img>
        <div
          className={style.cart}
          onClick={() => dispatch({ type: "CART_SHOW", show: true })}
        >
          <img alt="cart" src={cartImg}></img>
        </div>
      </div>

      <Container className={style.content}>
        <Row>
          <Col sm={2} className={style.brands}>
            <div className={style.brand} onClick={() => setFocusedBrand(-1)}>
              All Brands
            </div>
            {brands.map((brand) => (
              <div
                key={brand.id}
                className={style.brand}
                onClick={() => setFocusedBrand(brand.id)}
              >
                {brand.title}
              </div>
            ))}
          </Col>
          <Col lg={10}>
            <h3>Catalog</h3>
            <div className={style.products}>
              {products
                .filter(
                  (product) =>
                    product.brand === focusedBrand || focusedBrand === -1
                )
                .map((product) => (
                  <div key={product.id} className={style.product}>
                    <img
                      alt="product"
                      src={require(`../../assets${product.image}`).default}
                      className={style.icon}
                    />
                    <h5>{product.title}</h5>
                    <div>{product.brand}</div>
                    <div>{getPrice(product.regular_price)}</div>
                    <img
                      alt="add"
                      src={more}
                      className={style.add}
                      onClick={() =>
                        dispatch({
                          type: "CART_ADD_PRODUCT",
                          product: {
                            id: product.id,
                            amount: 1,
                            image: product.image,
                            price: product.regular_price.value,
                            brandName: brands.find(
                              (x) => x.id === product.brand
                            )?.title ?? "",
                            name: product.title,
                          },
                        })
                      }
                    />
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
