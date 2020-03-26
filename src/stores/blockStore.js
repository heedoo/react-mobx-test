import { observable, action, computed } from 'mobx';
import http from '../shared/http/http';
import config from '../config';
import { JsonRpc } from 'eosjs'

class BlockStore {

  @observable blocks;
  @observable block_num_or_id;
  @observable nextBlockNum;
  @observable rpc;
  @computed get columns(){
    return [{
      dataField: 'id',
      text: 'id',
    }, {
      dataField: 'timestamp',
      text: 'timestamp',
    }, {
      dataField: 'transactions',
      text: '# actions',
      formatter : (cell, row)=>{
        const transactions = row.transactions;
        if(transactions.length > 0){
          let totalActions = 0;
          for(let i in transactions){
            if(transactions[i].trx.transaction && transactions[i].trx.transaction.actions){
              totalActions = totalActions + transactions[i].trx.transaction.actions.length;
            }else{
              totalActions = 0;
            }
          }
          return totalActions;
        }else{
          return 0;
        }
      }
    }];
  }

  constructor() {
    this.rpc = new JsonRpc(config.basedUrl);
  }

  @action getInfo() {
    return this.rpc.get_info();
  }

  @action setBlockNum(blockNum){
    this.block_num_or_id = blockNum;
  }

  @action setNextBlockNum(blockNum){
    this.nextBlockNum = blockNum;
  }

  /**
  * Get single block
  * @param - _block_num_or_id{string}: block number or id
  */
  @action getBlock(_block_num_or_id) {
    return this.rpc.get_block(_block_num_or_id);
  }

  /* when user load new block, subtract 1 from current block number for getting next block */
  @action loadBlocks(){
    console.log("this.blocks: ", this.blocks);
    this.nextBlockNum =  this.blocks[this.blocks.length - 1].block_num-1;
  }

  /**
  * Merge blocks (current blocks + new blocks)
  * @param - newBlocks{array}: block object of array as new blocks
  */
  @action setBlocks(newBlocks){
    if(this.blocks == undefined){
        this.blocks = newBlocks;
    } else {
      this.blocks = [...this.blocks, ...newBlocks]
    }
  }

  @action getBlocks(){
    return this.blocks;
  }

}
export default new BlockStore();
