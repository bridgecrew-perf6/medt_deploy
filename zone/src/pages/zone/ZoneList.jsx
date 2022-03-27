import React, { Fragment, useEffect, useState } from "react";
import {
  getAdminZones,
  clearErrors,
  deleteZone,
  updateZone,
  getZoneDetails,
} from "../../actions/zoneAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Link,
  styled,
  Switch,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid, GridCloseIcon } from "@material-ui/data-grid";
import {
  DELETE_ZONE_RESET,
  UPDATE_ZONE_RESET,
} from "../../constants/zoneConstants";
import Loader from "../../components/loader/Loader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ZoneList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, zones } = useSelector((state) => state.zones);

  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.zone);

  const [status, setStatus] = useState();

  const deleteZoneHandler = (id) => {
    console.log(id);
    // dispatch(deleteZone(id));
  };


  const statusZoneHandler = (id, stat) => {
  const myForm = new FormData();
    setStatus(stat);
    myForm.set("status", !stat);
    console.log(id)
    console.log(stat)
    console.log(myForm)
    dispatch(updateZone(id, myForm));
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
      alert.success("Zone Deleted Successfully");
      dispatch({ type: DELETE_ZONE_RESET });
    }

    dispatch(getAdminZones());
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
      type: "boolean",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        // console.log(params.getValue(params.status, "status"))
        // const handleStatus = () => {
        //   setStatus(status);
        // };
        // var invisible = params.getValue(params.status, "status");
        // const handleStatus = () => {
        //   status ? (status = false) : (status = true);
        // };
        return (
          <Fragment>
            <FormControlLabel
              // sx={{ color: "text.secondary" }}
              control={
                <Switch
                  color="primary"
                  checked={status}
                  value={status}
                  // onClick={(e) =>
                  //   statusZoneHandler(
                  //     params.getValue(params.id, "id"),
                  //     e.target.value
                  //   )
                  // }
                />
              }
            />
          </Fragment>
        );
      },
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
          <Fragment>
            <IconButton
              color="secondary"
              onClick={() =>
                deleteZoneHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon disabled={loading ? true : false} />
            </IconButton>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  zones &&
    zones.forEach((zone) => {
      rows.push({
        serial: count++,
        id: zone._id,
        name: zone.name,
        status: zone.status,
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
                <h3 className="card-title">List of Zone</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="zoneListTable"
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

export default ZoneList;
