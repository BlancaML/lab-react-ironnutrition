import React, { Component } from 'react';
import foodsData from '../../data/foods.json';

const KCAL_PATTERN = /\d{1,4}/;

const validations = {
    name: (value) => {
        let message;
        if (!value) {
            message = 'Name is required';
        }
    },
    calories: (value) => {
        let message;
        if (!value) {
            message = 'Calories are required'
        } 
        else if (!KCAL_PATTERN.test(value)) {
            message = 'Calories must be a number'
        }
    },
    image: (value) => {
        let message;
        if (!value) {
            message = 'Image URL is required'
        }
    }

}

class Form extends Component {

    state = {
        food: {
            name:'',
            image: '',
            calories: ''

        },

        errors: {
            name: validations.name(''),
            calories: validations.calories(''),
            image: validations.image(''),

        } 
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            food: {
                ...prevState.food,
                [name]: value,
            },
            errors: {
                ...prevState.errors,
                [name]: validations[name] ? validations[name](value) : undefined,
            }
        }))
    }

    handleSubmit(event) {
        event.preventDefault();
        const { food } = this.state;
        food.onCreateFood(food);
    }

    render() {
        const { food, errors } = this.state;
        const isFormValid = !Object.keys(errors).some(key => errors[key])
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <h3 class="m-4">Add a new Food including the following fields:</h3>
                <div class="field m-4">
                    <div class="control has-icons-left mt-2">
                        <input name="name" value={food.name} 
                        onChange={(event) => this.handleInputChange(event)}
                        class="input is-medium" type="text" placeholder="Food's Name"/>
                        <span class="icon is-medium is-left">
                        <i class="fas fa-burguer-soda"></i>
                        </span>
                        {errors.name ? <p class="help is-danger">Name is required</p> : ''}
                    </div>
                    <div class="field">
                    <div class="control has-icons-left mt-2">
                        <input name="calories" value={food.calories} class="input is-medium" type="number" placeholder="Calories"/>
                        <span class="icon is-medium is-left">
                        <i class="fas fa-balance-scale-left"></i>
                        </span>
                        {errors.calories ? <p class="help is-danger">Calories are required</p> : ''}
                    </div>
                    <div class="control has-icons-left mt-2">
                        <input name="image" value={food.image} class="input is-medium" placeholder="Image URL"/>
                        <span class="icon is-medium is-left">
                        <i class="far fa-images"></i>
                        </span>
                        {errors.image ? <p class="help is-danger">Image URL is required</p> : ''}
                    </div>
                    <button class="button is-info m-4" disabled={!isFormValid}>Submit</button>
                </div>
                </div>
            </form>
        )
    }
}

Form.defaultProps = {
    onCreateFood: () => {}
}

export default Form;