export const mockShortenerFile = jest.fn();
const mock = jest.fn().mockImplementation(() => {
    return {
        list: mockShortenerFile,
        encode: mockShortenerFile,
        decode: mockShortenerFile,
        openMain: mockShortenerFile,
        showStatistic: mockShortenerFile
    };
});

export default mock;