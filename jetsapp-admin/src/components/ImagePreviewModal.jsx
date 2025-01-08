import PropTypes from 'prop-types';
import { X } from 'lucide-react';

export default function ImagePreviewModal({ isOpen, onClose, imageUrl }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl h-[80vh] bg-white rounded-lg overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                >
                    <X className="h-6 w-6" />
                </button>
                <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                        src={imageUrl}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                            e.target.src = 'placeholder.svg';
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

ImagePreviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    imageUrl: PropTypes.string
};