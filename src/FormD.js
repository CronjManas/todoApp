import React , {Component} from 'react';
import NewId from './utils/New';
import './Form.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// import Row from 'react-bootstrap/Row';
// import TimeField from 'react-simple-timefield';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
class FormD extends Component {
    constructor(props){
        super(props);
        this.state = {
           id:0, name:'',priority:0,duration:'00:00',date:'00/00/0000',status:true
        }
        this.handle = this.handle.bind(this);
        this.handleOnDrtnChange = this.handleOnDrtnChange.bind(this);
        this.handleOnPrtyChange = this.handleOnPrtyChange.bind(this);
        this.handleOnTaskChange = this.handleOnTaskChange.bind(this);
        this.handleOnDateChange = this.handleOnDateChange.bind(this);
    }
    handle(event){
        event.preventDefault();
        if(this.state.name !== ''){
            let Itemtodo = {
                id : NewId(),
                name: this.state.name,
                priority : this.state.priority,
                duration : this.state.duration,
                date : this.state.date,
                status : this.state.status
            }
            
            // console.log(Itemtodo);
            this.props.click(Itemtodo);
            
        }
        
    }
    handleOnTaskChange(event){
        let taskName = event.target.value;
        this.setState({name:taskName });
    }
    handleOnDrtnChange(event){
        const time = event.target.value;
        this.setState({duration:time});
        
        
    }
    handleOnPrtyChange(event){
        const x = parseInt(event.target.value)
        this.setState({priority: x});
    }
    sortDuration = () => {
        this.props.duration();
    }
    sortPriority = () => {
        this.props.priority();
    }
    sortDate = () => {
        this.props.date();
    }
    handleOnDateChange(event){
        const date = event.target.value;
        // console.log(typeof(date));
        this.setState({date:date});
        
    }
   
    render(){
        return (
            <div>
                <Form onSubmit={this.handle}>
                <Form.Group controlId="formTask">
                    <Form.Control size="sm" type="text" placeholder="Enter Task" onChange = {this.handleOnTaskChange}/>
                </Form.Group>
                    <Form.Group controlId="formPrio">
                        <Form.Row> 
                            <Col md={3} xs={2} sm={2}>
                            <Form.Control size="sm" onChange={this.handleOnPrtyChange} type="number" placeholder="Priority"/>
                            </Col>
                            <Col md={3} xs={4} sm={4}>
                            <Form.Control size="sm" onChange={this.handleOnDrtnChange} type="time" />
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                            <Form.Control size="sm" onChange={this.handleOnDateChange} type="date" />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Button variant="primary" block type="submit" style={{background:'#ff7a00', border:'none',boxShadow:'0px 2px 6px rgba(0,0,0,0.5)'}}>Submit</Button>
                </Form>
                         <br/>
                         <Card.Text>Actions:</Card.Text>
                         <ButtonGroup style={{width:'100%'}} >
                         <Button onClick={this.sortDuration} variant="outline-dark" style={{color:'#fff',background:'#ff7a00',borderColor:'#ff7a00'}} >Duration </Button>
                         <Button onClick={this.sortPriority} variant="outline-dark" style={{color:'#fff',borderColor:'#ff7a00',background:'#ff7a00'}} >Priority</Button>
                         <Button onClick={this.sortDate} variant="outline-dark" block style={{color:'#fff',borderColor:'#ff7a00',background:'#ff7a00'}}>Date</Button>
                         </ButtonGroup>
                         
               
                <br/>
                <br/>
                
                        
                   
               
               
               
                
                
                
            </div>
        );
    }
}

export default FormD;