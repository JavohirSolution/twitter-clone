import { ReactElement } from "react";
import { Dialog, DialogContent } from '../ui/dialog';
import { X } from "lucide-react";
import Image from "next/image";


interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    body?: ReactElement;
    footer?: ReactElement;
    step?: number
    totalSteps?: number
}

function Modal({
    isOpen,
    onClose,
    body,
    footer,
    step,
    totalSteps
}: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='bg-black px-3 py-1'>
                <div className="flex items-center justify-between text-white">
                    <button className="p-1 text-white hover:opacity-70 transition w-fit">
                        <X size={20} onClick={onClose} />
                    </button>
                    <Image
                        src={"/images/twitter-x.png"}
                        alt="Twitter x"
                        width={40}
                        height={40}
                        className="ml-16"
                    />
                    {step && totalSteps && (
                        <div className="text-xl font-bold ">
                            Step {step} of {totalSteps}
                        </div>
                    )}

                </div>
                <div className="flex flex-col justify-center">
                    <div className="mt-4 text-white">
                        {body}
                    </div>
                    {footer && <div className="flex items-center justify-center">{footer}</div>}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
