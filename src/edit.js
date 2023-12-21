import { __ } from '@wordpress/i18n';
import { useState, useCallback } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody, Modal, Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import useOptionsData from './use-options-data';
import './editor.scss';

export default function Edit() {
    const [ isOpen, setOpen ] = useState( false );
    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );

    const { options, setOptions, isLoading } = useOptionsData();
    const { saveOptions } = useDispatch('vk-custom-store-test/options');

    const handleSave = useCallback(() => {
        saveOptions(options).then(() => {
            alert('Settings saved');
        });
    }, [options, saveOptions]);

    return (
        <>
			{ isOpen && 
			<Modal onRequestClose={ closeModal } title="Edit options">
				{isLoading ? <p>Loading...</p> : (
                        <>
                            {Object.keys(options).map((key, index) => (
                                <TextControl
                                    key={index}
                                    label={`Option Text ${index + 1}`}
                                    value={options[key]}
                                    onChange={(nextValue) => {
                                        setOptions({
                                            ...options,
                                            [key]: nextValue,
                                        });
                                    }}
                                />
                            ))}
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                isBusy={isLoading}
                            >
                                Save setting
                            </Button>
							<Button onClick={ closeModal } variant="tertiary">
								Cancel
							</Button>
                        </>
                    )}
            </Modal>
			}
            <InspectorControls>
                <PanelBody title={__('Global Settings')}>
				<Button
                onClick={ openModal }
                variant="primary"
            >Options</Button>
                </PanelBody>
            </InspectorControls>
            <p {...useBlockProps()}>
                {__(
                    'Vk Custom Store Test – hello from the editor!',
                    'vk-custom-store-test'
                )}
            </p>
        </>
    );
}
