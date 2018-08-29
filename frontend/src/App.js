import React from 'react';
import Dropdown from './Dropdown';
import './App.css';

class App extends React.Component {
  state = {
    products: [],
    inventory: [],
    dropdownLabels: ['waist', 'length', 'style']
  }

  componentWillMount() {
    this.getExternalData('/products', 'products');
    this.getExternalData('/inventory', 'inventory');
  }

  getExternalData(url, stateVar) {
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(data => this.setState({ [stateVar]: data }))
  }

  filterProducts(id, prop) {
    const filteredById = this.state.inventory.filter(a => a.product_id === id);
    return this.removeDuplicates(filteredById, prop);
  }

  removeDuplicates(arr, prop) {
    return arr.filter((obj, i, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === i;
    });
  }

  render() {
    const { products, dropdownLabels } = this.state;
    return (
      <div className="app">
        <header className="header">
          <div className="circle"></div>
          <h1>Products</h1>
        </header>
        <main>
          <section className="products">
          {
            products.map((product, i) => {
              const { product_id, product_name, product_image, product_description } = product;
              return ( 
                <div className="products__wrapper" key={ product_id } >
                  <h2>{ product_name }</h2>
                  <div className="products__item">
                    <img className="products__image" src={ product_image } alt={ product_name } />
                    
                    <div className="products__details--container">
                      <p className="products__description">{ product_description }</p>

                      <div className="products__dropdown--container">
                        {
                         dropdownLabels.map(dropdownLabel => {
                          return (
                            <Dropdown 
                              prodId={ product_id }
                              prodOptions={ this.filterProducts(product_id, dropdownLabel) }
                              label={ dropdownLabel }
                              key={ product_id }
                            />
                          )
                         }) 
                        }
                      </div>

                      <button className="products__cta">Add To Cart</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
          </section>
        </main>
        <footer>
          Nicole Kuprienko - Coding Challenge
        </footer>
      </div>
    );
  }
}

export default App;
