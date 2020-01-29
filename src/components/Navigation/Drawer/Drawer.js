import React, {Component} from 'react'
import  './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
const links = [
  {to:'/', label: 'Список тестов', exact: false},
  {to:'/Auth', label: 'Авторизация', exact: false},
  {to:'/QuizCreator', label: 'Создать тест', exact: false}
]
// const clickHandler = () => {
//     // this.props.onClose()
//     console.log("close");
// }
class Drawer extends Component  {
    renderLinks(){
        return links.map((link, index)=>{
            return(
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName="active"
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render(){
        const cls = ['Drawer']
        if(!this.props.isOpen){
            cls.push('close')
        }
        return(
            
            <React.Fragment>
                <nav className={cls.join(' ')}>
                        <ul>
                            {this.renderLinks()}
                        </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}
export default Drawer