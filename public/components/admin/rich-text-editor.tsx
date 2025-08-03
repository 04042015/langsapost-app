"use client"

import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [selectedText, setSelectedText] = useState("")

  const insertText = useCallback(
    (before: string, after = "") => {
      const textarea = document.querySelector("textarea") as HTMLTextAreaElement
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)

      const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
      onChange(newText)

      // Set cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
      }, 0)
    },
    [value, onChange],
  )

  const formatButtons = [
    { icon: Bold, action: () => insertText("**", "**"), tooltip: "Bold" },
    { icon: Italic, action: () => insertText("*", "*"), tooltip: "Italic" },
    { icon: Underline, action: () => insertText("<u>", "</u>"), tooltip: "Underline" },
    { icon: Code, action: () => insertText("`", "`"), tooltip: "Inline Code" },
  ]

  const headingButtons = [
    { icon: Heading1, action: () => insertText("# "), tooltip: "Heading 1" },
    { icon: Heading2, action: () => insertText("## "), tooltip: "Heading 2" },
    { icon: Heading3, action: () => insertText("### "), tooltip: "Heading 3" },
  ]

  const listButtons = [
    { icon: List, action: () => insertText("- "), tooltip: "Bullet List" },
    { icon: ListOrdered, action: () => insertText("1. "), tooltip: "Numbered List" },
    { icon: Quote, action: () => insertText("> "), tooltip: "Quote" },
  ]

  const insertButtons = [
    {
      icon: Link,
      action: () => {
        const url = prompt("Enter URL:")
        if (url) insertText(`[Link Text](${url})`)
      },
      tooltip: "Insert Link",
    },
    {
      icon: ImageIcon,
      action: () => {
        const url = prompt("Enter image URL:")
        const alt = prompt("Enter alt text:") || "Image"
        if (url) insertText(`![${alt}](${url})`)
      },
      tooltip: "Insert Image",
    },
  ]

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-muted/50 p-2">
        <div className="flex flex-wrap gap-1">
          {formatButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={button.tooltip}
              className="h-8 w-8 p-0"
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {headingButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={button.tooltip}
              className="h-8 w-8 p-0"
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {listButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={button.tooltip}
              className="h-8 w-8 p-0"
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {insertButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={button.tooltip}
              className="h-8 w-8 p-0"
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] border-0 resize-none focus-visible:ring-0"
      />
    </div>
  )
}
