import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productAPI";
import { UserReducerInitialState } from "../../../types/reducer-type";
import { responseToast } from "../../../utils/features";
import { useFileHandler } from "6pp";


const Productmanagement = () => {
  const { user } = useSelector((
    state: { userReducer: UserReducerInitialState }
  ) =>
     state.userReducer);

     const params = useParams();
     const navigate = useNavigate();
     const {data, isLoading, isError} = useProductDetailsQuery(params.id!);
     const [isDisable, setIsDisable] = useState(false);



  const { photo, name, price, stock, category, description } = data?.product || {
    photo: [],
    name: '',
    price: 0,
    stock: 0,
    category: '',
    description: ''
  };


  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category as string);
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
  const [photoUpdate, setPhotoUpdate] = useState(photo);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const photos = useFileHandler("multiple", 10, 5);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisable(true);
    const formData = new FormData();
    if(nameUpdate) formData.set("name", nameUpdate);
    if(descriptionUpdate) formData.set("description", descriptionUpdate);
    if(priceUpdate) formData.set("price", priceUpdate.toString());
    if(stockUpdate !== undefined) formData.set("stock", stockUpdate.toString());
    if(categoryUpdate) formData.set("category", categoryUpdate);
    if(photos.file && photos.file.length > 0){
      photos.file.forEach(file => {
        formData.append("files", file);
      })
    }
    
    try {
    const res = await updateProduct({formData, userId: user?._id!, productId: data?.product._id!});
    responseToast(res, navigate, "/admin/product");
    setIsDisable(false);
  } catch (error) {
    console.log(error);
  } finally {
    setIsDisable(false);
  }
  };
  const deleteHandler = async () => {
    const res = await deleteProduct({ userId: user?._id!, productId: data?.product._id!});

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if(data){
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category as string);
      setDescriptionUpdate(data.product.description);
      setPhotoUpdate(data.product.photo);
    }
  
    
  }, [data])
  
  if(isError) return <Navigate to={"/404"} />;
  console.log(photos.preview);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={10} />
        ) : (
          <>
          <section>
          <strong>ID - {data?.product._id}</strong>
          <img src={typeof photo[0] === 'string' ? photo[0] : photo[0].url} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea 
              required
                placeholder="Description"
                value={descriptionUpdate}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photos</label>
              <input type="file" multiple onChange={photos.changeHandler} />
            </div>

            {
              photos.error && <p>{photos.error}</p>
            }
            {
              photos.preview && (<>
                  <h3>Current Photos</h3> 
              <div style={{display: "flex", gap: "1rem", overflowX: "auto"}}>
                {photos.preview.map((img, i) => (
                <img src={img} alt="New Image" key={i}  style={{width: 100, height: 100, objectFit: "cover"}}/>
              ))}
              </div>
              </>
              )
            }
            {
              photoUpdate && (<>
                  <h3>Previous Photos</h3>                  
                <div style={{display: "flex", gap: "1rem", overflowX: "auto"}}>
                  {photoUpdate.map((img, i) => (
                <img src={img.url} alt="New Image" key={i} style={{width:
                100, height: 100, objectFit: "cover"}}/>
                ))}
              </div>
              </>
              )
            }
            
            <button disabled={isDisable} type="submit">Update</button>
          </form>
        </article>
          </>
        )
      }
      </main>
    </div>
  );
};

export default Productmanagement;
