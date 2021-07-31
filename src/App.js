import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import foodsData from './data/foods.json';
import FoodBox from './components/FoodBox';
import Form from './components/form/Form';


class App extends Component {

  state = {
    foods: [],
    selectedfood: [],
    form: false,

  }

  componentDidMount() {
    this.setState({ foods: foodsData})
  }

  handleCreateFood(food) {
    this.setState(({ foods }) => ({
      foods: [food, ...foods]
    }))
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Iron Nutrition</h1>
        <div>
          <Form onCreateFood={(food) => this.handleCreateFood(food)}/>
        </div>
        <div className="column is-mobile">
          <div className="column">
          {this.state.foods.map((food, index) => <FoodBox key={index} {...food}/>)}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
