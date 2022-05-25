import React, { useState } from 'react';
import '../../index.css';

import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../utils/mutations';
import { QUERY_ITEMS, QUERY_ME } from '../../utils/queries';
    

const ItemForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('Bowling');
    const [description, setDescription] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [condition_its_condition_is_in, setCondition] = useState('Gutter Bad');
    const [addItem, { error }] = useMutation(ADD_ITEM, {
        // read what is currently in the cache
        update(cache, { data: { addItem } }) {
        try {
            //update me array's cachce
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, items: [...me.items, addItem ] } },
            });
        } catch (e) {
            console.warn("First item insertion by user!")
        }
            const { items } = cache.readQuery({ query: QUERY_ITEMS });
        // prepend newest thought to front of the array
        cache.writeQuery({
            query: QUERY_ITEMS,
            data: { items: [addItem, ...items] }
        });
        }
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
        <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch"  onSubmit={handleFormSubmit}>
      <label htmlFor="item-name">Name</label>
  <input className="btn col-12 col-md-8"  type="text" placeholder="Item Name" id="item-name" name="item-name" onBlur={(e) => {
      console.log(name)
      setName(e.target.value)
      console.log(name)
      }}></input>
  <label htmlFor="description">Description</label>
  <textarea className="btn col-12 col-md-8" type="text" placeholder="Item Description" value={description} onChange={handleChange}id="description" name="description"  ></textarea>
  <label htmlFor="quantity">Price</label>
<input className="btn col-12 col-md-8" placeholder="Item Price" type="number" id="quantity" name="quantity" onBlur={(e) => {
    console.log(price)
    setPrice(parseFloat(e.target.value))
    console.log(price)
}}></input>
        <label htmlFor="category-names">Choose a category: </label>
        <select className="btn col-12 col-md-8" name="category-names" id="category-names" onChange={(e) => {
          setCategory(e.target.value)
          console.log(category)
        }}>
            <option value="bowling">Bowling</option>
            <option value="rugs">Rugs</option>
            <option value="Alcohol">Alcohol</option>
            <option value="receptacles">Receptacles</option>
            <option value="misc">Miscellaneous</option>
        </select>
        <label htmlFor="condition-names">Condition Its Condition Is In: </label>
        <select className="btn col-12 col-md-8" name="condition-names" id="condition-names" onChange={(e) => {
          setCondition(e.target.value)
          console.log(condition_its_condition_is_in)
        }}>
            <option value="gutter">Gutter Bad</option>
            <option value="split">Split Fair</option>
            <option value="spare">Spare Good</option>
            <option value="strike">Strike Excellent</option>
        </select>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ItemForm;