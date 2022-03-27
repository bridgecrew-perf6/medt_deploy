import React from "react";
import ContentHeader from "../../components/ContentHeader";
import { Delete, Edit } from "@material-ui/icons";
import MetaData from "../../layout/MetaData";

export default function Composition() {
  return (
    <>
      <MetaData title="Composition"/>
      <div className="content-wrapper">
        <ContentHeader title="composition" />
        <section className="content">
          <div className="container-fluid">
            <div classname="row">
              <div className="card card-light">
                <div className="card-header">
                  <h3 className="card-title">Add Composition</h3>
                </div>
                {/* /.card-header */}
                <form>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Composition Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Composition name ..."
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Composition Description</label>
                          <textarea
                            className="form-control"
                            rows={1}
                            placeholder="Enter Composition description..."
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
                {/* /.card-body */}
              </div>
            </div>

            <div classname="row">
              <div className="card card-light">
                <div className="card-header">
                  <h3 className="card-title">List of Composition</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Composition Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Jamshedpur</td>
                        <td>Jamshedpur</td>
                        <td>
                          <span className="mr-2 text-primary" role="button">
                            <Edit />
                          </span>
                          <span className=" text-danger" role="button">
                            <Delete />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
