import React, {Component} from 'react';

export const subComponent = {
  renderer: row => (
    <div>{JSON.stringify(row)}</div>
  )
};
