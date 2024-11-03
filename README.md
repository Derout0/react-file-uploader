# FileUploader Component

`FileUploader` — настраиваемый компонент для загрузки файлов в React.

![File Uploader Example](./media/file-uploader-gif.gif)

## Использование

Импортируйте и используйте `FileUploader`:

```typescript
import { FileUploader } from 'your-file-uploader-package';

function MyComponent() {
  const handleFileUpload = (file: File) => {
    // Обработка загрузки файла
  };

  return (
    <FileUploader
      api={handleFileUpload}
      options={{
        maxFiles: 5,
        multiple: true,
        maxFileSize: 10 // В мегабайтах
      }}
    />
  );
}
