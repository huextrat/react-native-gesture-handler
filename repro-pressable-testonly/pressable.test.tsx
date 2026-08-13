// Minimal repro — react-native-gesture-handler 3.2.0
//
// jest.config.js must include:
//   setupFiles: ['react-native-gesture-handler/jestSetup.js']
// and @testing-library/react-native >= 13 (for the testOnly_* handler lookup).
//
// Result on 3.2.0: the first test FAILS (onPress never called).
//                  the second test PASSES.
// Result on 3.1.0: both PASS.

import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import {
  Gesture,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';

test('press works on a plain Pressable', () => {
  const onPress = jest.fn();

  render(
    <GestureHandlerRootView>
      <Pressable testID="pressable" onPress={onPress}>
        <Text>Press me</Text>
      </Pressable>
    </GestureHandlerRootView>
  );

  fireEvent(screen.getByTestId('pressable'), 'press');

  // 3.2.0: Expected number of calls: >= 1 / Received number of calls: 0
  expect(onPress).toHaveBeenCalled();
});

test('press works once a relation prop forces the other engine', () => {
  const onPress = jest.fn();

  render(
    <GestureHandlerRootView>
      <Pressable
        testID="pressable"
        onPress={onPress}
        simultaneousWith={Gesture.Tap()}>
        <Text>Press me</Text>
      </Pressable>
    </GestureHandlerRootView>
  );

  fireEvent(screen.getByTestId('pressable'), 'press');

  expect(onPress).toHaveBeenCalled();
});
