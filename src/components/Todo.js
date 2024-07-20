import { useState, useEffect } from "react";
import { FaCheck, FaCheckDouble, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {MdOutlineLibraryAddCheck, MdOutlineDeleteSweep, MdOutlinePendingActions, MdEdit,} from "react-icons/md";
import { IoMdCheckboxOutline, IoIosAlert } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import HamburgerMenu from "react-hamburger-menu";

const getLocalItems = () => {
  let list = localStorage.getItem("tasks");

  if (list) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
};

export default function Tasker() {
  const [tasks, setTasks] = useState(getLocalItems());
  const [task, setTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [showFinished, setShowFinished] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [Message, setMessage] = useState("");
  const [taskMessage, setTaskMessage] = useState("");
  const [activeButton, setActiveButton] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = getLocalItems();
    setTasks(storedTasks);
    const completedCount = storedTasks.filter(
      (task) => task.isCompleted
    ).length;
    setCompletedTasks(completedCount);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const completedCount = tasks.filter((task) => task.isCompleted).length;
    setCompletedTasks(completedCount);
  }, [tasks]);

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage("");
      }, 1900);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (taskMessage) {
      const timeout = setTimeout(() => {
        setTaskMessage("");
      }, 1700);
      return () => clearTimeout(timeout);
    }
  }, [taskMessage]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAdd = () => {
    if (editingTaskId) {
      const updatedTasks = tasks.map((item) => {
        if (item.id === editingTaskId) {
          return { ...item, task: task };
        }
        return item;
      });
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setTaskMessage("Task Edited Successfully!");
    } else {
      const newTask = {
        id: tasks.length + 1,
        task: task,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setTaskMessage("Task Added Successfully!");
    }
    setTask("");
    setErrorMessage("");
  };

  const handleToggle = (id) => {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTasks(updatedTasks);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    const taskToEdit = tasks.find((item) => item.id === id);
    setTask(taskToEdit.task);
    setEditingTaskId(id);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
    setTaskMessage("Task deleted successfully!");
  };

  const handleDeleteAll = () => {
    setTasks([]);
    setActiveButton("all");
    setMessage("");
    setTaskMessage("All tasks cleared successfully!");
    if (isOpen) {
      setIsOpen(!isOpen);
    }
    if (tasks.length === 0) {
      setErrorMessage("Enter a task first");
      setTaskMessage("");
    }
  };

  const handleShowAll = () => {
    setMessage("");
    setShowFinished(true);
    setActiveButton("all");
    if (tasks.length === 0) {
      setErrorMessage("Enter a task first");
      setIsOpen(!isOpen);
    } else if (tasks.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  const handleShowCompleted = () => {
    if (tasks.length === 0) {
      setErrorMessage("Enter a task first");
      setIsOpen(!isOpen);
    } else {
      const completedCount = tasks.filter((item) => item.isCompleted).length;
      if (completedCount === 0) {
        setMessage("There are no completed tasks.");
      } else {
        setMessage("");
      }
      if (activeButton === "completed") {
        setShowFinished(false);
        setActiveButton("pending");
      } else {
        setShowFinished(true);
        setActiveButton("completed");
      }
      if (completedCount > 0) {
        setIsOpen(!isOpen);
      }
    }
  };

  const handleShowPending = () => {
    if (tasks.length === 0) {
      setErrorMessage("Enter a task first");
      setIsOpen(!isOpen);
    } else {
      const pendingCount = tasks.filter((item) => !item.isCompleted).length;
      if (pendingCount === 0) {
        setMessage("There are no pending tasks remaining.");
      } else {
        setMessage("");
      }
      if (activeButton === "pending") {
        setShowFinished(true);
      } else {
        setShowFinished(false);
        setActiveButton("pending");
      }
      if (pendingCount > 0) {
        setIsOpen(!isOpen);
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="xs:mx-4">
        {taskMessage && (
          <div className="container w-full xl:w-1/2 lg:w-4/5 p-1 text-xl md:text-2xl text-center bg-green-300 text-black py-4 mx-auto mb-5 border-2 border-black rounded-full">
            {taskMessage}
          </div>
        )}
      </div>
      <div className="flex flex-col xl:flex-row xs:mx-4">
        <div className="lg:w-full flex flex-col justify-start items-center">
          <div className="container p-10 mx-auto lg:w-4/5 bg-violet-200 border-2 border-black rounded-xl ">
            <h1 className="text-2xl md:text-4xl lg:text-start xxs:text-center mb-8">
              Add a task in your schedule
            </h1>
            <div className="flex justify-center items-center">
              <input
                className="w-11/12 p-4 font-lg xxl:w-9/12 border-2 border-black rounded-xl bg-violet-100 text-black"
                id="todo"
                name="todo"
                type="text"
                onChange={handleChange}
                value={task}
                placeholder="Write your next task here"
                required
              />
              <button
                className="h-14 w-16 ml-4 flex items-center bg-gray-800 text-violet-50 rounded-xl border-2 border-black hover:bg-gray-700 hover:shadow-lg hover:cursor-pointer hover:shadow-gray-500 transition-all duration-200 ease-in-out "
                onClick={handleAdd}
                disabled={task.length < 3}
              >
                {editingTaskId ? (
                  <MdEdit className="text-4xl ml-2" />
                ) : (
                  <IoAddOutline className="text-5xl ml-1" />
                )}
              </button>
            </div>
          </div>
          <div className="container flex flex-col justify-center items-center gap-5 mx-auto lg:w-4/5 p-6 my-8 border-2 border-black rounded-xl bg-violet-200 ">
            <h1 className="text-2xl md:text-4xl flex text-center justify-center items-center">
              Task Completed -{" "}
            </h1>
            <h1 className="text-2xl md:text-4xl p-16 border-2 rounded-full w-10 h-10 flex border-black text-center justify-center items-center bg-violet-100">
              {completedTasks}/{tasks.length}
            </h1>
          </div>
        </div>
        <div className="lg:w-full">
          <div className="container lg:w-4/5 xl:w-full bg-violet-200 p-5 pt-8 mx-auto min-h-[66vh] border-2 border-black rounded-xl">
            <div className="flex flex-col gap-5 md:ml-8">
              <p className="text-3xl md:text-4xl ">Your Schedule</p>
              <div className=" flex flex-row items-center gap-7 text-lg mt-3">
                <button
                  className="flex flex-row gap-2 items-center p-2 rounded-lg bg-gray-800 border-2 border-black text-white hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-500 transition-all duration-200 ease-in-out"
                  isOpen={isOpen}
                  onClick={toggleMenu}
                >
                  <HamburgerMenu
                    isOpen={isOpen}
                    menuClicked={toggleMenu}
                    width={20}
                    height={10}
                    strokeWidth={3}
                    rotate={0}
                    color="white"
                    borderRadius={0}
                    animationDuration={0.5}
                  />
                  Filter
                </button>
                <button
                  className="flex flex-row items-center gap-1 hover:cursor-pointer p-2 rounded-lg bg-gray-800 border-2 border-black text-white hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-500 transition-all duration-200 ease-in-out"
                  onClick={handleDeleteAll}
                >
                  <MdOutlineDeleteSweep className="hidden md:flex" /> Delete All
                </button>
              </div>
              <div
                className={`flex flex-col gap-2 ml-6 md:w-3/5 text-lg ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <button
                  className={`flex gap-1 p-2 hover:cursor-pointer border-2 border-black rounded-md ${
                    activeButton === "all"
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-violet-100 hover:bg-gray-600 hover:text-white"
                  }`}
                  onClick={handleShowAll}
                >
                  <MdOutlineLibraryAddCheck className="mt-1" /> Show All
                </button>
                <button
                  className={`flex gap-1 p-2 hover:cursor-pointer border-2 border-black hover:bg-gray-600 hover:text-white rounded-md ${
                    activeButton === "completed"
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-violet-100 hover:bg-gray-600 hover:text-white"
                  }`}
                  onClick={handleShowCompleted}
                >
                  <IoMdCheckboxOutline className="mt-1" /> Show Completed
                </button>
                <button
                  className={`flex gap-1 p-2 hover:cursor-pointer border-2 border-black hover:bg-gray-600 hover:text-white rounded-md ${
                    activeButton === "pending"
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-violet-100 hover:bg-gray-600 hover:text-white"
                  }`}
                  onClick={handleShowPending}
                >
                  <MdOutlinePendingActions className="mt-1" /> Show Pending
                </button>
              </div>
              {errorMessage && (
                <div className="flex w-full md:w-3/4 justify-center items-center mt-2 bg-red-600 text-white shadow-lg shadow-violet-400 rounded-3xl p-2 text-lg md:text-xl">
                  <IoIosAlert className="m-2" /> {errorMessage}
                </div>
              )}
              {Message && (
                <div className="flex text-center w-full justify-center items-center mt-2 border-2 border-black bg-violet-300 text-black  rounded-3xl p-2 text-lg md:text-2xl">
                  <IoIosAlert className="md:m-2 hidden md:flex" /> {Message}
                </div>
              )}
            </div>

            <div className="mt-10 text-lg md:text-xl flex flex-col items-center">
              {tasks.length === 0 && (
                <div className="text-2xl md:text-3xl text-center">
                  Oops, No tasks to show here
                </div>
              )}
              {tasks.map(
                (item, i) =>
                  (activeButton === "all" ||
                    (activeButton === "completed" && item.isCompleted) ||
                    (activeButton === "pending" && !item.isCompleted)) && (
                    <div
                      key={item.id}
                      className="flex w-full md:w-11/12 h-full my-2 py-3 px-4 justify-between items-center bg-violet-100 border-2 border-black rounded-md"
                    >
                      <div className="flex flex-grow gap-3">
                        <div
                          className={`break-words ${
                            item.isCompleted
                              ? "line-through md:no-underline"
                              : ""
                          }`}
                        >
                          {item.task}
                        </div>
                      </div>

                      <div className="items-center hidden md:block">
                        <span>Status: </span>
                        {item.isCompleted ? (
                          <h1>Completed</h1>
                        ) : (
                          <h1>Pending</h1>
                        )}
                      </div>
                      <div className="text-lg md:text-xl flex h-full ml-6">
                        <button
                          className="p-1 md:p-2 hover:cursor-pointer"
                          onClick={() => handleToggle(item.id)}
                        >
                          {item.isCompleted ? <FaCheckDouble /> : <FaCheck />}
                        </button>
                        <button
                          className="p-1 md:p-2 hover:cursor-pointer"
                          onClick={(e) => {
                            handleEdit(e, item.id);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-1 md:p-2 hover:cursor-pointer"
                          onClick={(e) => {
                            handleDelete(e, item.id);
                          }}
                        >
                          <RiDeleteBin5Fill />
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
