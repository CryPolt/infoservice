"use client";
import './page.module.css';
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Notes = ({ documents }) => {
  
  return (
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1}}>
        <Masonry gutter="20px">
          {documents.map((item: { id: React.Key; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode>; content: any; }) => (
            <div key={item.id} className="tiptap">
              <div
                className="ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
  
  );
};

export default Notes;
