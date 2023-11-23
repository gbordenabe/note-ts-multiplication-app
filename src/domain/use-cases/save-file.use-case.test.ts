import { SaveFile } from './save-file.use-case';
import fs, { mkdir } from 'fs';

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom contest',
    fileDestination: 'custom-outputs',
    fileName: 'custom-table-name',
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    const outputsFolderExists = fs.existsSync('outputs');
    if (outputsFolderExists)
      fs.rmSync('outputs', { recursive: true, force: true });
    const customOutputsFolderExists = fs.existsSync(customFilePath);
    if (customOutputsFolderExists)
      fs.rmSync(customOptions.fileDestination, {
        recursive: true,
        force: true,
      });
  });

  test('should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';

    const options = {
      fileContent: 'test content',
    };

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toContain(options.fileContent);
  });

  test('should save file with custom values', () => {
    const saveFile = new SaveFile();
    const result = saveFile.execute(customOptions);

    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, 'utf-8');

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toContain(customOptions.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing');
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writing error message from testing');
      });

    const result = saveFile.execute(customOptions);

    expect(result).toBeFalsy();

    writeFileSyncSpy.mockRestore();
  });
});
