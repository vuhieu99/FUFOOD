import React from 'react';
import {withNavigation} from 'react-navigation';
export const AppContext = React.createContext({}); // create a context

export class AppContextProvider extends React.Component {
  state = {
    cart_items: [],
    user_id: 'wernancheta',
    user_name: 'Wern Ancheta',
  };

  constructor(props) {
    super(props);
  }

  addToCart = (item, qty) => {
    let found = this.state.cart_items.filter(el => el.id === item.id);
    if (found.length == 0) {
      this.setState(prevState => {
        return {cart_items: prevState.cart_items.concat({...item, qty})};
      });
    } else {
      this.setState(prevState => {
        const other_items = prevState.cart_items.filter(
          el => el.id !== item.id,
        );
        return {
          cart_items: [...other_items, {...found[0], qty: found[0].qty + qty}],
        };
      });
    }
  };
  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
export const withAppContextProvider = ChildComponent => props => (
    <AppContextProvider>
      <ChildComponent {...props} />
    </AppContextProvider>
  );
