import React, { useState } from 'react';
import '../../index.css';

import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../utils/mutations';
import { QUERY_ITEMS, QUERY_ME } from '../../utils/queries';
    

const ItemForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [category, setCategory] = useState('Bowling');
    const [condition_its_condition_is_in, setCondition] = useState('Gutter Bad');
    const [addItem, { error }] = useMutation(ADD_ITEM, {
        update(cache, { data: { addItem } }) {
        try {
            const { items } = cache.readQuery({ query: QUERY_ITEMS });
            cache.writeQuery({
                query: QUERY_ITEMS,
                data: { items: [addItem, ...items] },
          });
        } catch (e) {
            console.warn("First item insertion by user!")
        }
        
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, items: [...me.items, addItem] } },
        });
      },
    });
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
          setDescription(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };
//submit form
      const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // add item to database
            await addItem({
              variables: {
                  description,
                  name,
                  price,
                  condition_its_condition_is_in,
                  category
               }
            });
            // clear form value
            setDescription('');
            setCharacterCount(0);
            setName('')
            setPrice(0)
          } catch (e) {
            console.error(e);
          }
      };
  
      return (
        <div className="main-form">
            <h3>Item Form</h3>
            
          <form className="flex-row justify-center justify-space-between-md align-stretch"  onSubmit={handleFormSubmit}>
          <label className= " col-12 col-md-8" htmlFor="item-name"></label>
      <input className="btn col-12 col-md-8 "  type="text" placeholder="Item Name" id="item-name" name="item-name" onBlur={(e) => {
          console.log(name)
          setName(e.target.value)
          console.log(name)
          }}></input>
      <label htmlFor="description"></label>
      <textarea className="btn col-12 col-md-8" type="text" placeholder="Item Description" value={description} onChange={handleChange}id="description" name="description"  ></textarea>
      <label htmlFor="quantity"></label>
    <input className="btn col-12 col-md-8" placeholder="Item Price" type="number" id="quantity" name="quantity" onBlur={(e) => {
        console.log(price)
        setPrice(parseFloat(e.target.value))
        console.log(price)
    }}></input>
            <label htmlFor="category-names"></label>
            <select className="btn col-12 col-md-8" name="category-names" id="category-names" onChange={(e) => {
              setCategory(e.target.value)
              console.log(category)
            }}>
                <option value="Bowling">Bowling</option>
                <option value="Rugs">Rugs</option>
                <option value="Alcohol">Alcohol</option>
                <option value="Receptacles">Receptacles</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>
            <label htmlFor="condition-names"></label>
            <select className="btn col-12 col-md-8" name="condition-names" id="condition-names" onChange={(e) => {
              setCondition(e.target.value)
              console.log(condition_its_condition_is_in)
            }}>
                <option value="Gutter Bad">Gutter Bad</option>
                <option value="Split Fair">Split Fair</option>
                <option value="Spare Good">Spare Good</option>
                <option value="Strike Excellent">Strike Excellent</option>
            </select>
            <button className="btn col-12 col-md-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    };

export default ItemForm;