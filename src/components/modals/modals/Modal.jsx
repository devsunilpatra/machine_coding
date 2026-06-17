import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({ onClose, isOpen, children }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-lg bg-white p-6"
            >
                <div
                    onClick={onClose}
                    className="flex cursor-pointer justify-end"
                >
                    X
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
