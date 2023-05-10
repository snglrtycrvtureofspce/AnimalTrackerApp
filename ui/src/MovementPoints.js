import React, {Component} from 'react';
import {variables} from './Variables.js';

export class MovementPoints extends Component {
    constructor(props){
        super(props);

        this.state={
            movementpointss:[],
            animalss:[],
            locationss:[],
            modalTitle:"",
            AnimalID:"",
            LocationID:"",
            DateTime:"",
            MovementPointID:0,

            MovementPointIDFilter:"",
            AnimalIDFilter:"",
            LocationIDFilter:"",
            DateTimeFilter:"",
            movementpointssWithoutFilter:[]
        }
    }

    FilterFn(){
        var MovementPointIDFilter=this.state.MovementPointIDFilter;
        var AnimalIDFilter=this.state.AnimalIDFilter;
        var LocationIDFilter=this.state.LocationIDFilter;
        var DateTimeFilter=this.state.DateTimeFilter;

        var filteredData=this.state.movementpointssWithoutFilter.filter(
            function(el){
                return el.MovementPointID.toString().toLowerCase().includes(
                    MovementPointIDFilter.toString().trim().toLowerCase()
                )&&
                el.AnimalID.toString().toLowerCase().includes(
                    AnimalIDFilter.toString().trim().toLowerCase()
                )&&
                el.LocationID.toString().toLowerCase().includes(
                    LocationIDFilter.toString().trim().toLowerCase()
                )&&
                el.DateTime.toString().toLowerCase().includes(
                    DateTimeFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({movementpointss:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.movementpointssWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({movementpointss:sortedData});
    }

    changeMovementPointIDFilter = (e)=>{
        this.setState.MovementPointIDFilter=e.target.value;
        this.FilterFn();
    }
    changeAnimalIDFilter = (e)=>{
        this.setState.AnimalIDFilter=e.target.value;
        this.FilterFn();
    }
    changeLocationIDFilter = (e)=>{
        this.setState.LocationIDFilter=e.target.value;
        this.FilterFn();
    }
    changeDateTimeFilter = (e)=>{
        this.setState.DateTimeFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'movementpoints')
        .then(response=>response.json())
        .then(data=>{
            this.setState({movementpointss:data,movementpointssWithoutFilter:data});
        });

        fetch(variables.API_URL+'locations')
        .then(response=>response.json())
        .then(data=>{
            this.setState({locationss:data});
        });

        fetch(variables.API_URL+'animals')
        .then(response=>response.json())
        .then(data=>{
            this.setState({animalss:data,animalssWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeMovementPointID =(e)=>{
        this.setState({MovementPointID:e.target.value});
    }

    changeAnimalID =(e)=>{
        this.setState({AnimalID:e.target.value});
    }

    changeLocationID =(e)=>{
        this.setState({LocationID:e.target.value});
    }

    changeDateTime =(e)=>{
        this.setState({DateTime:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавить точку перемещения",
            MovementPointID:0,
            AnimalID:"",
            LocationID:"",
            DateTime:""
        });
    }
    editClick(at){
        this.setState({
            modalTitle:"Изменить точку перемещения",
            MovementPointID:at.MovementPointID,
            AnimalID:at.AnimalID,
            LocationID:at.LocationID,
            DateTime:at.DateTime
        });
    }

    createClick(){
        fetch(variables.API_URL+'movementpoints',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AnimalID:this.state.AnimalID,
                LocationID:this.state.LocationID,
                DateTime:this.state.DateTime
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Ошибка создания.');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'movementpoints',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                MovementPointID:this.state.MovementPointID,
                AnimalID:this.state.AnimalID,
                LocationID:this.state.LocationID,
                DateTime:this.state.DateTime
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Ошибка обновления.');
        })
    }

    deleteClick(id){
        if(window.confirm('Вы уверены?')){
        fetch(variables.API_URL+'movementpoints/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Ошибка удаления');
        })
        }
    }

    render(){
        const {
            animalss,
            locationss,
            movementpointss,
            modalTitle,
            MovementPointID,
            AnimalID,
            LocationID,
            DateTime
        }=this.state;
        return(
            <div>
        <button type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={()=>this.addClick()}>
            Добавить точку перемещения
        </button>
        <table className="table table-striped">
        <thead>
        <tr>
            <th>
                <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeMovementPointIDFilter}
                placeholder="Filter"/>
                
                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('MovementPointID',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('MovementPointID',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                ID Точки перемещения
            </th>
            <th>
                <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeAnimalIDFilter}
                placeholder="Filter"/>
                
                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalID',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalID',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                ID Животного
            </th>
            <th>
            <div className="d-flex flex-row">
            <input className="form-control m-2"
                onChange={this.changeLocationIDFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('LocationID',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('LocationID',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                ID Локации
            </th>
            <th>
                <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeDateTimeFilter}
                placeholder="Filter"/>
                
                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('DateTime',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('DateTime',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                Дата посещения
            </th>
            <th>
                Настройки
            </th>
        </tr>
        </thead>
        <tbody>
            {movementpointss.map(at=>
                <tr key={at.MovementPointID}>
                    <td>{at.MovementPointID}</td>
                    <td>{at.AnimalID}</td>
                    <td>{at.LocationID}</td>
                    <td>{at.DateTime}</td>
                    <td>
                    <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(at)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>

                    <button type="button"
                    className="btn btn-light mr-1"
                    onClick={()=>this.deleteClick(at.MovementPointID)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                    </td>
                </tr>
                )}
        </tbody>
        </table>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
    <div className="modal-header">
        <h5 className="modal-title">{modalTitle}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
        ></button>
    </div>

    <div className="modal-body">
        <div className="input-group mb-3">
            <span className="input-group-text">ID Животного</span>
            <select className="form-select"
            onChange={this.changeAnimalID}
            value={AnimalID}>
                {animalss.map(at=><option key={at.AnimalID}>
                    {at.AnimalID}
                </option>)}
            </select>
            
            <span className="input-group-text">ID Локации</span>
            <select className="form-select"
            onChange={this.changeLocationID}
            value={LocationID}>
                {locationss.map(lc=><option key={lc.LocationID}>
                    {lc.LocationID}
                </option>)}
            </select>

            <div className="input-group mb-3"></div>
            <span className="input-group-text">Дата посещения</span>
            <input type="date" className="form-control"
            value={DateTime}
            onChange={this.changeDateTime}
            />
        
        </div>
        


            {MovementPointID==0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.createClick()}
            >Создать</button>
            :null}

            {MovementPointID!=0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.updateClick()}
            >Обновить</button>
            :null}
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}