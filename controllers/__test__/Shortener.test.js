import shortenerController, {mockShortenerFile} from '../__mock__/Shortener';
jest.mock('../Shortener');


beforeEach(() => {
   shortenerController.mockClear();
   mockShortenerFile.mockClear();
});
describe('shortenerController', () => {
   test('list controller',  async () => {
      const listCall = shortenerController.mockReturnValueOnce();
      expect(listCall).toBeCalledTimes(0);
   })
});