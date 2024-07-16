import React from "react";
import FormatePrice from "../helper/FormatePrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cartContext";

const CartItem = ({ id, name, image, price, color, amount }) => {
  const { removeItem, setDecrease, setIncrease } = useCartContext();

  return (
    // item

    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>

        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>Color:</p>
            <div>
              <div
                className="color-style"
                style={{ backgroundColor: color, color: color }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* // price */}

      <div className="cart-hide">
        <p>
          <FormatePrice price={price} />
        </p>
      </div>

      {/* quentity */}

      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrease(id)}
      />

      {/* subtotal */}

      <div className="cart-hide">
        <p>
          <FormatePrice price={price * amount} />
        </p>
      </div>

      {/* remove   */}

      <div>
        <FaTrash onClick={() => removeItem(id)} className="remove_icon" />
      </div>
    </div>
  );
};

export default CartItem;
