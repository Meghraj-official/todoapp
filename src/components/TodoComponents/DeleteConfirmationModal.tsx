import Button from "../Button/Button";

interface DeleteConfirmationModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (
  props
) => {
  const { openModal, setOpenModal } = props;

  const closeModal = () => {
    setOpenModal((prev) => !prev);
  };

  const onDelete = () => {
    closeModal();
    props.handleDelete();
  };
  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-brightness-50 ${
        openModal ? "block" : "hidden "
      }}`}
    >
      <div className="relative w-full max-w-md max-h-full mx-auto md:mt-10">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow px-4 py-4">
          <div className="flex items-center justify-between ">
            <div className="text-xl font-bold">Delete Todo</div>
            <button
              onClick={closeModal}
              className="text-gray-600 focus:outline-none"
              aria-label="Close panel"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="w-full mt-4 text-xl">
            Are you sure you want to delete this todo?
          </div>

          <div className="flex justify-end  space-x-4">
            <Button
              type="button"
              onClick={closeModal}
              className="mt-4 bg-blue-400 text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onDelete}
              className="mt-4 bg-red-400 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
