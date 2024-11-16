

# FileUploader Component

`FileUploader` — настраиваемый и кастомизируемый компонент для загрузки файлов в React. Компонент организован с помощью провайдеров контекста и пользовательских хуков, которые управляют состоянием, предоставляют доступ к параметрам и функциям

<p align="center">
  <img src="./media/file-uploader-gif.gif">
</p>

## Основные возможности

-   **Полная кастомизация**: каждый встроенный подкомпонент может быть использован как стандартный элемент, кастомизирован с помощью пользовательского компонента или функции рендеринга.
- **Расширенные настройки**: поддержка распространенных параметров (лимиты на размер и количество файлов, фильтрация по MIME-типам и т.д)

## Использование

Импортировать и использовать `FileUploader`:

```typescript
import { FileUploader } from 'your-file-uploader-package';

function MyComponent() {
  const handleFileUpload = async (file: File) => {
    // Логика загрузки файла
  };

  return (
    <FileUploader
      api={handleFileUpload}
      options={{
        multiple: true,
        allowedFileTypes: ['image/png', 'image/jpeg'],
        maxFiles: 5, // Максимальное кол-во файлов для загрузки
        maxFileSize: 10, // Максимальный размер одного файла (в МБ)
        maxTotalSize: 50 // Общий лимит на все файлы (в МБ)
      }}
    >
      /* Компоненты управления и отображения для загрузчика */
      <FileUploader.UploadButton />
      <FileUploader.Dropzone />
      <FileUploader.FileList />
      <FileUploader.Progressbar />
      <FileUploader.Status />
    </FileUploader>
  );
}
```

## Свойства для `<FileUploader />`

| Свойство  | Тип                          | Описание                                          |
|-----------|------------------------------|---------------------------------------------------|
| className | string                       | Кастомный класс для стилизации компонента         |
| api       | (file: File) => Promise<any> | Асинхронная функция для обработки загрузки файлов |
| options   | object                       | Настройки загрузчика                              |

### Опции (параметр `options`)

| Свойство         | Тип         | Описание                                                                                                                                                   |
|------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| multiple         | boolean     | Разрешает загрузку нескольких файлов через input (не влияет на maxFiles)                                                                                   |
| allowedFileTypes | MimeTypes[] | Массив MIME-типов для фильтрации допустимых файлов                                                                                                         |
| maxFiles         | number      | Максимальное количество файлов для загрузки                                                                                                                |
| minFiles         | number      | Минимальное количество файлов для загрузки                                                                                                                 |
| maxFileSize      | number      | Максимальный размер одного файла в мегабайтах                                                                                                              |
| maxTotalSize     | number      | Максимальный общий размер всех загружаемых файлов в мегабайтах (по умолчанию рассчитывается максимально возможный размер на основе maxFiles и maxFileSize) |

## Встроенные подкомпоненты
`FileUploader` включает несколько встроенных компонентов для управления процессом загрузки и интерфейсом, с возможностью кастомизации:
-   **`FileUploader.UploadButton`**: кнопка для выбора файлов.
-   **`FileUploader.Dropzone`**: область для перетаскивания файлов, активируется при переносе файла на компонент.
-   **`FileUploader.FileList`**: отображает список загруженных файлов.
-   **`FileUploader.FileItem`**: компонент для отображения информации о загруженном файле (используется внутри FileList).
-   **`FileUploader.Progressbar`**: отображает информацию о количестве месте (МБ) передаваемых файлов.
-   **`FileUploader.Status`**: компонент для отображения статуса загрузки (например, количества оставшихся файлов).
-   **`FileUploader.ResetButton`**: кнопка для сброса загруженных файлов.
-   **`FileUploader.SubmitButton`**: кнопка для отправки файлов на сервер.
-   **`FileUploader.Error`**: отображает сообщения об ошибках, например, при превышении лимита размера.

### Интерфейс подкомпонентов.
Каждый из подкомпонентов можно использовать как стандартный компонент:
``` typescript
<FileUploader.UploadButton className='my-upload-button' />
```

Или передавать свой кастомный элемент для отображения:
``` typescript
<FileUploader.UploadButton>  
	<MyCustomButton theme='filled' color='primary'>Upload</MyCustomButton>  
</FileUploader.UploadButton>
```
Или как функцию с пользовательским рендерингом:
```typescript
<FileUploader.UploadButton>  
  {({ inputRef, onChange, onUploadButtonClick }) => (  
        <div className='my-custom-block'>  
		<input ref={inputRef} type="file" accept="image/*" onChange={onChange} />  
		<button type='button' onClick={onUploadButtonClick}>Upload</button>  
	</div>  
  )}  
</FileUploader.UploadButton>
```

Это позволяет гибко настраивать отображение необходимого интерфейса.

## Пример построения компонента

```typescript
<div className={cls.ExampleComponent}>  

	{/* Заголовок с кнопками загрузки, сброса и статусом загрузки */}
	<HStack className={cls.BaseFileUploaderHeader} gap="20" align="center">  
		<HStack gap="20" align="center">  
			<HStack gap="20" align="center">  
				<FileUploader.UploadButton/> 
				<FileUploader.ResetButton>  
					{({ onRemoveFiles }) => (  
		                <button type='button' onClick={onRemoveFiles}>Remove All</button>  
					)}  
				 </FileUploader.ResetButton>  
			 </HStack> 
			 <FileUploader.Status visibility={(status) => status === 'PENDING'}/>  
		</HStack> 
		<HStack gap="20" flexGrow={1} justify="end" align="center">  
			<HStack gap="8" align="center">  
				<FileUploader.Details /> 
				<FileUploader.Details display="files-count"/>  
			</HStack> 
			<HStack flex="0 0 20rem">  
				<FileUploader.Progressbar>  
					{({uploadedSize, maxTotalSize}) => {  
                        			return (  
                            				<div className='custom-progressbar'>  
								<div>{`Uploaded Size: ${uploadedSize}`}</div>  
								<div>{`Max Total Size: ${maxTotalSize}`}</div>  
			     				</div>  
						)  
					}}  
				</FileUploader.Progressbar>  
			</HStack>
		</HStack> 
	</HStack> 
	
	{/* Основной контент с зоной перетаскивания и списком файлов */}
	<HStack className={cls.BaseFileUploaderBody}>  
		<FileUploader.Dropzone className={cls.dropzone}>  
			<FileUploader.FileList>  
				{({ files }) => {  
					const filesArray = files?.map((file) => (  
			            		<div>{file.file.name}</div>  
		            		))  
	            
		            		return (  
		                		<div>  
			                		{filesArray}  
	                    			</div>  
					)  
				}}  
			</FileUploader.FileList>  
		</FileUploader.Dropzone> 
		<FileUploader.Error/> 
		<LinearProgress className={cls.loader}/>  
	</HStack> 
	
	{/* Нижняя часть с кнопкой отправки */}
	<HStack className={cls.BaseFileUploaderFooter} gap="20" justify="center" align="center">  
		<FileUploader.SubmitButton /> 
	</HStack>
</div>
```
