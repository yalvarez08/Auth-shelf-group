import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';


function ShelfPage() {

  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useDispatch();


  const addItem = (evt) => {
    evt.preventDefault();
        dispatch({
        type: 'FETCH_ITEMS',
        payload: {
          description: description,
          imgUrl: imgUrl,
        },
        });
    };
  

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
            value={imgUrl}
            onChange={(event) => setImgUrl(event.target.value)}
          />
        </label>
        <div>
          <button className="btn" type="submit">Add Item</button>
        </div>
      </form>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
