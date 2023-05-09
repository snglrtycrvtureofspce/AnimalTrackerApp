import React, {Component} from 'react';
import {variables} from './Variables.js';

export class AnimalTypes extends Component {
    constructor(props){
        super(props);

        this.state={
            animaltypess:[],
            modalTitle:"",
            TypeName:"",
            TypeDescription:"",
            AnimalTypeID:0,

            AnimalTypeIDFilter:"",
            TypeNameFilter:"",
            TypeDescriptionFilter:"",
            animaltypessWithoutFilter:[]
        }
    }

    FilterFn(){
        var AnimalTypeIDFilter=this.state.AnimalTypeIDFilter;
        var TypeNameFilter=this.state.TypeNameFilter;
        var TypeDescriptionFilter=this.state.TypeDescriptionFilter;

        var filteredData=this.state.animaltypessWithoutFilter.filter(
            function(el){
                return el.AnimalTypeID.toString().toLowerCase().includes(
                    AnimalTypeIDFilter.toString().trim().toLowerCase()
                )&&
                el.TypeName.toString().toLowerCase().includes(
                    TypeNameFilter.toString().trim().toLowerCase()
                )&&
                el.TypeDescription.toString().toLowerCase().includes(
                    TypeDescriptionFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({animaltypess:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.animaltypessWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({animaltypess:sortedData});
    }

    changeAnimalTypeIDFilter = (e)=>{
        this.state.AnimalTypeIDFilter=e.target.value;
        this.FilterFn();
    }
    changeTypeNameFilter = (e)=>{
        this.state.TypeNameFilter=e.target.value;
        this.FilterFn();
    }
    changeTypeDescriptionFilter = (e)=>{
        this.state.TypeDescriptionFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'animaltypes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({animaltypess:data,animaltypessWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeTypeName =(e)=>{
        this.setState({TypeName:e.target.value});
    }

    changeTypeDescription =(e)=>{
        this.setState({TypeDescription:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавить тип животного",
            AnimalTypeID:0,
            TypeName:"",
            TypeDescription:""
        });
    }
    editClick(at){
        this.setState({
            modalTitle:"Изменить тип животного",
            AnimalTypeID:at.AnimalTypeID,
            TypeName:at.TypeName,
            TypeDescription:at.TypeDescription
        });
    }

    createClick(){
        fetch(variables.API_URL+'animaltypes',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TypeName:this.state.TypeName,
                TypeDescription:this.state.TypeDescription
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
        fetch(variables.API_URL+'animaltypes',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AnimalTypeID:this.state.AnimalTypeID,
                TypeName:this.state.TypeName,
                TypeDescription:this.state.TypeDescription
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
        fetch(variables.API_URL+'animaltypes/'+id,{
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
            modalTitle,
            AnimalTypeID,
            TypeName,
            TypeDescription
        }=this.state;
        return(
            <div>

        <button type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={()=>this.addClick()}>
            Добавить тип животного
        </button>
        <table className="table table-striped">
        <thead>
        <tr>
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
                ID Животного
            </th>
            <th>
            <div className="d-flex flex-row">
            <input className="form-control m-2"
                onChange={this.changeTypeNameFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('TypeName',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('TypeName',false)}>
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
                onChange={this.changeTypeDescriptionFilter}
                placeholder="Filter"/>
                
                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('TypeDescription',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('TypeDescription',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>
                </div>
                Описание типа животного
            </th>
            <th>
                Настройки
            </th>
        </tr>
        </thead>
        <tbody>
            {animaltypess.map(at=>
                <tr key={at.AnimalTypeID}>
                    <td>{at.AnimalTypeID}</td>
                    <td>{at.TypeName}</td>
                    <td>{at.TypeDescription}</td>
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
                    onClick={()=>this.deleteClick(at.AnimalTypeID)}>
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
            <span className="input-group-text">Имя типа животного</span>
            <input type="text" className="form-control"
            value={TypeName}
            onChange={this.changeTypeName}
            />
            <span className="input-group-text">Описание типа животного</span>
            <input type="text" className="form-control"
            value={TypeDescription}
            onChange={this.changeTypeDescription}
            />
        </div>

            {AnimalTypeID==0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.createClick()}
            >Создать</button>
            :null}

            {AnimalTypeID!=0?
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