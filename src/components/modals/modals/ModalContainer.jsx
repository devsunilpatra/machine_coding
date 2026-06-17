import { useState } from "react";
import Modal from "./Modal";

const ModalContainer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen items-center justify-center">
            <button onClick={()=>setOpen(true)} className="rounded-lg bg-blue-500 px-4 py-2 text-white">Open Modal</button>
            <Modal isOpen={open} onClose={()=>setOpen(false)}>This is a test content for modal.</Modal>
        </div>
    );
};

export default ModalContainer;
