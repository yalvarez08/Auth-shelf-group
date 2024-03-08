import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';


function ShelfPage() {

  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const items = useSelector(store => store.item);


  useEffect(() => {
    dispatch({ type: 'FETCH_ITEMS' });
  }, [dispatch]);

  const addItem = (evt) => {
    evt.preventDefault();
        dispatch({
        type: 'ADD_ITEM',
        payload: {
          description: description,
          image_url: image_url,
        },
        });
    };

    const deleteItem = (evt) => {
      evt.preventDefault();
          dispatch({
          type: 'DELETE_ITEM',
          payload: {
            description: description,
            image_url: image_url,
          },
          });
      };

    const renderShelfItems = () => {
      if (items.length > 0) {
        return(
          <>
          <ul>
            {items.map(item => <li key={item.id}>{item.description} {item.image_url}
            <button onClick={deleteItem}>Delete</button></li>)}
          </ul>
          </>
        )} else {
          return <h3>You currently have no items in this shelf.</h3>
        }
    }
  
  return (
    <div className="container">
      <h2>Shelf</h2>

      <form onSubmit={addItem}>
      <label htmlFor="description">
          Description:
          <input
            type="text"
            name="description"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label htmlFor="image url">
          Image Url:
          <input
            type="text"
            name="img_url"
            required
            value={image_url}
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </label>
        <div>
          <button className="btn" type="submit">Add Item</button>
        </div>
      </form>
      {renderShelfItems()}
  
    </div>
  );
}

export default ShelfPage;
