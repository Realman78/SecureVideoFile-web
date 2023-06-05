import { ConnectedProps, connect } from 'react-redux';
import { UserPost } from '../types';
import FileItem from './FileItem'
import { FC } from 'react';

interface StateProps {
  posts: any[];
}

const FileList: FC<PropsFromRedux> = ({posts}) => {
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
        {posts.map((f) => <FileItem key={f._id} _file={f} />)}
      </div>
    </div>
  )
}

const mapStoreStateToProps = ({ post }): StateProps => {
  return {
    ...post
  }
}
const connector = connect(mapStoreStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FileList);
