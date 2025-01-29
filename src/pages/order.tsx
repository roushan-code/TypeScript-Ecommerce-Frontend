import { ReactElement, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Column } from "react-table"
import TableHOC from "../components/admin/TableHOC"
import { Skeleton } from "../components/loader"
import { useMyOrderQuery } from "../redux/api/orderAPI"
import { RootState } from "../redux/store"
import { CustomError } from "../types/api-types"

type Datatype = {
    _id: string,
    amount: number,
    quantity: number,
    discount: number,
    status: ReactElement,
    action: ReactElement
}

const column: Column<Datatype>[] = [
    {
        Header: "ID",
        accessor: "_id"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    }
    ,{
        Header: "Amount",
        accessor: "amount"
    }
    ,{
        Header: "Status",
        accessor: "status"
    }
    ,{
        Header: "Action",
        accessor: "action"
    }
]

const Orders = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useMyOrderQuery(user?._id!)

  if (isError)
    toast.error((error as CustomError).data.message);


const [rows, setRows] = useState<Datatype[]>([])


useEffect(() => {
    if (data) setRows(data.orders.map(i => (
        {
            _id: i._id,
            amount: i.total,
            discount: i.discount,
            quantity: i.orderItems.length,
            status: <span className={i.status === "Processing" ? "red" : i.status === "Shipped" ? "green" : "purple"}>{i.status}</span>,
            action: <Link to={`admin/transaction/${i._id}`}>Manage</Link>
        }
    )))
}, [data])

const Table = TableHOC<Datatype>(column,rows, "dashboard-product-box","Orders", rows.length > 6)()
    return (
        <div className="container">
            <h1>My Orders</h1>
            {isLoading ? <Skeleton length={10}/> : Table}
        </div>
    )
}

export default Orders