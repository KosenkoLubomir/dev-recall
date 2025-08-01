'use client';

import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Heading from '@tiptap/extension-heading';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';

import {
    Bold, Italic, Strikethrough, List, ListOrdered, Heading1, Heading2, Heading3,
    Quote, Code, Code2, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight,
    CheckSquare, Link as LinkIcon, Undo2, Redo2,
} from 'lucide-react';

import '@/styles/editor.css';

const lowlight = createLowlight(common);
lowlight.register('js', js);
lowlight.register('ts', ts);
lowlight.register('bash', bash);

const supportedLanguages = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Bash', value: 'bash' },
];

import { JSONContent } from '@tiptap/react';

type RichEditorProps = {
    content: JSONContent;
    onChange: (value: JSONContent) => void;
};

export default function RichEditor({ content, onChange }: RichEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Image,
            TaskList,
            TaskItem.configure({ nested: true }),
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            CodeBlockLowlight.configure({ lowlight }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'ProseMirror focus:outline-none border border-gray-300 rounded p-3 min-h-[200px]',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        autofocus: true,
        immediatelyRender: false,
    });

    if (!editor) return null;

    const buttonClass = (isActive: boolean) =>
        `p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`;

    return (
        <div className="space-y-4 h-[calc(100vh-168px)] overflow-y-auto">
            <div className="flex flex-wrap gap-1 border border-gray-300 rounded p-2 bg-white">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))}><Bold className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))}><Italic className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive('strike'))}><Strikethrough className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))}><List className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))}><ListOrdered className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={buttonClass(editor.isActive('taskList'))}><CheckSquare className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonClass(editor.isActive('heading', { level: 1 }))}><Heading1 className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive('heading', { level: 2 }))}><Heading2 className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonClass(editor.isActive('heading', { level: 3 }))}><Heading3 className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))}><Quote className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleCode().run()} className={buttonClass(editor.isActive('code'))}><Code2 className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonClass(editor.isActive('codeBlock'))}><Code className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={buttonClass(editor.isActive({ textAlign: 'left' }))}><AlignLeft className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={buttonClass(editor.isActive({ textAlign: 'center' }))}><AlignCenter className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={buttonClass(editor.isActive({ textAlign: 'right' }))}><AlignRight className="w-4 h-4" /></button>
                <button onClick={() => {
                    const url = window.prompt('Enter URL');
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }} className={buttonClass(editor.isActive('link'))}><LinkIcon className="w-4 h-4" /></button>
                <button onClick={() => {
                    const url = window.prompt('Image URL');
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                }} className={buttonClass(false)}><ImageIcon className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().undo().run()} className={buttonClass(false)}><Undo2 className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().redo().run()} className={buttonClass(false)}><Redo2 className="w-4 h-4" /></button>
            </div>

            {/*{editor.isActive('codeBlock') && (*/}
            {/*    <select*/}
            {/*        value={editor.getAttributes('codeBlock').language || ''}*/}
            {/*        onChange={(e) => {*/}
            {/*            const lang = e.target.value;*/}
            {/*            editor.chain().focus().setCodeBlock({ language: lang }).run();*/}
            {/*        }}*/}
            {/*        className="ml-2 border text-sm px-2 py-1 rounded"*/}
            {/*    >*/}
            {/*        <option value="">Select Language</option>*/}
            {/*        {supportedLanguages.map((lang) => (*/}
            {/*            <option key={lang.value} value={lang.value}>*/}
            {/*                {lang.label}*/}
            {/*            </option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*)}*/}

            <EditorContent editor={editor} />
        </div>
    );
}