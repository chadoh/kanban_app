import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';
import assert from 'assert';
import Editable from 'app/components/Editable';

describe('Editable', () => {
  it('renders value', () => {
    const value = 'amazing';
    const component = renderIntoDocument(
      <Editable value={value} />
    )

    const valueComponent = findRenderedDOMComponentWithClass(component, 'value');

    assert.equal(valueComponent.textContent, value);
  })

  it('enters edit mode', () => {
    const value = 'incredible';
    const component = renderIntoDocument(
      <Editable value={value} />
    );

    const valueComponent = findRenderedDOMComponentWithClass(component, 'value');
    Simulate.click(valueComponent);

    const input = findRenderedDOMComponentWithTag(component, 'input');

    assert.equal(input.value, value);
  })
})
