import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import {
  DELETE_ORDER_RESET,
  UPDATE_ORDER_RESET,
} from "../../constants/orderConstants";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../../components/loader/Loader";

export default function ProcessingOrders() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const changeStatusHandler = (id, status, text) => {
    const data = {
      orderStatus: status,
      statusText: text,
    };
    console.log(data);
    dispatch(updateOrder(id, data));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, alert, deleteError, updateError, isUpdated, isDeleted]);
  let count = 1;

  // Data Grid

  const columns = [
    { field: "serial", headerName: "#", minWidth: 90, flex: 0.2 },

    {
      field: "id",
      headerName: "Order Id",
      minWidth: 100,
      flex: 1,
      // hide: true,
    },
    {
      field: "clientId",
      headerName: "Client Id",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },

    {
      field: "clientName",
      headerName: "Client Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "deliverySlot",
      headerName: "Delivery Slot",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },

    {
      field: "address",
      headerName: "Address",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 250,
      // type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              color="primary"
              onClick={() =>
                changeStatusHandler(
                  params.getValue(params.id, "id"),
                  3,
                  "Packed"
                )
              }
            >
              Pack
            </Button>

            <Button
              color="secondary"
              variant="contained"
              onClick={() =>
                changeStatusHandler(
                  params.getValue(params.id, "id"),
                  0,
                  "Cancelled"
                )
              }
            >
              Cancel
            </Button>
          </>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 200,
      flex: 0.3,
      hide: true,
    },
    {
      field: "netPayable",
      headerName: "NetPayable",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "paymentMode",
      headerName: "Payment Mode",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "couponTitle",
      headerName: "Coupon Title",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "couponDescription",
      headerName: "Coupon Description",
      minWidth: 150,
      flex: 0.5,
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((order) => {
      if (order.zoneId === employee.zoneId && order.orderStatus === 2) {
        rows.push({
          serial: count++,
          id: order._id,
          netPayable: order.netPayable,
        });
      }
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ProcessingOrder" />
          <div className="content-wrapper">
            <ContentHeader title="ProcessingOrder" />
            <section className="content">
              <div className="container-fluid">
                <div classname="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">ProcessingOrder Details</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className="orderListTable"
                          autoHeight
                        />
                      </div>
                      {/* /.card-body */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </Fragment>
  );
  // );
}
