import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import Result from './Result';

let container = document.createElement('div');
const root = createRoot(container);

beforeEach(() => {
  // setup a DOM element as a render target
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  act(() => {
    root.unmount();
    container.remove();
    container = null;
  });
});

test('renders Result', async () => {
  const activity = {
    activity: 'Listen to your favorite album',
    accessibility: 0.2,
    key: '3136729',
    link: '',
    participants: 1,
    price: 0.08,
    type: 'music',
  };

  await act(async () => {
    root.render(<Result activity={activity} />);
  });

  await waitFor(() => {
    expect(container.querySelector('#name-result').textContent).toBe(activity.activity);
    expect(container.querySelector('#type-result').textContent).toBe(`Type: ${activity.type}`);
    expect(container.querySelector('#accessibility-result').textContent).toBe(
      `Accessibility: ${activity.accessibility}`,
    );
    expect(container.querySelector('#participants-result').textContent).toBe(`Participants: ${activity.participants}`);
    expect(container.querySelector('#price-result').textContent).toBe(`Price: ${activity.price}`);
  });
});
