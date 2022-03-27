import React, { Fragment, useEffect, useState } from "react";
import {
  getPinAmounts,
  clearErrors,
  deletePinAmount,
} from "../../actions/pinAmountAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { FormControlLabel, IconButton, Link, Switch } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_PIN_AMOUNT_RESET } from "../../constants/pinAmountConstants";
import Loader from "../../components/loader/Loader";
import { getZoneDetails } from "../../actions/zoneAction";

const PinAmountList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, pinAmounts } = useSelector((state) => state.pinAmounts);
  const { loading: zoneDetailsLoading, zone } = useSelector(
    (state) => state.zoneDetails
  );
  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.pinAmount);

  const [invisible, setInvisible] = useState(false);

  const deletePinAmountHandler = (id) => {
    dispatch(deletePinAmount(id));
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
      alert.success("PinAmount Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_PIN_AMOUNT_RESET });
    }

    dispatch(getPinAmounts());
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  const columns = [
    { field: "serial", headerName: "#", minWidth: 200, flex: 0.5 },

    {
      field: "zoneId",
      headerName: "Zone",
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
            {/* <Link to={`/pinAmount/${params.getValue(params.id, "id")}`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link> */}

            <IconButton
              color="secondary"
              onClick={() =>
                deletePinAmountHandler(params.getValue(params.id, "id"))
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

  pinAmounts &&
    pinAmounts.forEach((pinAmount) => {
        // if (!zoneDetailsLoading) dispatch(getZoneDetails(pinAmount.zoneId));
        // console.log(zone);
        // console.log(zoneDetailsLoading);
        // console.log(pinAmount.zoneId);
        // console.log(pinAmounts);
        // console.log(pinAmount);

      rows.push({
        serial: count++,
        id: pinAmount._id,
        zoneId: pinAmount.zoneId,
        name: pinAmount.name,
        description: pinAmount.description,
        status: pinAmount.status,
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
                <h3 className="card-title">List of PinAmount</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="pinAmountListTable"
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

export default PinAmountList;
