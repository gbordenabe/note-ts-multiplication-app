import { ServerApp } from './presentation/server-app';

describe('App', () => {
  test('should call Server.run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;

    process.argv = [
      'node',
      'app',
      '-b',
      '2',
      '-l',
      '10',
      '-s',
      '-n',
      'test-filename',
      '-d',
      'test-destination',
    ];
    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 2,
      limit: 10,
      showTable: true,
      fileName: 'test-filename',
      fileDestination: 'test-destination',
    });
  });
});
