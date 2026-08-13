# Repro — `fireEvent(element, 'press')` is a no-op on a relation-free `Pressable` (3.2.0)

This is a Jest-only bug: nothing is wrong at runtime on any platform, so a device
reproducer would show nothing. The failing test *is* the reproduction.

## Setup

Any RN project with:

- `react-native-gesture-handler@3.2.0`
- `@testing-library/react-native@>=13` (the `testOnly_*` handler lookup landed in v13)
- `jest.config.js` containing `setupFiles: ['react-native-gesture-handler/jestSetup.js']`

Drop [`pressable.test.tsx`](./pressable.test.tsx) into the project and run it.

## Expected

Both tests pass — they do on `react-native-gesture-handler@3.1.0`.

## Actual (3.2.0)

The first test fails, the second passes:

```
● press works on a plain Pressable

  expect(jest.fn()).toHaveBeenCalled()

  Expected number of calls: >= 1
  Received number of calls:    0
```

The only difference between the two is the `simultaneousWith` prop, which switches
`Pressable` from `PressableWithTouchable` to `StatefulPressable`.
