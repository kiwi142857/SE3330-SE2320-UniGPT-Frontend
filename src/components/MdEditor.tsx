import React, { useEffect } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

function MdEditor({ value, onChange } : { value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
    useEffect(() => {
        const vditor = new Vditor('vditor', {
            height :360,
            cache:{
                "enable":false
            },
            value: value,
            mode: "sv",
            toolbar: [
                "emoji",
                "headings",
                "bold",
                "italic",
                "strike",
                "link",
                "|",
                "list",
                "ordered-list",
                "check",
                "outdent",
                "indent",
                "|",
                "quote",
                "line",
                "code",
                "inline-code",
                "insert-before",
                "insert-after",
                "table",
                "|",
                "undo",
                "redo",
                "|",
                "preview",
                "edit-mode",
                "help",
            ],
            blur: () => {
                const event = {
                    target: {
                        value: vditor.getValue(),
                        name: 'vditor'
                    }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
            }
        });
    },[]);

    return (
        <div id="vditor"></div>
    )
}

export default MdEditor;