import React, { Component } from "react";
import ReactModal from "react-modal";
import { variables } from "../../Variables.js";

export class Animals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animaltypess: [],
      animalss: [],
      modalTitle: "",
      AnimalTypeID: "",
      AnimalName: "",
      AnimalDescription: "",
      AnimalID: 0,

      AnimalIDFilter: "",
      AnimalTypeIDFilter: "",
      AnimalNameFilter: "",
      AnimalDescriptionFilter: "",
      animalssWithoutFilter: [],
      isModalOpen: false,
    };
  }

  FilterFn() {
    var AnimalIDFilter = this.state.AnimalIDFilter;
    var AnimalTypeIDFilter = this.state.AnimalTypeIDFilter;
    var AnimalNameFilter = this.state.AnimalNameFilter;
    var AnimalDescriptionFilter = this.state.AnimalDescriptionFilter;

    var filteredData = this.state.animalssWithoutFilter.filter(function (el) {
      return (
        el.AnimalID.toString()
          .toLowerCase()
          .includes(AnimalIDFilter.toString().trim().toLowerCase()) &&
        el.AnimalTypeID.toString()
          .toLowerCase()
          .includes(AnimalTypeIDFilter.toString().trim().toLowerCase()) &&
        el.AnimalName.toString()
          .toLowerCase()
          .includes(AnimalNameFilter.toString().trim().toLowerCase()) &&
        el.AnimalDescription.toString()
          .toLowerCase()
          .includes(AnimalDescriptionFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ animalss: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.animalssWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ animalss: sortedData });
  }

  changeAnimalIDFilter = (e) => {
    const value = e.target.value;
    this.setState({ AnimalIDFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeAnimalTypeIDFilter = (e) => {
    const value = e.target.value;
    this.setState({ AnimalTypeIDFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeAnimalNameFilter = (e) => {
    const value = e.target.value;
    this.setState({ AnimalNameFilter: value }, () => {
      this.FilterFn();
    });
  };
  changeAnimalDescriptionFilter = (e) => {
    const value = e.target.value;
    this.setState({ AnimalDescriptionFilter: value }, () => {
      this.FilterFn();
    });
  };

  refreshList() {
    fetch(variables.API_URL + "animals")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ animalss: data, animalssWithoutFilter: data });
      });

    fetch(variables.API_URL + "animaltypes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ animaltypess: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeAnimalID = (e) => {
    this.setState({ AnimalID: e.target.value });
  };

  changeAnimalTypeID = (e) => {
    this.setState({ AnimalTypeID: e.target.value });
  };

  changeAnimalName = (e) => {
    this.setState({ AnimalName: e.target.value });
  };

  changeAnimalDescription = (e) => {
    this.setState({ AnimalDescription: e.target.value });
  };

  openModal = (type) => {
    this.setState({ isModalOpen: true, modalType: type });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  addClick() {
    this.setState({
      modalTitle: "Добавить животного",
      AnimalID: 0,
      AnimalTypeID: "",
      AnimalName: "",
      AnimalDescription: "",
    });
    this.openModal("add");
  }
  editClick(at) {
    this.setState({
      modalTitle: "Изменить животного",
      AnimalID: at.AnimalID,
      AnimalTypeID: at.AnimalTypeID,
      AnimalName: at.AnimalName,
      AnimalDescription: at.AnimalDescription,
    });
    this.openModal("edit");
  }

  createClick = () => {
    fetch(variables.API_URL + "animals", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AnimalTypeID: this.state.AnimalTypeID,
        AnimalName: this.state.AnimalName,
        AnimalDescription: this.state.AnimalDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка при добавлении животного");
        }
      })
      .then((data) => {
        alert("Животное успешно добавлено");
        this.refreshList();
        this.closeModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  updateClick = () => {
    fetch(variables.API_URL + "animals", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AnimalID: this.state.AnimalID,
        AnimalTypeID: this.state.AnimalTypeID,
        AnimalName: this.state.AnimalName,
        AnimalDescription: this.state.AnimalDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка при изменении животного");
        }
      })
      .then((data) => {
        alert("Животное успешно изменено");
        this.refreshList();
        this.closeModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  deleteClick(id) {
    if (window.confirm("Вы уверены, что хотите удалить это животное?")) {
      fetch(variables.API_URL + "animals/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Животное успешно удалено");
          this.refreshList();
        });
    }
  }

  render() {
    const {
      animaltypess,
      animalss,
      modalTitle,
      AnimalID,
      AnimalTypeID,
      AnimalName,
      AnimalDescription,

      AnimalIDFilter,
      AnimalTypeIDFilter,
      AnimalNameFilter,
      AnimalDescriptionFilter,
      isModalOpen,
    } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-start"
          onClick={() => this.addClick()}
        >
          Добавить животное
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="ID"
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
                    placeholder="ID типа животного"
                    value={AnimalTypeIDFilter}
                    onChange={this.changeAnimalTypeIDFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("AnimalTypeID", true)}
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
                    onClick={() => this.sortResult("AnimalTypeID", false)}
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
                ID Типа животного
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Имя животного"
                    value={AnimalNameFilter}
                    onChange={this.changeAnimalNameFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("AnimalName", true)}
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
                    onClick={() => this.sortResult("AnimalName", false)}
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
                Имя животного
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Описание животного"
                    value={AnimalDescriptionFilter}
                    onChange={this.changeAnimalDescriptionFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("AnimalDescription", true)}
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
                    onClick={() => this.sortResult("AnimalDescription", false)}
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
                Описание животного
              </th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {animalss.map((at) => (
              <tr key={at.AnimalID}>
                <td>{at.AnimalID}</td>
                <td>{at.AnimalTypeID}</td>
                <td>{at.AnimalName}</td>
                <td>{at.AnimalDescription}</td>
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
                    onClick={() => this.deleteClick(at.AnimalID)}
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
                <span className="input-group-text">ID Типа животного</span>
                <select
                  className="form-select"
                  onChange={this.changeAnimalTypeID}
                  value={AnimalTypeID}
                >
                  {animaltypess.map((animaltypes) => (
                    <option
                      key={animaltypes.AnimalTypeID}
                      value={animaltypes.AnimalTypeID}
                    >
                      {animaltypes.TypeName}
                    </option>
                  ))}
                </select>

                <div className="input-group mb-3"></div>
                <span className="input-group-text">Имя животного</span>
                <input
                  type="text"
                  className="form-control"
                  value={AnimalName}
                  onChange={this.changeAnimalName}
                />
                <label className="input-group-text">Описание животного</label>
                <input
                  type="text"
                  className="form-control"
                  value={AnimalDescription}
                  onChange={this.changeAnimalDescription}
                />
              </div>

              <div className="modal-footer">
                {AnimalID === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.createClick}
                  >
                    Добавить
                  </button>
                ) : null}

                {AnimalID !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.updateClick}
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

export default Animals;
