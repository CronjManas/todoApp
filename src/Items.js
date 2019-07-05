import React , {Component} from 'react';
import FormD from './FormD';
import Update from 'immutability-helper';
import './Item.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Moment from 'moment';

class Item extends Component{
    
    
    
    taskDone = () => {
        console.log(this.props.item.id);
        let statusChange = !this.props.item.status;
        this.props.status(statusChange,this.props.item.id)
    }
    render(){
        
        return (

                
              <tr onClick={this.taskDone} className="Item" style={!this.props.item.status ? {textDecoration:'line-through'} : {textDecoration:'none'}}>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.priority}</td>
                <td>{this.props.item.duration}</td>
                <td>{this.props.item.date}</td>
                </tr>
                
           
        );
    }
}
class Items extends Component {
    constructor (props) {
        super(props);
        this.state ={
            ItemsTodo :[{id:0,name:'',priority:0,duration:'00:00',date:'0000-00-00',status:true}]
        }   
        
    }
    compare(a,b){
        const x  = Moment.duration(a.duration).asSeconds();
        const y = Moment.duration(b.duration).asSeconds();
        
        
        
        let comparison = 0;
        if (x > y) {
        comparison = 1;
        } else if (x < y) {
        comparison = -1;
        }
  
        return comparison;
    }
    compare2(a,b){
        const x  = a.priority;
        const y = b.priority;
        let comparison = 0;
        if (x > y) {
        comparison = 1;
        } else if (x < y) {
        comparison = -1;
        }
  
        return comparison;
    }

    sortDuration = () => {
        let items = this.state.ItemsTodo;
        items.sort(this.compare);
        // console.log(items);
        // console.log(typeof(items[1].duration));
        // let time = Moment(items[1].duration,'HH:mm');
        // console.log(time['_d'].getTime());
        // let x = Moment.duration(items[1].duration).asSeconds();
        // console.log(x);
        console.log(items);
        
        
        this.setState({ItemsTodo:items});
        
        
        
    
        
        
    }
    sortPriority= () => {
        let items = this.state.ItemsTodo;
        items.sort(this.compare2);
        this.setState({ItemTodo:items});
    }
    //Sorting Date 
    helper(a,b){
        let x = a.date;
        
        let y = b.date;
        console.log(x);
        
        console.log(y);
        
        
        return new Date(y) - new Date(x);
        
    }
    sortDate = () => {
        let items = this.state.ItemsTodo;
        // let date = Date.parse
        items.sort(this.helper);
        this.setState({ItemTodo:items});
        
        
    }
    handle = (ItemDes) => {
        console.log(ItemDes);
        let Temp =[];
        Temp = this.state.ItemsTodo;
        console.log(Temp);
        Temp.push(ItemDes);
        
        this.setState({ItemsTodo : Temp});
    }

    updateStatus = (value,index) => {
        
       let Item = this.state.ItemsTodo.find((item) => {
           
                if(item.id === index){
                    item.status = value;
                    return item;
                }
       });
    //    console.log(Item);
       
       this.setState({ItemsTodo: Update(this.state.ItemsTodo,{index:{$set: Item}})});
            
    }

    render(){
        return (
           <div className="container">
               <Row>
                   <Col md={{span: 6 , offset: 3}} sm={{span:8, offset:2}} xs={{span:12}}>
                   <Card bg="dark" text="white">
                   <Card.Header as="h3" className="text-center" style={{color:'#ff7a00'}}>TODO APP</Card.Header>
                   <Card.Body>
                   <Card.Title>Input Task</Card.Title>
                   <FormD click={this.handle} duration={this.sortDuration} priority = {this.sortPriority} date = {this.sortDate}/>
                   <Table striped bordered hover size="sm" variant="dark">
                       <thead>
                           <tr>
                           <th>
                               Task
                           </th>
                           <th>
                               Priority
                           </th>
                           <th>
                               Start Time
                           </th>
                           <th>
                               Start Date
                           </th>
                           </tr>
                           
                       </thead>
                       <tbody>
                       {    
                        this.state.ItemsTodo.map((ItemTodo) => {
                            return (
                                ItemTodo.id !== 0 ?
                                <Item key={ItemTodo.id} item = {ItemTodo} status= {this.updateStatus}/>                                
                                : <tr key={ItemTodo.id} style={{display:'none'}}></tr>
                            )
                        })
                    }

                       </tbody>
                   </Table>
                   
                   <ListGroup variant="flush">

                    
                   </ListGroup>
                   
                   </Card.Body>
                    

                    
                </Card>    


                   </Col>
               </Row>
               
                   
               
              
           </div> 
        );
    }
}

export default Items;