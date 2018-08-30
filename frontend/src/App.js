import React from 'react';
import Dropdown from './Dropdown';
import './App.css';

class App extends React.Component {
  state = {
    products: [],
    inventory: [],
    dropdownLabels: ['waist', 'length', 'style']
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
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
      .then(() => this.state.products && this.state.inventory && this.setupInventory() )
  }

  setupInventory() {
    const { products } = this.state;
    let filteredInventory = {};
    let defaultSelectedValues = {};

    // create default selected values for dropdowns
    this.state.dropdownLabels.map(dropdownLabel => {
      return defaultSelectedValues[dropdownLabel] = '';
    })

    products.map(product => {
      const { product_id } = product;
      // filter inventory by product ID, and set to new object
      filteredInventory[product_id] = {};
      filteredInventory[product_id]['inventory'] = this.filterProductsById(product_id);
      // get unique values to display as options on the dropdown
      filteredInventory[product_id]['uniqueValues'] = this.getUniqueValues(filteredInventory[product_id]['inventory'], product_id);
      // set selected values ('' as default)
      filteredInventory[product_id]['selectedValues'] = defaultSelectedValues;

      return filteredInventory;
    })

    this.setState({ filteredInventory : filteredInventory });
  }

  filterProductsById(id) {
    return this.state.inventory.filter(a => a.product_id === id);
  }

  getUniqueValues(filteredInventory, id) {
    let valueMap = {};

    this.state.dropdownLabels.map(dropdownLabel => {
      // extract relevant keys and dedupe
      const keyValues = filteredInventory.map(filteredItem => filteredItem[dropdownLabel]);
      return valueMap[dropdownLabel] = Array.from(new Set(keyValues));
    })

    return valueMap;
  }

  calculateInStock(selectedValues, id) {
    const { filteredInventory } = this.state;
    // search through inventory for matches on selected values
    const inventoryMatch = filteredInventory[id]['inventory'].filter(a => {
      for (let key in selectedValues) {
        if (selectedValues[key] !== '' && a[key] !== selectedValues[key]) {
          return false;
        }
      }
      return true;
    })

    // add up counts for inventory matches
    const inventoryCount = inventoryMatch.reduce((a, b) => {
      return { count: parseInt(a.count, 10) + parseInt(b.count, 10) }
    }, {count: 0})

    return inventoryCount.count;
  }

  handleChange(e, id, label) {
    const { filteredInventory } = this.state;
    filteredInventory[id]['selectedValues'][label] = e.target.value === 'Select' ? '' : e.target.value;
    filteredInventory[id]['inStock'] = this.calculateInStock(filteredInventory[id]['selectedValues'], id);

    this.setState({
      filteredInventory: filteredInventory,
    })
  }

  render() {
    const { products, dropdownLabels, filteredInventory } = this.state;
    return (
      <div className="app">
        <header className="header">
          <div className="circle"></div>
          <h1>Products</h1>
        </header>
        <main>
          <section className="products">
          {
            products.map(product => {
              const { product_id, product_name, product_image, product_description } = product;
              const inStock = filteredInventory ? filteredInventory[product_id]['inStock'] : '';
              return (
                <div className="products__wrapper" key={ product_id } >
                  <h2>{ product_name }</h2>
                  <div className="products__item">
                    <img className="products__image" src={ product_image } alt={ product_name } />

                    <div className="products__details--container">
                      <p className="products__description">{ product_description }</p>
                      <p className="products__inventory">In Stock: { inStock === 0 ? '' : inStock }</p>

                      <div className="products__dropdown--container">
                        { filteredInventory &&
                         dropdownLabels.map(dropdownLabel => {
                          return (
                            <Dropdown
                              prodId={ product_id }
                              prodOptions={ filteredInventory[product_id]['uniqueValues'][dropdownLabel] }
                              label={ dropdownLabel }
                              key={ dropdownLabel + product_id }
                              handleChange={ this.handleChange }
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
