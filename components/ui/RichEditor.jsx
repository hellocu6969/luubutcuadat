import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Quote, Code, Heading1, Heading2, Strikethrough } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const Toolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-1 p-2 mb-2 border-b border-border bg-muted/30 rounded-t-lg">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn("h-8 w-8 p-0", editor.isActive('bold') && "bg-accent text-accent-foreground")}
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn("h-8 w-8 p-0", editor.isActive('italic') && "bg-accent text-accent-foreground")}
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={cn("h-8 w-8 p-0", editor.isActive('strike') && "bg-accent text-accent-foreground")}
            >
                <Strikethrough className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn("h-8 w-8 p-0", editor.isActive('heading', { level: 2 }) && "bg-accent text-accent-foreground")}
            >
                <Heading1 className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn("h-8 w-8 p-0", editor.isActive('bulletList') && "bg-accent text-accent-foreground")}
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn("h-8 w-8 p-0", editor.isActive('orderedList') && "bg-accent text-accent-foreground")}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn("h-8 w-8 p-0", editor.isActive('blockquote') && "bg-accent text-accent-foreground")}
            >
                <Quote className="h-4 w-4" />
            </Button>
        </div>
    );
};

const RichEditor = ({ content, onChange, placeholder = "Write your story..." }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[150px] px-2',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    // Update content if changed externally (e.g. reset)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            // editor.commands.setContent(content); 
            // Careful with loops here. For simple form, we might not need this sync back unless reset.
            if (content === "") {
                editor.commands.clearContent();
            }
        }
    }, [content, editor]);

    return (
        <div className="w-full border border-border rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <Toolbar editor={editor} />
            <div className="p-3">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichEditor;
