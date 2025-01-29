import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/loader";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-type";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];




const Products = () => {
  const {user} = useSelector((state: {userReducer: UserReducerInitialState})=> state.userReducer)
  const {data, isLoading, isError, error} = useAllProductsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  if(isError) 
    toast.error((error as CustomError).data.message);

  useEffect(() => {
    if(data) setRows(data.products.map(i=>(
      {
      photo: <img src={i.photo[0].url} alt="Shoes" key={i._id} />,
      name: i.name,
      price: i.price,
      stock: i.stock,
      action: <Link to={`/admin/product/${i._id}`} key={i._id}>Manage</Link>,
      }
    )))
    
  }, [data])
  


  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={10}/> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
