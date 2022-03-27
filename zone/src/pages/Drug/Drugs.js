import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { IconButton, Link } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_DRUG_RESET } from "../../constants/drugConstants";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import {
  getAdminDrugs,
  clearErrors,
  deleteDrug,
  getAllDrugsByZone,
} from "../../actions/drugAction";
import Loader from "../../components/loader/Loader";
import { getDrugCategoryDetails } from "../../actions/drugCategoryAction";
import { useNavigate } from "react-router-dom";

export default function Drugs() {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);
  const { loading, error, drugs } = useSelector((state) => state.drugs);
  const { error: deleteError, isDeleted } = useSelector((state) => state.drug);
  const { drugCategory } = useSelector((state) => state.drugCategoryDetails);

  const deleteDrugHandler = (id) => {
    // if(alert("Do you real want to delete this product?"))
    dispatch(deleteDrug(id));
  };
const zoneId = employee.zoneId;
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
      alert.success("Drug Deleted Successfully");
      dispatch({ type: DELETE_DRUG_RESET });
    }
   dispatch(getAllDrugsByZone(zoneId));
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  // Data Grid
  const columns = [
    { field: "serial", headerName: "#", minWidth: 50, flex: 0.2 },

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
      flex: 0.3,
      hide: true,
    },
    {
      field: "keywords",
      headerName: "Keywords",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "country",
      headerName: "Country of Origin",
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
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              onClick={() =>
                navigate(`/drug/${params.getValue(params.id, "id")}`)
              }
            >
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  drugs &&
    drugs.forEach((drug) => {
      // dispatch(getDrugCategoryDetails(drug.category));
      rows.push({
        serial: count++,
        id: drug._id,
        name: drug.name,
        description: drug.description,
        category: drug.category,
        keywords: drug.keywords,
        country: drug.countryOfOrigin,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Drug" />
          <div className="content-wrapper">
            <ContentHeader title="Drug" />
            <section className="content">
              <div className="container-fluid">
                <div classname="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Drug Details</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className="drugListTable"
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
