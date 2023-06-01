import FileItem from './FileItem'

const FILES = [
  {name: "file1", date: new Date(), size: 30402},
  {name: "file2", date: new Date(), size: 304021},
  {name: "file3", date: new Date(), size: 304042},
  {name: "file1", date: new Date(), size: 30402},
  {name: "file2", date: new Date(), size: 304021},
  {name: "file3", date: new Date(), size: 304042},
  {name: "file1", date: new Date(), size: 30402},
  {name: "file2", date: new Date(), size: 304021},
  {name: "file3", date: new Date(), size: 304042},
  {name: "file1", date: new Date(), size: 30402},
  {name: "file2", date: new Date(), size: 304021},
  {name: "file3", date: new Date(), size: 304042},
]

const FileList = () => {
  return (
    <div className="flex flex-col max-h-[620px]">
      <div className="mb-6 flex justify-between items-center py-4 px-5 ">
      <span className="text-center w-1/4 font-semibold text-lg">
          File Name
        </span>
        <span className="text-center w-1/4 font-semibold text-lg">
          Date
        </span>
        <span className="text-center w-1/4 font-semibold text-lg">
          Size
        </span>
      </div>
      <div className="flex flex-col overflow-y-auto">
      {FILES.map((f) => <FileItem _file={f} />)}
      </div>
    </div>
  )
}

export default FileList