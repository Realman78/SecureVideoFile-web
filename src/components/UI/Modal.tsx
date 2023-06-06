
const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={`fixed z-50 top-0 left-0 w-full h-full bg-neutral-800 ${show ? "block" : "hidden"}`}>
        <button type="button" className="bg-slate-600 w-fit h-10 text-sm text-center mb-4" onClick={handleClose}>
          ❌
        </button>
      <section className="fixed w-1/2 h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {children}
      </section>
    </div>
  );
};

export default Modal