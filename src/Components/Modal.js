import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const modalRoot = document.getElementById('modal-root');


class Modal extends Component 
{
    constructor(props) {
        super(props);
        this.closeButtonRef = React.createRef();
        
    }

    closeModel(e) {
        console.log(this.closeButtonRef.current);
        document.getElementById(this.closeButtonRef.current.id).click();
    }

    render()
    {
        const { title, action, actionName, id } = this.props; //Destructuring props onClick={this.closeModel.bind(this)}

       
        const RefModal = <div className="modal fade" id={id} role="dialog" aria-hidden="true" >
                            
                            <div className="modal-content" style={{height: '100%'}}>
                                <div className="modal-header">
                                <button ref={this.closeButtonRef} type="button" id="closeButton"  className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="modal-title" id="modalLabel"> <span className="fa fa-tasks"></span> {title}</h4>
                                </div>

                                <div className="modal-body" >
                                    {this.props.children}
                                </div>

                                <div className="modal-footer row" >
                                    <div className="col-md-6 ">
                                        <button type="button" className="btn btn-secondary right" data-dismiss="modal">Close</button>
                                    </div>
                                    <div className="col-md-6" onClick={action}>
                                        <button type="button"  className={this.props.formIsValid ? 'btn btn-primary left' : 'btn btn-primary left disabled' } >{actionName}</button>
                                    </div>

                                </div>
                            </div>
                            
                        </div>
             
     
        return ReactDOM.createPortal(
            <>
                {RefModal}
            </>,
            modalRoot,
        );
        
    }
}


export default Modal;


