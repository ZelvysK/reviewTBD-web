interface Props {
  id: string;
  header?: string;
  text: string;
  onConfirm: () => void;
}

export const Modal = ({
  id,
  text,
  header = "Are you sure?",
  onConfirm,
}: Props) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <p className="py-4">{text}</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={onConfirm}>
              Yes
            </button>
            <label htmlFor={id} className="btn btn-outline">
              I've changed my mind
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
