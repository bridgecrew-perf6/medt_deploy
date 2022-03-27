import React, { Fragment, useEffect, useState } from "react";
import {
  getChemicals,
  clearErrors,
  deleteChemical,
} from "../../actions/chemicalAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { FormControlLabel, IconButton,  Switch } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_CHEMICAL_RESET } from "../../constants/chemicalConstants";
import Loader from "../../components/loader/Loader";

const BannerList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, chemicals } = useSelector((state) => state.chemicals);
  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.chemical);

  const [invisible, setInvisible] = useState(false);

  const deleteChemicalHandler = (id) => {
    dispatch(deleteChemical(id));
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
      alert.success("Banner Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_CHEMICAL_RESET });
    }

    dispatch(getChemicals());
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  const columns = [
    { field: "serial", headerName: "#", minWidth: 200, flex: 0.5 },
    {
      field: "id",
      headerName: "Banner Id",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
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
            {/* <Link to={`/chemical/${params.getValue(params.id, "id")}`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link> */}

            <IconButton
              color="secondary"
              onClick={() =>
                deleteChemicalHandler(params.getValue(params.id, "id"))
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

  chemicals &&
    chemicals.forEach((chemical) => {
      rows.push({
        serial: count++,
        id: chemical._id,
        name: chemical.name,
        description: chemical.description,
        status: chemical.status,
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
                <h3 className="card-title">List of Banner</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="chemicalListTable"
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

export default BannerList;
