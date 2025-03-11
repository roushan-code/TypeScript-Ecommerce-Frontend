import { useFileHandler } from '6pp';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { UserReducerInitialState } from "../../../types/reducer-type";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector((
    state: { userReducer: UserReducerInitialState }
  ) =>
     state.userReducer);
 
const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [isDisable, setIsDisable] = useState(false);
  const [description, setDescription] = useState<string>("");

  const [newProduct]  = useNewProductMutation();

  const photos  = useFileHandler('multiple', 10, 5);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisable(true);

    if(!name || !category || !price || !stock )
      return 

    if(!photos.file || photos.file.length === 0) return;
    
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    // formData.append("files", photo!);
    photos.file.forEach(photo => {
      formData.append("files", photo);
    })
    try {
      const res = await newProduct({ formData, id: user?._id! });
      responseToast(res, navigate,"/admin/product");
      setIsDisable(false);

    } catch (error) {
      console.log(error);
    } finally {
      setIsDisable(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input 
              required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea 
              required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input 
              required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input 
              required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input 
              required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input required type="file" multiple onChange={photos.changeHandler} />
            </div>

            {
              photos.error && <p>{photos.error}</p>
            }
            {
              photos.preview && photos.preview.map((img, i) => (
                <img src={img} alt="New Image" key={i} />
              ))
            }

            <button type="submit" disabled={isDisable}>Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
