import { useState } from "react";
import Modal from "./Modal";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Delete Item"
      >
        <p className="text-gray-600">
          Are you sure you want to delete this item?
        </p>

         <p className="text-gray-600">
          Are you sure you want to delete this item?
        </p>
         <p className="text-gray-600">
          Are you sure you want to delete this item?
        </p>

         <p className="text-gray-600">
          Are you sure you want to delete this item?
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}