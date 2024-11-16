

# FileUploader Component

`FileUploader` is a customizable and customizable component for uploading files to React. The component is organized with context providers and custom hooks that control state, provide access to parameters and functions

<p align="center">
  <img src="./media/file-uploader-gif.gif">
</p>

## Main features

- **Full customization**: each built-in subcomponent can be used as a standard element, customized with a custom component or rendering function.
- **Advanced customization**: support for common settings (file size and number limits, MIME type filtering, etc.)

## Usage

Import and use `FileUploader`:

```typescript
import { FileUploader } from 'your-file-uploader-package';

function MyComponent() {
  const handleFileUpload = async (file: File) => {
    // File upload logic
  };

  return (
    <FileUploader
      api={handleFileUpload}
      options={{
        multiple: true,
        allowedFileTypes: ['image/png', 'image/jpeg'],
        maxFiles: 5, // Maximum number of files to upload
	maxFileSize: 10, // Maximum size of one file (in MB)
	maxTotalSize: 50 // Total limit for all files (in MB)
      }}
    >
      /* Control and display components for the loader */
      <FileUploader.UploadButton />
      <FileUploader.Dropzone />
      <FileUploader.FileList />
      <FileUploader.Progressbar />
      <FileUploader.Status />
    </FileUploader>
  );
}
```

## Properties for `<FileUploader />`

| Property  | Type                         | Description                                       |
|-----------|------------------------------|---------------------------------------------------|
| className | string                       | Custom class for component styling                |
| api       | (file: File) => Promise<any> | Asynchronous function for file upload processing  |
| options   | object                       | Bootloader settings                               |

### Options (parameter `options`)

| Property         | Type        | Description                                                                                                                                                                         |
|------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| multiple         | boolean     | Allows loading multiple files via input (does not affect maxFiles)                                                                                                                  |
| allowedFileTypes | MimeTypes[] | Array of MIME types for filtering valid files                                                                                                                                       |
| maxFiles         | number      | Maximum number of files to upload Minimum number of files to upload                                                                                                                 |
| minFiles         | number      | Minimum number of files to upload                                                                                                                                                   |
| maxFileSize      | number      | Maximum size of one file in megabytes                                                                                                                                               |
| maxTotalSize     | number      | Maximum size of one file in megabytes Maximum total size of all uploaded files in megabytes (by default, the maximum possible size is calculated based on maxFiles and maxFileSize) |

## Built-in subcomponents
`FileUploader` includes several built-in components for controlling the upload process and interface, with the possibility of customization:
- **`FileUploader.UploadButton`**: button for selecting files.
- **`FileUploader.Dropzone`**: area for dragging and dropping files, activated when a file is moved to the component.
- **`FileUploader.FileList`**: displays a list of uploaded files.
- **`FileUploader.FileItem`**: component to display information about the uploaded file (used inside FileList).
- **`FileUploader.Progressbar`**: displays information about the amount of space (MB) of transferred files.
- **`FileUploader.Status`**: component to display the status of the upload (e.g. number of files remaining).
- **`FileUploader.ResetButton`**: a button to reset uploaded files.
- **`FileUploader.SubmitButton`**: button to submit files to the server.
- **`FileUploader.Error`**: displays error messages, e.g. when the size limit is exceeded.

### Subcomponent Interface.
Each of the subcomponents can be used as a standard component:
``` typescript
<FileUploader.UploadButton className='my-upload-button' />
```

Or pass your custom element to display:
``` typescript
<FileUploader.UploadButton>  
	<MyCustomButton theme='filled' color='primary'>Upload</MyCustomButton>  
</FileUploader.UploadButton>
```
Or as a function with custom rendering:
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

## Example of component construction

```typescript
<div className={cls.ExampleComponent}>  

	{/* Header with download, reset and download status buttons */}
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
	
	{/* Main content with drag and drop zone and file list */}
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
	
	{/* Bottom part with submit button */}
	<HStack className={cls.BaseFileUploaderFooter} gap="20" justify="center" align="center">  
		<FileUploader.SubmitButton /> 
	</HStack>
</div>
```
