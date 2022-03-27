import React, { Fragment, useEffect, useState } from "react";
import {
  getAdminProductCategorys,
  clearErrors,
  deleteProductCategory,
} from "../../actions/productCategoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { FormControlLabel, IconButton, Link, Switch } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_PRODUCT_CATEGORY_RESET } from "../../constants/productCategoryConstants";
import Loader from "../../components/loader/Loader";

const ProductCategoryList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, productCategorys } = useSelector((state) => state.productCategorys);
  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.productCategory);

  const [invisible, setInvisible] = useState(false);

  const deleteProductCategoryHandler = (id) => {
    dispatch(deleteProductCategory(id));
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
      alert.success("ProductCategory Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_CATEGORY_RESET });
    }

    dispatch(getAdminProductCategorys());
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  const columns = [
    { field: "serial", headerName: "#", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        const handleStatus = () => {
          setInvisible(!invisible);
        };
        // let invisible = params.getValue(params.status, "status");
        // const handleStatus = () => {
        //   invisible ? (invisible = false) : (invisible = true);
        // };
        return (
          <Fragment>
            <FormControlLabel
              // sx={{ color: "text.secondary" }}
              control={
                <Switch
                  color="primary"
                  checked={!invisible}
                  onChange={handleStatus}
                />
              }
            />
          </Fragment>
        );
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/productCategory/${params.getValue(params.id, "id")}`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton
              color="secondary"
              onClick={() =>
                deleteProductCategoryHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </IconButton>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  productCategorys &&
    productCategorys.forEach((productCategory) => {
      rows.push({
        serial: count++,
        id: productCategory._id,
        name: productCategory.name,
        status: productCategory.status,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="card card-light">
              <div className="card-header">
                <h3 className="card-title">List of product category</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productCategoryListTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCategoryList;
