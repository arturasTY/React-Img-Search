import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../image-results/ImageResults';
import Axios from 'axios';

export default class Search extends Component {
    state = {
        searchTerm: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '12330112-4073519c3b7fc8645efb75590',
        images: []
    }

    onTermChange = (e) => {
        const val = e.target.value;
        this.setState({[e.target.name]: val}, () => {
            if(val === '') {
                this.setState({images: []})
            } else {
                Axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchTerm}&image_type=photo&per_page=${this.state.amount}&savesearch=true`)
                    .then(res => this.setState({images: res.data.hits}))
                    .catch(err => console.log(err))
            }
        });
    }

    onAmountChange = (e, index, value) => this.setState({amount: value});

    render() {
        return (
            <div>
                <TextField 
                    name="searchTerm"
                    value={this.state.searchTerm}
                    onChange={this.onTermChange}
                    floatingLabelText="Search for Images"
                    fullWidth={true}
                />
                <br />
                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        )
    }
}

