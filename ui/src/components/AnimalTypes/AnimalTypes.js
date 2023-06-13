import React, { Component } from "react";
import ReactModal from "react-modal";
import { variables } from "../../Variables.js";

export class AnimalTypes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animaltypess: [],
      modalTitle: "",
      TypeName: "",
      TypeDescription: "",
      AnimalTypeID: 0,

      AnimalTypeIDFilter: "",
      TypeNameFilter: "",
      TypeDescriptionFilter: "",
      animaltypessWithoutFilter: [],
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch(variables.API_URL + "animaltypes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ animaltypess: data, animaltypessWithoutFilter: data });
      });
  }

  FilterFn() {
    var AnimalTypeIDFilter = this.state.AnimalTypeIDFilter;
    var TypeNameFilter = this.state.TypeNameFilter;
    var TypeDescriptionFilter = this.state.TypeDescriptionFilter;

    var filteredData = this.state.animaltypessWithoutFilter.filter(function (
      el
    ) {
      return (
        el.AnimalTypeID.toString()
          .toLowerCase()
          .includes(AnimalTypeIDFilter.toString().trim().toLowerCase()) &&
        el.TypeName.toString()
          .toLowerCase()
          .includes(TypeNameFilter.toString().trim().toLowerCase()) &&
        el.TypeDescription.toString()
          .toLowerCase()
          .includes(TypeDescriptionFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ animaltypess: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.animaltypessWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ animaltypess: sortedData });
  }

  changeAnimalTypeIDFilter = (e) => {
    const value = e.target.value;
    this.setState({ AnimalTypeIDFilter: value }, () => {
      this.FilterFn();
    });
  };

  changeTypeNameFilter = (e) => {
    const value = e.target.value;
    this.setState({ TypeNameFilter: value }, () => {
      this.FilterFn();
    });
  };

  changeTypeDescriptionFilter = (e) => {
    const value = e.target.value;
    this.setState({ TypeDescriptionFilter: value }, () => {
      this.FilterFn();
    });
  };

  changeTypeName = (e) => {
    this.setState({ TypeName: e.target.value });
  };

  changeTypeDescription = (e) => {
    this.setState({ TypeDescription: e.target.value });
  };

  openModal = (type) => {
    this.setState({ isModalOpen: true, modalType: type });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  addClick() {
    this.setState({
      modalTitle: "Добавить тип животного",
      AnimalTypeID: 0,
      TypeName: "",
      TypeDescription: "",
    });
    this.openModal("add");
  }

  editClick(at) {
    this.setState({
      modalTitle: "Изменить тип животного",
      AnimalTypeID: at.AnimalTypeID,
      TypeName: at.TypeName,
      TypeDescription: at.TypeDescription,
    });
    this.openModal("edit");
  }

  createClick = () => {
    fetch(variables.API_URL + "animaltypes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TypeName: this.state.TypeName,
        TypeDescription: this.state.TypeDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка при добавлении типа животного");
        }
      })
      .then((data) => {
        alert("Тип животного успешно добавлен");
        this.refreshList();
        this.closeModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  updateClick = () => {
    fetch(variables.API_URL + "animaltypes", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AnimalTypeID: this.state.AnimalTypeID,
        TypeName: this.state.TypeName,
        TypeDescription: this.state.TypeDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка при изменении типа животного");
        }
      })
      .then((data) => {
        alert("Тип животного успешно изменен");
        this.refreshList();
        this.closeModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  deleteClick(id) {
    if (window.confirm("Вы уверены, что хотите удалить этот тип животного?")) {
      fetch(variables.API_URL + "animaltypes/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Тип животного успешно удален");
          this.refreshList();
        });
    }
  }

  render() {
    const {
      animaltypess,
      modalTitle,
      AnimalTypeID,
      TypeName,
      TypeDescription,

      AnimalTypeIDFilter,
      TypeNameFilter,
      TypeDescriptionFilter,
      isModalOpen,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-start"
          onClick={() => this.addClick()}
        >
          Добавить тип животного
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="ID"
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
                ID Животного
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    placeholder="Имя животного"
                    value={TypeNameFilter}
                    onChange={this.changeTypeNameFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("TypeName", true)}
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
                    onClick={() => this.sortResult("TypeName", false)}
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
                    placeholder="Описание типа животного"
                    value={TypeDescriptionFilter}
                    onChange={this.changeTypeDescriptionFilter}
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("TypeDescription", true)}
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
                    onClick={() => this.sortResult("TypeDescription", false)}
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
                Описание типа животного
              </th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {animaltypess.map((at) => (
              <tr key={at.AnimalTypeID}>
                <td>{at.AnimalTypeID}</td>
                <td>{at.TypeName}</td>
                <td>{at.TypeDescription}</td>
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
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(at.AnimalTypeID)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
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
                <div className="col-6">
                  <label>Имя типа животного</label>
                  <input
                    type="text"
                    className="form-control"
                    value={TypeName}
                    onChange={this.changeTypeName}
                  />
                </div>
                <div className="col-6">
                  <label>Описание типа животного</label>
                  <input
                    type="text"
                    className="form-control"
                    value={TypeDescription}
                    onChange={this.changeTypeDescription}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {AnimalTypeID === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.createClick}
                >
                  Добавить
                </button>
              ) : null}

              {AnimalTypeID !== 0 ? (
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
        </ReactModal>
      </div>
    );
  }
}

export default AnimalTypes;
