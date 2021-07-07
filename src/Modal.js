import React from 'react'
import "./Modal.css"

function Modal({active, setActive, children}) {

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_result active" : "modal_result"} onClick={(e) => e.stopPropagation()}>
                {children}
                <h4 style={{position: 'absolute', bottom: 0, right: '2%'}}>Для выхода из справки нажмите на свободную область экрана</h4>
            </div>
        </div>
    )
}

export default Modal