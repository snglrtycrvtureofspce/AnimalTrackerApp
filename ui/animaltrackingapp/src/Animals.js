import React, {Component} from 'react';
import {variables} from './Variables.js';

export class Animals extends Component {
    constructor(props){
        super(props);

        this.state={
            animaltypess:[],
            animalss:[],
            modalTitle:"",
            AnimalTypeID:"",
            AnimalName:"",
            AnimalDescription:"",
            AnimalID:0,

            AnimalIDFilter:"",
            AnimalTypeIDFilter:"",
            AnimalNameFilter:"",
            AnimalDescriptionFilter:"",
            animalssWithoutFilter:[]
        }
    }

    FilterFn(){
        var AnimalIDFilter=this.state.AnimalIDFilter;
        var AnimalTypeIDFilter=this.state.AnimalTypeIDFilter;
        var AnimalNameFilter=this.state.AnimalNameFilter;
        var AnimalDescriptionFilter=this.state.AnimalDescriptionFilter;

        var filteredData=this.state.animalssWithoutFilter.filter(
            function(el){
                return el.AnimalID.toString().toLowerCase().includes(
                    AnimalIDFilter.toString().trim().toLowerCase()
                )&&
                el.AnimalTypeID.toString().toLowerCase().includes(
                    AnimalTypeIDFilter.toString().trim().toLowerCase()
                )&&
                el.AnimalName.toString().toLowerCase().includes(
                    AnimalNameFilter.toString().trim().toLowerCase()
                )&&
                el.AnimalDescription.toString().toLowerCase().includes(
                    AnimalDescriptionFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({animalss:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.animalssWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({animalss:sortedData});
    }

    changeAnimalIDFilter = (e)=>{
        this.state.AnimalIDFilter=e.target.value;
        this.FilterFn();
    }
    changeAnimalTypeIDFilter = (e)=>{
        this.state.AnimalTypeIDFilter=e.target.value;
        this.FilterFn();
    }
    changeAnimalNameFilter = (e)=>{
        this.state.AnimalNameFilter=e.target.value;
        this.FilterFn();
    }
    changeAnimalDescriptionFilter = (e)=>{
        this.state.AnimalDescriptionFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'animals')
        .then(response=>response.json())
        .then(data=>{
            this.setState({animalss:data,animalssWithoutFilter:data});
        });

        fetch(variables.API_URL+'animaltypes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({animaltypess:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeAnimalID =(e)=>{
        this.setState({AnimalID:e.target.value});
    }

    changeAnimalTypeID =(e)=>{
        this.setState({AnimalTypeID:e.target.value});
    }

    changeAnimalName =(e)=>{
        this.setState({AnimalName:e.target.value});
    }

    changeAnimalDescription =(e)=>{
        this.setState({AnimalDescription:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавить животного",
            AnimalID:0,
            AnimalTypeID:"",
            AnimalName:"",
            AnimalDescription:""
        });
    }
    editClick(at){
        this.setState({
            modalTitle:"Изменить животного",
            AnimalID:at.AnimalID,
            AnimalTypeID:at.AnimalTypeID,
            AnimalName:at.AnimalName,
            AnimalDescription:at.AnimalDescription
        });
    }

    createClick(){
        fetch(variables.API_URL+'animals',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AnimalTypeID:this.state.AnimalTypeID,
                AnimalName:this.state.AnimalName,
                AnimalDescription:this.state.AnimalDescription
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
        fetch(variables.API_URL+'animals',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AnimalID:this.state.AnimalID,
                AnimalTypeID:this.state.AnimalTypeID,
                AnimalName:this.state.AnimalName,
                AnimalDescription:this.state.AnimalDescription
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
        fetch(variables.API_URL+'animals/'+id,{
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
            animaltypess,
            animalss,
            modalTitle,
            AnimalID,
            AnimalTypeID,
            AnimalName,
            AnimalDescription
        }=this.state;
        return(
            <div>

        <button type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={()=>this.addClick()}>
            Добавить животного
        </button>
        <table className="table table-striped">
        <thead>
        <tr>
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
                onChange={this.changeAnimalTypeIDFilter}
                placeholder="Filter"/>
                
                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalTypeID',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalTypeID',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                ID Типа животного
            </th>
            <th>
            <div className="d-flex flex-row">
            <input className="form-control m-2"
                onChange={this.changeAnimalNameFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalName',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalName',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                Имя животного
            </th>
            <th>
                <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeAnimalDescriptionFilter}
                placeholder="Filter"/>
                
                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalDescription',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('AnimalDescription',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                Описание животного
            </th>
            <th>
                Настройки
            </th>
        </tr>
        </thead>
        <tbody>
            {animalss.map(at=>
                <tr key={at.AnimalID}>
                    <td>{at.AnimalID}</td>
                    <td>{at.AnimalTypeID}</td>
                    <td>{at.AnimalName}</td>
                    <td>{at.AnimalDescription}</td>
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
                    onClick={()=>this.deleteClick(at.AnimalID)}>
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
            <span className="input-group-text">ID Типа животного</span>
            <select className="form-select"
            onChange={this.changeAnimalTypeID}
            value={AnimalTypeID}>
                {animaltypess.map(at=><option key={at.AnimalID}>
                    {at.AnimalTypeID}
                </option>)}
            </select>
            
            <div className="input-group mb-3"></div>
            <span className="input-group-text">Имя животного</span>
            <input type="text" className="form-control"
            value={AnimalName}
            onChange={this.changeAnimalName}
            />
            <span className="input-group-text">Описание животного</span>
            <input type="text" className="form-control"
            value={AnimalDescription}
            onChange={this.changeAnimalDescription}
            />
        </div>

            {AnimalID==0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.createClick()}
            >Создать</button>
            :null}

            {AnimalID!=0?
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