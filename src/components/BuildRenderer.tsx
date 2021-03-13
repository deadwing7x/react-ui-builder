import React, { CSSProperties, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../styles/BuildRenderer.module.css";
import { ILabelProperties } from "../models/ILabelProperties";
import { IBuildRendererProps } from "../models/IBuildRendererProps";
import { IElementProperties } from "../models/IElementProperties";

Modal.setAppElement("#root");

const BuildRenderer: React.FC<IBuildRendererProps> = (
  props: IBuildRendererProps
) => {
  const [isDragStarted, setIsDragStarted] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [dropProperties, setDropProperties] = useState<React.DragEvent>();
  const [labelText, setLabelText] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("");
  const [fontWeight, setFontWeight] = useState<string>("");
  const [height, setHeight] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();
  const [draggedElement, setDraggedElement] = useState<IElementProperties>();
  const [draggedElementId, setDraggedElementId] = useState<string>("");

  useEffect(() => {
    setHeight(document.getElementById("dropzone")?.getClientRects()[0].height);
    setWidth(document.getElementById("dropzone")?.getClientRects()[0].width);
  }, [height, width]);

  // Notifies that an element is being dragged
  const dragOverHandler = (event: React.DragEvent) => {
    setIsDragStarted(true);
    event.stopPropagation();
    event.preventDefault();
  };

  // Handles the functionality when an element has been dropped
  const dropHandler = (event: React.DragEvent) => {
    setIsDragStarted(false);
    setIsOpen(true);
    setDropProperties(event);

    const isElementPresentInDOM = document.getElementById(draggedElementId);

    if (isElementPresentInDOM !== null) {
      localStorage.removeItem(draggedElementId);
      document.getElementById(draggedElementId)?.remove();
      setIsOpen(false);

      const labelProperties: ILabelProperties | undefined = {
        label: draggedElement?.labelProperties?.label,
        clientX: event?.clientX,
        clientY: event?.clientY,
        fontSize: draggedElement?.labelProperties?.fontSize,
        fontWeight: draggedElement?.labelProperties?.fontWeight,
        element: props.element,
      };

      renderElement(labelProperties, "", false);
    }
  };

  // Notifies when an existing element is dragged
  const onElementDragStartHandler = (elementId: string) => {
    const element: any = localStorage.getItem(elementId);
    setDraggedElement(JSON.parse(element));
    setDraggedElementId(elementId);
  };

  //#region Render dragged elements on the screen
  const renderElement = (
    elementProperties: ILabelProperties | undefined,
    elementToBeRendered: string,
    isFormSubmit: boolean
  ) => {
    let RenderElement: any;

    let element =
      elementToBeRendered === ""
        ? props.element
        : elementToBeRendered.split("-")[0];

    if (isFormSubmit) {
      element = props.element;
      elementToBeRendered = "";
    }

    switch (element) {
      case "Label":
        RenderElement = renderLabel(elementProperties, elementToBeRendered);
        break;
      case "Input":
        RenderElement = renderInput(elementProperties, elementToBeRendered);
        break;
      case "Button":
        RenderElement = renderButton(elementProperties, elementToBeRendered);
        break;
      default:
        break;
    }

    const temp = document.createElement("div");
    document.getElementById("dropzone")?.appendChild(temp);

    ReactDOM.render(<RenderElement />, temp);
  };

  const handleKeypress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const element: any = localStorage.getItem(e.currentTarget.id);
      setDraggedElement(JSON.parse(element));
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Delete") {
      const element: any = localStorage.getItem(e.currentTarget.id);
      localStorage.removeItem(e.currentTarget.id);
      document.getElementById(e.currentTarget.id)?.remove();
    }
  };

  // Renders the Label element
  const renderLabel = (
    labelProperties: ILabelProperties | undefined,
    elementToBeRendered: string
  ) => {
    return () => {
      const id = Math.random();
      const elementId: string =
        elementToBeRendered === ""
          ? `${props.element}-${id.toString()}`
          : `${elementToBeRendered}`;

      const labelStyle: CSSProperties = {
        position: "relative",
        top: `${labelProperties?.clientY}px`,
        left: `${labelProperties?.clientX}px`,
        fontSize: `${labelProperties?.fontSize}px`,
        fontWeight: `${labelProperties?.fontWeight}` as "bold",
        color: "black",
        cursor: "grab",
      };

      const element: IElementProperties = {
        labelProperties: labelProperties,
        labelStyle: labelStyle,
      };

      if (elementToBeRendered.length <= 0) {
        localStorage.setItem(elementId, JSON.stringify(element));
      }

      return (
        <label
          draggable
          style={labelStyle}
          id={elementId}
          onDragStart={() => onElementDragStartHandler(elementId)}
          onKeyPress={(event) => handleKeypress(event)}
          onKeyDown={(event) => handleKeyDown(event)}
        >
          {labelProperties?.label}
        </label>
      );
    };
  };

  // Renders the Input element
  const renderInput = (
    inputProperties: ILabelProperties | undefined,
    elementToBeRendered: string
  ) => {
    return () => {
      const id = Math.random();
      const elementId: string =
        elementToBeRendered === ""
          ? `${props.element}-${id.toString()}`
          : `${elementToBeRendered}`;

      const inputStyle: CSSProperties = {
        position: "relative",
        top: `${inputProperties?.clientY}px`,
        left: `${inputProperties?.clientX}px`,
        fontSize: `${inputProperties?.fontSize}px`,
        fontWeight: `${inputProperties?.fontWeight}` as "bold",
        color: "black",
        border: "1px solid black",
        paddingLeft: "10px",
        boxSizing: "border-box",
        cursor: "grab",
      };

      const element: IElementProperties = {
        labelProperties: inputProperties,
        labelStyle: inputStyle,
      };

      if (elementToBeRendered.length <= 0) {
        localStorage.setItem(elementId, JSON.stringify(element));
      }

      return (
        <input
          id={elementId}
          draggable
          style={inputStyle}
          placeholder={inputProperties?.label}
          type="text"
          onDragStart={() => onElementDragStartHandler(elementId)}
          onKeyPress={(event) => handleKeypress(event)}
          onKeyDown={(event) => handleKeyDown(event)}
        />
      );
    };
  };

  // Renders the Button element
  const renderButton = (
    buttonProperties: ILabelProperties | undefined,
    elementToBeRendered: string
  ) => {
    return () => {
      const id = Math.random();
      const elementId: string =
        elementToBeRendered === ""
          ? `${props.element}-${id.toString()}`
          : `${elementToBeRendered}`;

      const buttonStyle: CSSProperties = {
        position: "relative",
        top: `${buttonProperties?.clientY}px`,
        left: `${buttonProperties?.clientX}px`,
        fontSize: `${buttonProperties?.fontSize}px`,
        fontWeight: `${buttonProperties?.fontWeight}` as "bold",
        color: "white",
        paddingLeft: "1rem",
        paddingBottom: "0.5rem",
        paddingTop: "0.5rem",
        paddingRight: "1rem",
        backgroundColor: "#0044C1",
        border: "2px solid black",
        cursor: "grab",
      };

      const element: IElementProperties = {
        labelProperties: buttonProperties,
        labelStyle: buttonStyle,
      };

      if (elementToBeRendered.length <= 0) {
        localStorage.setItem(elementId, JSON.stringify(element));
      }

      return (
        <button
          draggable
          type="button"
          style={buttonStyle}
          id={elementId}
          onDragStart={() => onElementDragStartHandler(elementId)}
          onKeyPress={(event) => handleKeypress(event)}
          onKeyDown={(event) => handleKeyDown(event)}
        >
          {buttonProperties?.label}
        </button>
      );
    };
  };
  //#endregion

  // Handles the configuration form submit
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const elementType: any =
      props.element === ""
        ? draggedElement?.labelProperties?.element
        : props.element;

    const elementProperties: ILabelProperties = {
      label:
        labelText === "" ? draggedElement?.labelProperties?.label : labelText,
      clientX:
        dropProperties?.clientX === undefined
          ? draggedElement?.labelProperties?.clientX
          : dropProperties?.clientX,
      clientY:
        dropProperties?.clientY === undefined
          ? draggedElement?.labelProperties?.clientY
          : dropProperties?.clientY,
      fontSize:
        fontSize === "" ? draggedElement?.labelProperties?.fontSize : fontSize,
      fontWeight:
        fontWeight === ""
          ? draggedElement?.labelProperties?.fontSize
          : fontWeight,
      element: elementType,
    };

    setIsOpen(false);

    renderElement(elementProperties, elementProperties?.element, true);
  };

  // Modal styles
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "450px",
      backgroundColor: "rgba(199, 210, 254)",
    },
  };

  // Handler to close button on button click
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const elementsMap = new Map();

    for (let [key, value] of Object.entries(localStorage)) {
      elementsMap.set(key, JSON.parse(value));
    }

    elementsMap.forEach((value, key) => {
      renderElement(value.labelProperties, key, false);
    });
  }, []);

  return (
    <>
      <div
        id="dropzone"
        className={`col-start-1 lg: col-span-10 md: col-span-9 text-white ${
          isDragStarted ? styles.onDragStart : styles.onDrop
        }`}
        onDragOver={(event: React.DragEvent) => dragOverHandler(event)}
        onDrop={(event: React.DragEvent) => dropHandler(event)}
        onDragLeave={() => setIsDragStarted(false)}
      ></div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Properties Modal"
      >
        <button
          className={`cursor: pointer float-right ${styles.closeButton}`}
          onClick={closeModal}
        >
          <AiOutlineClose />
        </button>
        <form>
          <p className={`text-3xl mb-4 border-b-2 border-black pb-2`}>
            Edit {props.element}
          </p>
          <div className="mt-4 mb-4">
            <label className="block mb-2">Label</label>
            <input
              className={`w-80 h-10 border-black border-2 rounded-md ${styles.formInput}`}
              type="text"
              placeholder="This is a sample text"
              value={
                props.element !== ""
                  ? props.element === draggedElement?.labelProperties?.element
                    ? draggedElement?.labelProperties?.label ?? ""
                    : ""
                  : draggedElement?.labelProperties?.label
              }
              onChange={(event) => {
                const labelProperties: ILabelProperties = {
                  label: event?.currentTarget?.value,
                  clientX: draggedElement?.labelProperties?.clientX,
                  clientY: draggedElement?.labelProperties?.clientY,
                  fontSize: draggedElement?.labelProperties?.fontSize,
                  fontWeight: draggedElement?.labelProperties?.fontWeight,
                  element: props.element,
                };
                const element: IElementProperties = {
                  labelProperties: labelProperties,
                  labelStyle: { ...draggedElement?.labelStyle },
                };
                setDraggedElement(element);
                setLabelText(event?.currentTarget?.value);
              }}
            />
          </div>
          <div className="mt-4 mb-4">
            <label className="block mb-2">X</label>
            <input
              className={`w-80 h-10 border-black border-2 rounded-md ${styles.formInput}`}
              readOnly
              type="text"
              value={
                dropProperties?.clientX === undefined
                  ? draggedElement?.labelProperties?.clientX
                  : dropProperties?.clientX
              }
            />
          </div>
          <div className="mt-4 mb-4">
            <label className="block mb-2">Y</label>
            <input
              className={`w-80 h-10 border-black border-2 rounded-md ${styles.formInput}`}
              readOnly
              type="text"
              value={
                dropProperties?.clientY === undefined
                  ? draggedElement?.labelProperties?.clientY
                  : dropProperties?.clientY
              }
            />
          </div>
          <div className="mt-4 mb-4">
            <label className="block mb-2">Font Size (px)</label>
            <input
              className={`w-80 h-10 border-black border-2 rounded-md ${styles.formInput}`}
              type="number"
              placeholder="Font Size"
              min={0}
              value={
                props.element !== ""
                  ? props.element === draggedElement?.labelProperties?.element
                    ? draggedElement?.labelProperties?.fontSize ?? ""
                    : ""
                  : draggedElement?.labelProperties?.fontSize
              }
              onChange={(event) => {
                const labelProperties: ILabelProperties = {
                  label: draggedElement?.labelProperties?.label,
                  clientX: draggedElement?.labelProperties?.clientX,
                  clientY: draggedElement?.labelProperties?.clientY,
                  fontSize: event?.currentTarget?.value,
                  fontWeight: draggedElement?.labelProperties?.fontWeight,
                  element: props.element,
                };
                const element: IElementProperties = {
                  labelProperties: labelProperties,
                  labelStyle: { ...draggedElement?.labelStyle },
                };
                setDraggedElement(element);
                setFontSize(event?.currentTarget?.value);
              }}
            />
          </div>
          <div className="mt-4 mb-4">
            <label className="block mb-2">Font Weight</label>
            <input
              className={`w-80 h-10 border-black border-2 rounded-md ${styles.formInput}`}
              type="number"
              placeholder="Font Weight"
              min={0}
              max={900}
              value={
                props.element !== ""
                  ? props.element === draggedElement?.labelProperties?.element
                    ? draggedElement?.labelProperties?.fontWeight ?? ""
                    : ""
                  : draggedElement?.labelProperties?.fontWeight
              }
              onChange={(event) => {
                const labelProperties: ILabelProperties = {
                  label: draggedElement?.labelProperties?.label,
                  clientX: draggedElement?.labelProperties?.clientX,
                  clientY: draggedElement?.labelProperties?.clientY,
                  fontSize: draggedElement?.labelProperties?.fontSize,
                  fontWeight: event?.currentTarget?.value,
                  element: props.element,
                };
                const element: IElementProperties = {
                  labelProperties: labelProperties,
                  labelStyle: { ...draggedElement?.labelStyle },
                };
                setDraggedElement(element);
                setFontWeight(event?.currentTarget?.value);
              }}
            />
          </div>
          <div className="cursor: pointer mt-8">
            <button
              type="submit"
              className="text-lg bg-blue-300 border-2 border-black rounded-md p-2"
              onClick={(event) => handleFormSubmit(event)}
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BuildRenderer;
