import Tester from '../src/index';

describe('tests the Tester', () => {
  test('simple trigger', async () => {
    const tester = new Tester();
    const result = await tester
      .operation()
      .sideEffect()
      .sideEffect()
      .sideEffect()
      .run();
  });
});
