import { createSlice } from "@reduxjs/toolkit";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

export const flow = createSlice({
  name: "flow",
  initialState: {
    nodes: [],
    edges: [],
  },
  reducers: {
    addNode: (state, action) => {
      // To generate a unique id for the new node, we will use the following logic:
      let id;
      const existingIds = state.nodes.map((node) => node.id);
      for (let i = 1; ; i++) {
        id = `Node ${i}`;
        if (!existingIds.includes(id)) {
          break;
        }
      }
      let newNode;
      if (action.payload.type === "imageNode") {
        newNode = {
          id: id,
          type: action.payload.type,
          data: {
            imageUrl: action.payload.imageUrl || null,
          },
          position: {
            x: 400 + (Math.random() - 0.5) * 50,
            y: 300 + (Math.random() - 0.5) * 50,
          },
        };
      } else if (
        action.payload.type === "instagramNode" ||
        action.payload.type === "youtubeNode" ||
        action.payload.type === "tiktokNode" ||
        action.payload.type === "facebookNode"
      ) {
        newNode = {
          id: id,
          type: action.payload.type,
          data: {
            imageUrl: action.payload.imageUrl || null,
            sourceUrl: action.payload.sourceUrl || null,
          },
          position: {
            x: 400 + (Math.random() - 0.5) * 50,
            y: 300 + (Math.random() - 0.5) * 50,
          },
        };
      } else if (action.payload.type === "documentNode") {
        newNode = {
          id: id,
          type: action.payload.type,
          data: {
            file: action.payload.file,
          },
          position: {
            x: 400 + (Math.random() - 0.5) * 50,
            y: 300 + (Math.random() - 0.5) * 50,
          },
        };
      } else {
        newNode = {
          id: id,
          type: action.payload.type,
          data: id,
          position: {
            x: 400 + (Math.random() - 0.5) * 50,
            y: 300 + (Math.random() - 0.5) * 50,
          },
        };
      }

      state.nodes.push(newNode);
    },

    updateNode: (state, action) => {
      const { id, data } = action.payload;
      state.nodes = state.nodes.map((node) => {
        if (node.id === id) {
          node.data = data;
        }
        return node;
      });
    },

    deleteNode: (state, action) => {
      const { id } = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== id);
    },

    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes).map((node) => {
        const change = action.payload.find((c) => c.id === node.id);
        if (change?.resized) {
          // Update size for resized nodes
          return {
            ...node,
            width: change.width || node.width,
            height: change.height || node.height,
          };
        }
        return node;
      });
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge({ ...action.payload, type: "customEdge", animated: true }, state.edges);
    },
  },
});

export const { addNode, updateNode, deleteNode, onNodesChange, onEdgesChange, onConnect } =
  flow.actions;

export default flow.reducer;
