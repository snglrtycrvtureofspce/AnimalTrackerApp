import React, { Component } from "react";
import jsPDF from 'jspdf';
import { variables } from "../../Variables.js";

export class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movementpointss: [],
      animalss: [],
      locationss: [],
      modalTitle: "",
      AnimalID: "",
      LocationID: "",
      DateTime: "",
      MovementPointID: 0,

      MovementPointIDFilter: "",
      AnimalIDFilter: "",
      LocationIDFilter: "",
      DateTimeFilter: "",
      movementpointssWithoutFilter: [],
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch(variables.API_URL + "movementpoints")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movementpointss: data, movementpointssWithoutFilter: data });
      });

    fetch(variables.API_URL + "locations")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ locationss: data });
      });

    fetch(variables.API_URL + "animals")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ animalss: data, animalssWithoutFilter: data });
      });
  }

  FilterFn() {
    var MovementPointIDFilter = this.state.MovementPointIDFilter;
    var AnimalIDFilter = this.state.AnimalIDFilter;
    var LocationIDFilter = this.state.LocationIDFilter;
    var DateTimeFilter = this.state.DateTimeFilter;

    var filteredData = this.state.movementpointssWithoutFilter.filter(function (
      el
    ) {
      return (
        el.MovementPointID.toString()
          .toLowerCase()
          .includes(MovementPointIDFilter.toString().trim().toLowerCase()) &&
        el.AnimalID.toString()
          .toLowerCase()
          .includes(AnimalIDFilter.toString().trim().toLowerCase()) &&
        el.LocationID.toString()
          .toLowerCase()
          .includes(LocationIDFilter.toString().trim().toLowerCase()) &&
        el.DateTime.toString()
          .toLowerCase()
          .includes(DateTimeFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ movementpointss: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.movementpointssWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ movementpointss: sortedData });
  }

  changeMovementPointIDFilter = (e) => {
    const value = e.target.value;
    this.setState({ MovementPointIDFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeAnimalIDFilter = (e) => {
    const value = e.target.value;
    this.setState({ AnimalIDFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeLocationIDFilter = (e) => {
    const value = e.target.value;
    this.setState({ LocationIDFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeDateTimeFilter = (e) => {
    const value = e.target.value;
    this.setState({ DateTimeFilter: value }, () => {
      this.FilterFn();
    });
  };

  changeMovementPointID = (e) => {
    this.setState({ MovementPointID: e.target.value });
  };

  changeAnimalID = (e) => {
    this.setState({ AnimalID: e.target.value });
  };

  changeLocationID = (e) => {
    this.setState({ LocationID: e.target.value });
  };

  changeDateTime = (e) => {
    this.setState({ DateTime: e.target.value });
  };

  openModal = (type) => {
    this.setState({ isModalOpen: true, modalType: type });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  createReport = () => {
    const { movementpointss } = this.state;
  
    // Создание нового документа PDF
    const doc = new jsPDF();
    let yPos = 20;
  
    doc.setFont("Arial", "win1251");
    doc.text('Отчёт по таблице:', 10, yPos);
    yPos += 10;
  
    movementpointss.forEach((item) => {
        doc.setFont("Arial", "win1251");
      doc.text(
        `ID Точки перемещения: ${item.MovementPointID}, ID Животного: ${item.AnimalID}, ID Локации: ${item.LocationID}, Дата посещения: ${item.DateTime}`,
        10,
        yPos
      );
      yPos += 10;
    });
  
    // Сохранение файла
    doc.save('отчёт.pdf');
  };
  

  render() {
    const {
      movementpointss,

      MovementPointIDFilter,
      AnimalIDFilter,
      LocationIDFilter,
      DateTimeFilter,
    } = this.state;
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.createReport}>
        Создать отчёт
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="ID"
                    value={MovementPointIDFilter}
                    onChange={this.changeMovementPointIDFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("MovementPointID", true)}
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
                    onClick={() => this.sortResult("MovementPointID", false)}
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
                ID Точки перемещения
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="ID животного"
                    value={AnimalIDFilter}
                    onChange={this.changeAnimalIDFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("AnimalID", true)}
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
                    onClick={() => this.sortResult("AnimalID", false)}
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
                ID Животного
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Локация"
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
                    placeholder="Дата посещения"
                    value={DateTimeFilter}
                    onChange={this.changeDateTimeFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("DateTime", true)}
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
                    onClick={() => this.sortResult("DateTime", false)}
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
                Дата посещения
              </th>
            </tr>
          </thead>
          <tbody>
            {movementpointss.map((at) => (
              <tr key={at.MovementPointID}>
                <td>{at.MovementPointID}</td>
                <td>{at.AnimalID}</td>
                <td>{at.LocationID}</td>
                <td>{at.DateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Report;
