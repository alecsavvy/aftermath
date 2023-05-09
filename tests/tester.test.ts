import Tester from '../src/index';

describe('tests the Tester', () => {
  test('simple trigger', async () => {
    const tester = new Tester();
    const result = await tester
      .operation((knex) => {
        knex('books').insert({title: 'Slaughterhouse Five', pageCount: 551})
      })
      .sideEffect((knex) => {
         // select row here
      })
      .run();
  });
});
