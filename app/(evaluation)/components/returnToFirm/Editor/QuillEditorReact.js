import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const RichTextEditor = ({ value, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(value);

  const handleChange = (html) => {
    setEditorHtml(html);
    onChange(html); // Pass the updated HTML content back to the parent component
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }, { font: [] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["image"],
    ],
  };

  // const formats = [
  //   'header', 'font', 'size',
  //   'list', 'bullet',
  //   'bold', 'italic', 'underline',
  //   'align',
  //   'link', 'image'
  // ];

  return (
    <div style={{ height: "100px", marginBottom:"100px"}}>
      <ReactQuill
        theme="snow" // You can choose different themes here
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        // formats={formats}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default RichTextEditor;
