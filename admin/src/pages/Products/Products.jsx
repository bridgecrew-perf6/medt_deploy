import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { IconButton, Link } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../actions/productAction";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  // Data Grid

  const columns = [
    { field: "serial", headerName: "#", minWidth: 90, flex: 0.2 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },
    {
      field: "packSize",
      headerName: "Pack Size",
      minWidth: 200,
      flex: 0.5,
      // hide: true,
    },
    {
      field: "keywords",
      headerName: "Keywords",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      flex: 0.5,
      // hide: true,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              onClick={() =>
                navigate(`/product/${params.getValue(params.id, "id")}`)
              }
            >
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton
              color="secondary"
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon disabled={loading ? true : false} />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((product) => {
      rows.push({
        serial: count++,
        id: product._id,
        name: product.name,
        packSize: product.packSize,
        category: product.category,
        keywords: product.keywords,
        description: product.description,
        category: product.category,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <MetaData title="Product" />
          <div className="content-wrapper">
            <ContentHeader title="Product" />
            <section className="content">
              <div className="container-fluid">
                <div classname="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Product Details</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className="productListTable"
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
