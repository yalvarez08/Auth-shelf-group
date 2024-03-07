import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';


function ShelfPage() {

  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
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
          imgUrl: imgUrl,
        },
        });
    };

    // const renderShelfItems = () => {
    //   if (items.length > 0) {
    //     return(
    //       <>
    //       <ul>
    //         {items.map((item, index) => <li key={index}>{item.description} {item.image_url}</li>)}
    //       </ul>
    //       </>
    //     )} else {
    //       return <h3>You currently have no items in this shelf.</h3>
    //     }
    // }
  

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
      {/* <p>All of the available items can be seen here.</p> */}
      <ul>
        {items.map(item => <li key={item.id}>{item.description} {item.image_url}</li>)}
      </ul>
  
    </div>
  );
}

export default ShelfPage;
