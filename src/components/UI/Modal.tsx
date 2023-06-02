
const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={`fixed z-50 top-0 left-0 w-full h-full bg-slate-600 ${show ? "block" : "hidden"}`}>
      <section className="fixed w-1/3 h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </section>
        <button type="button" className="bg-red-800" onClick={handleClose}>
          Close
        </button>
    </div>
  );
};

export default Modal