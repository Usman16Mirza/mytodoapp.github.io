import React, { useEffect, useState } from "react";
import "./todoview.css";

const getFromLocalStorage = () => {
  let list = localStorage.getItem("TodoItems");
  if (list) {
    return JSON.parse(localStorage.getItem("TodoItems"));
  } else {
    return [];
  }
};

function ToDoView() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getFromLocalStorage());
  const [toggleEdit, setToggleEdit] = useState(false);
  const [itemtoEdit, setItemToEdit] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please enter data");
    } else if (inputData && toggleEdit) {
      console.log("reached");
      setItems(
        items.map((elem) => {
          if (elem.id === itemtoEdit) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setInputData("");
      setToggleEdit(false);
      setItemToEdit(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => {
      return id !== item.id;
    });
    setItems(updatedItems);
  };

  const deleteAll = () => {
    return setItems([]);
  };

  const editItem = (id) => {
    const itemToBeEdited = items.find((item) => {
      return id === item.id;
    });
    setToggleEdit(true);
    setInputData(itemToBeEdited.name);
    setItemToEdit(id);
  };

  useEffect(() => {
    localStorage.setItem("TodoItems", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center">
              <i className="list fa fa-list" style={{ fontSize: "25px" }}></i>
              <span className="text-white mx-2">TODO LIST</span>
            </h4>
          </div>
          <div className="body-form">
            <form className="text-center ">
              <div className="input-group mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task.."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                ></input>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={addItem}
              >
                ADD TO TODO
              </button>
            </form>
            <div className="">
              <h4 className="text-white  py-1 mt-3 rounded-2 todo-btn text-center">
                My ToDo List
                <span>
                  <button
                    className="bg-transparent del-btn"
                    title="Delete item"
                    onClick={() => deleteAll()}
                  >
                    <i
                      className="text-white fa-solid fa-trash-can text-sm"
                      title="Delete item"
                    ></i>
                  </button>
                </span>
              </h4>
            </div>

            {items.map((item, ind) => {
              return (
                <div
                  key={ind}
                  className="d-flex align-items-center justify-content-between px-1 py-1 my-2 rounded-2 bg-secondary"
                >
                  <div className="d-flex align-items-center">
                    <i className="text-white fa-solid fa-circle-dot "></i>
                    <p className=" px-1 m-0 rounded-2 text-white">
                      {item.name}
                    </p>
                  </div>
                  <div className="d-flex">
                    <button
                      className="bg-transparent del-btn"
                      title="Edit item"
                      onClick={() => editItem(item.id)}
                    >
                      <i
                        className="text-white px-2 fa-solid fa-edit"
                        title="Delete item"
                      ></i>
                    </button>
                    <button
                      className="bg-transparent del-btn"
                      title="Delete item"
                      onClick={() => deleteItem(item.id)}
                    >
                      <i
                        className="text-white px-2 fa-solid fa-trash-can"
                        title="Delete item"
                      ></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoView;
