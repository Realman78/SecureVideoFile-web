import Header from "./components/Header";
import CenterWrapper from "./components/UI/CenterWrapper";
import FileList from "./components/FileList";
import UploadIcon from "./assets/UploadIcon";

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header renderRight />
      <CenterWrapper>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-4/5 h-4/5">
            <div className="flex justify-between items-center mb-20">
              <p className="font-bold text-4xl">User File List</p>
              <span className="cursor-pointer">
                <UploadIcon />
              </span>
            </div>
            <FileList />
          </div>
        </div>
      </CenterWrapper>
    </div>

  );
}

export default App;
