import React from "react";
import useUndoRedo from "../../hooks/useUndoRedo";
import { FaUpload } from "react-icons/fa";

// Function to download JSON file
const downloadJson = (json: string) => {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.setAttribute("download", "DiagramX.json");
  a.setAttribute("href", url);
  a.click();

  // Clean up URL
  URL.revokeObjectURL(url);
};

// Component for exporting JSON button
export const DownloadJsonButton = (props: { useDiagram: any }) => {
  const { getSnapshotJson } = useUndoRedo();

  // Click handler for the button
  const onClick = async () => {
    props.useDiagram.deselectAll(); // Deselect all elements if needed
    const flow = getSnapshotJson(); // Get current diagram state
    const jsonString = JSON.stringify(flow);

    try {
      const response = await fetch("/api/test/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ json: jsonString }),
      });

      if (!response.ok) {
        throw new Error("Failed to save JSON data");
      }

      // If saved successfully, download the JSON file to the client
      downloadJson(jsonString);
    } catch (error) {
      console.error("Error saving JSON data:", error);
      // Handle errors, e.g., display error message to the user
    }
  };

  return (
    <button
      className="w-full dark:text-white dark:hover:bg-slate-800 hover:bg-gray-200 rounded-md p-1 flex flex-row gap-1 justify-between items-center"
      onClick={onClick}
    >
      Export Json
      <FaUpload />
    </button>
  );
};

export default DownloadJsonButton;
