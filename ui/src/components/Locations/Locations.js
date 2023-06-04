import React, { Component } from "react";
import ReactModal from "react-modal";
import { variables } from "../../Variables.js";

export class Locations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationss: [],
      modalTitle: "",
      LocationName: "",
      LocationDescription: "",
      Latitude: "",
      Longitude: "",
      LocationID: 0,

      LocationIDFilter: "",
      LocationNameFilter: "",
      LocationDescriptionFilter: "",
      LatitudeFilter: "",
      LongitudeFilter: "",
      locationssWithoutFilter: [],
      isModalOpen: false,
    };
  }

  FilterFn() {
    var LocationIDFilter = this.state.LocationIDFilter;
    var LocationNameFilter = this.state.LocationNameFilter;
    var LocationDescriptionFilter = this.state.LocationDescriptionFilter;
    var LatitudeFilter = this.state.LatitudeFilter;
    var LongitudeFilter = this.state.LongitudeFilter;

    var filteredData = this.state.locationssWithoutFilter.filter(function (el) {
      return (
        el.LocationID.toString()
          .toLowerCase()
          .includes(LocationIDFilter.toString().trim().toLowerCase()) &&
        el.LocationName.toString()
          .toLowerCase()
          .includes(LocationNameFilter.toString().trim().toLowerCase()) &&
        el.LocationDescription.toString()
          .toLowerCase()
          .includes(
            LocationDescriptionFilter.toString().trim().toLowerCase()
          ) &&
        el.Latitude.toString()
          .toLowerCase()
          .includes(LatitudeFilter.toString().trim().toLowerCase()) &&
        el.Longitude.toString()
          .toLowerCase()
          .includes(LongitudeFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ locationss: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.locationssWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ locationss: sortedData });
  }

  changeLocationIDFilter = (e) => {
    const value = e.target.value;
    this.setState({ LocationIDFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeLocationNameFilter = (e) => {
    const value = e.target.value;
    this.setState({ LocationNameFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeLocationDescriptionFilter = (e) => {
    const value = e.target.value;
    this.setState({ LocationDescriptionFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeLatitudeFilter = (e) => {
    const value = e.target.value;
    this.setState({ LatitudeFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeLongitudeFilter = (e) => {
    const value = e.target.value;
    this.setState({ LongitudeFilter: value }, () => {
      this.FilterFn();
    });
  };

  refreshList() {
    fetch(variables.API_URL + "locations")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ locationss: data, locationssWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeLocationID = (e) => {
    this.setState({ LocationID: e.target.value });
  };

  changeLocationName = (e) => {
    this.setState({ LocationName: e.target.value });
  };

  changeLocationDescription = (e) => {
    this.setState({ LocationDescription: e.target.value });
  };

  changeLatitude = (e) => {
    this.setState({ Latitude: e.target.value });
  };

  changeLongitude = (e) => {
    this.setState({ Longitude: e.target.value });
  };

  openModal = (type) => {
    this.setState({ isModalOpen: true, modalType: type });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  addClick() {
    this.setState({
      modalTitle: "Добавить локацию",
      LocationID: 0,
      LocationName: "",
      LocationDescription: "",
      Latitude: "",
      Longitude: "",
    });
    this.openModal("add");
  }
  editClick(at) {
    this.setState({
      modalTitle: "Изменить локацию",
      LocationID: at.LocationID,
      LocationName: at.LocationName,
      LocationDescription: at.LocationDescription,
      Latitude: at.Latitude,
      Longitude: at.Longitude,
    });
    this.openModal("edit");
  }

  createClick = () => {
    fetch(variables.API_URL + "locations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LocationName: this.state.LocationName,
        LocationDescription: this.state.LocationDescription,
        Latitude: this.state.Latitude,
        Longitude: this.state.Longitude,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка при добавлении локации");
        }
      })
      .then((data) => {
        alert("Локация успешно добавлена");
        this.refreshList();
        this.closeModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  updateClick = () => {
    fetch(variables.API_URL + "locations", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LocationID: this.state.LocationID,
        LocationName: this.state.LocationName,
        LocationDescription: this.state.LocationDescription,
        Latitude: this.state.Latitude,
        Longitude: this.state.Longitude,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка при изменении локации");
        }
      })
      .then((data) => {
        alert("Локация успешно успешно изменена");
        this.refreshList();
        this.closeModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  deleteClick(id) {
    if (window.confirm("Вы уверены, что хотите удалить эту локацию??")) {
      fetch(variables.API_URL + "locations/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Локация успешно удалена");
          this.refreshList();
        });
    }
  }

  render() {
    const {
      locationss,
      modalTitle,
      LocationID,
      LocationName,
      LocationDescription,
      Latitude,
      Longitude,

      LocationIDFilter,
      LocationNameFilter,
      LocationDescriptionFilter,
      LatitudeFilter,
      LongitudeFilter,
      isModalOpen,
    } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          onClick={() => this.addClick()}
        >
          Добавить локацию
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="ID"
                    value={LocationIDFilter}
                    onChange={this.changeLocationIDFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("LocationID", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("LocationID", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                ID Локации
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Имя локации"
                    value={LocationNameFilter}
                    onChange={this.changeLocationNameFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("LocationName", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("LocationName", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Имя локации
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Описание локации"
                    value={LocationDescriptionFilter}
                    onChange={this.changeLocationDescriptionFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("LocationDescription", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      this.sortResult("LocationDescription", false)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Описание локации
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Широта"
                    value={LatitudeFilter}
                    onChange={this.changeLatitudeFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Latitude", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Latitude", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Широта
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Долгота"
                    value={LongitudeFilter}
                    onChange={this.changeLongitudeFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Longitude", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Longitude", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Долгота
              </th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {locationss.map((at) => (
              <tr key={at.LocationID}>
                <td>{at.LocationID}</td>
                <td>{at.LocationName}</td>
                <td>{at.LocationDescription}</td>
                <td>{at.Latitude}</td>
                <td>{at.Longitude}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.editClick(at)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(at.LocationID)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Модальное окно"
          ariaHideApp={false}
          className="modal-dialog modal-lg modal-dialog-centered"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={this.closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="input-group mb-3"></div>
                <span className="input-group-text">Имя локации</span>
                <input
                  type="text"
                  className="form-control"
                  value={LocationName}
                  onChange={this.changeLocationName}
                />
                <span className="input-group-text">Описание локации</span>
                <input
                  type="text"
                  className="form-control"
                  value={LocationDescription}
                  onChange={this.changeLocationDescription}
                />
                <span className="input-group-text">Широта</span>
                <input
                  type="text"
                  className="form-control"
                  value={Latitude}
                  onChange={this.changeLatitude}
                />
                <span className="input-group-text">Долгота</span>
                <input
                  type="text"
                  className="form-control"
                  value={Longitude}
                  onChange={this.changeLongitude}
                />
              </div>

              <div className="modal-footer">
                {LocationID === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Добавить
                  </button>
                ) : null}

                {LocationID !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Изменить
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.closeModal}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Locations;
