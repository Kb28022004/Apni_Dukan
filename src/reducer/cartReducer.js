const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, color, amount, product } = action.payload;

      // tackle the existing products

      let existingProduct = state.cart.find((curElem) => {
        return curElem.id === id + color;
      });

      if (existingProduct) {
        let updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === id + color) {
            let newAmount = curElem.amount + amount;

            if (newAmount >= curElem.max) {
              newAmount = curElem.max;
            }
            return {
              ...curElem,
              amount: newAmount,
            };
          } else {
            return {
              ...curElem,
            };
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct;

        cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    case "REMOVE_ITEM":
      let updateCart = state.cart.filter((curElem) => {
        return curElem.id !== action.payload;
      });
      return {
        ...state,
        cart: updateCart,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "DECREASE":
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;

          if (decAmount <= 1) {
            decAmount = 1;
          }

          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });

      return {
        ...state,
        cart: updatedProduct,
      };

    case "INCREASE":
      let updatedData = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1;

          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: incAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedData,
      };

    // case "CART_TOTAL_ITEM":
    //   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
    //     let { amount } = curElem;
    //     initialVal = initialVal + amount;
    //     return initialVal;
    //   }, 0);

    //   return {
    //     ...state,
    //     total_item: updatedItemVal,
    //   };

    //   case "CART_PRICE_ITEM":
    //     let total_price=state.cart.reduce((initialVal,curElem)=>{
    //   let {price,amount}=curElem
    //   initialVal=initialVal+(price*amount)
    //   return initialVal
    //     },0)

    // return{
    //   ...state,
    //   total_amount:total_price
    // }

    case "CART_TOTAL_ITEM_PRICE":
      let { total_item, total_amount } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;
          accum.total_item += amount;
          accum.total_amount += price * amount;

          return accum;
        },
        {
          total_item: 0,
          total_amount: 0,
        }
      );

      return {
        ...state,
        total_item,
        total_amount,
      };

    default:
      return state;
  }
};

export default cartReducer;
