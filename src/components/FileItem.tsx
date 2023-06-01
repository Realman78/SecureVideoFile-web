import { FC } from 'react'
import FileIcon from '../assets/FileIcon';
import DownloadIcon from '../assets/DownloadIcon';
import { formatBytes } from '../utils/utils';

type FileItemProps = {
    _file: {
        name: string;
        date: Date;
        size: number
    }
}

const FileItem: FC<FileItemProps> = ({ _file }) => {
    return (
        <div className="bg-[#041B37] mb-6 flex justify-between items-center py-4 px-5 rounded-lg relative">
            <div className="flex w-1/4">
                <FileIcon />
                <p className="ml-3 text-white">{_file.name}</p>
            </div>
            <span className="h-4 w-[2px] border-l border-white"></span>
            <div className="flex w-1/4 justify-center">
                <p className="text-white">{_file.date.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })}</p>
            </div>
            <span className="h-4 w-[2px] border-l border-white"></span>
            <div className="flex justify-center w-1/4 text-center">
                <p className="text-white">{formatBytes(_file.size)}</p>
            </div>
            <span className="cursor-pointer absolute right-3">
                <DownloadIcon />
            </span>
        </div>
    )
}

export default FileItem