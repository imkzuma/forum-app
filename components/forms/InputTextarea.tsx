import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function InputTextArea({ text, setText }: { text: string, setText: any }) {
  return (
    <ReactQuill
      theme="snow"
      value={text}
      onChange={setText}
    />
  )
}