import React, { Component } from 'react'
import FIELDS from './PlayerFields'

export default class PlayerForm extends Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  }

   render() {
     const { onSubmit, onCancel } = this.props
     const c =  (
       <div className="text-center">
         <form className="form-horizontal">
           {FIELDS.map(v => {
             return (
               <div key={v.field} className="form-group">
                 <label htmlFor={v.field} className="col-sm-2 control-label">{v.name}</label>
                 <div className="col-sm-10">
                   <input type={v.type} className="form-control" id={v.field} placeholder="" />
                 </div>
               </div>
             )
           })}
           <div className="form-group">
             <div className="col-sm-offset-2 col-sm-10">
               <button
                 type="button"
                 onClick={e => onSubmit(e)}
                 className="btn btn-success">Create</button>
               &nbsp;
               <button
                 type="button"
                 onClick={e => onCancel(e)}
                 className="btn btn-warning">Cancel</button>
             </div>
           </div>
         </form>
       </div>
     )
     return (
       <div className="row">
         <div className="col-md-6 col-md-offset-3">
           <div className="panel panel-default">
             <div className="panel-body">
               {c}
             </div>
           </div>
         </div>
       </div>
     )
   }
}
