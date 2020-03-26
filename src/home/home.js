import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import { inject, observer } from "mobx-react";
import {subComponent} from './components/row';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';

@inject("BlockStore")
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  componentWillUnmount() {
    this.clearBlocks();
  }

  async getInfo() {
    try {
      var result = await this.props.BlockStore.getInfo();
      this.props.BlockStore.setBlockNum(result.head_block_num);
      this.props.BlockStore.setNextBlockNum(result.head_block_num);
      this.getBlock();
    } catch (err) {
        console.log(err);
    }
  }

  async getBlock(){
    var promiseArr = [];
    for(var i=0; i<10; i++){
      console.log("next num: ", this.props.BlockStore.nextBlockNum - i)
      promiseArr.push(this.props.BlockStore.getBlock(this.props.BlockStore.nextBlockNum - i));
    }

    try {
      var result = await Promise.all(promiseArr); //array of blocks
      console.log("result: ", result);
      this.props.BlockStore.setBlocks(result);
      this.setState({
        blocks : this.props.BlockStore.getBlocks()
      });
    } catch(err){
      console.log(err);
    }
  }

  loadBlocks(){
    this.props.BlockStore.loadBlocks();
    this.getBlock();
  }

  clearBlocks(){
    this.setState({
      blocks : []
    });
  }

 render() {
   return (
     <div className="App">
       <div className="App-headerBG">
         <img src={logo} className="App-logo" alt="logo" />
       </div>
       <div>Total blocks : {this.state.blocks.length}</div>
       <button type="button" className="btn btn-info btn-m" onClick={()=>{this.loadBlocks()}}>Load Blocks</button>
       <BootstrapTable
         keyField='id'
         data={ this.state.blocks }
         columns={ this.props.BlockStore.columns }
         expandRow={ subComponent }
         striped
         bordered
         hover
        />
     </div>
   )
 }
}

export default Home;
