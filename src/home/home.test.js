import React from 'react';
import Home from './home';
import Enzyme, { render,shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });
import BlockStore from '../stores/blockStore';


test("Should get_info api returns head_block_num", async () => {
  var result = await BlockStore.getInfo();
  expect(result).toHaveProperty('head_block_num');
});

test("Should get_block api returns block data", async () => {
  var mockBlockNum = "82777835";
  var result = await BlockStore.getBlock(mockBlockNum);
  expect(result).toHaveProperty('block_num','transations','timestamp', 'action_mroot');
});
